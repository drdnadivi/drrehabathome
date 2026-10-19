import React from 'react';
import { HeroSection } from './HeroSection';
import { AboutPmrSection } from './AboutPmrSection';
import { WhatIsPmrSection } from './WhatIsPmrSection';
import { WorkflowSection } from './WorkflowSection';
import { SpecialtiesSection } from './SpecialtiesSection';
import { ConditionsTreatedSection } from './ConditionsTreatedSection';
import { UspPmrSection } from './UspPmrSection';
import { ServiceAreasSection } from './ServiceAreasSection';
import { DynamicBlogsSection } from './DynamicBlogsSection';
import { useApp } from './AppContext';
import { Calendar, ShieldCheck } from 'lucide-react';

export const PublicHome: React.FC = () => {
  const { openModal } = useApp();

  return (
    <div className="space-y-0">
      <HeroSection />
      <AboutPmrSection />
      <WhatIsPmrSection />
      <WorkflowSection />
      <SpecialtiesSection />
      <ConditionsTreatedSection />
      <UspPmrSection />
      <ServiceAreasSection />
      <DynamicBlogsSection />

      <section className="bg-slate-50 border-t border-slate-100 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-800 text-[11px] font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Stage-based home rehabilitation
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Ready to enquire?
          </h2>
          <p className="text-[15px] text-slate-600 leading-relaxed">
            Message us to see how a stage-based home programme could look after assessment.
          </p>
          <button
            type="button"
            onClick={() => openModal('book')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-700 hover:bg-teal-800 text-white text-[14px] font-semibold rounded-xl shadow-sm cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Contact / Enquiry
          </button>
        </div>
      </section>
    </div>
  );
};
