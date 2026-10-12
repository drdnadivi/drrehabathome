import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { Stethoscope, CheckCircle2, AlertTriangle, Clock, ArrowRight, ShieldCheck, Activity, Users, FileText, Filter, RefreshCw } from 'lucide-react';
import { fetchSessions, fetchPatients, fetchStats, fetchPatientDocuments, fetchPatientDocument } from './api';
import { Session, Patient, SystemStats } from './types';

export const DoctorDashboard: React.FC = () => {
  const { openModal, refreshCount, showToast, currentUser } = useApp();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending_review' | 'reviewed'>('pending_review');
  const [selectedPatientFilter, setSelectedPatientFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [sess, pats, st] = await Promise.all([
        fetchSessions(),
        fetchPatients(),
        fetchStats()
      ]);
      setSessions(sess);
      setPatients(pats);
      setStats(st);
    } catch (e) {
      console.error(e);
      showToast('Error loading doctor console data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [refreshCount]);

  const filteredSessions = sessions.filter(s => {
    if (filterStatus !== 'all' && s.pmrDoctorStatus !== filterStatus) return false;
    if (selectedPatientFilter !== 'all' && s.patientId !== selectedPatientFilter) return false;
    return true;
  });

  const pendingCount = sessions.filter(s => s.pmrDoctorStatus === 'pending_review').length;

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-indigo-950 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/40 border-2 border-indigo-300/60 overflow-hidden shadow-lg shrink-0">
              <img
                src={currentUser?.avatar || "/dr-dharshan.jpg"}
                alt="Dr. Dharshan N A, MD (PMR)"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1">
                  <Stethoscope className="w-3.5 h-3.5" />
                  Lead PMR Specialist Console
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30">
                  Doctor Oversight Active
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Dr. Dharshan N A, MD (PMR)
              </h1>
              <p className="text-xs text-indigo-200">
                Department of Physical Medicine & Rehabilitation | 14 Patients Under Direct Supervision
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="p-2 bg-indigo-800/80 hover:bg-indigo-700 rounded-xl text-indigo-200 hover:text-white transition cursor-pointer"
              title="Refresh Queue"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="px-4 py-2.5 bg-indigo-950/70 border border-indigo-700/50 rounded-xl flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping"></div>
              <div>
                <div className="text-[10px] uppercase font-bold text-indigo-300">Pending Review Queue</div>
                <div className="text-lg font-black text-amber-300">{pendingCount} Sessions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-sm text-indigo-950">
            <strong>After baseline:</strong> prescribe tools so physio can treat from session 2. Outcome measures follow the pathway (knee ROM/VAS, etc.).
          </div>
          <div className="flex gap-2 flex-wrap">
            <button type="button" onClick={() => openModal('prescribe_tools')} className="px-4 py-2 bg-indigo-700 text-white text-xs font-semibold rounded-lg cursor-pointer shrink-0">
              Prescribe tools
            </button>
            <button type="button" onClick={() => openModal('upload_document')} className="px-4 py-2 bg-white border border-indigo-200 text-indigo-900 text-xs font-semibold rounded-lg cursor-pointer shrink-0">
              View / upload documents
            </button>
          </div>
        </div>

        {/* Core USP Alert Box */}
        <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded-r-xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wide">
                PMR Clinical Oversight Rule: 100% Home Session Verification
              </h4>
              <p className="text-xs text-indigo-800 mt-0.5">
                Every physical therapy visit outcome—including pain scale (VAS), goniometric joint angles, and resting vitals—must be physician-evaluated within 4 hours to calibrate resistance and prevent secondary injury.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 bg-white text-indigo-800 border border-indigo-200 rounded-lg shrink-0">
            Audit SLA: 4 Hours
          </span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">Under Care</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{stats?.activePatients || 3} Patients</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Neuro, Ortho & Spine Cases</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">Total Home Sessions</div>
            <div className="text-2xl font-black text-teal-600 mt-1">{stats?.totalSessions || 5} Logged</div>
            <div className="text-[11px] text-teal-700 mt-0.5">{stats?.reviewedSessions || 3} Physician Certified</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">Awaiting MD Sign-off</div>
            <div className="text-2xl font-black text-amber-500 mt-1">{pendingCount} Sessions</div>
            <div className="text-[11px] text-amber-700 mt-0.5">Review before tonight</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">Avg. Recovery Score</div>
            <div className="text-2xl font-black text-indigo-600 mt-1">{stats?.avgRecoveryScore || '74%'}</div>
            <div className="text-[11px] text-indigo-700 mt-0.5">Against surgical target</div>
          </div>
        </div>

        {/* Clinical Cohort Overview Cards */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              Supervised Patient Cohort Trajectory
            </h3>
            <span className="text-xs text-slate-500">Real-time biomechanical tracking</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {patients.map(p => (
              <div
                key={p.id}
                className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs hover:border-indigo-300 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{p.name}</div>
                    <div className="text-[11px] text-slate-500">{p.age}y {p.gender} | {p.diagnosis}{(p as any).selectedOutcomeTools?.length ? ` · Tools: ${(p as any).selectedOutcomeTools.join(", ")}` : ""}</div>
                  </div>
                  <span className="text-xs font-black px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100">
                    {p.recoveryScore}%
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Current ROM:</span>
                    <strong className="text-slate-800">{p.currentROM}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Pain (VAS):</span>
                    <strong className="text-teal-700">{p.currentVAS}/10 (Baseline was {p.baselineVAS}/10)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Progress:</span>
                    <span className="text-slate-700">{p.sessionsCompleted} of {p.totalSessionsPlanned} visits</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 flex items-center justify-between">
                  <button
                    onClick={() => openModal('clinical_report', { patient: p, sessions: sessions.filter(s => s.patientId === p.id) })}
                    className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Clinical Dossier
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPatientFilter(p.id);
                      setFilterStatus('all');
                    }}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    View Sessions →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sessions Outcome Verification Queue */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Header & Filter Controls */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                Session Outcomes Awaiting Physiatrist Audit
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Review therapist-recorded goniometry, pain tolerance, and vitals. Sign off or modify prescription.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setFilterStatus('pending_review')}
                  className={`px-3 py-1 rounded-md transition cursor-pointer ${
                    filterStatus === 'pending_review'
                      ? 'bg-white font-bold text-indigo-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  onClick={() => setFilterStatus('reviewed')}
                  className={`px-3 py-1 rounded-md transition cursor-pointer ${
                    filterStatus === 'reviewed'
                      ? 'bg-white font-bold text-teal-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Reviewed ({sessions.length - pendingCount})
                </button>
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1 rounded-md transition cursor-pointer ${
                    filterStatus === 'all'
                      ? 'bg-white font-bold text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({sessions.length})
                </button>
              </div>

              {selectedPatientFilter !== 'all' && (
                <button
                  onClick={() => setSelectedPatientFilter('all')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs cursor-pointer font-medium"
                >
                  Clear Patient Filter ✕
                </button>
              )}
            </div>
          </div>

          {/* Sessions List */}
          <div className="divide-y divide-slate-100">
            {filteredSessions.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No session outcomes match the selected filter.
              </div>
            ) : (
              filteredSessions.map(session => {
                const isPending = session.pmrDoctorStatus === 'pending_review';
                return (
                  <div
                    key={session.id}
                    className={`p-4 sm:p-5 transition hover:bg-slate-50/70 ${
                      isPending ? 'bg-amber-50/20' : ''
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left: Patient & Session Details */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-slate-900">
                            {session.patientName}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                            Session #{session.sessionNumber}
                          </span>
                          <span className="text-xs text-slate-400">
                            {session.date} at {session.time}
                          </span>
                          {session.flaggedUrgent && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-amber-600" />
                              Urgent Review Requested
                            </span>
                          )}
                          {isPending ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white animate-pulse">
                              Awaiting PMR Sign-off
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-teal-600" />
                              PMR Certified
                            </span>
                          )}
                        </div>

                        {/* Metrics Bar */}
                        <div className="flex items-center gap-4 text-xs flex-wrap pt-1">
                          <span className="text-slate-600">
                            Therapist: <strong>{session.therapistName}</strong>
                          </span>
                          <span className="text-slate-600">
                            Resting BP: <strong>{session.vitals?.bp}</strong>
                          </span>
                          <span className="text-slate-600">
                            VAS Pain: <strong className={session.painScoreVAS <= 3 ? 'text-emerald-600' : 'text-amber-600'}>{session.painScoreVAS}/10</strong>
                          </span>
                          <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 font-semibold">
                            {Object.entries(session.romMeasurements || {}).map(([k, v]) => `${k.replace(/([A-Z])/g, ' $1')}: ${v}`).join(' | ')}
                          </span>
                        </div>

                        {/* Therapist Notes */}
                        <div className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100 mt-2">
                          <span className="font-semibold text-slate-900">Therapist Log:</span> "{session.therapistNotes}"
                          <div className="text-slate-500 text-[11px] mt-1">
                            <strong>Functional status:</strong> {session.functionalMobility}
                          </div>
                        </div>

                        {/* Doctor's Previous Remarks if reviewed */}
                        {!isPending && session.pmrDoctorNotes && (
                          <div className="text-xs text-teal-900 bg-teal-50/70 p-2.5 rounded-lg border border-teal-200 mt-2">
                            <span className="font-bold text-teal-950 flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                              PMR Dr. Remarks ({session.pmrDoctorName}):
                            </span>
                            <div className="mt-0.5 font-medium">{session.pmrDoctorNotes}</div>
                            <div className="text-[11px] text-teal-700 mt-1">
                              <strong>Rx Direction:</strong> {session.pmrDoctorAction}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                        <button
                          onClick={() => openModal('doctor_review', session)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm ${
                            isPending
                              ? 'bg-indigo-600 hover:bg-indigo-700 text-white ring-2 ring-indigo-300'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                          }`}
                        >
                          <Stethoscope className="w-4 h-4" />
                          {isPending ? 'Audit & Sign Off' : 'Re-evaluate Protocol'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
