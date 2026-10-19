import React from 'react';
import { Stethoscope, Target, Users, ClipboardList } from 'lucide-react';

export const AboutPmrSection: React.FC = () => {
  return (
    <section id="about" className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <span className="inline-flex text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
              About
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
              How we plan care
            </h2>
            <p className="text-[15px] text-slate-600 mt-4 leading-relaxed">
              We focus on structured home rehabilitation: what is right in week 1 is often not right in week 6. That is the core of how we plan care. Pathways use a PMR lens with milestone-style review — scientific process, not patient testimonials.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-[12px] font-medium text-slate-600">
              {['Assessment lim', 'Identify stage', 'Home protocol', 'Weekly review', 'Update plan'].map((step, i, arr) => (
                <React.Fragment key={step}>
                  <span className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-800">
                    {step === 'Assessment lim' ? 'Assessment' : step}
                  </span>
                  {i < arr.length - 1 && <span className="text-teal-600">→</span>}
                </React.Fragment>
              ))}
            </div>

            <p className="text-[13px] text-slate-500 mt-5 leading-relaxed">
              Physiotherapy is core. Occupational therapy and speech therapy when needed and available. PMR input in the review cycle where applicable.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-200">
                <img
                  src="/dr-dharshan.jpg"
                  alt="Dr. Dharshan N A, MD (PMR)"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Practitioner information</p>
                <p className="text-[16px] font-bold text-slate-900 mt-0.5">Dr. Dharshan N A</p>
                <p className="text-[13px] text-slate-600 mt-1">MBBS</p>
                <p className="text-[13px] text-teal-800 font-medium mt-0.5">MD (Physical Medicine &amp; Rehabilitation)</p>
                <p className="text-[12px] text-slate-500 mt-1">KMC 180734</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-[13px] text-slate-600">
              <li className="flex gap-2"><span className="text-teal-600 font-bold">·</span> Fellowship in Interventional Pain Management</li>
              <li className="flex gap-2"><span className="text-teal-600 font-bold">·</span> Fellowship in Stem Cell and Regenerative Medicine</li>
            </ul>
            <p className="text-[11px] text-slate-400 mt-4">Associated for clinical oversight of rehabilitation pathways.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
          {[
            { icon: Target, title: 'Stage-matched', text: 'Plan fits the phase' },
            { icon: ClipboardList, title: 'Weekly review', text: 'Protocol can change' },
            { icon: Users, title: 'Home team', text: 'PT ± OT / speech' },
            { icon: Stethoscope, title: 'PMR lens', text: 'Function & recovery' },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-100 bg-white p-4">
              <item.icon className="w-4 h-4 text-teal-700 mb-2" />
              <div className="text-[13px] font-semibold text-slate-900">{item.title}</div>
              <div className="text-[12px] text-slate-500 mt-0.5">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
