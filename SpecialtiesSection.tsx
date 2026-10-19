import React from 'react';
import { useApp } from './AppContext';
import {
  Bone,
  Brain,
  HeartPulse,
  Users,
  Bone,
  Activity,
  Baby,
  Dumbbell,
  Hand,
  Stethoscope,
} from 'lucide-react';

/** Who it's for — broader than 3 diseases, short labels */
export const SpecialtiesSection: React.FC = () => {
  const { openModal } = useApp();

  const items = [
    { icon: Bone, name: 'Knee & hip replacement', note: 'Early recovery at home' },
    { icon: Activity, name: 'Fracture & ortho recovery', note: 'After plaster / surgery' },
    { icon: Dumbbell, name: 'Sports injuries', note: 'Sprain, ligament, strain' },
    { icon: Brain, name: 'Stroke & neuro', note: 'Stage-based recovery' },
    { icon: Bone, name: 'Spine & sciatica', note: 'Back and neck pathways' },
    { icon: Hand, name: 'Shoulder & frozen shoulder', note: 'Phase-matched mobility' },
    { icon: Users, name: 'Balance & fall risk', note: 'Older adults at home' },
    { icon: HeartPulse, name: 'Medical deconditioning', note: 'After long illness / ICU' },
    { icon: Wind, name: 'Parkinson’s & movement', note: 'Mobility and safety' },
    { icon: Stethoscope, name: 'Chronic pain pathways', note: 'Movement with precautions' },
  ];

  return (
    <section id="who-its-for" className="py-14 lg:py-16 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Who it’s for
          </h2>
          <p className="text-[14px] text-slate-500 mt-2">
            Home rehabilitation for many recovery needs — not only three conditions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {items.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border border-slate-150 bg-slate-50/80 p-3.5 hover:border-teal-200 transition"
            >
              <item.icon className="w-5 h-5 text-teal-700 mb-2" />
              <div className="text-[13px] font-semibold text-slate-900 leading-snug">{item.name}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{item.note}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-[12px] text-slate-400 mt-6">
          Not sure if your condition fits? Enquire — we will tell you honestly.
        </p>
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => openModal('book')}
            className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold rounded-xl cursor-pointer"
          >
            Contact / Enquiry
          </button>
        </div>
      </div>
    </section>
  );
};
