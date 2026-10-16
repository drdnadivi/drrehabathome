import React from 'react';
import { BookOpen, CheckCircle2, Stethoscope, ClipboardList, Users } from 'lucide-react';
import { useApp } from './AppContext';

/** Educational section: role of PMR — non-comparative (NMC-aligned) */
export const UspPmrSection: React.FC = () => {
  const { openModal } = useApp();

  const points = [
    {
      icon: Stethoscope,
      title: 'What PMR is',
      text: 'Physical Medicine & Rehabilitation (physiatry) is a medical specialty focused on function, disability and recovery after illness, injury or surgery.',
    },
    {
      icon: ClipboardList,
      title: 'Where it may fit in a plan',
      text: 'A PMR physician may advise on goals, precautions, timing of progression and when further medical review is appropriate. This does not replace your treating surgeon or physician.',
    },
    {
      icon: Users,
      title: 'Team-based rehabilitation',
      text: 'Home rehabilitation may involve physiotherapy and, as available, occupational therapy or speech therapy. Composition of the team depends on clinical need and availability.',
    },
    {
      icon: BookOpen,
      title: 'Information, not a ranking',
      text: 'This section explains the specialty in general terms. It is not a claim of superiority over other practitioners or facilities.',
    },
  ];

  return (
    <section id="role-of-pmr" className="py-16 lg:py-20 bg-slate-50/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5" />
            Role of PMR
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
            Role of Physical Medicine &amp; Rehabilitation
          </h2>
          <p className="text-[15px] text-slate-600 mt-3 leading-relaxed">
            Where applicable, clinical oversight may involve a PMR physician. Educational information only — not a superiority claim. Outcomes vary.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {points.map((item) => (
            <div key={item.title} className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl p-5">
              <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[14px] font-semibold text-slate-900">{item.title}</div>
                <div className="text-[13px] text-slate-600 mt-1 leading-relaxed">{item.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 max-w-3xl mx-auto">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Practitioner information</p>
          <p className="text-[15px] font-bold text-slate-900">Dr. Dharshan N A</p>
          <p className="text-[13px] text-teal-800 mt-0.5">MD (Physical Medicine &amp; Rehabilitation)</p>
          <p className="text-[13px] text-slate-600 mt-1">KMC 180734</p>
          <ul className="mt-4 space-y-2">
            {[
              'Directory listing for patient information',
              'Not a comparative ranking or advertising claim of superior outcomes',
              'Individual rehabilitation plans require assessment; outcomes vary',
            ].map((line) => (
              <li key={line} className="flex items-start gap-2 text-[13px] text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                {line}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => openModal('book')}
            className="mt-5 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold rounded-xl cursor-pointer"
          >
            Contact / Enquiry
          </button>
        </div>

        <p className="text-center text-[12px] text-slate-500 max-w-2xl mx-auto mt-8 px-4">
          Educational content only. This website does not guarantee results or claim superiority over other practitioners or facilities.
        </p>
      </div>
    </section>
  );
};
