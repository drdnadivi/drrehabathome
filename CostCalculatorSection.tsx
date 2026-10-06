import React, { useState } from 'react';
import { useApp } from './AppContext';
import { Calculator, CheckCircle2, ShieldCheck, Calendar, ArrowRight, Stethoscope, Sparkles, Tag, Check, Percent } from 'lucide-react';

export const CostCalculatorSection: React.FC = () => {
  const { openModal } = useApp();
  const [condition, setCondition] = useState('knee');
  const [frequency, setFrequency] = useState(3); // visits per week
  const [durationWeeks, setDurationWeeks] = useState(4); // weeks

  const conditions = [
    { id: 'knee', name: 'Post-TKR / THR Joint Replacement Package', weeksDefault: 4, visitsDefault: 4 },
    { id: 'neuro', name: 'Stroke & Neurological Recovery Package', weeksDefault: 8, visitsDefault: 5 },
    { id: 'spine', name: 'Lumbar Spine & Sciatica Decompression Package', weeksDefault: 3, visitsDefault: 3 },
    { id: 'shoulder', name: 'Frozen Shoulder & Rotator Cuff Package', weeksDefault: 6, visitsDefault: 3 },
    { id: 'geriatric', name: 'Elderly Mobility & Fall Prevention Package', weeksDefault: 6, visitsDefault: 3 },
    { id: 'cardio', name: 'Cardiopulmonary & Post-ICU Care Package', weeksDefault: 6, visitsDefault: 4 },
  ];

  const currentCond = conditions.find(c => c.id === condition) || conditions[0];
  const totalSessions = frequency * durationWeeks;
  
  // Base calculation
  const baseCost = totalSessions * 1500;
  
  // 5% discount if package is more than 1 week
  const isMultiWeek = durationWeeks > 1;
  const discountAmount = isMultiWeek ? Math.round(baseCost * 0.05) : 0;
  const finalPackagePrice = baseCost - discountAmount;

  return (
    <section id="pricing" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 uppercase tracking-wider">
            <Percent className="w-3.5 h-3.5 text-teal-600" />
            Comprehensive Rehabilitation Packages
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Doctor-Directed Home Rehabilitation Packages.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            All-inclusive rehabilitation care packages with certified home physiotherapist visits and clinical milestone audits directed by <strong>Dr. Dharshan N A, MD (PMR)</strong>. <strong>Choose any package extending beyond 1 week to receive an automatic 5% package discount.</strong>
          </p>

          {/* Value Highlights Pill Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs font-semibold text-slate-700">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
              <Check className="w-3.5 h-3.5 text-emerald-600" /> 5% Discount on Packages &gt; 1 Week
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              <Check className="w-3.5 h-3.5 text-teal-600" /> All portable modalities included (NMES, TENS)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              <Check className="w-3.5 h-3.5 text-teal-600" /> PMR Doctor milestone audits included
            </span>
          </div>
        </div>

        {/* Interactive Estimator Box */}
        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    1. Select Rehabilitation Package:
                  </label>
                  {isMultiWeek && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <Percent className="w-3 h-3 text-emerald-600" /> 5% Multi-Week Savings
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {conditions.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setCondition(c.id);
                        setDurationWeeks(c.weeksDefault);
                        setFrequency(c.visitsDefault);
                      }}
                      className={`p-3 rounded-xl border text-left text-xs transition cursor-pointer flex items-center justify-between ${
                        condition === c.id
                          ? 'bg-teal-700 text-white border-teal-700 font-bold shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="truncate pr-1">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  <span>2. Visits Per Week:</span>
                  <span className="text-teal-700 font-black">{frequency} Visits / Week</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={frequency}
                  onChange={e => setFrequency(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-medium mt-1">
                  <span>2 visits (Maintenance)</span>
                  <span>4 visits (Standard post-op)</span>
                  <span>6 visits (Intensive neuro)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  <span>3. Package Duration:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-teal-700 font-black">{durationWeeks} {durationWeeks === 1 ? 'Week' : 'Weeks'}</span>
                    {isMultiWeek && (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        5% Off Applied
                      </span>
                    )}
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={durationWeeks}
                  onChange={e => setDurationWeeks(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-medium mt-1">
                  <span>1 Week (Intro)</span>
                  <span>4 Weeks (Standard)</span>
                  <span>8 Weeks</span>
                  <span>12 Weeks (Extended)</span>
                </div>
                {!isMultiWeek && (
                  <p className="text-[11px] text-teal-700 font-medium mt-1.5 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Tip: Select 2 or more weeks to unlock an automatic 5% multi-week package discount.
                  </p>
                )}
              </div>

              {/* Doctor Dharshan Guarantee Note */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
                <img
                  src="/dr-dharshan.jpg"
                  alt="Dr. Dharshan N A"
                  className="w-10 h-10 rounded-full object-cover border border-teal-500 shrink-0"
                />
                <div className="text-[11px] text-slate-600 leading-snug">
                  <strong className="text-slate-900 block font-bold">PMR Doctor Oversight Included In Every Package:</strong>
                  Dr. Dharshan N A directs your baseline recovery blueprint, conducts formal weekly milestone audits, and manages clinical alert escalations.
                </div>
              </div>
            </div>

            {/* Output Summary Card */}
            <div className="md:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
                  <Calculator className="w-4 h-4" />
                  Package Summary
                </div>
                {isMultiWeek ? (
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                    <Percent className="w-3 h-3 text-emerald-400" />
                    5% Discount Applied
                  </span>
                ) : (
                  <span className="text-[10px] font-bold bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-400/30">
                    1-Week Package
                  </span>
                )}
              </div>

              <div>
                <div className="text-xs text-slate-400">Total Supervised Home Sessions:</div>
                <div className="text-3xl font-black text-white mt-0.5">
                  {totalSessions} Sessions
                </div>
                <div className="text-xs text-teal-300 font-medium mt-0.5">
                  {durationWeeks} {durationWeeks === 1 ? 'Week' : 'Weeks'} Package ({frequency} visits / week)
                </div>
              </div>

              <div className="space-y-2 py-3 border-y border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Senior Home PT 60-min visits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Dr. Dharshan's PMR Milestone Audits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>All Portable Modalities (NMES/TENS/Goniometer)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Surgeon & Neurologist Certified Dossiers</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Package Investment:</div>
                
                {isMultiWeek ? (
                  <div className="space-y-1 mt-0.5">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl font-black text-teal-400">
                        ₹{finalPackagePrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{baseCost.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                      <Percent className="w-3 h-3" />
                      5% Multi-Week Savings: You save ₹{discountAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                ) : (
                  <div className="text-3xl font-black text-teal-400 mt-0.5">
                    ₹{finalPackagePrice.toLocaleString('en-IN')}
                  </div>
                )}

                <div className="text-[10px] text-slate-400 mt-1">
                  All-inclusive package price with complete clinical equipment & doctor oversight.
                </div>
              </div>

              <button
                onClick={() => openModal('book', {
                  serviceType: currentCond.name,
                  condition: `${currentCond.name} (${durationWeeks} Weeks Package, ${frequency} visits/wk${isMultiWeek ? ' - 5% Discount Applied' : ''})`
                })}
                className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-teal-500/25 transition flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.02] active:scale-98"
              >
                <Calendar className="w-4 h-4" />
                Book This Care Package
              </button>
            </div>
          </div>
        </div>

        {/* Pricing FAQs Strip */}
        <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              What is included in the package?
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Every package includes all hands-on therapist home visits, portable equipment (NMES, TENS, goniometers), Dr. Dharshan's PMR milestone reviews, and surgeon progress dossiers.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Percent className="w-4 h-4 text-emerald-600" />
              How does the 5% discount apply?
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Any rehabilitation care package lasting longer than 1 week (2, 4, 6, 8, or 12 weeks) automatically receives a 5% discount applied directly to the package total.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              Can sessions be rescheduled?
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Yes. You have full flexibility to reschedule any session within your package with 4 hours prior notice, ensuring complete continuity of recovery.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
