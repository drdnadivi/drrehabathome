import React from 'react';
import { MapPin, Zap, Clock, Phone } from 'lucide-react';
import { useApp } from './AppContext';
import { DISPLAY_PHONE } from './config';

export const ServiceAreasSection: React.FC = () => {
  const { openModal } = useApp();

  return (
    <section id="service-areas" className="py-14 lg:py-16 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <span className="inline-flex text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
              Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
              Home visits across Bengaluru
            </h2>
            <p className="text-[15px] text-slate-600 mt-3 leading-relaxed">
              Fastest response in South and Central Bengaluru. Other parts of the city are available on request — confirm timing when you message us.
            </p>
            <a
              href="https://wa.me/917373638970"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-teal-800 hover:text-teal-900"
            >
              <Phone className="w-4 h-4" />
              {DISPLAY_PHONE}
            </a>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => openModal('book')}
                className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold rounded-xl cursor-pointer"
              >
                Contact / Enquiry
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
              <div className="flex items-center gap-2 text-emerald-900 font-semibold text-sm mb-3">
                <Zap className="w-4 h-4" />
                Fastest response
              </div>
              <div className="flex flex-wrap gap-2">
                {['South Bengaluru', 'Central Bengaluru'].map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-emerald-100 text-[13px] font-medium text-slate-800"
                  >
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {a}
                  </span>
                ))}
              </div>
              <p className="text-[12px] text-emerald-900/80 mt-3">
                Includes areas such as Lalbagh, Malleshwaram, Majestic, Bannerghatta Road and nearby localities.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm mb-2">
                <Clock className="w-4 h-4 text-slate-500" />
                Other Bengaluru areas
              </div>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                Available on request. Response time depends on schedule — share your area and preferred dates on WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
