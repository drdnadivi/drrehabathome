import React, { useEffect, useState } from 'react';
import { useApp } from './AppContext';
import { X, Wrench } from 'lucide-react';
import { fetchPatients, updatePrescribedTools } from './api';
import { Patient } from './types';

export const PrescribeToolsModal: React.FC = () => {
  const { activeModal, closeModal, modalPayload, showToast, triggerRefresh } = useApp();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientId, setPatientId] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [custom, setCustom] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (activeModal === 'prescribe_tools') {
      fetchPatients().then((p) => {
        setPatients(p);
        const id = modalPayload?.patientId || p[0]?.id || '';
        setPatientId(id);
        const pat = p.find((x) => x.id === id);
        setSelected(pat?.prescribedTools?.length ? [...pat.prescribedTools] : [...(pat?.suggestedTools || [])]);
      });
    }
  }, [activeModal, modalPayload]);

  useEffect(() => {
    const pat = patients.find((x) => x.id === patientId);
    if (pat) {
      setSelected(pat.prescribedTools?.length ? [...pat.prescribedTools] : [...(pat.suggestedTools || [])]);
    }
  }, [patientId, patients]);

  if (activeModal !== 'prescribe_tools') return null;

  const patient = patients.find((p) => p.id === patientId);
  const catalog = Array.from(new Set([...(patient?.suggestedTools || []), ...(patient?.prescribedTools || []), ...selected]));

  const toggle = (tool: string) => {
    setSelected((prev) => (prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]));
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId) return;
    setSaving(true);
    try {
      let tools = [...selected];
      if (custom.trim()) tools = Array.from(new Set([...tools, custom.trim()]));
      await updatePrescribedTools(patientId, tools);
      showToast('Prescribed tools saved for physiotherapist (session 2+)', 'success');
      triggerRefresh();
      closeModal();
    } catch {
      showToast('Failed to save tools', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative my-8">
        <button type="button" onClick={closeModal} className="absolute top-4 right-4 cursor-pointer">
          <X className="w-5 h-5 text-slate-500" />
        </button>
        <div className="flex items-center gap-2 mb-1">
          <Wrench className="w-5 h-5 text-indigo-700" />
          <h2 className="text-lg font-bold text-slate-900">Prescribe tools for physio</h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          After baseline review, choose the kit the physiotherapist should use from session 2. Suggestions are pathway-based; you can change them.
        </p>

        <form onSubmit={save} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-700">Patient</label>
            <select
              className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.needsBaselineAssessment ? 'baseline pending' : 'active'}
                </option>
              ))}
            </select>
          </div>

          {patient && (
            <div className="text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-1">
              <div><strong>Pathway:</strong> {patient.pathwayId}</div>
              <div><strong>Baseline VAS:</strong> {patient.baselineVAS ?? 'Not done'}</div>
              <div><strong>Outcome measures:</strong> {(patient.outcomeMeasureDefs || []).map((m) => m.label).join(', ')}</div>
            </div>
          )}

          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-700">Tools</div>
            {catalog.map((tool) => (
              <label key={tool} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" checked={selected.includes(tool)} onChange={() => toggle(tool)} />
                {tool}
              </label>
            ))}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Add custom tool</label>
            <input
              className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="e.g. Foam roller"
            />
          </div>

          <button type="submit" disabled={saving} className="w-full py-2.5 bg-indigo-700 text-white text-sm font-semibold rounded-xl cursor-pointer">
            {saving ? 'Saving…' : 'Save prescribed tools'}
          </button>
        </form>
      </div>
    </div>
  );
};
