import React from 'react';
import { CreditCard, Stethoscope, UserCheck, Activity, ShieldCheck, HeartPulse } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      num: '0',
      title: 'Secure payment & slot confirmation',
      desc: 'Package confirmation and payment come first. Assessment and therapy schedule activate after that.',
      icon: CreditCard,
    },
    {
      num: '1',
      title: 'Assessment visit',
      desc: 'Baseline review at home: history, goals, stage of recovery, and a starting protocol.',
      icon: Stethoscope,
    },
    {
      num: '2',
      title: 'Identify stage & home protocol',
      desc: 'Plan matched to phase (not a one-page sheet). Physiotherapy; OT/speech when needed.',
      icon: UserCheck,
    },
    {
      num: '3',
      title: 'Session logs',
      desc: 'Pain, movement and function notes after visits so the plan can be adjusted.',
      icon: Activity,
    },
    {
      num: '4',
      title: 'Milestone audits (PMR lens)',
      desc: 'Progress reviewed on a set rhythm (including weekly protocol review). MD (PMR) oversight where applicable.',
      icon: ShieldCheck,
    },
    {
      num: '5',
      title: 'Shared progress',
      desc: 'You and the care team can follow how the programme is moving.',
      icon: HeartPulse,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
            How it works
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
            From confirmation to weekly-reviewed care
          </h2>
          <p className="text-[14px] text-slate-600 mt-3 leading-relaxed">
            Process is built around stage-based protocols and MD (PMR) methodology — not a one-off exercise list.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:border-teal-200 hover:bg-white transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-teal-700 tabular-nums">Step {step.num}</span>
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-[14px] font-semibold text-slate-900 mb-1.5">{step.title}</h3>
                <p className="text-[13px] text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 max-w-2xl mx-auto text-center text-[13px] text-slate-600 leading-relaxed bg-teal-50/50 border border-teal-100 rounded-xl px-5 py-4">
          <strong className="text-slate-800">PMR lens &amp; milestone audits:</strong> programmes are structured so progress can be reviewed on milestones.
          Where applicable, an MD (PMR) physician is associated with clinical oversight of the pathway — that methodology is our core process, not a patient testimonial.
        </div>
      </div>
    </section>
  );
};
