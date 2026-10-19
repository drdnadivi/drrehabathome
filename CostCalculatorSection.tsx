import React, { useState } from 'react';
import { useApp } from './AppContext';
import { Calculator, Calendar, Check } from 'lucide-react';

export const CostCalculatorSection: React.FC = () => {
  const { openModal } = useApp();
  const [condition, setCondition] = useState('knee');
  const [frequency, setFrequency] = useState(3);
  const [weeks, setWeeks] = useState(4);

  const packages = [
    { id: 'knee', name: 'Knee / hip replacement' },
    { id: 'neuro', name: 'Stroke & neuro' },
    { id: 'spine', name: 'Spine & sciatica' },
    { id: 'shoulder', name: 'Shoulder' },
    { id: 'geriatric', name: 'Geriatric mobility' },
    { id: 'cardio', name: 'Cardio / post-ICU' },
  ];

  const sessions = frequency * weeks;
  const rate = 1500;
  const subtotal = sessions * rate;
  const multiWeek = weeks > 1;
  const discount = multiWeek ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal - discount;

  return (
    <section id="pricing" className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
            <Calculator className="w-3.5 h-3.5" />
            Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
            Transparent package estimate
          </h2>
          <p className="text-[15px] text-slate-600 mt-3">
            Indicative pricing for planning. Final quotes are confirmed after assessment. Packages longer than one week include a 5% discount in this estimator.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="space-y-5">
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-2">Package type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {packages.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setCondition(p.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold border text-left transition cursor-pointer ${
                      condition === p.id
                        ? 'bg-teal-700 text-white border-teal-700'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-2">
                  Visits per week: <span className="text-teal-700">{frequency}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={6}
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full accent-teal-700"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-2">
                  Duration (weeks): <span className="text-teal-700">{weeks}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={weeks}
                  onChange={(e) => setWeeks(Number(e.target.value))}
                  className="w-full accent-teal-700"
                />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2 text-[14px]">
              <div className="flex justify-between text-slate-600">
                <span>{sessions} sessions × ₹{rate.toLocaleString('en-IN')}</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {multiWeek && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Multi-week discount (5%)</span>
                  <span>− ₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-900 font-bold text-lg pt-2 border-t border-slate-100">
                <span>Estimated total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <ul className="space-y-1.5 text-[13px] text-slate-600">
              {[
                'Home physiotherapist visits',
                'PMR milestone oversight by Dr. Dharshan',
                'Session logging & progress visibility',
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600" />
                  {t}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => openModal('book')}
              className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-[14px] rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Contact us to discuss fees and schedule
            </button>
          </div>
        </div>
      </div>
    <p className="text-center text-[12px] text-slate-600 max-w-xl mx-auto mt-6 px-4 border border-amber-100 bg-amber-50/50 rounded-xl py-3">Please note: Your first detailed assessment visit and therapy session schedule is activated only after the package payment is completed.</p>
    </section>
  );
};
