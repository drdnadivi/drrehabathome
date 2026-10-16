import React, { useState } from 'react';
import { useApp } from './AppContext';
import { 
  Stethoscope, ShieldCheck, ArrowRight, Calendar, Award, 
  Clock, CheckCircle2, Activity, ChevronRight 
} from 'lucide-react';

type ConditionKey = 'tkr' | 'stroke' | 'shoulder';

export const HeroSection: React.FC = () => {
  const { openModal } = useApp();

  const [selectedCondition, setSelectedCondition] = useState<ConditionKey>('tkr');
  const [postOpDay, setPostOpDay] = useState<number>(14);

  const calculatorData = {
    tkr: {
      name: 'Total Knee Replacement',
      short: 'TKR',
      sliderLabel: 'Post-Surgery Day',
      minDay: 1,
      maxDay: 45,
      getMilestone: (day: number) => {
        if (day <= 7) {
          return {
            phase: 'Phase 1 — Incision Protection & Activation',
            audit: 'Day 7 PMR Milestone Audit',
            targetROM: '0° Extension · 60–70° Flexion',
            pain: 'VAS 6–7',
            focus: 'Dr. Dharshan reviews incision healing, extensor lag, and clears progression beyond early bed rest.',
            alert: 'Extension lag > 5° or poor quadriceps activation triggers immediate review.'
          };
        } else if (day <= 18) {
          return {
            phase: 'Phase 2 — The Critical 90° Window',
            audit: 'Day 14 PMR Milestone Audit',
            targetROM: '0° Extension · 90–100° Flexion',
            pain: 'VAS 3–4',
            focus: 'Crossing 90° flexion prevents arthrofibrosis. Dr. Dharshan authorizes progressive loading and patellar mobilisations.',
            alert: 'Flexion stalled below 80° triggers protocol escalation before adhesions mature.'
          };
        } else if (day <= 30) {
          return {
            phase: 'Phase 3 — Ambulation & Strength',
            audit: 'Day 21 PMR Milestone Audit',
            targetROM: '0° Extension · 105–115° Flexion',
            pain: 'VAS 2–3',
            focus: 'Independent indoor walking, mini-squats, and stair work are cleared under PMR oversight.',
            alert: 'Effusion flare or joint-line warmth leads to cryo-compression adjustment.'
          };
        }
        return {
          phase: 'Phase 4 — Functional Autonomy',
          audit: 'Final Discharge Audit',
          targetROM: '0° Extension · 115–125° Flexion',
          pain: 'VAS 0–1',
          focus: 'Community walking, driving clearance, and surgeon-ready outcome dossier prepared by Dr. Dharshan.',
          alert: 'Quadriceps asymmetry > 15% is flagged for continued targeted work.'
        };
      }
    },
    stroke: {
      name: 'Stroke & Neurological Rehab',
      short: 'Stroke',
      sliderLabel: 'Post-Stroke Day',
      minDay: 7,
      maxDay: 90,
      getMilestone: (day: number) => {
        if (day <= 21) {
          return {
            phase: 'Early Recovery — Safety & Tone',
            audit: 'Day 14 PMR Milestone Audit',
            targetROM: 'Brunnstrom 2–3 · FIM ~48',
            pain: 'Tone monitoring',
            focus: 'Shoulder protection, NMES, and positioning protocols directed by Dr. Dharshan.',
            alert: 'Rising calf spasticity (Ashworth > 2) triggers contracture-prevention review.'
          };
        } else if (day <= 60) {
          return {
            phase: 'Peak Plasticity Window',
            audit: 'Monthly PMR Milestone Audit',
            targetROM: 'Brunnstrom 4 · FIM ~86',
            pain: 'Selective movement',
            focus: 'Transfer training and selective motor control are prioritised under physiatrist guidance.',
            alert: 'Plateau in voluntary movement prompts protocol recalibration.'
          };
        }
        return {
          phase: 'Community Integration',
          audit: 'Discharge Trajectory Review',
          targetROM: 'Brunnstrom 5–6 · Higher FIM',
          pain: 'Functional focus',
          focus: 'Advanced gait, dual-task training, and long-term self-management plan signed off by Dr. Dharshan.',
          alert: 'Secondary complications or caregiver strain flagged for support.'
        };
      }
    },
    shoulder: {
      name: 'Frozen Shoulder / Rotator Cuff',
      short: 'Shoulder',
      sliderLabel: 'Symptom / Post-Op Day',
      minDay: 1,
      maxDay: 90,
      getMilestone: (day: number) => {
        if (day <= 21) {
          return {
            phase: 'Pain & Protection Phase',
            audit: 'Early PMR Review',
            targetROM: 'Gentle passive range',
            pain: 'VAS 5–7',
            focus: 'Pain control, sleep positioning, and protected mobility directed by the PMR team.',
            alert: 'Night pain escalation or neurological signs trigger urgent review.'
          };
        } else if (day <= 60) {
          return {
            phase: 'Mobility Restoration',
            audit: 'Mid-Course Milestone',
            targetROM: 'Progressive active-assisted ROM',
            pain: 'VAS 3–5',
            focus: 'Capsular stretching and scapular control advanced under Dr. Dharshan’s protocol.',
            alert: 'Stalling elevation or increasing irritability prompts load reduction.'
          };
        }
        return {
          phase: 'Strength & Function',
          audit: 'Functional Clearance',
          targetROM: 'Near-full functional range',
          pain: 'VAS 1–2',
          focus: 'Return-to-activity criteria and long-term maintenance plan finalised.',
          alert: 'Persistent overhead deficit is documented for ongoing care.'
        };
      }
    }
  };

  const current = calculatorData[selectedCondition];
  const milestone = current.getMilestone(postOpDay);

  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-white overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-teal-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-[320px] h-[320px] bg-slate-100/60 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* ========== LEFT: Messaging + Founder ========== */}
          <div className="lg:col-span-5 space-y-7">
            
            {/* Small badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-800 text-xs font-semibold tracking-wide">
              <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
              Guided home rehab · Bengaluru
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-slate-900 leading-[1.18]">
                Guided rehab protocols at home,{' '}
                <span className="text-teal-700">reviewed every week</span>
              </h1>
              <p className="text-[15px] text-slate-600 leading-relaxed max-w-lg">
                Structured rehabilitation at home in Bengaluru — not a one-time exercise sheet. Your programme follows stepwise rehab protocols, with physiotherapy at the core and occupational or speech therapy when needed and available. Protocols are reassessed every week so intensity and goals match how you are progressing. Physician (PMR) input is built into that review cycle where applicable. Enquire to see how a programme can be set up after assessment. Results differ for each person.
              </p>
            </div>

            {/* Practitioner directory (factual) */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Practitioner information</p>
              <h3 className="text-[15px] font-bold text-slate-900">Dr. Dharshan N A</h3>
              <p className="text-xs font-medium text-teal-800 mt-0.5">MD (Physical Medicine &amp; Rehabilitation)</p>
              <p className="text-[12px] text-slate-600 mt-1">Registration:</p>
              <p className="text-[12px] text-slate-500 mt-2 leading-snug">
                Associated for clinical oversight of rehabilitation pathways. This listing is for patient information and is not a comparative ranking or guarantee of outcome.
              </p>
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: ShieldCheck, label: 'Guided protocols', sub: 'Stepwise home programmes' },
                { icon: Clock, label: 'Weekly review', sub: 'Plans updated to your progress' },
                { icon: Activity, label: 'PMR in the cycle', sub: 'Physician input where applicable' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                  <item.icon className="w-4.5 h-4.5 text-teal-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[13px] font-semibold text-slate-800">{item.label}</div>
                    <div className="text-[11px] text-slate-500">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={() => openModal('book')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-700 hover:bg-teal-800 text-white text-[14px] font-semibold rounded-xl shadow-md shadow-teal-700/20 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Contact / Enquiry
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 text-[14px] font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer"
              >
                See how it works
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ========== RIGHT: Recovery Predictor ========== */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/40 overflow-hidden">
              
              {/* Header */}
              <div className="px-5 sm:px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                      <Clock className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Recovery Milestone Predictor</h3>
                      <p className="text-[11px] text-slate-500">See what Dr. Dharshan audits at each stage</p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100">
                    Clinical Tool
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-5">
                {/* Condition tabs */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                    Select condition
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(calculatorData) as ConditionKey[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setSelectedCondition(key);
                          setPostOpDay(key === 'tkr' ? 14 : key === 'stroke' ? 28 : 30);
                        }}
                        className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center border ${
                          selectedCondition === key
                            ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-teal-300 hover:bg-teal-50/50'
                        }`}
                      >
                        {calculatorData[key].short}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Day slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      {current.sliderLabel}
                    </label>
                    <span className="text-sm font-bold text-teal-700 tabular-nums">Day {postOpDay}</span>
                  </div>
                  <input
                    type="range"
                    min={current.minDay}
                    max={current.maxDay}
                    value={postOpDay}
                    onChange={(e) => setPostOpDay(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-teal-700"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Day {current.minDay}</span>
                    <span>Day {current.maxDay}</span>
                  </div>
                </div>

                {/* Milestone card */}
                <div className="rounded-xl border border-slate-150 bg-slate-50/70 p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-teal-700 mb-1">
                        {milestone.audit}
                      </div>
                      <h4 className="text-[15px] font-bold text-slate-900 leading-snug">
                        {milestone.phase}
                      </h4>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-white rounded-lg px-3 py-2.5 border border-slate-100">
                      <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">Target</div>
                      <div className="text-[13px] font-semibold text-slate-800 mt-0.5">{milestone.targetROM}</div>
                    </div>
                    <div className="bg-white rounded-lg px-3 py-2.5 border border-slate-100">
                      <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">Pain / Status</div>
                      <div className="text-[13px] font-semibold text-slate-800 mt-0.5">{milestone.pain}</div>
                    </div>
                  </div>

                  <div className="pt-1 space-y-2">
                    <p className="text-[13px] text-slate-600 leading-relaxed">
                      <span className="font-semibold text-slate-800">Doctor focus: </span>
                      {milestone.focus}
                    </p>
                    <div className="flex items-start gap-2 text-[12.5px] text-amber-800 bg-amber-50/80 border border-amber-100 rounded-lg px-3 py-2">
                      <span className="font-semibold shrink-0">Alert:</span>
                      <span>{milestone.alert}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom note */}
                <p className="text-[11.5px] text-slate-400 text-center leading-relaxed">
                  These benchmarks are guided by Dr. Dharshan’s clinical protocols. 
                  Actual plans are individualised after assessment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
