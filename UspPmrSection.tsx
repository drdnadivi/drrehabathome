import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, ShieldCheck, Clock, Activity, Sliders } from 'lucide-react';
import { useApp } from './AppContext';

export const UspPmrSection: React.FC = () => {
  const { openModal } = useApp();
  const [active, setActive] = useState<'tkr' | 'stroke' | 'shoulder'>('tkr');
  const [slider, setSlider] = useState(70);

  const data = {
    tkr: {
      title: 'After knee replacement',
      rows: [
        { label: 'Recovery framing', standard: 'Often 8–12 weeks with variable structure', ours: 'Milestone plan with Day 7 · 14 · 21 audits' },
        { label: 'Doctor role', standard: 'Surgeon review weeks later', ours: 'PMR oversight by Dr. Dharshan between visits' },
        { label: 'Protocol', standard: 'Static paper sheet', ours: 'Adjusted after objective session logs' },
        { label: 'Risk focus', standard: 'Stiffness found late', ours: 'Early alert if flexion / lag stalls' },
      ],
    },
    stroke: {
      title: 'Stroke & neuro recovery',
      rows: [
        { label: 'Recovery framing', standard: 'Long course, easy to plateau', ours: 'Stage-aware plan in the early window' },
        { label: 'Doctor role', standard: 'Delayed specialist input', ours: 'Scheduled PMR neuro reviews' },
        { label: 'Protocol', standard: 'Generic walking drills', ours: 'Tone, positioning, task practice' },
        { label: 'Risk focus', standard: 'Contracture / shoulder issues late', ours: 'Earlier escalation rules' },
      ],
    },
    shoulder: {
      title: 'Frozen shoulder / cuff care',
      rows: [
        { label: 'Recovery framing', standard: 'Long stiffness cycle', ours: 'Phase matched to irritability' },
        { label: 'Doctor role', standard: 'Limited interim checks', ours: 'PMR-guided progression decisions' },
        { label: 'Protocol', standard: 'One aggressive stretch approach', ours: 'Calm tissue first, then load' },
        { label: 'Risk focus', standard: 'Flare from over-pushing', ours: 'Stop rules + sleep focus' },
      ],
    },
  };

  const current = data[active];
  const leanOurs = slider >= 50;

  return (
    <section id="pmr-advantage" className="py-16 lg:py-20 bg-slate-50/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
            <Award className="w-3.5 h-3.5" />
            PMR advantage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
            Interactive comparison: ordinary home PT vs PMR-directed care
          </h2>
          <p className="text-[15px] text-slate-600 mt-3 leading-relaxed">
            Move the slider and switch conditions. This is educational positioning — not a promise of identical outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {[
            { icon: ShieldCheck, title: 'Milestone audits', text: 'Day 7, 14 and 21 checkpoints' },
            { icon: Clock, title: 'Alert review SLA', text: 'Clinical flags reviewed within 4 hours' },
            { icon: Activity, title: 'Hospital-in-a-bag kit', text: 'Goniometer, NMES, bands & more as needed' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl p-4">
              <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[14px] font-semibold text-slate-900">{item.title}</div>
                <div className="text-[13px] text-slate-500 mt-0.5">{item.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-700" />
              <h3 className="text-[15px] font-semibold text-slate-900">{current.title}</h3>
            </div>
            <div className="flex gap-1.5">
              {([
                ['tkr', 'Knee'],
                ['stroke', 'Stroke'],
                ['shoulder', 'Shoulder'],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActive(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                    active === key
                      ? 'bg-teal-700 text-white border-teal-700'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-teal-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 sm:px-6 py-5 border-b border-slate-100 bg-slate-50/60">
            <div className="flex justify-between text-[12px] font-semibold mb-2">
              <span className={slider < 50 ? 'text-rose-600' : 'text-slate-400'}>Ordinary home PT</span>
              <span className={slider >= 50 ? 'text-teal-700' : 'text-slate-400'}>DrRehab + PMR direction</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={slider}
              onChange={(e) => setSlider(Number(e.target.value))}
              className="w-full accent-teal-700"
            />
            <p className="text-[12px] text-slate-500 mt-2 text-center">
              {leanOurs
                ? 'Emphasis on milestone audits, session telemetry and early escalation.'
                : 'Emphasis on therapist visits alone, with less structured medical checkpointing.'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500">
                  <th className="px-4 sm:px-6 py-3 font-medium">Point</th>
                  <th className={`px-4 sm:px-6 py-3 font-medium ${slider < 50 ? 'bg-rose-50 text-rose-800' : ''}`}>
                    <span className="inline-flex items-center gap-1"><XCircle className="w-3.5 h-3.5 text-rose-400" /> Ordinary home PT</span>
                  </th>
                  <th className={`px-4 sm:px-6 py-3 font-medium ${slider >= 50 ? 'bg-teal-50 text-teal-900' : ''}`}>
                    <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> DrRehab at Home</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {current.rows.map((row) => (
                  <tr key={row.label} className="border-t border-slate-100">
                    <td className="px-4 sm:px-6 py-3.5 font-medium text-slate-800 whitespace-nowrap">{row.label}</td>
                    <td className={`px-4 sm:px-6 py-3.5 text-slate-500 ${slider < 50 ? 'bg-rose-50/40 font-medium text-slate-700' : ''}`}>{row.standard}</td>
                    <td className={`px-4 sm:px-6 py-3.5 text-slate-800 ${slider >= 50 ? 'bg-teal-50/50 font-semibold' : 'font-medium'}`}>{row.ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 sm:px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <p className="text-[12.5px] text-slate-500">
              Individual results vary. Assessment determines the real plan and equipment kit.
            </p>
            <button
              type="button"
              onClick={() => openModal('book')}
              className="shrink-0 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-[13px] font-semibold rounded-xl cursor-pointer"
            >
              Book assessment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
