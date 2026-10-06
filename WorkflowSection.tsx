import React from 'react';
import { Stethoscope, UserCheck, Activity, ShieldCheck, HeartPulse, ArrowRight } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Baseline PMR Doctor Assessment',
      desc: 'Dr. Dharshan N A reviews pre-op scans, surgical records, baseline ROM, and designs your milestone-based recovery blueprint.',
      icon: Stethoscope,
      color: 'bg-indigo-600 text-white'
    },
    {
      num: '02',
      title: 'Certified Therapist In-Home Visits',
      desc: 'Our senior physical therapist conducts 60-min targeted hands-on sessions at home using specialized goniometers and modalities.',
      icon: UserCheck,
      color: 'bg-emerald-600 text-white'
    },
    {
      num: '03',
      title: 'Daily Objective Telemetry Log',
      desc: 'Resting BP, pulse, VAS pain score, active/passive joint angles, and functional milestones are recorded in the digital portal after each visit.',
      icon: Activity,
      color: 'bg-teal-600 text-white'
    },
    {
      num: '04',
      title: 'PMR Milestone Audits & Alert Reviews',
      desc: 'Dr. Dharshan conducts formal milestone audits on Day 7, 14, 21 & discharge, plus reviews any session alerts (effusion, pain spike) within 4 hours.',
      icon: ShieldCheck,
      color: 'bg-amber-600 text-white'
    },
    {
      num: '05',
      title: 'Patient & Surgeon Progress Tracking',
      desc: 'Patient and operating surgeon track certified milestone achievements, pain reduction curves, and verified discharge dossiers.',
      icon: HeartPulse,
      color: 'bg-sky-600 text-white'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800">
            The Continuous Clinical Feedback Loop
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
            How PMR Doctor-Directed Home Physiotherapy Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
            A balanced clinical protocol combining daily hands-on therapist visits with weekly PMR physician milestone checkpoints and 4-hour alert monitoring.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-slate-800/80 backdrop-blur-xs border border-slate-700/70 p-5 rounded-2xl flex flex-col justify-between hover:border-teal-500/50 transition duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-600 group-hover:text-teal-400 transition font-mono">
                      {step.num}
                    </span>
                    <div className={`w-9 h-9 rounded-xl ${step.color} flex items-center justify-center shadow-md`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center text-[10px] text-teal-400 font-bold uppercase tracking-wider">
                  <span>Step {step.num} Verified</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center p-4 bg-teal-950/40 border border-teal-500/30 rounded-2xl max-w-2xl mx-auto text-xs text-teal-200">
          <strong className="text-teal-300">Clinically Scalable Oversight:</strong> Therapists conduct targeted daily exercises under standing PMR orders, while Dr. Dharshan N A directly audits milestone transitions (Day 7, 14, 21) and acts immediately on clinical alerts.
        </div>
      </div>
    </section>
  );
};
