import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Activity, Bone, Brain, Hand } from 'lucide-react';
import { useApp } from './AppContext';

/** Stage-based rehab education — specialist framing, not generic physio brochure */
export const UspPmrSection: React.FC = () => {
  const { openModal } = useApp();
  const [tab, setTab] = useState<'stroke' | 'knee' | 'shoulder'>('stroke');

  const panels = {
    stroke: {
      title: 'Stroke & neuro recovery',
      icon: Brain,
      lead: 'After stroke, the body is not in one fixed state. A PMR-minded plan changes with the stage.',
      points: [
        'Early / flaccid phase: protect the shoulder, careful positioning, gentle activation — avoid harmful traction.',
        'Shoulder safety: reduce risk of subluxation; handling and support matter as much as “exercises”.',
        'Emerging movement: build useful control and function, not only generic strengthening.',
        'Spasticity phase: tone, positioning, and task practice need a different plan than the flaccid phase.',
        'Approaches such as task-oriented practice and neurofacilitation principles (including NDT-informed ideas) are chosen for that patient — not copied from one PDF for all.',
      ],
    },
    knee: {
      title: 'After knee replacement',
      icon: Bone,
      lead: 'Early weeks and later weeks are different jobs. The protocol should move with the patient.',
      points: [
        'Early focus often includes swelling, pain, safe walking, and full extension.',
        'Later focus shifts toward strength, stairs, endurance, and return to routine activity.',
        'Pushing aggressive load too early — or staying too cautious too long — is a common reason progress stalls.',
        'Weekly reassessment lets goals and exercises match the current week, not a fixed sheet from day one.',
      ],
    },
    shoulder: {
      title: 'Frozen / stiff shoulder',
      icon: Hand,
      lead: 'Pain-dominant phases and stiffness-dominant phases need different loading.',
      points: [
        'Irritable (very painful) phases: calm the joint; aggressive stretch can increase flare.',
        'Stiffer, quieter phases: progressive mobility and function can be increased more deliberately.',
        'A single “10 stretches forever” list rarely fits both phases.',
        'Stage-matched progression is the difference between a plan and a printout.',
      ],
    },
  };

  const current = panels[tab];

  return (
    <section id="role-of-pmr" className="py-16 lg:py-20 bg-slate-50/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5" />
            Stage-based rehabilitation
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
            Rehab is not a one-page protocol
          </h2>
          <p className="text-[15px] text-slate-600 mt-3 leading-relaxed">
            Physical Medicine &amp; Rehabilitation (PMR) thinking starts with stage, risk, and function — 
            then the home programme is built around that. Below are examples of how the focus changes by condition and phase.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {(
            [
              ['stroke', 'Stroke'],
              ['knee', 'Knee replacement'],
              ['shoulder', 'Shoulder'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition cursor-pointer ${
                tab === id
                  ? 'bg-teal-700 text-white border-teal-700'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-8 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <current.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{current.title}</h3>
              <p className="text-[14px] text-slate-600 mt-1 leading-relaxed">{current.lead}</p>
            </div>
          </div>
          <ul className="space-y-3">
            {current.points.map((pt) => (
              <li key={pt} className="flex items-start gap-2.5 text-[14px] text-slate-700 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                {pt}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Activity, title: 'Stage first', text: 'Flaccid, recovering, or spastic — the plan is not identical.' },
            { icon: BookOpen, title: 'Weekly review', text: 'Protocols are reassessed so exercises match current progress.' },
            { icon: Brain, title: 'PMR in the cycle', text: 'Physician input where applicable for complex or changing cases.' },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-slate-100 rounded-xl p-4">
              <item.icon className="w-5 h-5 text-teal-700 mb-2" />
              <div className="text-[14px] font-semibold text-slate-900">{item.title}</div>
              <div className="text-[13px] text-slate-500 mt-1 leading-relaxed">{item.text}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => openModal('book')}
            className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold rounded-xl cursor-pointer"
          >
            Contact / Enquiry
          </button>
          <p className="text-[12px] text-slate-500 mt-4 max-w-xl mx-auto">
            Educational examples of clinical reasoning — not a guarantee of identical outcomes. Individual programmes require assessment.
          </p>
        </div>
      </div>
    </section>
  );
};
