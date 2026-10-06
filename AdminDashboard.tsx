import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { ShieldCheck, BookOpen, Plus, Edit, Trash2, Eye, Calendar, Users, Activity, CheckCircle2, Search, Filter } from 'lucide-react';
import { fetchBlogs, deleteBlog, fetchBookings, updateBookingStatus, fetchPatients, fetchStats } from './api';
import { Blog, Booking, Patient, SystemStats } from './types';

export const AdminDashboard: React.FC = () => {
  const { openModal, refreshCount, showToast } = useApp();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [activeTab, setActiveTab] = useState<'blogs' | 'bookings' | 'patients'>('blogs');
  const [blogSearch, setBlogSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    try {
      setLoading(true);
      const [b, bk, p, s] = await Promise.all([
        fetchBlogs(),
        fetchBookings(),
        fetchPatients(),
        fetchStats()
      ]);
      setBlogs(b);
      setBookings(bk);
      setPatients(p);
      setStats(s);
    } catch (e) {
      console.error(e);
      showToast('Error loading admin portal', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, [refreshCount]);

  const handleDeleteBlog = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteBlog(id);
        showToast('Blog article deleted', 'info');
        loadAll();
      } catch (e) {
        showToast('Failed to delete blog', 'error');
      }
    }
  };

  const handleBookingStatusChange = async (id: string, status: string) => {
    try {
      await updateBookingStatus(id, status);
      showToast(`Booking marked as ${status}`, 'success');
      loadAll();
    } catch (e) {
      showToast('Failed to update booking status', 'error');
    }
  };

  const filteredBlogs = blogs.filter(b =>
    b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
    b.category.toLowerCase().includes(blogSearch.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-600/50 border border-amber-400/40 p-1 flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Platform Operations Console
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Admin Access
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Dr. Sameer Verma — Clinical Admin
              </h1>
              <p className="text-xs text-slate-300">
                Manage Dynamic Blogs, Booking Inquiries, PMR Doctor Audits & Care Operations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openModal('blog_editor')}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Publish Dynamic Blog
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">Dynamic Blogs</div>
            <div className="text-2xl font-black text-amber-600 mt-1">{blogs.length} Articles</div>
            <div className="text-[11px] text-slate-500 mt-0.5">PMR & Physiatry Resources</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">Active Bookings</div>
            <div className="text-2xl font-black text-teal-600 mt-1">{bookings.length} Requests</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Home Assessment Leads</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">Under Care</div>
            <div className="text-2xl font-black text-indigo-600 mt-1">{patients.length} Active Patients</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Neuro & Orthopedic Rehab</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">PMR Review Compliance</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">100% Audit</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Physiatrist Sign-off SLA</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 space-x-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'blogs'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Dynamic Blogs CMS ({blogs.length})
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'bookings'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Assessment Bookings ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab('patients')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'patients'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            Patient Admissions ({patients.length})
          </button>
        </div>

        {/* Tab 1: Dynamic Blogs CMS */}
        {activeTab === 'blogs' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search articles by title or specialty..."
                  value={blogSearch}
                  onChange={e => setBlogSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 bg-slate-50 focus:bg-white"
                />
              </div>

              <button
                onClick={() => openModal('blog_editor')}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                New Blog Post
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                  <tr>
                    <th className="p-3.5">Title & Lead</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Author</th>
                    <th className="p-3.5">Views</th>
                    <th className="p-3.5">Published</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBlogs.map(blog => (
                    <tr key={blog.id} className="hover:bg-slate-50/70 transition">
                      <td className="p-3.5 max-w-sm">
                        <div className="font-bold text-slate-900 line-clamp-1">{blog.title}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{blog.summary}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                          {blog.category}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-800">{blog.author?.name}</div>
                        <div className="text-[10px] text-slate-400">{blog.author?.title}</div>
                      </td>
                      <td className="p-3.5 text-slate-600">
                        <span className="flex items-center gap-1 font-semibold">
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                          {blog.views || 1}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500 text-[11px]">
                        {blog.publishedAt}
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openModal('blog_reader', blog)}
                            title="Preview article"
                            className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openModal('blog_editor', blog)}
                            title="Edit article"
                            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog.id, blog.title)}
                            title="Delete article"
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Bookings */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                In-Home Assessment Requests & Physician Allocation
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Prospective patients who booked home physiotherapy visits.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {bookings.map(b => (
                <div key={b.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{b.patientName}</span>
                      <span className="text-slate-500">({b.phone})</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${b.status === 'Confirmed' ? 'bg-teal-50 text-teal-800' : 'bg-amber-50 text-amber-800'}`}>
                        {b.status}
                      </span>
                    </div>
                    <div className="text-slate-600">
                      <strong>Program:</strong> {b.serviceType} | <strong>Model:</strong> {b.doctorConsultation}
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      <strong>Address:</strong> {b.address} | <strong>Date:</strong> {b.preferredDate} ({b.preferredSlot})
                    </div>
                    {b.symptoms && (
                      <div className="text-slate-600 bg-slate-50 p-2 rounded text-[11px] italic">
                        "{b.symptoms}"
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {b.status !== 'Assigned to Care Team' ? (
                      <button
                        onClick={() => handleBookingStatusChange(b.id, 'Assigned to Care Team')}
                        className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg text-xs cursor-pointer shadow-xs"
                      >
                        Assign PT & PMR Doctor
                      </button>
                    ) : (
                      <span className="text-teal-700 font-bold flex items-center gap-1 text-xs">
                        <CheckCircle2 className="w-4 h-4" /> Assigned
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Patient Admissions */}
        {activeTab === 'patients' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Active Rehabilitation Admissions
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {patients.map(p => (
                <div key={p.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="font-bold text-sm text-slate-900">{p.name} ({p.age}y {p.gender})</div>
                    <div className="text-slate-600 mt-0.5">{p.diagnosis}</div>
                    <div className="text-slate-500 text-[11px] mt-1">
                      Attending PMR: <strong>{p.assignedDoctor}</strong> | PT: <strong>{p.assignedTherapist}</strong>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Recovery Trajectory</div>
                      <div className="font-black text-lg text-teal-600">{p.recoveryScore}%</div>
                    </div>
                    <button
                      onClick={() => openModal('clinical_report', { patient: p, sessions: [] })}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 font-semibold cursor-pointer"
                    >
                      View Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
