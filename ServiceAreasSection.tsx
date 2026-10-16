import React from 'react';
import { useApp } from './AppContext';

/** Light coverage note — not a major marketing block */
export const ServiceAreasSection: React.FC = () => {
  const { openModal } = useApp();

  return (
    <section id="service-areas" className="py-10 border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-[14px] text-slate-600 leading-relaxed max-w-2xl">
            Home visits in Bengaluru. Timing depends on location and schedule — confirm when you enquire.
          </p>
          <button
            type="button"
            onClick={() => openModal('book')}
            className="shrink-0 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold rounded-lg cursor-pointer"
          >
            Contact / Enquiry
          </button>
        </div>
      </div>
    </section>
  );
};
