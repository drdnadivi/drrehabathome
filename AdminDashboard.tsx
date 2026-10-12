import React, { useEffect, useState } from 'react';
import { useApp } from './AppContext';
import { ShieldCheck, Plus, Calendar, Users, BookOpen, UserPlus } from 'lucide-react';
import {
  fetchBlogs,
  deleteBlog,
  fetchBookings,
  updateBookingStatus,
  fetchPatients,
  fetchStats,
  fetchUsers,
  createUser,
  enrollBooking,
} from './api';
import { Blog, Booking, Patient, SystemStats, User } from './types';

export const AdminDashboard: React.FC = () => {
  const { openModal, refreshCount, showToast, triggerRefresh, currentUser } = useApp();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [team, setTeam] = useState<User[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [tab, setTab] = useState<'bookings' | 'patients' | 'team' | 'blogs'>('bookings');
  const [loading, setLoading] = useState(true);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'staff',
    title: '',
    phone: '',
  });

  const loadAll = async () => {
    try {
      setLoading(true);
      const [b, bk, p, s, u] = await Promise.all([
        fetchBlogs(),
        fetchBookings(),
        fetchPatients(),
        fetchStats(),
        fetchUsers(),
      ]);
      setBlogs(b);
      setBookings(bk);
      setPatients(p);
      setStats(s);
      setTeam(u.filter((x) => x.role === 'doctor' || x.role === 'staff' || x.role === 'admin'));
    } catch {
      showToast('Error loading admin portal', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, [refreshCount]);

  const doctors = team.filter((u) => u.role === 'doctor');
  const therapists = team.filter((u) => u.role === 'staff');

  const handleEnroll = async (bk: Booking) => {
    const doctor = window.prompt('Assigned doctor name', doctors[0]?.name || 'Dr. Dharshan N A, MD (PMR)');
    if (doctor === null) return;
    const therapist = window.prompt('Assigned physiotherapist name', therapists[0]?.name || 'PT Rahul Sharma, MPT');
    if (therapist === null) return;
    try {
      const res = await enrollBooking(bk.id, {
        assignedDoctor: doctor,
        assignedTherapist: therapist,
        diagnosis: bk.serviceType || 'Home physiotherapy',
        createPatientLogin: Boolean(bk.email),
        patientPassword: 'patient123',
      });
      showToast(
        res.patientUser
          ? `Enrolled ${res.patient.name}. Patient login: ${res.patientUser.email} / patient123`
          : `Enrolled ${res.patient.name}`,
        'success'
      );
      triggerRefresh();
      loadAll();
    } catch (e: any) {
      showToast(e.message || 'Enroll failed', 'error');
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(newUser);
      showToast(`${newUser.role} added: ${newUser.name}`, 'success');
      setNewUser({ name: '', email: '', password: '', role: 'staff', title: '', phone: '' });
      loadAll();
    } catch (err: any) {
      showToast(err.message || 'Could not add user', 'error');
    }
  };

  const pendingBookings = bookings.filter((b) => b.status !== 'Enrolled' && b.status !== 'Cancelled');

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="bg-slate-900 text-white py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Admin</div>
              <h1 className="text-xl font-bold">{currentUser?.name || 'Admin'}</h1>
              <p className="text-xs text-slate-400">Bookings → enroll patients → team → blogs</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => openModal('blog_editor')}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold text-sm rounded-xl cursor-pointer inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New blog
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-[11px] text-slate-500 font-semibold uppercase">Open bookings</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{pendingBookings.length}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-[11px] text-slate-500 font-semibold uppercase">Patients</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{patients.length}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-[11px] text-slate-500 font-semibold uppercase">Team</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{team.length}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-[11px] text-slate-500 font-semibold uppercase">Blogs</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{blogs.length}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {([
            ['bookings', 'Bookings', Calendar],
            ['patients', 'Patients', Users],
            ['team', 'Team', UserPlus],
            ['blogs', 'Blogs', BookOpen],
          ] as const).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border inline-flex items-center gap-1.5 cursor-pointer ${
                tab === id ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-slate-500 text-sm">Loading…</p>
        ) : tab === 'bookings' ? (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 text-sm font-semibold text-slate-800">
              Assessment bookings (from website form)
            </div>
            <div className="divide-y divide-slate-100">
              {bookings.length === 0 && <p className="p-4 text-sm text-slate-500">No bookings yet.</p>}
              {bookings.map((bk) => (
                <div key={bk.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-slate-900">{bk.patientName}</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {bk.phone} · {bk.email || 'no email'} · {bk.serviceType}
                    </div>
                    <div className="text-xs text-slate-500">
                      {bk.preferredDate} {bk.preferredSlot} · Status: <strong>{bk.status}</strong>
                    </div>
                    {bk.address && <div className="text-xs text-slate-400 mt-0.5">{bk.address}</div>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {bk.status !== 'Enrolled' && (
                      <button
                        type="button"
                        onClick={() => handleEnroll(bk)}
                        className="px-3 py-2 bg-teal-700 text-white text-xs font-semibold rounded-lg cursor-pointer"
                      >
                        Enroll as patient
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={async () => {
                        await updateBookingStatus(bk.id, 'Confirmed');
                        showToast('Marked confirmed', 'success');
                        loadAll();
                      }}
                      className="px-3 py-2 border border-slate-200 text-xs font-semibold rounded-lg cursor-pointer"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        await updateBookingStatus(bk.id, 'Cancelled');
                        showToast('Cancelled', 'info');
                        loadAll();
                      }}
                      className="px-3 py-2 border border-rose-200 text-rose-700 text-xs font-semibold rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : tab === 'patients' ? (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 text-sm font-semibold">Active patients</div>
            <div className="divide-y divide-slate-100">
              {patients.map((p) => (
                <div key={p.id} className="p-4">
                  <div className="font-semibold text-slate-900">{p.name}</div>
                  <div className="text-xs text-slate-500 mt-1">{p.diagnosis}</div>
                  <div className="text-xs text-slate-600 mt-1">
                    Doctor: <strong>{p.assignedDoctor}</strong> · Physio: <strong>{p.assignedTherapist}</strong>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Sessions {p.sessionsCompleted}/{p.totalSessionsPlanned} · VAS {p.currentVAS}/10 · {p.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : tab === 'team' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Add doctor or physiotherapist</h3>
              <form onSubmit={handleAddUser} className="space-y-3">
                <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="Full name" required value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
                <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="Email (login)" type="email" required value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="Temporary password" required value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                  <option value="staff">Physiotherapist</option>
                  <option value="doctor">Doctor (PMR)</option>
                  <option value="admin">Admin</option>
                </select>
                <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="Title (optional)" value={newUser.title} onChange={(e) => setNewUser({ ...newUser, title: e.target.value })} />
                <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="Phone (optional)" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
                <button type="submit" className="w-full py-2.5 bg-teal-700 text-white text-sm font-semibold rounded-xl cursor-pointer">
                  Add team member
                </button>
              </form>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Team directory</h3>
              <div className="space-y-2">
                {team.map((u) => (
                  <div key={u.id} className="border border-slate-100 rounded-xl p-3">
                    <div className="font-medium text-slate-900 text-sm">{u.name}</div>
                    <div className="text-xs text-slate-500">{u.role} · {u.email}</div>
                    {u.title && <div className="text-xs text-slate-400">{u.title}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 text-sm font-semibold">Blogs</div>
            <div className="divide-y divide-slate-100">
              {blogs.map((b) => (
                <div key={b.id} className="p-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium text-slate-900 text-sm">{b.title}</div>
                    <div className="text-xs text-slate-500">{b.category}</div>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      if (confirm('Delete this blog?')) {
                        await deleteBlog(b.id);
                        showToast('Deleted', 'info');
                        loadAll();
                      }
                    }}
                    className="text-xs text-rose-600 font-semibold cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {stats && (
          <p className="text-xs text-slate-400">
            System: {stats.activePatients} active patients · {stats.pendingReviews} sessions pending doctor review
          </p>
        )}
      </div>
    </div>
  );
};
