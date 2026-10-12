import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { X } from 'lucide-react';
import { updateUser } from './api';

export const ProfileModal: React.FC = () => {
  const { activeModal, closeModal, currentUser, setCurrentUser, showToast } = useApp();
  const [form, setForm] = useState({ name: '', title: '', phone: '', credentials: '', password: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentUser && activeModal === 'profile') {
      setForm({
        name: currentUser.name || '',
        title: currentUser.title || '',
        phone: currentUser.phone || '',
        credentials: currentUser.credentials || '',
        password: '',
      });
    }
  }, [currentUser, activeModal]);

  if (activeModal !== 'profile' || !currentUser) return null;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: Record<string, string> = {
        name: form.name,
        title: form.title,
        phone: form.phone,
        credentials: form.credentials,
      };
      if (form.password) payload.password = form.password;
      const updated = await updateUser(currentUser.id, payload);
      setCurrentUser({ ...currentUser, ...updated });
      showToast('Profile updated', 'success');
      closeModal();
    } catch {
      showToast('Could not update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-xl">
        <button type="button" onClick={closeModal} className="absolute top-4 right-4 p-1 cursor-pointer">
          <X className="w-5 h-5 text-slate-500" />
        </button>
        <h2 className="text-lg font-bold text-slate-900 mb-1">Update profile</h2>
        <p className="text-xs text-slate-500 mb-4">{currentUser.email} · {currentUser.role}</p>
        <form onSubmit={save} className="space-y-3">
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" />
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" value={form.credentials} onChange={(e) => setForm({ ...form, credentials: e.target.value })} placeholder="Credentials" />
          <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="New password (optional)" />
          <button type="submit" disabled={saving} className="w-full py-2.5 bg-teal-700 text-white text-sm font-semibold rounded-xl cursor-pointer">
            {saving ? 'Saving…' : 'Save profile'}
          </button>
        </form>
      </div>
    </div>
  );
};
