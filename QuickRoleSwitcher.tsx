import React from 'react';
import { useApp } from './AppContext';
import { Stethoscope, UserCheck, ShieldCheck, HeartPulse, Globe, RotateCcw } from 'lucide-react';
import { resetDatabase } from './api';

export const QuickRoleSwitcher: React.FC = () => {
  const { currentRole, switchRole, showToast, triggerRefresh } = useApp();

  const handleReset = async () => {
    if (confirm('Reset database to clean initial demo state?')) {
      try {
        await resetDatabase();
        triggerRefresh();
        showToast('Demo data successfully restored to baseline', 'info');
      } catch (e) {
        showToast('Failed to reset data', 'error');
      }
    }
  };

  const roles = [
    {
      id: 'public' as const,
      label: 'Public Website',
      desc: 'Patient & Doctor Portal preview',
      icon: Globe,
      color: 'bg-slate-700 hover:bg-slate-800 text-white',
      activeColor: 'bg-teal-600 text-white ring-2 ring-teal-300'
    },
    {
      id: 'doctor' as const,
      label: '🩺 PMR Doctor Portal',
      desc: 'Verify session outcomes & modify Rx',
      icon: Stethoscope,
      color: 'bg-indigo-700 hover:bg-indigo-800 text-white',
      activeColor: 'bg-indigo-600 text-white ring-2 ring-indigo-300'
    },
    {
      id: 'staff' as const,
      label: '🏃 Staff Physiotherapist',
      desc: 'Log home visit vitals & ROM',
      icon: UserCheck,
      color: 'bg-emerald-700 hover:bg-emerald-800 text-white',
      activeColor: 'bg-emerald-600 text-white ring-2 ring-emerald-300'
    },
    {
      id: 'patient' as const,
      label: '📈 Patient Recovery Dashboard',
      desc: 'VAS pain trend, ROM chart, Daily exercises',
      icon: HeartPulse,
      color: 'bg-sky-700 hover:bg-sky-800 text-white',
      activeColor: 'bg-sky-600 text-white ring-2 ring-sky-300'
    },
    {
      id: 'admin' as const,
      label: '⚙️ Admin Dashboard',
      desc: 'Dynamic Blogs, bookings, staff roster',
      icon: ShieldCheck,
      color: 'bg-amber-700 hover:bg-amber-800 text-white',
      activeColor: 'bg-amber-600 text-white ring-2 ring-amber-300'
    }
  ];

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 px-3 py-2 text-xs sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-teal-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <span className="inline-block w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            Role Switcher Demo Bar:
          </span>
          <span className="hidden sm:inline text-slate-400 text-[11px]">
            Test all four backend roles instantly:
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-1.5">
          {roles.map(r => {
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => switchRole(r.id)}
                title={r.desc}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm ${
                  isActive
                    ? r.activeColor + ' font-semibold scale-105'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <span>{r.label}</span>
              </button>
            );
          })}

          <button
            onClick={handleReset}
            title="Reset database to fresh default state"
            className="px-2 py-1 bg-slate-800 hover:bg-rose-900 text-slate-300 hover:text-rose-200 rounded text-[11px] flex items-center gap-1 transition ml-1 cursor-pointer border border-slate-700"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden md:inline">Reset DB</span>
          </button>
        </div>
      </div>
    </div>
  );
};
