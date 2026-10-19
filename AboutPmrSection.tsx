import React from 'react';
import { Stethoscope, Target, Users, ClipboardList } from 'lucide-react';

/** About us — specialist rehab identity, not ordinary physio clinic copy */
export const AboutPmrSection: React.FC = () => {
  return (
    <section id="about" className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <span className="inline-flex text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
              About DrRehab@Home
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
              Built around PMR thinking — not a generic exercise brand
            </h2>
            <p className="text-[15px] text-slate-600 mt-4 leading-relaxed">
              DrRehab@Home is a home rehabilitation service organised around principles of
              <strong className="text-slate-800"> Physical Medicine &amp; Rehabilitation (PMR)</strong> —
              the medical specialty focused on function, disability, and recovery after illness, injury, or surgery.
            </p>
            <p className="text-[15px] text-slate-600 mt-3 leading-relaxed">
              Ordinary home programmes often hand over a fixed list of exercises. We structure care as
              <strong className="text-slate-800"> stage-based protocols</strong> that can change week to week:
              what is safe and useful in a flaccid stroke arm is not the same as in spasticity; early knee-replacement
              goals differ from later strengthening; irritable shoulder pain is not treated like quiet stiffness.
            </p>
            <p className="text-[15px] text-slate-600 mt-3 leading-relaxed">
              Physiotherapy remains the backbone of most home visits. Occupational therapy and speech therapy
              are arranged when needed and available. Physician (PMR) input is used in the review cycle where applicable.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Practitioner information
              </p>
              <p className="text-[16px] font-bold text-slate-900">Dr. Dharshan N A</p>
              <p className="text-[13px] text-teal-800 mt-0.5">MD (Physical Medicine &amp; Rehabilitation)</p>
              <p className="text-[12px] text-slate-500 mt-2">
                Associated for clinical oversight of rehabilitation pathways. Registration details in the website footer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: Target, title: 'Function-focused', text: 'Goals tied to real tasks: walk, reach, self-care, work readiness.' },
                { icon: ClipboardList, title: 'Protocol + review', text: 'Stepwise plans with weekly reassessment — not one static sheet.' },
                { icon: Users, title: 'Team when needed', text: 'PT core; OT and speech therapy as available for the case.' },
                { icon: Stethoscope, title: 'Medical specialty lens', text: 'PMR training informs staging, precautions, and escalation.' },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-100 bg-white p-4">
                  <item.icon className="w-4 h-4 text-teal-700 mb-2" />
                  <div className="text-[13px] font-semibold text-slate-900">{item.title}</div>
                  <div className="text-[12px] text-slate-500 mt-1 leading-relaxed">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
