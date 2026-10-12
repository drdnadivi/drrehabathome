import React from 'react';
import { useApp } from './AppContext';
import { Stethoscope, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { openModal } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 flex items-center justify-center text-white">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[15px] font-bold text-white tracking-tight">
                  DrRehab<span className="text-teal-400">AtHome</span>
                </div>
                <div className="text-[10px] text-slate-500">Founded by Dr. Dharshan N A, MD (PMR)</div>
              </div>
            </div>
            <p className="text-[13px] text-slate-400 leading-relaxed mb-4">
              PMR doctor-directed home rehabilitation in Bengaluru — assessment booking on WhatsApp.
            </p>
            <div className="inline-flex items-center gap-2 text-[12px] text-teal-300 font-medium bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              Clinical portals via secure sign-in
            </div>
          </div>

          <div>
            <h4 className="text-[12px] font-semibold text-white uppercase tracking-wider mb-3">Care</h4>
            <ul className="space-y-2 text-[13px] text-slate-400">
              <li><a href="#conditions-treated" className="hover:text-teal-300 transition">Conditions</a></li>
              <li><a href="#how-it-works" className="hover:text-teal-300 transition">How it works</a></li>
              <li><a href="#pmr-advantage" className="hover:text-teal-300 transition">PMR advantage</a></li>
              <li><a href="#pricing" className="hover:text-teal-300 transition">Pricing</a></li>
              <li><a href="#dynamic-blogs" className="hover:text-teal-300 transition">Insights</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-semibold text-white uppercase tracking-wider mb-3">Portals</h4>
            <ul className="space-y-2 text-[13px] text-slate-400">
              <li>
                <button type="button" onClick={() => openModal('login')} className="hover:text-teal-300 transition text-left cursor-pointer">
                  Doctor / Physio / Admin sign in
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openModal('login')} className="hover:text-teal-300 transition text-left cursor-pointer">
                  Patient progress login
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-semibold text-white uppercase tracking-wider mb-3">Contact</h4>
            <div className="space-y-3 text-[13px] text-slate-400">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">WhatsApp booking</div>
                  <div className="text-[11px] text-slate-500">Use Book Assessment on the site</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>care@drrehabathome.in</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Bengaluru</span>
              </div>
              <button
                type="button"
                onClick={() => openModal('book')}
                className="mt-1 w-full py-2.5 bg-teal-700 hover:bg-teal-600 text-white rounded-xl font-semibold text-[13px] transition cursor-pointer"
              >
                Book on WhatsApp
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-[12px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} DrRehab at Home. Founded by Dr. Dharshan N A, MD (PMR).</div>
          <div>Clinical information · Not a substitute for emergency care</div>
        </div>
      </div>
    </footer>
  );
};
