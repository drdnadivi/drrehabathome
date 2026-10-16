import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { X, Stethoscope, CheckCircle2, AlertTriangle, ShieldCheck, FileCheck, ArrowRight, Activity } from 'lucide-react';
import { reviewSessionOutcome } from './api';
import { Session } from './types';

export const DoctorReviewModal: React.FC = () => {
  const { activeModal, closeModal, modalPayload, showToast, triggerRefresh } = useApp();
  const session: Session = modalPayload;

  const [notes, setNotes] = useState(
    session?.pmrDoctorNotes ||
    'Clinical metrics verified. Goniometric progress indicates steady capsular remodeling without aberrant inflammatory reaction. Approved continuing protocol with progressive resistive loading.'
  );
  const [action, setAction] = useState(
    session?.pmrDoctorAction && session.pmrDoctorAction !== 'Awaiting PMR physician clinical verification'
      ? session.pmrDoctorAction
      : 'Approved. Advance resistance band & initiate closed-chain quad work'
  );
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (session) {
      setNotes(
        session.pmrDoctorNotes ||
        'Clinical metrics verified. Goniometric progress indicates steady capsular remodeling without aberrant inflammatory reaction. Approved continuing protocol with progressive resistive loading.'
      );
      setAction(
        session.pmrDoctorAction && session.pmrDoctorAction !== 'Awaiting PMR physician clinical verification'
          ? session.pmrDoctorAction
          : 'Approved. Advance resistance band & initiate closed-chain quad work'
      );
    }
  }, [session]);

  if (activeModal !== 'doctor_review' || !session) return null;

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await reviewSessionOutcome(session.id, {
        pmrDoctorNotes: notes,
        pmrDoctorAction: action,
        doctorName: 'Dr. Dharshan N A, MD (PMR)'
      });

      showToast(`Session #${session.sessionNumber} outcome successfully certified by PMR Physician!`, 'success');
      triggerRefresh();
      closeModal();
    } catch (e: any) {
      showToast(e.message || 'Failed to submit PMR review', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 bg-indigo-500/20 text-indigo-300 rounded-md">
              <Stethoscope className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
              PMR Physiatrist Clinical Oversight Console
            </span>
          </div>
          <h2 className="text-xl font-bold">
            Session Outcome Verification: {session.patientName} (Session #{session.sessionNumber})
          </h2>
          <p className="text-xs text-indigo-200 mt-0.5">
            Logged on {session.date} at {session.time} by {session.therapistName}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Urgent Alert Banner if flagged */}
          {session.flaggedUrgent && (
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-center gap-3 text-amber-900 text-xs font-medium">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <strong>Priority Flagged:</strong> The home physiotherapist requested focused physician guidance for this session.
              </div>
            </div>
          )}

          {/* Vitals & Key Biomarkers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-[10px] uppercase font-bold text-slate-400">Resting Vitals</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">{session.vitals?.bp}</div>
              <div className="text-[10px] text-slate-500">{session.vitals?.pulse} | {session.vitals?.spo2}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-[10px] uppercase font-bold text-slate-400">VAS Pain Score</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5 flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${session.painScoreVAS <= 3 ? 'bg-emerald-500' : session.painScoreVAS <= 6 ? 'bg-amber-500' : 'bg-rose-500'}`} />
                {session.painScoreVAS} / 10
              </div>
              <div className="text-[10px] text-slate-500">
                {session.painScoreVAS <= 3 ? 'Mild Ache' : session.painScoreVAS <= 6 ? 'Moderate' : 'Severe'}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 sm:col-span-2">
              <div className="text-[10px] uppercase font-bold text-slate-400">Joint Range of Motion (ROM)</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {session.romMeasurements && Object.entries(session.romMeasurements).map(([k, v]) => (
                  <span key={k} className="text-xs font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100">
                    {k.replace(/([A-Z])/g, ' $1').toLowerCase()}: <strong>{v}</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Therapist Notes & Functional Mobility */}
          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-teal-600" />
                Therapist Notes & Observed Mechanics:
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{session.therapistNotes}"
              </p>
              <div className="text-[11px] text-slate-500 mt-2">
                <strong>Mobility Benchmark:</strong> {session.functionalMobility}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-[11px] font-bold text-slate-700 mb-1">Exercises Conducted in Home:</div>
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5">
                {session.exercisesPerformed?.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* PMR Doctor Input Form */}
          <form onSubmit={handleReviewSubmit} className="pt-2 border-t border-slate-200 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Physiatrist Clinical Evaluation & Prescription Adjustments
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                PMR Physician Action & Protocol Direction *
              </label>
              <select
                value={action}
                onChange={e => setAction(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 font-semibold text-indigo-950 bg-indigo-50/40"
              >
                <option value="Approved. Advance resistance band & initiate closed-chain quad work">
                  Approved. Advance resistance band & initiate closed-chain quad work
                </option>
                <option value="Approved without protocol modifications - maintain current trajectory">
                  Approved without protocol modifications - maintain current trajectory
                </option>
                <option value="Caution: Mild effusion detected - reduce reps by 20% & enforce ice TID">
                  Caution: Mild effusion detected - reduce reps by 20% & enforce ice TID
                </option>
                <option value="Schedule Tele-PMR Video Review with Patient & Primary Surgeon">
                  Schedule Tele-PMR Video Review with Patient & Primary Surgeon
                </option>
                <option value="Milestone Cleared: Wean off walking stick to independent indoor walking">
                  Milestone Cleared: Wean off walking stick to independent indoor walking
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Physician Clinical Notes for Therapist & Patient Dashboard *
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-slate-800"
                placeholder="Enter medical assessment, pathological checks, and targeted guidance..."
                required
              />
            </div>

            <div className="p-3 bg-indigo-50/90 border border-indigo-200 rounded-xl flex items-center justify-between text-xs text-indigo-950">
              <div className="flex items-center gap-2.5">
                <img
                  src="/dr-dharshan.jpg"
                  alt="Dr. Dharshan N A"
                  className="w-9 h-9 rounded-full object-cover border-2 border-indigo-300 shadow-sm shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <FileCheck className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Digitally Certified by: <strong>Dr. Dharshan N A, MD (PMR)</strong></span>
                  </div>
                  <div className="text-[10px] text-slate-500">Chief Physiatrist • DrRehab@Home</div>
                </div>
              </div>
              <span className="text-[10px] text-indigo-700 font-semibold bg-white px-2 py-1 rounded-md border border-indigo-100 shadow-xs">MCI Reg: MCI-PMR-84920</span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                {submitting ? 'Certifying Outcome...' : 'Sign & Certify Session Outcome'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
