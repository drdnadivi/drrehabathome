import React from 'react';

export const WhatIsPmrSection: React.FC = () => {
  return (
    <section id="what-is-pmr" className="py-12 lg:py-14 bg-slate-50 border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight text-center">
          What is PMR?
        </h2>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[13px] font-semibold">
          {['MBBS', 'MD (PMR)', 'Physiatrist'].map((step, i, arr) => (
            <React.Fragment key={step}>
              <span className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-sm">
                {step}
              </span>
              {i < arr.length - 1 && <span className="text-teal-600 text-lg">→</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto text-center">
          <div className="rounded-xl bg-white border border-slate-100 p-4">
            <div className="text-[12px] font-bold text-teal-800 uppercase tracking-wide">MBBS</div>
            <p className="text-[13px] text-slate-600 mt-1">Basic medical degree</p>
          </div>
          <div className="rounded-xl bg-white border border-slate-100 p-4">
            <div className="text-[12px] font-bold text-teal-800 uppercase tracking-wide">MD (PMR)</div>
            <p className="text-[13px] text-slate-600 mt-1">Specialist degree in Physical Medicine &amp; Rehabilitation</p>
          </div>
          <div className="rounded-xl bg-white border border-slate-100 p-4">
            <div className="text-[12px] font-bold text-teal-800 uppercase tracking-wide">PMR / Physiatry</div>
            <p className="text-[13px] text-slate-600 mt-1">Focus on function, disability &amp; recovery — not the same as a physiotherapy diploma alone</p>
          </div>
        </div>

        <p className="text-center text-[13px] text-slate-500 mt-5 max-w-xl mx-auto">
          A PMR physician plans recovery by stage and function; therapists deliver much of the home programme.
        </p>
      </div>
    </section>
  );
};
