import React from 'react';
import { HeroSection } from './HeroSection';
import { UspPmrSection } from './UspPmrSection';
import { WorkflowSection } from './WorkflowSection';
import { ConditionsTreatedSection } from './ConditionsTreatedSection';
import { SpecialtiesSection } from './SpecialtiesSection';
import { DynamicBlogsSection } from './DynamicBlogsSection';
import { RecoveryEvidenceSection } from './RecoveryEvidenceSection';
import { CostCalculatorSection } from './CostCalculatorSection';
import { useApp } from './AppContext';
import { Stethoscope, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export const PublicHome: React.FC = () => {
  const { openModal, switchRole } = useApp();

  return (
    <div className="space-y-0">
      <HeroSection />
      <UspPmrSection />
      <WorkflowSection />
      <ConditionsTreatedSection />
      <SpecialtiesSection />
      <DynamicBlogsSection />
      <RecoveryEvidenceSection />
      <CostCalculatorSection />

      {/* Bottom Final CTA */}
      <section className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-400/30 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            Physiatrist Doctor-Directed Home Physical Therapy
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Start Your Doctor-Monitored Home Recovery With DrRehabAtHome.in.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Eliminate recovery plateaus and joint contractures. Let Dr. Dharshan N A and our senior rehabilitation team oversee your mobility milestones from Day 1.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openModal('book')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-sm rounded-xl shadow-xl transition flex items-center justify-center gap-2 cursor-pointer transform hover:scale-105 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              Book Home Assessment (With PMR Doctor)
            </button>

            <button
              onClick={() => switchRole('doctor')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Stethoscope className="w-4 h-4 text-teal-400" />
              Demo PMR Doctor Review Queue
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
