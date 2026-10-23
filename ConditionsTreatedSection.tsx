import React, { useState } from 'react';
import { useApp } from './AppContext';
import { ChevronDown, Package } from 'lucide-react';

/** Compact pathways — mobile-friendly accordion (less scrolling) */
const ITEMS = [
  {
    id: 'tkr',
    name: 'Knee / hip replacement',
    protocol: 'Extension, safe walk, strength progression',
    equipment: 'Goniometer, bands, NMES, ice pack',
  },
  {
    id: 'fracture',
    name: 'Fracture & ortho recovery',
    protocol: 'Protected load → mobility → strength',
    equipment: 'Bands, gait support, range tools',
  },
  {
    id: 'sports',
    name: 'Sports injuries',
    protocol: 'Load management, strength, return criteria',
    equipment: 'Bands, balance pad, resistance tools',
  },
  {
    id: 'stroke',
    name: 'Stroke & neuro',
    protocol: 'Stage-based: protect → activate → function',
    equipment: 'Positioning aids, NMES, balance tools',
  },
  {
    id: 'spine',
    name: 'Spine & sciatica',
    protocol: 'Pain-guided movement, graded activity',
    equipment: 'Bands, posture props',
  },
  {
    id: 'shoulder',
    name: 'Shoulder / frozen shoulder',
    protocol: 'Phase-matched mobility & strength',
    equipment: 'Wand, bands, goniometer',
  },
  {
    id: 'balance',
    name: 'Balance & fall risk',
    protocol: 'Strength, balance, home safety practice',
    equipment: 'Balance pad, gait belt, chair support',
  },
  {
    id: 'other',
    name: 'Other recovery needs',
    protocol: 'Plan after assessment for your condition',
    equipment: 'Selected for the case',
  },
];

export const ConditionsTreatedSection: React.FC = () => {
  const { openModal } = useApp();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="conditions-treated" className="py-12 lg:py-14 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Pathways, protocols & equipment
          </h2>
          <p className="text-[13px] text-slate-500 mt-1.5">
            Tap a condition — short protocol + what we may bring
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden bg-slate-50/50">
          {ITEMS.map((item) => {
            const open = openId === item.id;
            return (
              <div key={item.id} className="bg-white">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left cursor-pointer hover:bg-slate-50"
                >
                  <span className="text-[14px] font-semibold text-slate-900">{item.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </button>
                {open && (
                  <div className="px-4 pb-4 space-y-2">
                    <p className="text-[13px] text-slate-600">
                      <span className="font-semibold text-slate-800">Protocol focus: </span>
                      {item.protocol}
                    </p>
                    <p className="text-[13px] text-slate-600 flex items-start gap-1.5">
                      <Package className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>
                        <span className="font-semibold text-slate-800">Equipment we may bring: </span>
                        {item.equipment}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-4">
          Equipment selected per case. Individual plans after assessment.
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
