import React from 'react';
import { FileText } from 'lucide-react';

/** Anonymous clinical illustrations — no name, photo, or identity */
export const CaseExamplesSection: React.FC = () => {
  const cases = [
    {
      title: 'After total knee replacement',
      line: 'Illustrative course: flexion about 60° early after surgery, progressing toward about 110° by day 21 with a stage-based home protocol and weekly review.',
    },
    {
      title: 'Stroke — early upper limb',
      line: 'Illustrative course: flaccid phase with shoulder protection first; later sessions shifted toward guided activation and function as tone and control changed.',
    },
    {
      title: 'Frozen shoulder',
      line: 'Illustrative course: irritable pain phase managed with limited aggressive stretch; mobility progressed as irritability reduced under a phase-matched plan.',
    },
  ];

  return (
    <section id="case-examples" className="py-14 lg:py-16 bg-slate-50 border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
            <FileText className="w-3.5 h-3.5" />
            Clinical illustrations
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
            How stage-based programmes can look
          </h2>
          <p className="text-[13px] text-slate-500 mt-2">
            Anonymous examples only — no patient names, photos, or identifiers. Not testimonials. Individual results vary.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cases.map((c) => (
            <div key={c.title} className="rounded-2xl bg-white border border-slate-200 p-5">
              <h3 className="text-[14px] font-bold text-slate-900">{c.title}</h3>
              <p className="text-[13px] text-slate-600 mt-2 leading-relaxed">{c.line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
