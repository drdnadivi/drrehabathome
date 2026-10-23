import React, { useState } from 'react';
import { useApp } from './AppContext';
import { ChevronDown, Package, ListChecks } from 'lucide-react';

/** Accordion layout kept — richer protocol content per condition */
const ITEMS = [
  {
    id: 'tkr',
    name: 'Total knee replacement',
    protocol: [
      'Early: swelling control, protect the wound, restore knee extension',
      'Flexion progress with heel slides and guided range work',
      'Quad activation, straight-leg support, and safe sit-to-stand',
      'Walking progression (support → stick → independent as appropriate)',
      'Stairs and functional tasks when readiness criteria are met',
      'Weekly review so load and goals match that week’s progress',
    ],
    equipment: 'Digital goniometer, TheraBand / loop bands, ankle weights, NMES unit, ice pack',
  },
  {
    id: 'thr',
    name: 'Total hip replacement',
    protocol: [
      'Precaution-safe mobility and bed / chair transfers',
      'Glute and hip stabiliser activation within allowed ranges',
      'Walking practice with appropriate support',
      'Gradual strength and endurance as precautions ease',
      'Functional goals (bathroom, steps) matched to surgeon advice',
      'Weekly review of gait quality and progression',
    ],
    equipment: 'Resistance bands, gait support tools, range guides, ice pack',
  },
  {
    id: 'fracture',
    name: 'Fracture & ortho recovery',
    protocol: [
      'Respect healing stage and weight-bearing status',
      'Protected mobility → progressive load when cleared',
      'Joint mobility above/below the injury as appropriate',
      'Strength and balance return before higher activity',
      'Plan adjusted after assessment and medical advice',
    ],
    equipment: 'Bands, gait support, range tools, ice pack as needed',
  },
  {
    id: 'sports',
    name: 'Sports injuries',
    protocol: [
      'Settle irritability, then graded loading',
      'Strength, control, and proprioception',
      'Sport-specific drills only when criteria are met',
      'Clear progression rules — not guesswork',
    ],
    equipment: 'Bands, balance pad, resistance tools',
  },
  {
    id: 'stroke',
    name: 'Stroke & neuro',
    protocol: [
      'Stage-matched plan (e.g. flaccid vs emerging movement vs spasticity)',
      'Shoulder protection and positioning in early phases',
      'Task practice and functional transfers',
      'Balance and walking goals as appropriate',
      'Family guidance on safe handling at home',
      'Weekly review as tone and function change',
    ],
    equipment: 'Positioning aids, NMES if indicated, balance tools, gait belt',
  },
  {
    id: 'spine',
    name: 'Spine & sciatica',
    protocol: [
      'Symptom-guided movement (what eases vs aggravates)',
      'Graded activity and posture / desk advice',
      'Strength and mobility without fear-based total rest',
      'Red-flag awareness — escalate if needed',
    ],
    equipment: 'Bands, posture props, simple home supports',
  },
  {
    id: 'shoulder',
    name: 'Shoulder / frozen shoulder',
    protocol: [
      'Irritable phase: calm tissue, avoid aggressive stretch flares',
      'Stiffer phase: progressive mobility and function',
      'Strength when pain allows',
      'Sleep and daily-task advice',
      'Phase decides load — not one fixed stretch list',
    ],
    equipment: 'Wand / stick, bands, goniometer, heat/ice as advised',
  },
  {
    id: 'balance',
    name: 'Balance & fall risk',
    protocol: [
      'Strength of legs and core for steady standing',
      'Static and dynamic balance practice',
      'Safe sit-to-stand and walking confidence',
      'Simple home hazard awareness',
    ],
    equipment: 'Balance pad, chair support, gait belt, bands',
  },
  {
    id: 'other',
    name: 'Other recovery needs',
    protocol: [
      'Assessment first to define stage and goals',
      'Protocol built for that condition (not a generic sheet)',
      'Weekly review and equipment chosen for the case',
    ],
    equipment: 'Selected after assessment',
  },
];

export const ConditionsTreatedSection: React.FC = () => {
  const { openModal } = useApp();
  const [openId, setOpenId] = useState<string | null>('tkr');

  return (
    <section id="conditions-treated" className="py-12 lg:py-14 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Pathways, protocols & equipment
          </h2>
          <p className="text-[13px] text-slate-500 mt-1.5">
            Tap a condition for protocol focus and equipment we may bring
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
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
                  <div className="px-4 pb-4 space-y-3">
                    <div>
                      <p className="text-[12px] font-semibold text-teal-800 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                        <ListChecks className="w-3.5 h-3.5" /> Protocol focus
                      </p>
                      <ul className="space-y-1.5">
                        {item.protocol.map((line) => (
                          <li key={line} className="text-[13px] text-slate-600 leading-relaxed pl-3 border-l-2 border-teal-100">
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-[13px] text-slate-600 flex items-start gap-1.5 bg-slate-50 rounded-lg px-3 py-2">
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
          Illustrative protocol themes only. Individual plans after assessment. Results vary.
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
