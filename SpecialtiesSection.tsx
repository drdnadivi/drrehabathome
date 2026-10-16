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
      id: 'sports',
      name: 'Sports rehab',
      headline: 'From injury to return-to-play — criteria based, not guesswork',
      summary:
        'Sprains, ligament injuries, tendinopathy and post-op sports orthopaedics with graded loading and clear progression rules under PMR oversight.',
      points: ['Load management plans', 'Strength & proprioception', 'Return-to-sport readiness checks'],
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
      id: 'spine',
      name: 'Spine & pain',
      headline: 'Movement confidence with medical red-flag awareness',
      summary:
        'Sciatica, disc-related pain and mechanical back/neck programmes matched to symptom response.',
      points: ['Directional preference', 'Graded activity', 'Desk and sleep advice'],
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
    {
      id: 'cardio',
      name: 'Cardio & pulmonary',
      headline: 'Safe reconditioning after illness or heart/lung limits',
      summary:
        'Home-phase activity after cardiac clearance, COPD support and post-COVID fatigue-aware programmes.',
      points: ['Symptom-guided walking', 'Vitals awareness', 'Energy conservation'],
    },
    {
      id: 'womens',
      name: "Women's health",
      headline: 'Antenatal, postnatal and pelvic floor support at home',
      summary:
        'Practical mobility and education programmes, with referral when specialised internal care is needed.',
      points: ['Trimester-aware advice', 'Pelvic floor education', 'Return-to-activity pacing'],
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
            Pathways may involve physiotherapy and, as available, occupational therapy or speech therapy. Clinical oversight may include a PMR physician (KMC 180734) where applicable. Outcomes vary.
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
