import React from 'react';
import { useApp } from './AppContext';
import { Quote } from 'lucide-react';

export const RecoveryEvidenceSection: React.FC = () => {
  const { switchRole, setSelectedPatientId } = useApp();

  const cases = [
    {
      id: 'pat-101',
      name: 'Rajesh Mehta',
      age: 62,
      condition: 'Total knee replacement',
      from: 'Limited flexion, high pain, assisted transfers',
      to: 'Improved flexion by Day 18, walking with a stick, clearer confidence',
      quote:
        'Knowing a Physiatrist reviewed my numbers after home visits gave me confidence we would not miss stiffness early.',
    },
    {
      id: 'pat-102',
      name: 'Sunita Kapoor',
      age: 68,
      condition: 'Stroke recovery',
      from: 'Limited voluntary movement and high fall concern',
      to: 'Better balance scores and safer short-distance walking',
      quote:
        'When tone increased, the plan was adjusted quickly instead of waiting weeks for the next clinic visit.',
    },
    {
      id: 'pat-103',
      name: 'David Chen',
      age: 45,
      condition: 'Post lumbar microdiscectomy',
      from: 'Severe leg pain and inability to sit long',
      to: 'Reduced leg symptoms and return to desk work with pacing',
      quote:
        'Objective checks after each session made progress feel measurable, not guesswork.',
    },
  ];

  return (
    <section id="recovery-proof" className="py-16 lg:py-20 bg-slate-50/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
            Outcomes
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
            Illustrative recovery stories
          </h2>
          <p className="text-[15px] text-slate-600 mt-3">
            Demo narratives based on typical pathways. Individual results vary; assessment comes first.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cases.map((c) => (
            <article key={c.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col shadow-sm">
              <div className="mb-3">
                <div className="text-[15px] font-semibold text-slate-900">{c.name}</div>
                <div className="text-[12px] text-teal-700 font-medium mt-0.5">
                  Age {c.age} · {c.condition}
                </div>
              </div>
              <div className="text-[13px] text-slate-600 space-y-1.5 mb-4">
                <p><span className="font-medium text-slate-800">Start:</span> {c.from}</p>
                <p><span className="font-medium text-slate-800">Progress:</span> {c.to}</p>
              </div>
              <div className="mt-auto pt-3 border-t border-slate-100">
                <Quote className="w-4 h-4 text-teal-600 mb-2" />
                <p className="text-[13px] text-slate-600 leading-relaxed italic mb-4">“{c.quote}”</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPatientId(c.id);
                    switchRole('patient');
                  }}
                  className="text-[13px] font-semibold text-teal-700 hover:text-teal-800 cursor-pointer"
                >
                  View sample patient dashboard →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
