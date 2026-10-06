import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { HeartPulse, Stethoscope, CheckCircle2, Calendar, TrendingUp, Award, Download, Clock, MapPin, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { fetchPatientById, toggleExercise } from './api';
import { Patient, Exercise, Session } from './types';

export const PatientDashboard: React.FC = () => {
  const { selectedPatientId, openModal, refreshCount, showToast } = useApp();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatientById(selectedPatientId || 'pat-101')
      .then(p => {
        setPatient(p);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedPatientId, refreshCount]);

  const handleExerciseToggle = async (exercise: Exercise) => {
    try {
      await toggleExercise(exercise.id);
      if (!exercise.completedToday) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 }
        });
        showToast(`Great job! Completed: ${exercise.title}`, 'success');
      }
      // locally update
      setPatient(prev => {
        if (!prev || !prev.exercises) return prev;
        return {
          ...prev,
          exercises: prev.exercises.map(e => e.id === exercise.id ? { ...e, completedToday: !e.completedToday } : e)
        };
      });
    } catch (e) {
      showToast('Failed to update exercise status', 'error');
    }
  };

  if (loading || !patient) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
          <HeartPulse className="w-6 h-6 text-teal-600 animate-spin" />
          Loading your PMR Doctor-Monitored Recovery Dossier...
        </div>
      </div>
    );
  }

  const sessions = patient.sessions || [];
  const exercises = patient.exercises || [];

  // Data for visual charts (Pain VAS and ROM over sessions)
  const chartSessions = [...sessions].reverse(); // chronological

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Patient Hero Banner */}
      <div className="bg-gradient-to-r from-sky-950 via-teal-950 to-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-600/40 border border-teal-400/40 p-1 flex items-center justify-center shadow-lg">
              <img
                src={patient.id === 'pat-102' ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80' : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'}
                alt={patient.name}
                className="w-full h-full rounded-xl object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1">
                  <HeartPulse className="w-3.5 h-3.5" />
                  Patient Recovery Dashboard
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30">
                  Post-Op Day {patient.postOpDay}
                </span>
              </div>
              <h1 className="text-2xl font-black text-white mt-0.5">
                {patient.name}
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                {patient.diagnosis} | Primary Surgeon: {patient.primarySurgeon}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/15 text-left text-xs">
              <div className="text-[10px] uppercase font-bold text-teal-300 flex items-center gap-1">
                <Stethoscope className="w-3 h-3" />
                Attending Physiatrist (PMR Doctor):
              </div>
              <div className="font-bold text-sm text-white mt-0.5">{patient.assignedDoctor}</div>
              <div className="text-[10px] text-teal-200">100% of your session outcomes certified</div>
            </div>

            <button
              onClick={() => openModal('clinical_report', { patient, sessions })}
              className="px-4 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Download className="w-4 h-4" />
              Download PMR Report
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        {/* Core USP Banner for Patient & Family */}
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 p-4 sm:p-5 rounded-2xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-teal-950">
                  Doctor-Supervised Home Healing Advantage
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-teal-600 text-white text-[10px] font-bold">
                  Active Shield
                </span>
              </div>
              <p className="text-xs text-teal-800 mt-1 leading-relaxed">
                You never exercise alone or blindly. After every single home visit by <strong>{patient.assignedTherapist}</strong>, your knee angles, swelling, and pain scores are inspected by <strong>{patient.assignedDoctor}</strong> within 4 hours to calibrate your recovery safely.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="text-right">
              <div className="text-xs font-bold text-slate-500 uppercase">Recovery Velocity</div>
              <div className="text-xl font-black text-teal-700">{patient.recoveryScore}%</div>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-teal-600 flex items-center justify-center font-bold text-xs text-teal-800 bg-white">
              {patient.recoveryScore}%
            </div>
          </div>
        </div>

        {/* Recovery Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">Current Pain (VAS)</div>
            <div className="text-2xl font-black text-teal-600 mt-1 flex items-center gap-1.5">
              {patient.currentVAS} <span className="text-sm font-semibold text-slate-400">/ 10</span>
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 rotate-180" />
              Down from {patient.baselineVAS}/10 at start
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">Knee Flexion (ROM)</div>
            <div className="text-2xl font-black text-indigo-600 mt-1">
              98°
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Target: <strong>{patient.targetROM}</strong>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">Home Sessions Completed</div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {patient.sessionsCompleted} <span className="text-sm font-semibold text-slate-400">/ {patient.totalSessionsPlanned}</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Next Visit: Tomorrow, 10:30 AM
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">PMR Doctor Sign-off</div>
            <div className="text-2xl font-black text-teal-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-6 h-6 text-teal-600" />
              100%
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Audited by Dr. Dharshan N A, MD (PMR)
            </div>
          </div>
        </div>

        {/* Visual Charts: Pain Reduction & Joint ROM Recovery Curves */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pain Score VAS Reduction Chart */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600 rotate-180" />
                  Pain Score (VAS 0–10) Trajectory
                </h3>
                <p className="text-[11px] text-slate-500">
                  Monitored after every home session by PMR Doctor
                </p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-lg border border-emerald-200">
                -62% Pain Reduction
              </span>
            </div>

            {/* SVG Visual Chart */}
            <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-200">
              {chartSessions.map((s, idx) => {
                const heightPercent = Math.max(15, (s.painScoreVAS / 10) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group relative">
                    <span className="text-[10px] font-bold text-slate-600 group-hover:scale-110 transition">
                      {s.painScoreVAS}
                    </span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full max-w-[28px] rounded-t-lg bg-gradient-to-t from-teal-600 to-teal-400 transition-all duration-300 group-hover:opacity-80"
                    />
                    <span className="text-[9px] font-medium text-slate-400 mt-1 whitespace-nowrap">
                      S#{s.sessionNumber}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 pt-2 font-medium">
              <span>Baseline (Severe Post-Op Pain: 8/10)</span>
              <span>Current Status (Mild: 3/10)</span>
            </div>
          </div>

          {/* Knee Flexion ROM Progress Chart */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  Knee Flexion Range of Motion (Degrees)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Target: 115° (Normal functional stair & chair mobility)
                </p>
              </div>
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-lg border border-indigo-200">
                Now at 98° (Target 115°)
              </span>
            </div>

            {/* SVG Visual Chart */}
            <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-200">
              {chartSessions.map((s, idx) => {
                const romMatch = s.romMeasurements?.rightKneeFlexion?.match(/\d+/);
                const romVal = romMatch ? parseInt(romMatch[0]) : 75;
                const heightPercent = Math.min(100, (romVal / 120) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group relative">
                    <span className="text-[10px] font-bold text-indigo-700 group-hover:scale-110 transition">
                      {romVal}°
                    </span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full max-w-[28px] rounded-t-lg bg-gradient-to-t from-indigo-600 to-sky-400 transition-all duration-300 group-hover:opacity-80"
                    />
                    <span className="text-[9px] font-medium text-slate-400 mt-1 whitespace-nowrap">
                      S#{s.sessionNumber}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 pt-2 font-medium">
              <span>Day 1 Post-Op (Locked at 45°)</span>
              <span>Day 18 (Reached 98° - Arthrofibrosis Prevented)</span>
            </div>
          </div>
        </div>

        {/* Daily Prescribed Home Exercise Plan */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                PMR Physician Prescribed Home Exercises
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Calibrated by Dr. Dharshan N A based on your Session #9 outcome log.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Check off exercises as you do them today:
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercises.map(ex => (
              <div
                key={ex.id}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  ex.completedToday
                    ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleExerciseToggle(ex)}
                      className={`w-6 h-6 rounded-md border flex items-center justify-center transition cursor-pointer mt-0.5 ${
                        ex.completedToday
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 bg-white hover:border-emerald-500'
                      }`}
                    >
                      {ex.completedToday && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                    <div>
                      <h4 className={`text-xs font-bold ${ex.completedToday ? 'text-emerald-950 line-through' : 'text-slate-900'}`}>
                        {ex.title}
                      </h4>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {ex.sets} | {ex.reps} ({ex.frequency})
                      </div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded shrink-0">
                    {ex.category}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {ex.instructions}
                </p>

                {/* PMR Doctor's specific directive */}
                <div className="mt-3 p-2 bg-indigo-50/80 border border-indigo-100 rounded-lg text-[11px] text-indigo-900 flex items-start gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{ex.doctorPrescriptionNote}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Session History Timeline with PMR Doctor Sign-Offs */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-600" />
                Your Clinical Session Timeline & Doctor Sign-offs
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Full chronological transparency: Read therapist notes and the physiatrist's certified audit for each visit.
              </p>
            </div>
            <button
              onClick={() => openModal('clinical_report', { patient, sessions })}
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 cursor-pointer flex items-center gap-1"
            >
              Print Clinical Dossier →
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {sessions.map(s => (
              <div key={s.id} className="p-5 hover:bg-slate-50/60 transition">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Left Column: Therapist visit info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-slate-900">
                        Session #{s.sessionNumber}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {s.date} at {s.time}
                      </span>
                      <span className="text-xs text-slate-400">
                        (Therapist: {s.therapistName})
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap pt-0.5">
                      <span className="bg-slate-100 px-2 py-0.5 rounded font-semibold text-slate-700">
                        BP: {s.vitals?.bp}
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded font-semibold text-slate-700">
                        Pain: {s.painScoreVAS}/10
                      </span>
                      <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold border border-indigo-100">
                        {Object.entries(s.romMeasurements || {}).map(([k, v]) => `${k.replace(/([A-Z])/g, ' $1')}: ${v}`).join(' | ')}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 mt-2">
                      <span className="font-semibold text-slate-900">In-Home Drills:</span> "{s.therapistNotes}"
                    </p>
                  </div>

                  {/* Right Column: PMR Doctor Sign-Off Seal & Clinical Directive */}
                  <div className="md:w-80 bg-gradient-to-br from-indigo-50 to-teal-50 border border-indigo-200/80 p-3.5 rounded-xl text-xs space-y-1.5 shrink-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                        <ShieldCheck className="w-4 h-4 text-teal-600" />
                        PMR Doctor Verified
                      </span>
                      <span className="text-[10px] font-semibold text-indigo-600">
                        {s.pmrDoctorStatus === 'reviewed' ? 'Signed' : 'Under Review'}
                      </span>
                    </div>

                    {s.pmrDoctorNotes ? (
                      <p className="text-indigo-900 italic leading-snug text-xs">
                        "{s.pmrDoctorNotes}"
                      </p>
                    ) : (
                      <p className="text-slate-500 italic text-xs">
                        Dr. Dharshan N A is reviewing today's metrics. Updates appear here shortly.
                      </p>
                    )}

                    <div className="pt-1.5 border-t border-indigo-200/60 flex items-center justify-between text-[10px] text-indigo-800">
                      <span><strong>Doctor:</strong> {s.pmrDoctorName}</span>
                      <span className="text-teal-700 font-semibold">{s.pmrDoctorAction}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
