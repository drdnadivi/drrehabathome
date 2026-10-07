import React from 'react';
import { useApp } from './AppContext';
import { Globe, Stethoscope, UserCheck, HeartPulse, ShieldCheck, RotateCcw } from 'lucide-react';
import { resetDatabase } from './api';

export const QuickRoleSwitcher: React.FC = () => {
  const { currentRole, switchRole, showToast, triggerRefresh } = useApp();

  const handleReset = async () => {
    if (confirm('Reset demo data to the initial state?')) {
      try {
        await resetDatabase();
        triggerRefresh();
        showToast('Demo data restored', 'info');
      } catch {
        showToast('Could not reset data', 'error');
      }
    }
  };

  const roles = [
    { id: 'public' as const, label: 'Website', icon: Globe },
    { id: 'doctor' as const, label: 'Doctor', icon: Stethoscope },
    { id: 'staff' as const, label: 'Therapist', icon: UserCheck },
    { id: 'patient' as const, label: 'Patient', icon: HeartPulse },
    { id: 'admin' as const, label: 'Admin', icon: ShieldCheck },
  ];

  return (
    <div className="bg-slate-900 text-white text-[11px] sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 h-[37px]">
        <span className="text-slate-400 hidden sm:inline shrink-0">Demo view switcher</span>
        <div className="flex items-center gap-1 overflow-x-auto">
          {roles.map((r) => {
            const Icon = r.icon;
            const active = currentRole === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => switchRole(r.id)}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md font-medium whitespace-nowrap transition cursor-pointer ${
                  active ? 'bg-teal-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3 h-3" />
                {r.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            title="Reset demo data"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
