import React, { useEffect, useState } from 'react';
import { useApp } from './AppContext';
import { X, ClipboardList } from 'lucide-react';
import { fetchPatients, submitBaselineAssessment } from './api';
import { Patient } from './types';
import { OUTCOME_TOOLS } from './outcomeTools';

export const BaselineAssessmentModal: React.FC = () => {
  const { activeModal, closeModal, modalPayload, showToast, triggerRefresh, currentUser } = useApp();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientId, setPatientId] = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>(['vas']);
  const [scores, setScores] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState('');
  const [currentROM, setCurrentROM] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (activeModal === 'baseline') {
      fetchPatients().then((p) => {
        const need = p.filter((x) => x.needsBaselineAssessment);
        setPatients(need.length ? need : p);
        const pre = modalPayload?.patientId || need[0]?.id || p[0]?.id || '';
        setPatientId(pre);
      });
    }
  }, [activeModal, modalPayload]);

  if (activeModal !== 'baseline') return null;

  const patient = patients.find((p) => p.id === patientId);

  const toggleTool = (id: string) => {
    setSelectedTools((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId) return;
    if (selectedTools.length === 0) {
      showToast('Select at least one outcome tool (e.g. VAS, WOMAC, ODI)', 'warning');
      return;
    }
    setSaving(true);
    try {
      const vasRaw = scores.vas ?? scores.nprs;
      const vas = vasRaw === undefined || vasRaw === '' ? null : Number(vasRaw);
      await submitBaselineAssessment(patientId, {
        vas,
        measures: scores,
        outcomeScores: scores,
        selectedOutcomeTools: selectedTools,
        currentROM,
        therapistNotes: notes,
        therapistName: currentUser?.name || 'Physiotherapist',
        toolsUsed: patient?.suggestedTools || [],
      });
      showToast('Baseline assessment saved with selected outcome tools', 'success');
      triggerRefresh();
      closeModal();
    } catch (err: any) {
      showToast(err.message || 'Failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl relative my-8 max-h-[92vh] overflow-y-auto">
        <button type="button" onClick={closeModal} className="absolute top-4 right-4 cursor-pointer">
          <X className="w-5 h-5 text-slate-500" />
        </button>
        <div className="flex items-center gap-2 mb-1">
          <ClipboardList className="w-5 h-5 text-teal-700" />
          <h2 className="text-lg font-bold text-slate-900">Session 1 — Basic assessment</h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Choose outcome tools based on your clinical judgement (VAS, WOMAC, ODI, TUG, etc.), then enter scores. Nothing is pre-filled.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700">Patient</label>
            <select className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm" value={patientId} onChange={(e) => setPatientId(e.target.value)} required>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>{p.name} — {p.diagnosis}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-700 mb-2">Select outcome tools used</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto border border-slate-100 rounded-xl p-2">
              {OUTCOME_TOOLS.map((t) => (
                <label key={t.id} className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50">
                  <input type="checkbox" className="mt-0.5" checked={selectedTools.includes(t.id)} onChange={() => toggleTool(t.id)} />
                  <span>
                    <span className="font-semibold">{t.shortName}</span> — {t.name}
                    <span className="block text-[10px] text-slate-400">{t.domain}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {selectedTools.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-700">Enter scores for selected tools</div>
              {selectedTools.map((id) => {
                const tool = OUTCOME_TOOLS.find((t) => t.id === id);
                if (!tool) return null;
                return (
                  <div key={id}>
                    <label className="text-xs font-medium text-slate-700">{tool.shortName} score</label>
                    <p className="text-[10px] text-slate-400">{tool.scoreHint}</p>
                    <input
                      className="w-full mt-0.5 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                      value={scores[id] || ''}
                      onChange={(e) => setScores({ ...scores, [id]: e.target.value })}
                      placeholder="Enter score / finding"
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-700">ROM / key joint findings (optional)</label>
            <input className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm" value={currentROM} onChange={(e) => setCurrentROM(e.target.value)} placeholder="e.g. Knee flexion 70°, lag 8°" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Clinical notes</label>
            <textarea className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="History, red flags, function…" />
          </div>

          <button type="submit" disabled={saving} className="w-full py-2.5 bg-teal-700 text-white text-sm font-semibold rounded-xl cursor-pointer">
            {saving ? 'Saving…' : 'Save assessment'}
          </button>
        </form>
      </div>
    </div>
  );
};
