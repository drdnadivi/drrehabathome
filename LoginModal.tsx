import React, { useState } from 'react';
import { useApp } from './AppContext';
import { X, Lock, Mail, Stethoscope, UserCheck, HeartPulse, ShieldCheck, ArrowRight } from 'lucide-react';
import { loginUser } from './api';

export const LoginModal: React.FC = () => {
  const { activeModal, closeModal, setCurrentUser, switchRole, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (activeModal !== 'login') return null;

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await loginUser(email, password || 'demo123');
      setCurrentUser(res.user);
      switchRole(res.user.role);
      showToast(`Welcome back, ${res.user.name}!`, 'success');
      closeModal();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (role: 'doctor' | 'staff' | 'patient' | 'admin') => {
    switchRole(role);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-gradient-to-r from-teal-800 to-slate-900 text-white p-6 relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 bg-teal-500/20 text-teal-300 rounded-lg">
              <Stethoscope className="w-6 h-6" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">DrRehabAtHome.in Clinical Portal</span>
          </div>
          <h2 className="text-xl font-bold">Secure Access Sign In</h2>
          <p className="text-xs text-slate-300 mt-1">
            Access PMR physician oversight, therapist logs, or recovery dashboard.
          </p>
        </div>

        <div className="p-6">
          {/* Quick Demo Login Cards */}
          <div className="mb-6">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
              1-Click Instant Demo Login:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('doctor')}
                className="flex items-center gap-2.5 p-2.5 rounded-xl border border-indigo-100 bg-indigo-50/60 hover:bg-indigo-100/80 transition text-left cursor-pointer group"
              >
                <img
                  src="/dr-dharshan.jpg"
                  alt="Dr. Dharshan N A"
                  className="w-8 h-8 rounded-lg object-cover border border-indigo-200 group-hover:scale-105 transition-transform shrink-0"
                />
                <div>
                  <div className="text-xs font-bold text-indigo-950">PMR Doctor</div>
                  <div className="text-[10px] text-indigo-700">Dr. Dharshan N A, MD (PMR)</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('staff')}
                className="flex items-start gap-2 p-2.5 rounded-xl border border-emerald-100 bg-emerald-50/60 hover:bg-emerald-100/80 transition text-left cursor-pointer group"
              >
                <div className="p-1.5 rounded-lg bg-emerald-600 text-white group-hover:scale-105 transition-transform">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-950">Physiotherapist</div>
                  <div className="text-[10px] text-emerald-700">PT Rahul Sharma</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('patient')}
                className="flex items-start gap-2 p-2.5 rounded-xl border border-sky-100 bg-sky-50/60 hover:bg-sky-100/80 transition text-left cursor-pointer group"
              >
                <div className="p-1.5 rounded-lg bg-sky-600 text-white group-hover:scale-105 transition-transform">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-sky-950">Patient Portal</div>
                  <div className="text-[10px] text-sky-700">Rajesh Mehta (TKR)</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="flex items-start gap-2 p-2.5 rounded-xl border border-amber-100 bg-amber-50/60 hover:bg-amber-100/80 transition text-left cursor-pointer group"
              >
                <div className="p-1.5 rounded-lg bg-amber-600 text-white group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-950">Admin Console</div>
                  <div className="text-[10px] text-amber-700">Manage blogs & staff</div>
                </div>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] text-slate-400 uppercase tracking-wider font-medium">Or enter credentials</span>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleManualLogin} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. doctor@drrehabathome.in"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password (demo: demo123)"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-lg transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In to Portal'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center text-[11px] text-slate-500">
            PhysioPMR HIPAA & Digital Clinical Data Compliance Standard
          </div>
        </div>
      </div>
    </div>
  );
};
