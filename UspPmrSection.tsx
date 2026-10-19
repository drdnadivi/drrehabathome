import React, { useState } from 'react';
import { useApp } from './AppContext';

export const UspPmrSection: React.FC = () => {
  const { openModal } = useApp();
  const [tab, setTab] = useState<'stroke' | 'knee' | 'shoulder'>('stroke');

  const flows = {
    stroke: {
      title: 'Stroke',
      steps: ['Flaccid', 'Protect shoulder', 'Movement', 'Spasticity care', 'Function'],
      notes: ['Protect arm', 'Reduce subluxation risk', 'Tone + task practice'],
    },
    knee: {
      title: 'Knee replacement',
      steps: ['Early weeks', 'Walk / extension', 'Later weeks', 'Strength & stairs', 'Weekly review'],
      notes: ['Swelling & safe walk', 'Then strength', 'Protocol updates weekly'],
    },
    shoulder: {
      title: 'Shoulder',
      steps: ['Painful phase', 'Calm', 'Stiffer phase', 'Progress mobility'],
      notes: ['Less aggressive stretch', 'Then gradual mobility', 'Phase decides load'],
    },
  };

  const current = flows[tab];

  return (
    <section id="role-of-pmr" className="py-14 lg:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Stage-based rehab
          </h2>
          <p className="text-[14px] text-slate-500 mt-2">Not a one-page protocol</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {([
            ['stroke', 'Stroke'],
            ['knee', 'Knee'],
            ['shoulder', 'Shoulder'],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border cursor-pointer ${
                tab === id
                  ? 'bg-teal-700 text-white border-teal-700'
                  : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <p className="text-[13px] font-semibold text-slate-800 mb-4 text-center">{current.title}</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {current.steps.map((step, i) => (
              <React.Fragment key={step}>
                <span className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-[12px] sm:text-[13px] font-semibold text-slate-800 text-center">
                  {step}
                </span>
                {i < current.steps.length - 1 && (
                  <span className="text-teal-600 font-bold">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {current.notes.map((n) => (
              <span key={n} className="text-[12px] text-slate-600 bg-white/80 border border-slate-100 px-3 py-1 rounded-full">
                {n}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => openModal('book')}
            className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold rounded-xl cursor-pointer"
          >
            Contact / Enquiry
          </button>
          <p className="text-[11px] text-slate-400 mt-3">Examples only · Assessment required · Results vary</p>
        </div>
      </div>
    </section>
  );
};
