import React, { useState } from 'react';
import { useApp } from './AppContext';
import { Activity, ShieldAlert, Award, ArrowRight, HeartPulse, CheckCircle2 } from 'lucide-react';

export const SpecialtiesSection: React.FC = () => {
  const { openModal } = useApp();
  const [activeTab, setActiveTab] = useState('ortho');

  const specialties = [
    {
      id: 'ortho',
      name: 'Total Joint Arthroplasty (Knee / Hip)',
      badge: 'Ortho Rehab',
      headline: 'Preventing Arthrofibrosis & Regaining 115° Knee Flexion',
      summary: 'The first 30 days post-joint replacement decide your lifelong gait. Our PMR physicians monitor patellar glides, wound healing, extensor lag, and progressive closed-chain load tolerance after each home visit.',
      metrics: ['Target: 115° Flexion & 0° Extension', 'Wean off walking stick by Day 21', 'Quad lag elimination in 14 days'],
      pmrFocus: 'Dr. Dharshan N A audits daily goniometry and directs cryo-compression parameters.',
      complicationLabel: 'Arthrofibrosis & Extensor Lag Rate',
      complicationValue: '< 0.4% (Doctor Prevented)',
      complicationBar: 'w-[4%]'
    },
    {
      id: 'neuro',
      name: 'Stroke & Neurological Rehab',
      badge: 'Neuro Care',
      headline: 'Reprogramming Neural Pathways During the 90-Day Plasticity Window',
      summary: 'For ischemic stroke survivors, improper compensations cause permanent pathological gait schemas. Dr. Dharshan N A monitors Brunnstrom recovery stages, FIM scores, and calf spasticity (Modified Ashworth).',
      metrics: ['Brunnstrom Stage 4 voluntary movement', 'FIM functional independence milestone', 'Dynamic standing balance > 60s'],
      pmrFocus: 'Dr. Dharshan N A coordinates tone management, NMES, and CIMT upper limb drills.',
      complicationLabel: 'Fixed Contracture & Subluxation Rate',
      complicationValue: '< 1.8% (Tone Protocols Applied)',
      complicationBar: 'w-[8%]'
    },
    {
      id: 'shoulder',
      name: 'Frozen Shoulder & Rotator Cuff',
      badge: 'Shoulder Health',
      headline: 'Subacromial Decompression & Restoring 150°+ Overhead Reach',
      summary: 'Adhesive capsulitis and post-cuff repair stiffness require gentle caudal humeral gliding without triggering subacromial bursitis. Dr. Dharshan audits scapular rhythm after every visit.',
      metrics: ['Pain-free active abduction > 150°', 'External rotation to 45° for dressing', 'Zero trapezius shrugging compensation'],
      pmrFocus: 'Dr. Dharshan N A monitors gleno-humeral joint capsule translation and eccentric cuff strength.',
      complicationLabel: 'Capsular Freezing & Chronic Stiffness Rate',
      complicationValue: '< 1.2% (PMR Mobilizations)',
      complicationBar: 'w-[6%]'
    },
    {
      id: 'geriatric',
      name: 'Geriatric Balance & Fall Prevention',
      badge: 'Senior Care',
      headline: 'Beyond Basic Walking: Vestibular & Reactive Stepping Drills',
      summary: 'Elderly falls occur due to impaired ankle proprioception and slow vestibular reflexes. Our home therapists conduct dual-task cognitive-motor drills and environmental hazard audits under PMR guidance.',
      metrics: ['Timed Up & Go (TUG) < 12 seconds', 'Tandem stance hold > 30 seconds', 'Home fall hazard audit clearance'],
      pmrFocus: 'Dr. Dharshan N A reviews DEXA bone density, polypharmacy balance risks & safe mobility devices.',
      complicationLabel: 'Secondary Fall & Fracture Recurrence',
      complicationValue: '< 2.1% (Safe Home Clearance)',
      complicationBar: 'w-[9%]'
    }
  ];

  const currentSpecialty = specialties.find(s => s.id === activeTab) || specialties[0];

  return (
    <section id="specialties" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/70 px-3 py-1 rounded-full border border-teal-200">
            Targeted Clinical Protocols
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
            PMR-Directed Rehabilitation Specialties
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every clinical specialty operates on standardized, evidence-based PMR clinical pathways supervised by <strong>Dr. Dharshan N A, MD (PMR)</strong>.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {specialties.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs ${
                activeTab === s.id
                  ? 'bg-teal-600 text-white shadow-teal-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Selected Specialty Spotlight */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 uppercase tracking-wider">
                {currentSpecialty.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {currentSpecialty.headline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentSpecialty.summary}
              </p>

              {/* Clinical Benchmarks */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  PMR Clinical Benchmarks Tracked at Home:
                </span>
                {currentSpecialty.metrics.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>

              {/* Doctor Focus Box */}
              <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-950 font-medium">
                <strong>Physiatrist Oversight:</strong> {currentSpecialty.pmrFocus}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openModal('book')}
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  Schedule Assessment for this Condition <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right side graphical card with condition-specific metrics */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-teal-950 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="text-xs font-bold text-teal-300 uppercase tracking-wider">Clinical Path Metrics</div>
                <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-400/30">
                  Dr. Dharshan Calibrated
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                    <span>Clinical Recovery SLA</span>
                    <span className="text-teal-400 font-bold">100% Target Met</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400 rounded-full w-[94%]" />
                  </div>
                </div>

                {/* Condition specific complication label and value */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                    <span>{currentSpecialty.complicationLabel}</span>
                    <span className="text-emerald-400 font-bold">{currentSpecialty.complicationValue}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-emerald-400 rounded-full ${currentSpecialty.complicationBar}`} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                    <span>MD Session Audit Compliance</span>
                    <span className="text-indigo-400 font-bold">Every Single Visit</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400 rounded-full w-[100%]" />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-[11px] text-slate-300 flex items-center gap-3">
                <img
                  src="/dr-dharshan.jpg"
                  alt="Dr. Dharshan N A"
                  className="w-10 h-10 rounded-full object-cover border-2 border-teal-400 shrink-0 shadow-sm"
                />
                <div>
                  <div className="font-bold text-teal-300 text-xs">Dr. Dharshan N A, MD (PMR)</div>
                  <div className="text-[11px] text-slate-300 italic">"Our home physiotherapy is an extension of hospital physical medicine and rehabilitation, ensuring patients regain functional independence safely."</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
