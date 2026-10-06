import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { X, Calendar, Clock, MapPin, Phone, User, CheckCircle2, Stethoscope, Sparkles } from 'lucide-react';
import { createBooking } from './api';

export const BookAssessmentModal: React.FC = () => {
  const { activeModal, closeModal, modalPayload, showToast, triggerRefresh } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    serviceType: 'Post-Operative Total Knee / Hip Replacement',
    address: '',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredSlot: 'Morning (09:00 AM - 12:00 PM)',
    doctorConsultation: 'In-Home PT Visit + Dr. Dharshan PMR Review & Blueprint',
    symptoms: '',
  });

  useEffect(() => {
    if (activeModal === 'book' && modalPayload) {
      if (modalPayload.serviceType || modalPayload.condition) {
        setFormData(prev => ({
          ...prev,
          serviceType: modalPayload.serviceType || modalPayload.condition || prev.serviceType,
          symptoms: modalPayload.condition ? `Evaluating for: ${modalPayload.condition}` : prev.symptoms
        }));
      }
    }
  }, [activeModal, modalPayload]);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  if (activeModal !== 'book') return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.phone) {
      alert('Please fill in your name and phone number');
      return;
    }

    setSubmitting(true);
    try {
      const res = await createBooking(formData);
      setConfirmedBookingId(res.id);
      setStep(3);
      triggerRefresh();
      showToast('Home assessment scheduled with PMR Physician assignment!', 'success');
    } catch (err) {
      showToast('Failed to schedule assessment. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 to-slate-900 text-white p-6 relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 bg-teal-500/20 text-teal-300 rounded-md">
              <Stethoscope className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300">
              DrRehabAtHome.in — PMR Doctor-Led Home Care
            </span>
          </div>
          <h2 className="text-xl font-bold">Schedule Home Physiotherapy Assessment</h2>
          <p className="text-xs text-slate-300 mt-1">
            Every session outcome is evaluated by our Physical Medicine & Rehabilitation (PMR) doctors.
          </p>

          {/* Step indicator */}
          {step < 3 && (
            <div className="flex items-center gap-2 mt-4 text-xs font-medium">
              <span className={`px-2.5 py-0.5 rounded-full ${step === 1 ? 'bg-teal-500 text-white font-bold' : 'bg-slate-800 text-slate-300'}`}>
                1. Clinical Details
              </span>
              <span className="text-slate-500">→</span>
              <span className={`px-2.5 py-0.5 rounded-full ${step === 2 ? 'bg-teal-500 text-white font-bold' : 'bg-slate-800 text-slate-300'}`}>
                2. Timing & Doctor Preference
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Chandra / Kavita"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98450 00000"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="patient@example.com"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Rehabilitation Condition / Surgery *</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white font-medium text-slate-800"
                >
                  {/* If custom condition from Conditions Treated section */}
                  {![
                    'Post-Operative Total Knee / Hip Replacement',
                    'Stroke & Neurological Rehabilitation',
                    'Lumbar Spine Disc Herniation / Sciatica',
                    'Geriatric Balance, Mobility & Fall Prevention',
                    'Frozen Shoulder & Rotator Cuff Repair',
                    'Post-Cardiopulmonary / ICU Deconditioning'
                  ].includes(formData.serviceType) && (
                    <option value={formData.serviceType}>{formData.serviceType}</option>
                  )}
                  <option value="Post-Operative Total Knee / Hip Replacement">Post-Operative Total Knee / Hip Replacement</option>
                  <option value="Stroke & Neurological Rehabilitation">Stroke & Neurological Hemiplegia Rehab</option>
                  <option value="Lumbar Spine Disc Herniation / Sciatica">Lumbar Spine Disc Herniation & Sciatica</option>
                  <option value="Geriatric Balance, Mobility & Fall Prevention">Geriatric Balance, Mobility & Fall Prevention</option>
                  <option value="Frozen Shoulder & Rotator Cuff Repair">Frozen Shoulder & Rotator Cuff Repair</option>
                  <option value="Post-Cardiopulmonary / ICU Deconditioning">Post-Cardiopulmonary / ICU Deconditioning</option>
                  <option value="ACL / PCL & Meniscus Reconstruction">ACL / PCL & Meniscus Reconstruction</option>
                  <option value="Parkinson's Disease Mobility & Gait Retraining">Parkinson's Disease Mobility & Gait Retraining</option>
                  <option value="Bell's Palsy & Facial Nerve Rehabilitation">Bell's Palsy & Facial Nerve Rehabilitation</option>
                  <option value="Fracture Fixation & ORIF Post-Op">Fracture Fixation & ORIF Post-Op</option>
                  <option value="Other PMR Condition (Triage Required)">Other PMR Condition (Triage Required)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Home Address (City / Locality) *</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House / Flat #, Apartment, Area, City"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="p-3 bg-teal-50/70 border border-teal-200/80 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    Doctor-Directed Rehabilitation Packages
                  </div>
                  <div className="text-[10.5px] text-slate-600 mt-0.5">
                    Includes licensed in-home PT visits, portable modalities & Dr. Dharshan's PMR audits. <strong>5% discount on packages &gt; 1 week.</strong>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-white text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0 shadow-2xs">
                  5% Off Multi-Week
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!formData.patientName || !formData.phone) {
                      alert('Please provide patient name and contact phone number');
                      return;
                    }
                    setStep(2);
                  }}
                  className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-md transition cursor-pointer"
                >
                  Proceed to Schedule & PMR Physician Option →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-900 mb-1">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  Choose Consultation & Assessment Model:
                </div>
                <div className="space-y-2.5 mt-2.5">
                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-teal-300 cursor-pointer hover:border-teal-500 shadow-xs transition">
                    <input
                      type="radio"
                      name="doctorConsultation"
                      value="In-Home PT Visit + Dr. Dharshan PMR Review & Blueprint"
                      checked={formData.doctorConsultation === 'In-Home PT Visit + Dr. Dharshan PMR Review & Blueprint'}
                      onChange={handleChange}
                      className="mt-1 text-teal-600 focus:ring-teal-500"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        In-Home Physiotherapist Visit + Dr. Dharshan's PMR Review & Prescription
                        <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full">Recommended</span>
                      </div>
                      <div className="text-[11.5px] text-slate-600 mt-1 leading-relaxed">
                        Our certified home physiotherapist visits your home, conducts the physical baseline examination, starts therapy sessions immediately, and logs objective vitals & digital goniometry. <strong>Dr. Dharshan N A, MD (PMR)</strong> reviews the case records & discharge summaries to calibrate your ongoing exercise progression and milestone schedule.
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-teal-400 transition">
                    <input
                      type="radio"
                      name="doctorConsultation"
                      value="In-Clinic Physiatrist Consultation (Central OPD) + In-Home PT"
                      checked={formData.doctorConsultation === 'In-Clinic Physiatrist Consultation (Central OPD) + In-Home PT'}
                      onChange={handleChange}
                      className="mt-1 text-teal-600 focus:ring-teal-500"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        In-Clinic Consultation with Dr. Dharshan (Central OPD) + In-Home Physiotherapist
                        <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full">For Ambulatory Patients</span>
                      </div>
                      <div className="text-[11.5px] text-slate-600 mt-1 leading-relaxed">
                        Patient visits Dr. Dharshan at the central clinical OPD for a comprehensive in-person medical evaluation and rehabilitation prescription, followed by ongoing physical therapy visits at your home.
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Time Window</label>
                  <select
                    name="preferredSlot"
                    value={formData.preferredSlot}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white"
                  >
                    <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (02:00 PM - 05:00 PM)">Afternoon (02:00 PM - 05:00 PM)</option>
                    <option value="Evening (05:00 PM - 08:00 PM)">Evening (05:00 PM - 08:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Symptoms / Doctor's Instructions (Optional)</label>
                <textarea
                  name="symptoms"
                  rows={2}
                  value={formData.symptoms}
                  onChange={handleChange}
                  placeholder="e.g. Total knee replacement done 10 days ago. Pain at 6/10, difficulty bending knee past 60 degrees."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-md transition cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Confirming Appointment...' : 'Confirm Assessment Booking'}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Booking Confirmed</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Assessment Scheduled Successfully!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-2">
                  Booking Ref: <strong className="text-slate-900">{confirmedBookingId || 'BK-SUCCESS'}</strong>. Our Clinical PMR Team has assigned a certified physical therapist and assigned <strong className="text-slate-900">Dr. Dharshan N A, MD (PMR)</strong> to oversee your rehabilitation trajectory.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-left text-xs max-w-sm mx-auto space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-semibold text-slate-800">{formData.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled Date:</span>
                  <span className="font-semibold text-slate-800">{formData.preferredDate} ({formData.preferredSlot.split(' ')[0]})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Oversight:</span>
                  <span className="font-semibold text-teal-700">100% PMR Doctor Verified</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Done & Return to Site
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
