import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { X, Activity, User, HeartPulse, CheckCircle2, AlertTriangle, Send } from 'lucide-react';
import { fetchPatients, logSessionOutcome } from './api';
import { Patient } from './types';

export const LogSessionModal: React.FC = () => {
  const { activeModal, closeModal, showToast, triggerRefresh } = useApp();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState('pat-101');
  const [bp, setBp] = useState('126/82 mmHg');
  const [pulse, setPulse] = useState('74 bpm');
  const [spo2, setSpo2] = useState('99%');
  const [painVAS, setPainVAS] = useState(3);
  const [romKey, setRomKey] = useState('rightKneeFlexion');
  const [romValue, setRomValue] = useState('102°');
  const [secondaryRomKey, setSecondaryRomKey] = useState('rightKneeExtension');
  const [secondaryRomValue, setSecondaryRomValue] = useState('2°');
  const [functionalMobility, setFunctionalMobility] = useState('Ambulated 180m without assistive device. Step length equalized.');
  const [exerciseText, setExerciseText] = useState('Seated active-assisted knee flexion (3x15), Mini squats against wall (3x10), Step-ups 4 inch box (3x12)');
  const [therapistNotes, setTherapistNotes] = useState('Excellent quadriceps activation. Patient performed terminal knee extension with green band without extensor lag. Trace effusion noted post-cooling.');
  const [flaggedUrgent, setFlaggedUrgent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeModal === 'log_session') {
      fetchPatients().then(setPatients).catch(console.error);
    }
  }, [activeModal]);

  if (activeModal !== 'log_session') return null;

  const handlePatientChange = (pId: string) => {
    setSelectedPatientId(pId);
    const p = patients.find(item => item.id === pId);
    if (p) {
      if (p.id === 'pat-102') {
        // Stroke
        setRomKey('leftAnkleDorsiflexion');
        setRomValue('10°');
        setSecondaryRomKey('leftShoulderAbduction');
        setSecondaryRomValue('80°');
        setFunctionalMobility('Dynamic balance in tandem stance maintained for 30s. Gait speed improved.');
        setExerciseText('Task-oriented sit-to-stand (3x10), CIMT cylindrical grasp transfer, Calf eccentric lengthening');
        setTherapistNotes('Lower limb synergy under good voluntary control. Advise PMR doctor review for ankle brace weaning.');
      } else if (p.id === 'pat-103') {
        // Spine
        setRomKey('lumbarFlexion');
        setRomValue('65°');
        setSecondaryRomKey('straightLegRaise');
        setSecondaryRomValue('70° pain-free');
        setFunctionalMobility('Able to sit upright for 45 minutes with zero distal radiation.');
        setExerciseText('Prone press-ups (McKenzie extension) 3x10, Bird-dog core endurance holds, Sciatic nerve flossing');
        setTherapistNotes('Centralization confirmed; no calf numbness. Core endurance at 80s.');
      } else {
        // Knee
        setRomKey('rightKneeFlexion');
        setRomValue('102°');
        setSecondaryRomKey('rightKneeExtension');
        setSecondaryRomValue('2°');
        setFunctionalMobility('Ambulated 180m without assistive device. Step length equalized.');
        setExerciseText('Seated active-assisted knee flexion (3x15), Mini squats against wall (3x10), Step-ups 4 inch box (3x12)');
        setTherapistNotes('Excellent quadriceps activation. Patient performed terminal knee extension with green band without extensor lag.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const selPatient = patients.find(p => p.id === selectedPatientId);

    try {
      const romMeasurements: Record<string, string> = {};
      if (romKey && romValue) romMeasurements[romKey] = romValue;
      if (secondaryRomKey && secondaryRomValue) romMeasurements[secondaryRomKey] = secondaryRomValue;

      const exercisesPerformed = exerciseText.split(',').map(s => s.trim()).filter(Boolean);

      await logSessionOutcome({
        patientId: selectedPatientId,
        patientName: selPatient?.name || 'Rajesh Mehta',
        therapistName: 'PT Rahul Sharma, MPT',
        vitals: { bp, pulse, spo2 },
        painScoreVAS: Number(painVAS),
        romMeasurements,
        exercisesPerformed,
        functionalMobility,
        therapistNotes,
        flaggedUrgent,
        complianceRate: '100%'
      });

      showToast(`Session logged successfully & routed to PMR Doctor (${selPatient?.assignedDoctor || 'Dr. Ananya Roy, MD'}) for review!`, 'success');
      triggerRefresh();
      closeModal();
    } catch (err: any) {
      showToast(err.message || 'Failed to submit session log', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getVasColor = (vas: number) => {
    if (vas <= 2) return 'bg-emerald-500 text-white';
    if (vas <= 4) return 'bg-teal-500 text-white';
    if (vas <= 6) return 'bg-amber-500 text-white';
    return 'bg-rose-500 text-white';
  };

  const getVasEmoji = (vas: number) => {
    if (vas <= 1) return '😄 (Minimal/None)';
    if (vas <= 3) return '🙂 (Mild Ache)';
    if (vas <= 5) return '😐 (Moderate Discomfort)';
    if (vas <= 7) return '😟 (Distracting Pain)';
    return '😣 (Severe Pain)';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-slate-900 text-white p-6 relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 bg-emerald-500/20 text-emerald-300 rounded-md">
              <Activity className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              Staff Physiotherapist Portal
            </span>
          </div>
          <h2 className="text-xl font-bold">Log Clinical Session Outcome</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Objective metrics are immediately transmitted to the PMR Physician for clinical review and protocol calibration.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Patient Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Patient *</label>
            <select
              value={selectedPatientId}
              onChange={e => handlePatientChange(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800 bg-slate-50 focus:bg-white"
            >
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.diagnosis} (Dr: {p.assignedDoctor})
                </option>
              ))}
            </select>
          </div>

          {/* Vitals Row */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-rose-500" />
              Pre-Session Patient Vitals
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Blood Pressure</label>
                <input
                  type="text"
                  value={bp}
                  onChange={e => setBp(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Pulse Rate</label>
                <input
                  type="text"
                  value={pulse}
                  onChange={e => setPulse(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Oxygen (SpO2)</label>
                <input
                  type="text"
                  value={spo2}
                  onChange={e => setSpo2(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                />
              </div>
            </div>
          </div>

          {/* VAS Pain Scale Slider */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700">
                Visual Analog Scale (VAS) Pain Score:
              </label>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getVasColor(painVAS)}`}>
                  Score: {painVAS} / 10
                </span>
                <span className="text-xs text-slate-600 font-medium">{getVasEmoji(painVAS)}</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={painVAS}
              onChange={e => setPainVAS(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>0 (Zero Pain)</span>
              <span>5 (Moderate)</span>
              <span>10 (Worst Pain Imaginable)</span>
            </div>
          </div>

          {/* Joint Range of Motion (ROM) */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="text-xs font-bold text-slate-700 mb-2">
              Joint Goniometer Range of Motion (ROM) Measurements
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Primary Movement Metric</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={romKey}
                    onChange={e => setRomKey(e.target.value)}
                    placeholder="e.g. rightKneeFlexion"
                    className="flex-1 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    value={romValue}
                    onChange={e => setRomValue(e.target.value)}
                    placeholder="e.g. 102°"
                    className="w-20 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-bold text-emerald-700 text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Secondary Metric (Lag / Extension)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={secondaryRomKey}
                    onChange={e => setSecondaryRomKey(e.target.value)}
                    placeholder="e.g. quadricepsLag"
                    className="flex-1 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    value={secondaryRomValue}
                    onChange={e => setSecondaryRomValue(e.target.value)}
                    placeholder="e.g. 0°"
                    className="w-20 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-bold text-emerald-700 text-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Functional Mobility & Exercises Done */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Functional Mobility Milestones Achieved
              </label>
              <input
                type="text"
                value={functionalMobility}
                onChange={e => setFunctionalMobility(e.target.value)}
                placeholder="e.g. Ambulated 150m with cane, independent stair ascent"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Prescribed Exercises Executed (Comma separated)
              </label>
              <textarea
                rows={2}
                value={exerciseText}
                onChange={e => setExerciseText(e.target.value)}
                placeholder="e.g. Quad sets (3x10), Heel slides with strap (3x12), Static cycling (8 min)"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Therapist Clinical Observations for PMR Doctor
              </label>
              <textarea
                rows={2}
                value={therapistNotes}
                onChange={e => setTherapistNotes(e.target.value)}
                placeholder="Detail patient tolerance, tissue tightness, swelling, or gait abnormalities..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white"
                required
              />
            </div>
          </div>

          {/* Urgent Doctor Attention Flag */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <div>
                <div className="text-xs font-bold text-amber-900">Flag for Priority PMR Doctor Consultation</div>
                <div className="text-[11px] text-amber-700">Check if unexplained effusion, acute pain spike, or suspected complication.</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={flaggedUrgent}
              onChange={e => setFlaggedUrgent(e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {loading ? 'Submitting Session Log...' : 'Submit Session Log for PMR Doctor Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
