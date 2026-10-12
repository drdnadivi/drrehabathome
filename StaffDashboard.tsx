import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { UserCheck, Plus, Clock, MapPin, Phone, Activity, ShieldCheck, CheckCircle2, ChevronRight, Stethoscope } from 'lucide-react';
import { fetchPatients, fetchSessions } from './api';
import { Patient, Session } from './types';

export const StaffDashboard: React.FC = () => {
  const { openModal, refreshCount } = useApp();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [recentSessions, setRecentSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchPatients(), fetchSessions()])
      .then(([pats, sess]) => {
        setPatients(pats);
        setRecentSessions(sess);
      })
      .finally(() => setLoading(false));
  }, [refreshCount]);

  const todayVisits = [
    {
      patient: patients[0] || { name: 'Rajesh Mehta', diagnosis: 'Post-TKR Knee', address: '402 Palm Heights, Sector 14, Indiranagar', phone: '+91 98201 45872' },
      time: '10:30 AM',
      sessionNumber: 10,
      doctorDirection: 'PMR Dr. Dharshan: Focus on active-assisted quad sets with green band. Verify no extensor lag.',
      status: 'Ready for Visit'
    },
    {
      patient: patients[1] || { name: 'Sunita Kapoor', diagnosis: 'Stroke Hemiplegia', address: '12 Lotus Enclave, 5th Main, Koramangala', phone: '+91 98450 11299' },
      time: '02:00 PM',
      sessionNumber: 19,
      doctorDirection: 'PMR Dr. Dharshan: Advance dynamic tandem balance and CIMT block transfers.',
      status: 'Scheduled'
    },
    {
      patient: patients[2] || { name: 'David Chen', diagnosis: 'Lumbar Microdiscectomy', address: 'B-804 Green Terraces, Outer Ring Road', phone: '+91 97110 33881' },
      time: '04:30 PM',
      sessionNumber: 12,
      doctorDirection: 'PMR Dr. Dharshan: Progress lumbar core endurance to 90s, check straight leg raise pain.',
      status: 'Scheduled'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600/50 border border-emerald-400/40 p-1 flex items-center justify-center shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80"
                alt="PT Rahul Sharma"
                className="w-full h-full rounded-xl object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  Staff Physiotherapist Console
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30">
                  Zone: South & East Suburbs
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                PT Rahul Sharma, MPT
              </h1>
              <p className="text-xs text-emerald-200">
                Senior Musculoskeletal & Neuro Rehab Therapist | Lead Physiatrist: Dr. Dharshan N A, MD (PMR)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => openModal('baseline')}
              className="px-4 py-3 bg-white text-emerald-900 font-bold text-xs rounded-xl shadow-lg transition cursor-pointer border border-emerald-200"
            >
              Session 1 — Baseline assessment
            </button>
            <button
              onClick={() => openModal('upload_document')}
              className="px-4 py-3 bg-white text-slate-800 font-bold text-xs rounded-xl shadow-lg transition cursor-pointer border border-slate-200"
            >
              Upload discharge summary
            </button>
            <button
              onClick={() => openModal('log_session')}
              className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer transform hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Log treatment session (2+)
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">

        {/* Real patient queue */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 text-sm font-semibold text-slate-800">Your patients</div>
          <div className="divide-y divide-slate-100">
            {patients.map((p) => (
              <div key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-semibold text-slate-900">{p.name}</div>
                  <div className="text-xs text-slate-500">{p.diagnosis}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {p.needsBaselineAssessment ? (
                      <span className="text-amber-700 font-semibold">Needs baseline assessment (session 1)</span>
                    ) : (
                      <span>VAS: {p.currentVAS ?? '—'} · Sessions: {p.sessionsCompleted} · Tools prescribed: {(p.prescribedTools || []).length}</span>
                    )}
                  </div>
                  {!p.needsBaselineAssessment && (p.prescribedTools || []).length > 0 && (
                    <div className="text-[11px] text-teal-700 mt-1">Prescribed: {(p.prescribedTools || []).join(', ')}</div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => openModal(p.needsBaselineAssessment ? 'baseline' : 'log_session', { patientId: p.id })}
                  className="px-3 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-lg cursor-pointer shrink-0"
                >
                  {p.needsBaselineAssessment ? 'Do baseline' : 'Log session'}
                </button>
              </div>
            ))}
            {patients.length === 0 && <p className="p-4 text-sm text-slate-500">No patients assigned yet.</p>}
          </div>
        </div>

        {/* Physiatrist Oversight Guidance Notice */}
        <div className="bg-emerald-50/90 border-l-4 border-emerald-600 p-4 rounded-r-xl shadow-xs">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                Protocol Adherence & Doctor Collaboration Mandate
              </h4>
              <p className="text-xs text-emerald-800 mt-0.5">
                Please log all goniometer angles (ROM) and patient VAS pain scores immediately post-session. Dr. Dharshan N A reviews each outcome log before noon/evening rounds to update exercise resistance.
              </p>
            </div>
          </div>
        </div>

        {/* Today's Home Visit Roster */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                Today's In-Home Rehabilitation Schedule
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                3 home visits scheduled for clinical protocol execution.
              </p>
            </div>
            <button
              onClick={() => openModal('log_session')}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Log Session
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {todayVisits.map((visit, idx) => (
              <div key={idx} className="p-5 hover:bg-slate-50/70 transition">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-slate-900">{visit.patient.name}</span>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold text-[10px] rounded">
                        Visit #{visit.sessionNumber}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {visit.time}
                      </span>
                      <span className="text-xs text-slate-500">| {visit.patient.diagnosis}</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {visit.patient.address}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" /> {visit.patient.phone}
                      </span>
                    </div>

                    {/* PMR Doctor's specific instructions for this session */}
                    <div className="p-2.5 bg-indigo-50/70 border border-indigo-100 rounded-lg text-xs text-indigo-950 flex items-start gap-2 mt-2">
                      <Stethoscope className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-indigo-900 block text-[11px]">PMR Doctor Directive:</strong>
                        <span>{visit.doctorDirection}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openModal('log_session')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Activity className="w-4 h-4" />
                      Record Session Outcome
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Submitted Session Outcomes */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600" />
              Recently Submitted Session Outcomes & Physiatrist Sign-offs
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live status of session reports submitted to Dr. Dharshan N A.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {recentSessions.slice(0, 5).map(s => (
              <div key={s.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{s.patientName}</span>
                    <span className="font-semibold text-slate-500">Session #{s.sessionNumber}</span>
                    <span className="text-slate-400">({s.date})</span>
                  </div>
                  <div className="text-slate-600 mt-1">
                    VAS: <strong>{s.painScoreVAS}/10</strong> | BP: {s.vitals?.bp} | ROM: {Object.entries(s.romMeasurements || {}).map(([k, v]) => `${k}: ${v}`).join(', ')}
                  </div>
                  {s.pmrDoctorNotes && (
                    <div className="text-[11px] text-teal-800 bg-teal-50 px-2 py-1 rounded mt-1.5 font-medium border border-teal-100">
                      <strong>MD Review:</strong> "{s.pmrDoctorNotes}"
                    </div>
                  )}
                </div>

                <div className="shrink-0">
                  {s.pmrDoctorStatus === 'reviewed' ? (
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full font-bold text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      PMR Doctor Signed
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-[11px] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      Pending Doctor Review
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
