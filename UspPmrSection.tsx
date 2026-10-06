import React, { useState } from 'react';
import { Stethoscope, CheckCircle2, XCircle, ShieldCheck, Activity, Award, TrendingUp, AlertTriangle, ArrowRight, Sliders, Sparkles } from 'lucide-react';
import { useApp } from './AppContext';

export const UspPmrSection: React.FC = () => {
  const { openModal } = useApp();

  // Interactive Comparison Slider & Condition State
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 (Standard PT) to 100 (DrRehabAtHome)
  const [activeCondition, setActiveCondition] = useState<'tkr' | 'stroke' | 'shoulder'>('tkr');

  const comparisonData = {
    tkr: {
      title: 'Total Knee Replacement Recovery Comparison',
      riskLabel: 'Complication & Arthrofibrosis Rate',
      deficitLabel: 'Extensor Lag / Joint Deficit',
      standard: {
        recoveryWeeks: '8 – 12 Weeks',
        complicationRisk: '18.4% (Arthrofibrosis / Joint Stiffness)',
        doctorOversight: '0% (Surgeon only reviews at 6 weeks post-op)',
        protocol: 'Static, generic paper exercise sheet without milestone checkpoints',
        deficit: 'Average 8° residual extensor lag',
        dashboard: 'Paper notes, family has no visibility'
      },
      drRehab: {
        recoveryWeeks: '3 – 5 Weeks (40% Faster)',
        complicationRisk: '< 0.4% (Arthrofibrosis Prevented by Day 14 Milestone Audit)',
        doctorOversight: 'Baseline + Day 7, 14, 21 Milestone Audits & <4h Alert Reviews by Dr. Dharshan N A',
        protocol: 'Dynamic milestone-based micro-titration of resistance & angles',
        deficit: '0° (Zero lag, full active terminal knee extension)',
        dashboard: 'Live recovery dashboard with daily ROM & pain curves'
      }
    },
    stroke: {
      title: 'Stroke & Neurological Rehabilitation Comparison',
      riskLabel: 'Fixed Contracture & Subluxation Rate',
      deficitLabel: 'Gait & Synergy Pattern',
      standard: {
        recoveryWeeks: '16 – 24 Weeks (High Plateau Risk)',
        complicationRisk: '34% (Permanent Foot Drop & Painful Shoulder Subluxation)',
        doctorOversight: '0% (Neurologist reviews after 3 months)',
        protocol: 'Repetitive non-targeted walking drills',
        deficit: 'Pathological hip circumduction hardwired',
        dashboard: 'Subjective comments without Berg balance scores'
      },
      drRehab: {
        recoveryWeeks: '8 – 12 Weeks (Peak Neuroplastic Window)',
        complicationRisk: '< 1.8% (Tone-inhibiting positioning & CIMT protocols)',
        doctorOversight: 'Baseline + Day 14, 28, 60 Neuro Milestone Audits & Spasticity Alert Reviews',
        protocol: 'Constraint-Induced Movement Therapy (CIMT) & balance drills',
        deficit: 'Active voluntary dorsiflexion & reciprocal heel-strike',
        dashboard: 'Brunnstrom stage tracking & FIM independence curves'
      }
    },
    shoulder: {
      title: 'Frozen Shoulder & Rotator Cuff Recovery Comparison',
      riskLabel: 'Capsular Freezing & Chronic Stiffness Rate',
      deficitLabel: 'Overhead Functional Reach',
      standard: {
        recoveryWeeks: '14 – 20 Weeks (Recurrent Impingement)',
        complicationRisk: '28% (Chronic Adhesive Capsulitis & Cuff Re-tear)',
        doctorOversight: '0% (No subacromial decompression checks)',
        protocol: 'Aggressive passive stretching triggering inflammation',
        deficit: 'Trapezius shrugging substitution & painful 90° arc',
        dashboard: 'No objective goniometry or rotator cuff strength checks'
      },
      drRehab: {
        recoveryWeeks: '5 – 8 Weeks (Full Pain-Free Range)',
        complicationRisk: '< 1.2% (PMR gleno-humeral mobilizations & cryotherapy)',
        doctorOversight: 'Baseline + Bi-weekly Milestone Audits & Impingement Alert Reviews',
        protocol: 'Caudal humeral glides, eccentric rotator cuff loading',
        deficit: 'Restored scapulohumeral rhythm (150°+ active reach)',
        dashboard: 'Daily active abduction tracking & sleep posture clearance'
      }
    }
  };

  const currentComp = comparisonData[activeCondition];

  return (
    <section id="pmr-advantage" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-teal-600" />
            The Core Clinical Differentiator
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why PMR Doctor-Directed Home Rehab is <span className="text-teal-600">3x Safer & Faster</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            A <strong>PMR Doctor (Physiatrist - Physical Medicine & Rehabilitation Specialist)</strong> like <strong>Dr. Dharshan N A, MD (PMR)</strong> directs your baseline recovery pathway, conducts formal weekly milestone audits (Day 7, 14, 21), and steps in within 4 hours if a clinical session alert is triggered.
          </p>
        </div>

        {/* Interactive Comparison Tool Container */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 mb-16 space-y-8">
          
          {/* Top Bar: Condition Tabs & Slider Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-teal-500/20 text-teal-300 rounded-lg">
                  <Sliders className="w-4 h-4 text-teal-400" />
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-teal-300">
                  Interactive Before & After Comparison Slider
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                {currentComp.title}
              </h3>
            </div>

            {/* Condition Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
              <button
                type="button"
                onClick={() => setActiveCondition('tkr')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeCondition === 'tkr' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Knee Arthroplasty
              </button>
              <button
                type="button"
                onClick={() => setActiveCondition('stroke')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeCondition === 'stroke' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Stroke Recovery
              </button>
              <button
                type="button"
                onClick={() => setActiveCondition('shoulder')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeCondition === 'shoulder' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Frozen Shoulder
              </button>
            </div>
          </div>

          {/* Interactive Split Slider Controller */}
          <div className="max-w-2xl mx-auto space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <button
                type="button"
                onClick={() => setSliderPos(0)}
                className={`cursor-pointer transition flex items-center gap-1.5 ${
                  sliderPos < 40 ? 'text-rose-400 font-black scale-105' : 'text-slate-400 hover:text-rose-300'
                }`}
              >
                <XCircle className="w-4 h-4 text-rose-500" />
                Ordinary Home PT ({100 - sliderPos}%)
              </button>

              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                ◄ Drag Slider to Compare Impact ►
              </span>

              <button
                type="button"
                onClick={() => setSliderPos(100)}
                className={`cursor-pointer transition flex items-center gap-1.5 ${
                  sliderPos > 60 ? 'text-teal-300 font-black scale-105' : 'text-slate-400 hover:text-teal-300'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                DrRehabAtHome with Dr. Dharshan ({sliderPos}%)
              </button>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={e => setSliderPos(Number(e.target.value))}
              className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400 border border-slate-700"
            />
          </div>

          {/* Side-by-Side Dynamic Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Card: Ordinary Home PT */}
            <div
              style={{ opacity: Math.max(0.35, (100 - sliderPos) / 100 + 0.35) }}
              className={`rounded-2xl border transition-all duration-300 p-6 sm:p-7 relative ${
                sliderPos < 50
                  ? 'bg-rose-950/30 border-rose-500/60 shadow-lg shadow-rose-950/40 ring-1 ring-rose-500/30'
                  : 'bg-slate-800/40 border-slate-700/60'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-0.5">
                    The Standard Reality
                  </span>
                  <h4 className="text-lg font-bold text-white">Ordinary Home Physiotherapy</h4>
                  <div className="text-xs text-slate-400">Freelance therapist operating without milestone checks or doctor review</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
                  <XCircle className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-5 space-y-3.5 text-xs text-slate-300">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">Expected Recovery Duration:</span>
                  <strong className="text-rose-400 text-sm">{currentComp.standard.recoveryWeeks}</strong>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">{currentComp.riskLabel}:</span>
                  <strong className="text-rose-400">{currentComp.standard.complicationRisk}</strong>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span><strong>Doctor Supervision:</strong> {currentComp.standard.doctorOversight}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span><strong>Protocol Adjustments:</strong> {currentComp.standard.protocol}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span><strong>{currentComp.deficitLabel}:</strong> {currentComp.standard.deficit}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span><strong>Family Visibility:</strong> {currentComp.standard.dashboard}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: DrRehabAtHome (PMR Doctor Monitored) */}
            <div
              style={{ opacity: Math.max(0.35, sliderPos / 100 + 0.35) }}
              className={`rounded-2xl border-2 transition-all duration-300 p-6 sm:p-7 relative ${
                sliderPos >= 50
                  ? 'bg-gradient-to-br from-teal-950/60 to-slate-900 border-teal-500 shadow-2xl shadow-teal-500/10 ring-2 ring-teal-500/30'
                  : 'bg-slate-800/40 border-slate-700/60'
              }`}
            >
              <div className="absolute -top-3 right-6 bg-teal-500 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                The DrRehabAtHome Standard
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-teal-500/30">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block mb-0.5">
                    Physiatrist-Directed Excellence
                  </span>
                  <h4 className="text-lg font-bold text-white">DrRehabAtHome.in Care</h4>
                  <div className="text-xs text-teal-300 font-medium">Milestone audits & alert oversight directed by Dr. Dharshan N A, MD (PMR)</div>
                </div>
                <div className="w-12 h-12 rounded-xl border-2 border-teal-400 overflow-hidden shrink-0 shadow-md">
                  <img
                    src="/dr-dharshan.jpg"
                    alt="Dr. Dharshan N A, MD (PMR)"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <div className="mt-5 space-y-3.5 text-xs text-slate-200">
                <div className="p-3 bg-teal-950/50 rounded-xl border border-teal-500/30 flex justify-between items-center">
                  <span className="text-teal-200">Target Recovery Duration:</span>
                  <strong className="text-teal-300 text-sm font-bold">{currentComp.drRehab.recoveryWeeks}</strong>
                </div>

                <div className="p-3 bg-teal-950/50 rounded-xl border border-teal-500/30 flex justify-between items-center">
                  <span className="text-teal-200">{currentComp.riskLabel}:</span>
                  <strong className="text-emerald-400 font-bold">{currentComp.drRehab.complicationRisk}</strong>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span><strong>Doctor Supervision:</strong> {currentComp.drRehab.doctorOversight}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span><strong>Protocol Adjustments:</strong> {currentComp.drRehab.protocol}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span><strong>{currentComp.deficitLabel}:</strong> {currentComp.drRehab.deficit}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span><strong>Family Visibility:</strong> {currentComp.drRehab.dashboard}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Action inside container */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 text-center sm:text-left">
              Ensure your recovery stays on the right side of this curve under <strong>Dr. Dharshan N A's milestone oversight</strong>.
            </span>
            <button
              onClick={() => openModal('book')}
              className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              Book In-Home Assessment <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* 4 Clinical Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center mb-3 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Weekly Milestone Audits</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Dr. Dharshan N A reviews key stage checkpoints (Day 7, 14, 21) to confirm capsular mobility, prevent arthrofibrosis, and advance resistance bands safely.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-3 shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">4-Hour Alert SLA</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              If an in-home session detects a pain spike (VAS &ge; 6), abnormal effusion, or a plateau, an urgent alert triggers immediate physician protocol review within 4 hours.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-sm">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Objective Goniometry</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Therapists log digital joint degrees, extensor lag, and timed gait cadence daily, feeding directly into your live recovery dashboard and milestone reports.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-3 shadow-sm">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Surgeon Progress Dossiers</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Dr. Dharshan transmits certified milestone and discharge outcome reports directly to your operating orthopedic or neurosurgeon, ensuring clinical continuity.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
