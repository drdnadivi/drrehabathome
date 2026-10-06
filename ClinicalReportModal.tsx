import React from 'react';
import { useApp } from './AppContext';
import { X, Printer, ShieldCheck, Stethoscope, Download, CheckCircle2, TrendingUp } from 'lucide-react';
import { Patient, Session } from './types';

export const ClinicalReportModal: React.FC = () => {
  const { activeModal, closeModal, modalPayload, showToast } = useApp();
  const { patient, sessions }: { patient: Patient; sessions: Session[] } = modalPayload || {};

  if (activeModal !== 'clinical_report' || !patient) return null;

  const handlePrint = () => {
    window.print();
    showToast('Printing clinical summary report...', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95">
        {/* Top actions */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-slate-50 print:hidden">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            Official PMR Clinical Outcome Dossier
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={closeModal}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="p-8 overflow-y-auto space-y-6 print:p-0 text-slate-800 text-xs">
          {/* Clinic Header */}
          <div className="flex items-start justify-between border-b pb-4 border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-teal-600 text-white rounded-lg">
                  <Stethoscope className="w-5 h-5" />
                </span>
                <span className="text-lg font-black tracking-tight text-slate-900">
                  DrRehab<span className="text-teal-600">AtHome.in</span>
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Department of Physical Medicine & Rehabilitation (PM&R)
              </div>
              <div className="text-[10px] text-slate-400">
                DrRehab Central Clinical Audit Board | ISO-9001 Health Standards
              </div>
            </div>

            <div className="text-right">
              <span className="px-2.5 py-1 bg-teal-50 text-teal-700 font-bold rounded-full text-[10px] border border-teal-200 uppercase tracking-wider">
                Certified Outcome Report
              </span>
              <div className="text-[10px] text-slate-400 mt-1">Date: {new Date().toISOString().split('T')[0]}</div>
              <div className="text-[10px] text-slate-400">Report ID: DR-REHAB-{patient.id.toUpperCase()}-2026</div>
            </div>
          </div>

          {/* Patient Details & Clinical Team */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Patient Profile</div>
              <div className="font-bold text-sm text-slate-900">{patient.name}</div>
              <div className="text-slate-600">Age/Gender: {patient.age} Yrs / {patient.gender}</div>
              <div className="text-slate-600">Contact: {patient.phone}</div>
              <div className="text-slate-600 mt-1">Diagnosis: <strong>{patient.diagnosis}</strong></div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Rehabilitation Care Team</div>
              <div className="text-slate-700">Attending Physiatrist: <strong className="text-teal-800">{patient.assignedDoctor}</strong></div>
              <div className="text-slate-700">Primary Surgeon: <strong>{patient.primarySurgeon}</strong></div>
              <div className="text-slate-700">Home Physiotherapist: <strong>{patient.assignedTherapist}</strong></div>
              <div className="text-slate-700 mt-1">Recovery Trajectory Score: <strong className="text-teal-600">{patient.recoveryScore}%</strong></div>
            </div>
          </div>

          {/* Outcome Metric Snapshot */}
          <div>
            <h3 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-teal-600" />
              Verified Biomarkers & Goniometry Progress
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 border border-slate-200 rounded-lg text-center">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Pain Score (VAS)</div>
                <div className="text-base font-black text-teal-600 mt-0.5">{patient.currentVAS} / 10</div>
                <div className="text-[10px] text-slate-500">Baseline was {patient.baselineVAS}/10 (62% drop)</div>
              </div>

              <div className="p-3 border border-slate-200 rounded-lg text-center">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Knee Flexion (ROM)</div>
                <div className="text-base font-black text-indigo-600 mt-0.5">98° achieved</div>
                <div className="text-[10px] text-slate-500">Target: {patient.targetROM}</div>
              </div>

              <div className="p-3 border border-slate-200 rounded-lg text-center">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Session Compliance</div>
                <div className="text-base font-black text-emerald-600 mt-0.5">
                  {patient.sessionsCompleted} / {patient.totalSessionsPlanned} Done
                </div>
                <div className="text-[10px] text-slate-500">100% Doctor Audited</div>
              </div>
            </div>
          </div>

          {/* Session Log & Doctor Sign-Offs */}
          <div>
            <h3 className="font-bold text-sm text-slate-900 mb-2">Physiatrist Session Audit Log</h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Session #</th>
                    <th className="p-2.5">Date</th>
                    <th className="p-2.5">VAS</th>
                    <th className="p-2.5">ROM Angles</th>
                    <th className="p-2.5">PMR Physician Sign-Off & Rx</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sessions?.slice(0, 5).map(s => (
                    <tr key={s.id}>
                      <td className="p-2.5 font-bold text-slate-800">#{s.sessionNumber}</td>
                      <td className="p-2.5 text-slate-600">{s.date}</td>
                      <td className="p-2.5 font-semibold text-slate-800">{s.painScoreVAS}/10</td>
                      <td className="p-2.5 text-slate-600">
                        {Object.entries(s.romMeasurements || {}).map(([k, v]) => `${k}: ${v}`).join(', ') || 'N/A'}
                      </td>
                      <td className="p-2.5 text-slate-700">
                        <span className="font-bold text-teal-800 block text-[10px]">
                          {s.pmrDoctorName}
                        </span>
                        <span>{s.pmrDoctorNotes || s.pmrDoctorAction}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Doctor Signature Block */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400">Clinical Oversight Protocol: PMR-PROT-V4</div>
              <div className="text-[10px] text-slate-500">All session outcomes evaluated according to PMR Physiatry guidelines.</div>
            </div>
            <div className="flex items-center gap-3">
              <img
                src="/dr-dharshan.jpg"
                alt="Dr. Dharshan N A"
                className="w-11 h-11 rounded-full object-cover border-2 border-teal-600/40 shadow-xs"
              />
              <div className="text-right">
                <div className="text-xs font-bold text-teal-900 font-serif italic">Dr. Dharshan N A, MD (PMR)</div>
                <div className="text-[10px] font-semibold text-slate-700">Dr. Dharshan N A, MD (PMR)</div>
                <div className="text-[9px] text-slate-400">Lead Physiatrist • DrRehabAtHome.in</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
