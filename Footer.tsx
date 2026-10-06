import React from 'react';
import { useApp } from './AppContext';
import { Stethoscope, ShieldCheck, Phone, Mail, MapPin, HeartPulse, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { switchRole, openModal } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-md">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                DrRehab<span className="text-teal-400">AtHome.in</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4 max-w-sm">
              India's premier doctor-directed home rehabilitation service. Every in-home physical therapy visit is monitored, analyzed, and signed off by Physical Medicine & Rehabilitation (PMR / Physiatrist) physicians for maximum safety and rapid functional recovery.
            </p>
            <div className="flex items-center gap-3 text-xs text-teal-400 font-semibold bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 max-w-sm">
              <ShieldCheck className="w-5 h-5 text-teal-400 flex-shrink-0" />
              <span>100% PMR Doctor Certified Session Audits</span>
            </div>
          </div>

          {/* Clinical Specialties */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Specialties</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#specialties" className="hover:text-teal-400 transition">Stroke & Neuro Rehabilitation</a></li>
              <li><a href="#specialties" className="hover:text-teal-400 transition">Total Knee & Hip Arthroplasty</a></li>
              <li><a href="#specialties" className="hover:text-teal-400 transition">Lumbar Spine & Sciatica Decompression</a></li>
              <li><a href="#specialties" className="hover:text-teal-400 transition">Geriatric Balance & Fall Prevention</a></li>
              <li><a href="#specialties" className="hover:text-teal-400 transition">Rotator Cuff & Shoulder Mobilization</a></li>
              <li><a href="#specialties" className="hover:text-teal-400 transition">Cardiopulmonary Conditioning</a></li>
            </ul>
          </div>

          {/* Portals & Dynamic Blog */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Portals & Blogs</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => switchRole('doctor')} className="hover:text-teal-400 transition text-left cursor-pointer">
                  🩺 PMR Doctor Verification Queue
                </button>
              </li>
              <li>
                <button onClick={() => switchRole('staff')} className="hover:text-teal-400 transition text-left cursor-pointer">
                  🏃 Physiotherapist Outcome Logger
                </button>
              </li>
              <li>
                <button onClick={() => switchRole('patient')} className="hover:text-teal-400 transition text-left cursor-pointer">
                  📈 Patient Recovery Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => switchRole('admin')} className="hover:text-teal-400 transition text-left cursor-pointer">
                  ⚙️ Admin Dynamic Blog CMS
                </button>
              </li>
              <li>
                <a href="#dynamic-blogs" className="hover:text-teal-400 transition">
                  Dynamic Physiatry Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Care Coordination</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold">+91 800-PHYSIO-PMR</div>
                  <div className="text-[10px] text-slate-500">Mon-Sun: 7:00 AM – 9:00 PM</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>care@drrehabathome.in</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>Central Physiatry Review Command, HealthTech Hub, Indiranagar, Bengaluru</span>
              </div>
              <button
                onClick={() => openModal('book')}
                className="mt-2 w-full py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-semibold text-xs transition cursor-pointer"
              >
                Schedule Assessment
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} DrRehabAtHome.in. All rights reserved. Physiatrist-monitored home physical medicine.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Clinical Protocols</span>
            <span>Privacy Policy</span>
            <span>HIPAA Compliant</span>
            <span>PMR Audit Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
