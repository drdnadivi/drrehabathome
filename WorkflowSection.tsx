import React from 'react';
import { Stethoscope, UserCheck, Activity, ShieldCheck, HeartPulse } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'PMR baseline assessment',
      desc: 'Dr. Dharshan reviews history, scans and goals, then designs a milestone-based recovery plan.',
      icon: Stethoscope,
    },
    {
      num: '02',
      title: 'Therapist home visits',
      desc: 'A certified physiotherapist delivers hands-on sessions at home following the PMR plan.',
      icon: UserCheck,
    },
    {
      num: '03',
      title: 'Objective session logs',
      desc: 'Vitals, pain scores, joint angles and function are recorded after every visit.',
      icon: Activity,
    },
    {
      num: '04',
      title: 'Milestone audits',
      desc: 'Dr. Dharshan audits Day 7, 14 and 21 progress and reviews clinical alerts within 4 hours.',
      icon: ShieldCheck,
    },
    {
      num: '05',
      title: 'Shared progress view',
      desc: 'Patients and referring surgeons can follow recovery curves and discharge readiness.',
      icon: HeartPulse,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
            How it works
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
            A clear clinical loop from assessment to recovery
          </h2>
          <p className="text-[15px] text-slate-600 mt-3 leading-relaxed">
            Home rehabilitation in Bengaluru. Physiotherapy and, as available, occupational therapy and speech therapy. Where applicable, clinical oversight may involve a PMR physician (Dr. Dharshan N A, MD (PMR), KMC 180734). Individual plans require assessment; outcomes vary.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:border-teal-200 hover:bg-white hover:shadow-sm transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-slate-300 tabular-nums">{step.num}</span>
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-[14px] font-semibold text-slate-900 mb-1.5 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 max-w-2xl mx-auto text-center text-[13px] text-slate-500 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl px-5 py-4">
          Therapists deliver day-to-day care under standing PMR guidance. Dr. Dharshan audits key milestones and escalations so recovery stays on track.
        </div>
      </div>
    </section>
  );
};
