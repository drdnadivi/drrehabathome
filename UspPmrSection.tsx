import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, ShieldCheck, Clock, Activity } from 'lucide-react';
import { useApp } from './AppContext';

export const UspPmrSection: React.FC = () => {
  const { openModal } = useApp();
  const [active, setActive] = useState<'tkr' | 'stroke' | 'shoulder'>('tkr');

  const data = {
    tkr: {
      title: 'After knee replacement',
      rows: [
        { label: 'Typical recovery window', standard: '8–12 weeks', ours: 'Often 3–5 weeks with structured milestones' },
        { label: 'Doctor oversight', standard: 'Surgeon review weeks later', ours: 'Day 7 · 14 · 21 PMR audits' },
        { label: 'Protocol', standard: 'Generic exercise sheet', ours: 'Milestone-based plan adjusted by Dr. Dharshan' },
        { label: 'Visibility', standard: 'Paper notes only', ours: 'Shared recovery dashboard' },
      ],
    },
    stroke: {
      title: 'Stroke & neuro recovery',
      rows: [
        { label: 'Focus window', standard: 'Long, plateau-prone course', ours: 'Early structured neuroplastic window' },
        { label: 'Doctor oversight', standard: 'Delayed specialist review', ours: 'Scheduled PMR neuro milestone audits' },
        { label: 'Protocol', standard: 'Generic walking drills', ours: 'Tone, positioning & selective movement plans' },
        { label: 'Visibility', standard: 'Subjective notes', ours: 'Stage and function tracking' },
      ],
    },
    shoulder: {
      title: 'Frozen shoulder / cuff care',
      rows: [
        { label: 'Typical course', standard: 'Long stiffness cycle', ours: 'Phased mobility under PMR guidance' },
        { label: 'Doctor oversight', standard: 'Limited interim checks', ours: 'Bi-weekly style milestone reviews' },
        { label: 'Protocol', standard: 'One-size stretching', ours: 'Load and irritability-matched plan' },
        { label: 'Visibility', standard: 'No objective range log', ours: 'Progress tracked session by session' },
      ],
    },
  };

  const current = data[active];

  return (
    <section id="pmr-advantage" className="py-16 lg:py-20 bg-slate-50/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
            <Award className="w-3.5 h-3.5" />
            PMR advantage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
            Why Physiatrist-directed home rehab is different
          </h2>
          <p className="text-[15px] text-slate-600 mt-3 leading-relaxed">
            Most home physiotherapy runs without specialist medical oversight. Here, Dr. Dharshan N A, MD (PMR) directs the plan and audits recovery milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {[
            { icon: ShieldCheck, title: 'Milestone audits', text: 'Day 7, 14 and 21 clinical checkpoints' },
            { icon: Clock, title: 'Alert review SLA', text: 'Clinical flags reviewed within 4 hours' },
            { icon: Activity, title: 'PMR oversight', text: 'Not therapist-only care' },
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
          <div className="px-4 sm:px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-slate-900">{current.title}</h3>
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

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500">
                  <th className="px-4 sm:px-6 py-3 font-medium">Point</th>
                  <th className="px-4 sm:px-6 py-3 font-medium">
                    <span className="inline-flex items-center gap-1"><XCircle className="w-3.5 h-3.5 text-rose-400" /> Ordinary home PT</span>
                  </th>
                  <th className="px-4 sm:px-6 py-3 font-medium">
                    <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> DrRehab at Home</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {current.rows.map((row) => (
                  <tr key={row.label} className="border-t border-slate-100">
                    <td className="px-4 sm:px-6 py-3.5 font-medium text-slate-800 whitespace-nowrap">{row.label}</td>
                    <td className="px-4 sm:px-6 py-3.5 text-slate-500">{row.standard}</td>
                    <td className="px-4 sm:px-6 py-3.5 text-slate-800 font-medium">{row.ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 sm:px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <p className="text-[12.5px] text-slate-500">
              Plans are individualised after assessment. Numbers above are illustrative clinical positioning, not guarantees.
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
