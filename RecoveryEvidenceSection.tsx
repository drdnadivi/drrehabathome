import React from 'react';
import { useApp } from './AppContext';
import { TrendingUp, Award, Star, CheckCircle2, HeartPulse, Quote, ArrowRight } from 'lucide-react';

export const RecoveryEvidenceSection: React.FC = () => {
  const { switchRole, setSelectedPatientId } = useApp();

  const caseStudies = [
    {
      patientId: 'pat-101',
      name: 'Rajesh Mehta',
      age: 62,
      condition: 'Right Total Knee Replacement',
      surgeon: 'Dr. K. S. Murthy (Orthopedics)',
      baseline: '45° flexion, severe VAS 8/10 pain, unable to bear weight without 2 people assisting',
      outcome: '98° active flexion on Day 18, VAS reduced to 3/10, walking independently with single stick',
      quote: 'I was deathly afraid of my knee freezing up like my neighbor’s did. Because Dr. Dharshan N A reviewed my flexion angles after each home visit and modified my quad exercises, I never had a single setback.',
      trajectoryPercent: 76,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
    },
    {
      patientId: 'pat-102',
      name: 'Sunita Kapoor',
      age: 68,
      condition: 'Subacute Ischemic Stroke (Left Hemiparesis)',
      surgeon: 'Dr. V. Nambiar (Neurology)',
      baseline: 'Bedbound, zero voluntary ankle dorsiflexion, severe calf spasticity (MAS 2+)',
      outcome: 'Brunnstrom Stage 4 achieved, Berg Balance score jumped from 14 to 44, walking 40m without quad cane',
      quote: 'The physiatrist’s guidance was everything. When my left calf started stiffening, Dr. Dharshan immediately introduced tone-inhibiting positioning and CIMT drills that got my foot moving again.',
      trajectoryPercent: 64,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80'
    },
    {
      patientId: 'pat-103',
      name: 'David Chen',
      age: 45,
      condition: 'Post-L4-L5 Microdiscectomy',
      surgeon: 'Dr. Arvind Joshi (Spine Surgery)',
      baseline: 'Severe radiating calf sciatica (VAS 9/10), unable to sit for more than 5 minutes',
      outcome: 'Zero radiating leg numbness, straight leg raise negative to 75°, returned to ergonomic desk work',
      quote: 'Having an MD Physiatrist track whether my pain was centralizing gave me immense confidence. Every visit had clear objective data and doctor sign-offs.',
      trajectoryPercent: 82,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80'
    }
  ];

  const handleInspectDashboard = (patientId: string) => {
    setSelectedPatientId(patientId);
    switchRole('patient');
  };

  return (
    <section id="recovery-proof" className="py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-200/60 px-3 py-1 rounded-full border border-teal-300">
            Real Clinical Outcomes
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
            Evidence-Based Patient Trajectories
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every recovery curve below is verified by our attending PMR Physiatrists through continuous session audits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <div
              key={cs.patientId}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                {/* Patient Header */}
                <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                  <img
                    src={cs.avatar}
                    alt={cs.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-teal-500/20"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{cs.name}, {cs.age}y</h3>
                    <div className="text-[11px] font-semibold text-teal-700">{cs.condition}</div>
                    <div className="text-[10px] text-slate-400">Ref: {cs.surgeon}</div>
                  </div>
                </div>

                {/* Quote */}
                <div className="my-4 relative text-xs text-slate-700 italic bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                  <Quote className="w-4 h-4 text-teal-500/30 absolute top-2 right-2" />
                  "{cs.quote}"
                </div>

                {/* Clinical Before vs After */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-rose-50/70 border border-rose-100 rounded-lg">
                    <span className="text-[10px] font-bold text-rose-800 uppercase block">Baseline Admission:</span>
                    <span className="text-rose-950 font-medium">{cs.baseline}</span>
                  </div>

                  <div className="p-2.5 bg-teal-50/70 border border-teal-100 rounded-lg">
                    <span className="text-[10px] font-bold text-teal-800 uppercase block">Doctor-Audited Milestone:</span>
                    <span className="text-teal-950 font-bold">{cs.outcome}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Trajectory</div>
                  <div className="text-base font-black text-teal-700">{cs.trajectoryPercent}% Achieved</div>
                </div>

                <button
                  onClick={() => handleInspectDashboard(cs.patientId)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  Inspect Dashboard <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
