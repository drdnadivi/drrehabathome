import React from 'react';
import { useApp } from './AppContext';
import { DISPLAY_PHONE, CARE_EMAIL, RMP_NAME, RMP_QUALIFICATION, RMP_REGISTRATION } from './config';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { openModal } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <BrandLogo variant="dark" />
            <div className="inline-flex items-center gap-2 text-[12px] text-teal-300 font-medium bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700 mt-3">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              Clinical portals via secure sign-in
            </div>
          </div>

          <div>
            <h4 className="text-[12px] font-semibold text-white uppercase tracking-wider mb-3">Care</h4>
            <ul className="space-y-2 text-[13px] text-slate-400">
              <li><a href="#who-its-for" className="hover:text-teal-300 transition">Who it&apos;s for</a></li>
              <li><a href="#conditions-treated" className="hover:text-teal-300 transition">Pathways</a></li>
              <li><a href="#how-it-works" className="hover:text-teal-300 transition">How it works</a></li>
              <li><a href="#about" className="hover:text-teal-300 transition">About</a></li>
              <li><a href="#dynamic-blogs" className="hover:text-teal-300 transition">Clinical notes</a></li>
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
              <li>
                <button type="button" onClick={() => openModal('privacy')} className="hover:text-teal-300 transition text-left cursor-pointer">
                  Privacy policy
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
                  <div className="text-white font-medium text-[12px]">Phone / WhatsApp</div>
                  <a href={`https://wa.me/917373638970`} className="text-teal-300 hover:text-teal-200" target="_blank" rel="noreferrer">{DISPLAY_PHONE}</a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium text-[12px]">Email</div>
                  <a href={`mailto:${CARE_EMAIL}`} className="text-teal-300 hover:text-teal-200">{CARE_EMAIL}</a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Home visits in Bengaluru</span>
              </div>
              <button
                type="button"
                onClick={() => openModal('book')}
                className="mt-1 w-full py-2.5 bg-teal-700 hover:bg-teal-600 text-white rounded-xl font-semibold text-[13px] transition cursor-pointer"
              >
                Contact / Enquiry
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-4 text-[11px] text-slate-500 leading-relaxed">
          <div>
            <p className="font-semibold text-slate-400 mb-1">Medical disclaimer</p>
            <p>
              This website is for general information and recovery estimates only. It is not a substitute for any medical emergency or direct treatment by a doctor in a hospital. Actual results may vary depending on the patient&apos;s physical condition.
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-400 mb-1">Emergency during a home session</p>
            <p>
              If a serious medical problem occurs during therapy at home, stop the session and seek emergency care immediately (call local emergency services / ambulance, or go to the nearest hospital). Then inform DrRehab@Home on {DISPLAY_PHONE}. Home therapy is not an emergency service.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pt-2">
            <div>
              <p className="font-semibold text-slate-400 mb-1">Practitioner information</p>
              <p className="text-slate-400">{RMP_NAME} · {RMP_QUALIFICATION}</p>
              <p className="text-slate-400">{RMP_REGISTRATION}</p>
            </div>
            <div className="text-slate-500">
              © {new Date().getFullYear()} DrRehab@Home · Bengaluru
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
