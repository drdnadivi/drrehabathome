import React, { useState } from 'react';
import { useApp } from './AppContext';
import { X, Lock, Mail, Stethoscope } from 'lucide-react';
import { loginUser } from './api';

export const LoginModal: React.FC = () => {
  const { activeModal, closeModal, setCurrentUser, showToast } = useApp();
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
      const res = await loginUser(email.trim(), password);
      setCurrentUser(res.user);
      showToast(`Welcome, ${res.user.name}`, 'success');
      closeModal();
    } catch (err: any) {
      setError(err.message || 'Login failed. Check email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-teal-800 to-slate-900 text-white p-6 relative">
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 bg-teal-500/20 text-teal-300 rounded-lg">
              <Stethoscope className="w-6 h-6" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">Clinical portal</span>
          </div>
          <h2 className="text-xl font-bold">Sign in</h2>
          <p className="text-xs text-slate-300 mt-1">
            Doctor, physiotherapist, patient, or admin access.
          </p>
        </div>

        <form onSubmit={handleManualLogin} className="p-6 space-y-4">
          {error && (
            <div className="text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">{error}</div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600"
                placeholder="you@email.com"
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-700 hover:bg-teal-800 disabled:opacity-60 text-white font-semibold text-sm rounded-xl cursor-pointer"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            Portal accounts are issued by the clinic. Patients see progress after they are enrolled.
            Public booking is on WhatsApp — use Book Assessment on the website.
          </p>
        </form>
      </div>
    </div>
  );
};
