import React, { useState } from 'react';
import { useApp } from './AppContext';
import { Calendar, CheckCircle2 } from 'lucide-react';

export const SpecialtiesSection: React.FC = () => {
  const { openModal } = useApp();
  const [active, setActive] = useState('ortho');

  const items = [
    {
      id: 'ortho',
      name: 'Joint replacement',
      headline: 'Knee & hip recovery without losing hard-won range',
      summary:
        'Early home care focuses on extension, safe walking and preventing stiffness. Dr. Dharshan audits critical flexion and lag milestones.',
      points: ['Clear Day 7 / 14 / 21 checkpoints', 'Gait weaning guidance', 'Wound and swelling awareness'],
    },
    {
      id: 'neuro',
      name: 'Stroke & neuro',
      headline: 'Structured recovery in the early plasticity window',
      summary:
        'Tone, positioning and functional practice are guided so compensations do not become permanent habits.',
      points: ['Stage-aware programming', 'Balance and transfer safety', 'Family coaching on positioning'],
    },
    {
      id: 'shoulder',
      name: 'Shoulder',
      headline: 'Mobility matched to irritability, not forced stretch',
      summary:
        'Frozen shoulder and cuff pathways progress in phases so pain and sleep improve while range returns.',
      points: ['Phase-based mobility', 'Sleep and posture advice', 'Graded strength when ready'],
    },
    {
      id: 'geriatric',
      name: 'Geriatric mobility',
      headline: 'Fewer falls, more confidence at home',
      summary:
        'Balance, strength and home environment factors are addressed together under medical oversight.',
      points: ['Timed mobility goals', 'Dual-task balance work', 'Practical home safety focus'],
    },
  ];

  const current = items.find((i) => i.id === active) || items[0];

  return (
    <section id="specialties" className="py-16 lg:py-20 bg-slate-50/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
            Specialties
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
            Clinical pathways directed by a Physiatrist
          </h2>
          <p className="text-[15px] text-slate-600 mt-3">
            Each pathway is supervised by Dr. Dharshan N A, MD (PMR), with room for additional PMR colleagues as the network grows.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5 mb-8">
          {items.map((i) => (
            <button
              key={i.id}
              type="button"
              onClick={() => setActive(i.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                active === i.id
                  ? 'bg-teal-700 text-white border-teal-700'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300'
              }`}
            >
              {i.name}
            </button>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm max-w-3xl mx-auto">
          <h3 className="text-lg font-bold text-slate-900 mb-2">{current.headline}</h3>
          <p className="text-[14px] text-slate-600 leading-relaxed mb-5">{current.summary}</p>
          <ul className="space-y-2 mb-6">
            {current.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-[14px] text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                {p}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => openModal('book')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-[13px] font-semibold rounded-xl cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Discuss this pathway
          </button>
        </div>
      </div>
    </section>
  );
};
