import React, { useMemo, useState } from 'react';
import { useApp } from './AppContext';
import { Search, Calendar, ShieldCheck, X, CheckCircle2 } from 'lucide-react';

type Cat = 'all' | 'ortho' | 'neuro' | 'spine' | 'geriatric' | 'cardio';

interface ConditionItem {
  id: string;
  name: string;
  category: Exclude<Cat, 'all'>;
  summary: string;
  timeline: string;
  pmrFocus: string;
}

const CONDITIONS: ConditionItem[] = [
  { id: 'tkr', name: 'Total Knee Replacement', category: 'ortho', summary: 'Restore extension and flexion, protect the wound, and rebuild walking confidence at home.', timeline: '3–6 weeks', pmrFocus: 'Day 7 · 14 · 21 flexion and lag audits' },
  { id: 'thr', name: 'Total Hip Replacement', category: 'ortho', summary: 'Hip precautions, safe transfers, and progressive walking under clear medical guidance.', timeline: '4–8 weeks', pmrFocus: 'Precaution clearance and gait review' },
  { id: 'acl', name: 'ACL / Meniscus Reconstruction', category: 'ortho', summary: 'Protect the graft while restoring extension, strength and controlled loading.', timeline: 'Phase-based', pmrFocus: 'Milestone load progression' },
  { id: 'rotator', name: 'Rotator Cuff Repair', category: 'ortho', summary: 'Protected mobility, then staged strength without irritating the repair.', timeline: '6–12 weeks', pmrFocus: 'Range and irritability checks' },
  { id: 'spine-op', name: 'Spine Surgery Recovery', category: 'ortho', summary: 'Safe mobility, core control and graded return to daily activity.', timeline: '4–8 weeks', pmrFocus: 'Neurological red-flag watch' },
  { id: 'orif', name: 'Fracture Fixation (ORIF)', category: 'ortho', summary: 'Joint mobility, oedema control and progressive weight-bearing as cleared.', timeline: 'Variable', pmrFocus: 'Healing-stage alignment' },
  { id: 'stroke', name: 'Stroke Rehabilitation', category: 'neuro', summary: 'Early mobility, tone management and functional independence training at home.', timeline: '8–12+ weeks', pmrFocus: 'Neuro stage audits' },
  { id: 'parkinson', name: "Parkinson's Mobility", category: 'neuro', summary: 'Gait cues, balance practice and fall-risk reduction in the home environment.', timeline: 'Ongoing', pmrFocus: 'Motor strategy review' },
  { id: 'bells', name: "Bell's Palsy Support", category: 'neuro', summary: 'Facial mobility guidance and eye-care awareness with specialist oversight.', timeline: '4–12 weeks', pmrFocus: 'Recovery trajectory check' },
  { id: 'sci', name: 'Spinal Cord Injury Support', category: 'neuro', summary: 'Positioning, transfers and secondary-complication awareness at home.', timeline: 'Long-term', pmrFocus: 'Complication surveillance' },
  { id: 'neuropathy', name: 'Peripheral Neuropathy Mobility', category: 'neuro', summary: 'Balance, foot care education and safe walking strategies.', timeline: 'Ongoing', pmrFocus: 'Fall-risk focus' },
  { id: 'sciatica', name: 'Sciatica / Disc-related Pain', category: 'spine', summary: 'Pain-centralisation strategies, graded activity and posture coaching.', timeline: '3–6 weeks', pmrFocus: 'Symptom response audits' },
  { id: 'cervical', name: 'Cervical Spondylosis', category: 'spine', summary: 'Neck mobility, posture and activity modification with clear stop rules.', timeline: '3–6 weeks', pmrFocus: 'Radicular symptom watch' },
  { id: 'knee-oa', name: 'Knee Osteoarthritis', category: 'spine', summary: 'Strength, load management and walking tolerance without flare-ups.', timeline: '4–8 weeks', pmrFocus: 'Function-focused plan' },
  { id: 'frozen', name: 'Frozen Shoulder', category: 'spine', summary: 'Phased mobility matched to irritability, not forced stretching.', timeline: '5–10 weeks', pmrFocus: 'Stage-matched protocol' },
  { id: 'lbp', name: 'Mechanical Low Back Pain', category: 'spine', summary: 'Movement confidence, core endurance and return to work tasks.', timeline: '3–6 weeks', pmrFocus: 'Red-flag screening' },
  { id: 'falls', name: 'Fall Prevention (Elderly)', category: 'geriatric', summary: 'Balance, strength and home hazard awareness for safer independence.', timeline: '6 weeks+', pmrFocus: 'Multi-factor risk review' },
  { id: 'frailty', name: 'Sarcopenia / Frailty Support', category: 'geriatric', summary: 'Progressive strength and endurance appropriate for older adults.', timeline: 'Ongoing', pmrFocus: 'Load tolerance monitoring' },
  { id: 'post-hosp', name: 'Post-Hospital Deconditioning', category: 'geriatric', summary: 'Rebuild stamina, transfers and confidence after a hospital stay.', timeline: '4–8 weeks', pmrFocus: 'Medical stability checks' },
  { id: 'cabg', name: 'Post-Cardiac Surgery Support', category: 'cardio', summary: 'Sternal precautions, graded walking and breathing strategies as advised.', timeline: '6–12 weeks', pmrFocus: 'Cardiac precaution adherence' },
  { id: 'copd', name: 'COPD / Chest Physio Support', category: 'cardio', summary: 'Breathing techniques, secretion clearance education and activity pacing.', timeline: 'Ongoing', pmrFocus: 'Symptom escalation rules' },
  { id: 'icu', name: 'Post-ICU Recovery', category: 'cardio', summary: 'Strength, breathing and functional mobility after critical illness.', timeline: 'Variable', pmrFocus: 'Multi-system recovery plan' },
];

const CATS: { id: Cat; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ortho', label: 'Post-op ortho' },
  { id: 'neuro', label: 'Neuro' },
  { id: 'spine', label: 'Spine & joints' },
  { id: 'geriatric', label: 'Geriatric' },
  { id: 'cardio', label: 'Cardio / ICU' },
];

export const ConditionsTreatedSection: React.FC = () => {
  const { openModal } = useApp();
  const [cat, setCat] = useState<Cat>('all');
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<ConditionItem | null>(null);

  const filtered = useMemo(() => {
    return CONDITIONS.filter((c) => {
      if (cat !== 'all' && c.category !== cat) return false;
      if (!q.trim()) return true;
      const s = q.toLowerCase();
      return c.name.toLowerCase().includes(s) || c.summary.toLowerCase().includes(s);
    });
  }, [cat, q]);

  return (
    <section id="conditions-treated" className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
            Conditions
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
            Home rehabilitation pathways we support
          </h2>
          <p className="text-[15px] text-slate-600 mt-3 leading-relaxed">
            Structured plans with Physiatrist oversight — not a generic exercise list alone.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search conditions…"
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-8">
          {CATS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                cat === c.id
                  ? 'bg-teal-700 text-white border-teal-700'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-teal-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected(c)}
              className="text-left bg-slate-50 hover:bg-white border border-slate-100 hover:border-teal-200 hover:shadow-sm rounded-2xl p-5 transition cursor-pointer"
            >
              <div className="text-[11px] font-semibold uppercase tracking-wide text-teal-700 mb-1.5">
                {CATS.find((x) => x.id === c.category)?.label}
              </div>
              <h3 className="text-[15px] font-semibold text-slate-900 mb-1.5">{c.name}</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed line-clamp-3">{c.summary}</p>
              <div className="mt-3 text-[12px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                {c.timeline}
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-10">No conditions match your search.</p>
        )}

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => openModal('book')}
            className="inline-flex items-center gap-2 px-5 py-3 bg-teal-700 hover:bg-teal-800 text-white text-[14px] font-semibold rounded-xl cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Book assessment for your condition
          </button>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40" onClick={() => setSelected(null)}>
          <div
            className="bg-white rounded-2xl max-w-lg w-full shadow-xl border border-slate-200 p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-teal-700">
                  {CATS.find((x) => x.id === selected.category)?.label}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selected.name}</h3>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <p className="text-[14px] text-slate-600 leading-relaxed">{selected.summary}</p>
            <div className="space-y-2 text-[13px]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span><strong className="text-slate-800">Typical pathway:</strong> {selected.timeline}</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span><strong className="text-slate-800">PMR focus:</strong> {selected.pmrFocus}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelected(null);
                openModal('book');
              }}
              className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-[14px] rounded-xl cursor-pointer"
            >
              Book assessment
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
