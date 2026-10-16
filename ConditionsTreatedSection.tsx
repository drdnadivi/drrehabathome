import React, { useMemo, useState } from 'react';
import { useApp } from './AppContext';
import { Search, Calendar, ShieldCheck, X, CheckCircle2, Briefcase, Activity, Clock } from 'lucide-react';

type Cat = 'all' | 'ortho' | 'neuro' | 'spine' | 'sports' | 'geriatric' | 'cardio' | 'womens' | 'other';

interface ConditionItem {
  id: string;
  name: string;
  category: Exclude<Cat, 'all'>;
  summary: string;
  timeline: string;
  pmrFocus: string;
  protocol: string[];
  equipment: string[];
}

const CONDITIONS: ConditionItem[] = [
  {
    id: 'tkr',
    name: 'Total Knee Replacement',
    category: 'ortho',
    summary: 'Prevent stiffness, restore extension and flexion, and rebuild safe walking at home.',
    timeline: '3–6 weeks',
    pmrFocus: 'Day 7 wound & lag check · Day 14 90° flexion audit · Day 21 stair readiness',
    protocol: [
      'Patellar glides and heel slides',
      'Quad sets and terminal extension work',
      'Gait progression: walker → stick → independent',
      'Stair practice when cleared',
    ],
    equipment: ['Digital goniometer', 'TheraBand', 'Ankle weights', 'NMES unit', 'Cryotherapy pack'],
  },
  {
    id: 'thr',
    name: 'Total Hip Replacement',
    category: 'ortho',
    summary: 'Hip precautions, safe transfers, glute activation, and progressive walking.',
    timeline: '4–8 weeks',
    pmrFocus: 'Precaution adherence · abductor loading clearance · gait quality review',
    protocol: [
      'Precaution-safe mobility drills',
      'Glute sets and controlled abduction',
      'Sit-to-stand with height strategy',
      'Progressive weight-bearing walking',
    ],
    equipment: ['Goniometer', 'Loop bands', 'Cryotherapy wrap', 'Vitals kit'],
  },
  {
    id: 'acl',
    name: 'ACL / Meniscus Reconstruction',
    category: 'ortho',
    summary: 'Protect the graft while restoring extension, strength and controlled loading.',
    timeline: 'Phase-based',
    pmrFocus: 'Extension recovery · swelling control · phase load authorisation',
    protocol: [
      'Full extension priority early',
      'Quad activation without graft stress',
      'Graded closed-chain loading',
      'Return-to-activity criteria later',
    ],
    equipment: ['Goniometer', 'Biofeedback cues', 'Resistance bands', 'Cryo pack'],
  },
  {
    id: 'rotator',
    name: 'Rotator Cuff Repair',
    category: 'ortho',
    summary: 'Protected mobility first, then staged strength without irritating the repair.',
    timeline: '6–12 weeks',
    pmrFocus: 'Range vs irritability · sleep posture · strength phase clearance',
    protocol: [
      'Protected passive / assisted range',
      'Scapular control drills',
      'Graded active elevation',
      'Eccentric cuff loading when ready',
    ],
    equipment: ['Goniometer', 'Wand / stick', 'Light bands', 'Ice pack'],
  },
  {
    id: 'spine-op',
    name: 'Spine Surgery Recovery',
    category: 'ortho',
    summary: 'Safe mobility, core control and graded return to daily activity.',
    timeline: '4–8 weeks',
    pmrFocus: 'Neurological red-flag watch · sitting tolerance · lifting rules',
    protocol: [
      'Log-roll and safe transfers',
      'Walking programme',
      'Gentle core activation',
      'Ergonomic return-to-task coaching',
    ],
    equipment: ['Vitals kit', 'Resistance bands', 'Posture cues', 'Timer for pacing'],
  },
  {
    id: 'orif',
    name: 'Fracture Fixation (ORIF)',
    category: 'ortho',
    summary: 'Joint mobility, swelling control and progressive weight-bearing as cleared.',
    timeline: 'Variable',
    pmrFocus: 'Healing-stage loading · joint stiffness prevention',
    protocol: [
      'Adjacent joint mobility',
      'Oedema management',
      'Protected strengthening',
      'Gait with prescribed aids',
    ],
    equipment: ['Goniometer', 'Compression wrap', 'Bands', 'Gait belt if needed'],
  },
  {
    id: 'stroke',
    name: 'Stroke Rehabilitation',
    category: 'neuro',
    summary: 'Early mobility, tone management and functional independence training at home.',
    timeline: '8–12+ weeks',
    pmrFocus: 'Tone / positioning · stage-based goals · shoulder protection',
    protocol: [
      'Bed mobility and transfers',
      'Tone-inhibiting positioning',
      'Task practice for arm / leg',
      'Balance and walking progression',
    ],
    equipment: ['NMES unit', 'Positioning pillows', 'Balance tools', 'Gait belt'],
  },
  {
    id: 'parkinson',
    name: "Parkinson's Mobility",
    category: 'neuro',
    summary: 'Gait cues, amplitude training and fall-risk reduction in the home.',
    timeline: 'Ongoing',
    pmrFocus: 'Motor strategy review · dual-task safety',
    protocol: [
      'Big-movement practice',
      'Cueing for gait initiation',
      'Turn and transfer strategy',
      'Home fall-risk coaching',
    ],
    equipment: ['Metronome / cue tools', 'Resistance bands', 'Chair for support work'],
  },
  {
    id: 'bells',
    name: "Bell's Palsy Support",
    category: 'neuro',
    summary: 'Facial mobility guidance and eye-care awareness with specialist oversight.',
    timeline: '4–12 weeks',
    pmrFocus: 'Recovery trajectory · synkinesis watch',
    protocol: [
      'Gentle facial mobility',
      'Eye protection education',
      'Symmetry awareness drills',
      'Pacing to avoid overwork',
    ],
    equipment: ['Mirror for feedback', 'Soft manual therapy tools'],
  },
  {
    id: 'sci',
    name: 'Spinal Cord Injury Support',
    category: 'neuro',
    summary: 'Positioning, transfers and secondary-complication awareness at home.',
    timeline: 'Long-term',
    pmrFocus: 'Skin / tone / respiratory watch · equipment fit',
    protocol: [
      'Pressure relief routines',
      'Transfer practice',
      'Range maintenance',
      'Caregiver training',
    ],
    equipment: ['Transfer board if indicated', 'Range tools', 'Positioning aids'],
  },
  {
    id: 'neuropathy',
    name: 'Peripheral Neuropathy Mobility',
    category: 'neuro',
    summary: 'Balance, foot care education and safe walking strategies.',
    timeline: 'Ongoing',
    pmrFocus: 'Fall-risk and sensory compensation strategies',
    protocol: [
      'Balance progression',
      'Foot inspection education',
      'Safe footwear advice',
      'Walking endurance pacing',
    ],
    equipment: ['Balance pad', 'Resistance bands', 'Gait assessment tools'],
  },
  {
    id: 'sciatica',
    name: 'Sciatica / Disc-related Pain',
    category: 'spine',
    summary: 'Directional preference, graded activity and posture coaching.',
    timeline: '3–6 weeks',
    pmrFocus: 'Symptom centralisation response · red-flag screening',
    protocol: [
      'Repeated movement testing response',
      'Sitting / standing load management',
      'Nerve mobility as appropriate',
      'Return-to-walk programme',
    ],
    equipment: ['Treatment plinth alternatives at home', 'Bands', 'Heat/ice as advised'],
  },
  {
    id: 'cervical',
    name: 'Cervical Spondylosis',
    category: 'spine',
    summary: 'Neck mobility, posture and activity modification with clear stop rules.',
    timeline: '3–6 weeks',
    pmrFocus: 'Radicular symptom watch · desk ergonomics',
    protocol: [
      'Gentle cervical mobility',
      'Scapular endurance',
      'Workstation coaching',
      'Sleep posture advice',
    ],
    equipment: ['Towel rolls / posture props', 'Light bands'],
  },
  {
    id: 'knee-oa',
    name: 'Knee Osteoarthritis',
    category: 'ortho',
    summary: 'Strength, load management and walking tolerance without flare-ups.',
    timeline: '4–8 weeks',
    pmrFocus: 'Function-focused goals · flare management rules',
    protocol: [
      'Quad and hip strength',
      'Sit-to-stand practice',
      'Walking dosage plan',
      'Activity pacing',
    ],
    equipment: ['Bands', 'Ankle weights', 'Goniometer', 'Ice pack'],
  },
  {
    id: 'frozen',
    name: 'Frozen Shoulder',
    category: 'ortho',
    summary: 'Phase-matched mobility — not aggressive stretching into high irritability.',
    timeline: '5–10 weeks',
    pmrFocus: 'Stage and irritability matching · sleep disruption control',
    protocol: [
      'Pain-calibrated mobility',
      'Scapular mechanics',
      'Functional reach practice',
      'Strength when calm enough',
    ],
    equipment: ['Goniometer', 'Wand', 'Bands', 'Heat/ice'],
  },
  {
    id: 'lbp',
    name: 'Mechanical Low Back Pain',
    category: 'spine',
    summary: 'Movement confidence, core endurance and return to work tasks.',
    timeline: '3–6 weeks',
    pmrFocus: 'Red-flag screening · graded exposure to feared movements',
    protocol: [
      'Pain education and pacing',
      'Core endurance drills',
      'Hip mobility as needed',
      'Work-task simulation',
    ],
    equipment: ['Bands', 'Timer', 'Simple home props'],
  },
  {
    id: 'falls',
    name: 'Fall Prevention (Elderly)',
    category: 'geriatric',
    summary: 'Balance, strength and home hazard awareness for safer independence.',
    timeline: '6 weeks+',
    pmrFocus: 'Multi-factor fall risk · medication / vision awareness discussion',
    protocol: [
      'Static and dynamic balance',
      'Sit-to-stand strength',
      'Dual-task walking',
      'Home hazard walk-through',
    ],
    equipment: ['Balance pad', 'Chair support', 'Resistance bands', 'Gait belt'],
  },
  {
    id: 'frailty',
    name: 'Sarcopenia / Frailty Support',
    category: 'geriatric',
    summary: 'Progressive strength and endurance appropriate for older adults.',
    timeline: 'Ongoing',
    pmrFocus: 'Load tolerance · recovery between sessions',
    protocol: [
      'Sit-to-stand progressions',
      'Light resistance training',
      'Walking dosage',
      'Energy conservation tips',
    ],
    equipment: ['Bands', 'Light weights', 'Vitals kit'],
  },
  {
    id: 'post-hosp',
    name: 'Post-Hospital Deconditioning',
    category: 'geriatric',
    summary: 'Rebuild stamina, transfers and confidence after a hospital stay.',
    timeline: '4–8 weeks',
    pmrFocus: 'Medical stability · readmission risk factors',
    protocol: [
      'Transfer independence',
      'Walking endurance',
      'Breathing and pacing',
      'Family education',
    ],
    equipment: ['Pulse oximeter', 'Gait belt', 'Bands'],
  },
  {
    id: 'cabg',
    name: 'Post-Cardiac Surgery Support',
    category: 'cardio',
    summary: 'Sternal precautions, graded walking and breathing strategies as advised.',
    timeline: '6–12 weeks',
    pmrFocus: 'Precaution adherence · symptom-limited progression',
    protocol: [
      'Sternal-safe mobility',
      'Graded walking plan',
      'Breathing exercises',
      'Activity diary coaching',
    ],
    equipment: ['Pulse oximeter', 'BP monitor', 'Incentive spirometer guidance tools'],
  },
  {
    id: 'copd',
    name: 'COPD / Chest Physio Support',
    category: 'cardio',
    summary: 'Breathing techniques, secretion strategies and activity pacing.',
    timeline: 'Ongoing',
    pmrFocus: 'Exacerbation warning signs · energy conservation',
    protocol: [
      'Breathing pattern training',
      'Airway clearance education',
      'Paced walking',
      'Recovery positioning',
    ],
    equipment: ['Pulse oximeter', 'Timing tools', 'Positioning supports'],
  },
  {
    id: 'icu',
    name: 'Post-ICU Recovery',
    category: 'cardio',
    summary: 'Strength, breathing and functional mobility after critical illness.',
    timeline: 'Variable',
    pmrFocus: 'Multi-system recovery plan · fatigue management',
    protocol: [
      'Bed to chair progression',
      'Strength rebuilding',
      'Breathing recovery',
      'Cognitive-motor simple tasks as needed',
    ],
    equipment: ['Pulse oximeter', 'Bands', 'Gait belt', 'Vitals kit'],
  },,

  {
    id: 'sports-sprain',
    name: 'Sports Injury — Sprain / Strain',
    category: 'sports',
    summary: 'Ankle, knee, hamstring and muscle injuries with graded return-to-play planning.',
    timeline: '2–8 weeks',
    pmrFocus: 'Tissue healing stage · load progression · return-to-sport criteria',
    protocol: [
      'Acute protection and swelling control',
      'Range and activation recovery',
      'Strength and proprioception',
      'Sport-specific drills when cleared',
    ],
    equipment: ['Resistance bands', 'Balance pad', 'Goniometer', 'Ice pack'],
  },
  {
    id: 'sports-ligament',
    name: 'Sports Ligament Injury (Non-op / Post-op)',
    category: 'sports',
    summary: 'ACL, MCL, ankle ligament pathways with criteria-based progression.',
    timeline: 'Phase-based',
    pmrFocus: 'Graft / ligament protection · strength symmetry · hop/test readiness',
    protocol: [
      'Early range and swelling control',
      'Quad and hip strength bias',
      'Neuromuscular control',
      'Graded field or court return',
    ],
    equipment: ['Goniometer', 'Bands', 'Ankle weights', 'Agility markers'],
  },
  {
    id: 'sports-overuse',
    name: 'Overuse / Tendinopathy (Runner, Gym, Racquet)',
    category: 'sports',
    summary: 'Achilles, patellar, tennis elbow and similar load-management programmes.',
    timeline: '4–12 weeks',
    pmrFocus: 'Load audit · isometric to heavy slow resistance progression',
    protocol: [
      'Pain-monitoring rules',
      'Isometric loading when indicated',
      'Heavy slow resistance as tolerated',
      'Training volume coaching',
    ],
    equipment: ['Resistance bands', 'Weights as available', 'Timer'],
  },
  {
    id: 'sports-postop',
    name: 'Post-op Sports Orthopaedics',
    category: 'sports',
    summary: 'Home phase after sports surgeries with surgeon-aligned milestones.',
    timeline: 'Variable',
    pmrFocus: 'Protocol adherence · complication watch · clearance gates',
    protocol: [
      'Phase-matched mobility',
      'Strength rebuild',
      'Functional testing readiness',
      'Return-to-training plan',
    ],
    equipment: ['Goniometer', 'NMES if indicated', 'Bands', 'Cryotherapy'],
  },
  {
    id: 'tbi',
    name: 'Brain Injury / Concussion Support',
    category: 'neuro',
    summary: 'Graded activity, balance and symptom-guided return under medical oversight.',
    timeline: 'Variable',
    pmrFocus: 'Symptom threshold · vestibular/balance · return-to-activity rules',
    protocol: [
      'Sub-symptom activity pacing',
      'Balance and gaze stability as indicated',
      'Graded physical activity',
      'Education for patient and family',
    ],
    equipment: ['Balance tools', 'Metronome / visual targets'],
  },
  {
    id: 'ms',
    name: 'Multiple Sclerosis Mobility Support',
    category: 'neuro',
    summary: 'Fatigue-aware strength, balance and walking programmes at home.',
    timeline: 'Ongoing',
    pmrFocus: 'Fatigue management · heat sensitivity · fall risk',
    protocol: [
      'Energy-conservation coaching',
      'Strength in short bouts',
      'Balance practice',
      'Mobility aid advice',
    ],
    equipment: ['Bands', 'Balance pad', 'Chair support'],
  },
  {
    id: 'gb',
    name: 'Guillain-Barré / ICU Weakness Recovery',
    category: 'neuro',
    summary: 'Graded strengthening and functional recovery after severe weakness.',
    timeline: 'Months',
    pmrFocus: 'Overwork avoidance · respiratory awareness · staged goals',
    protocol: [
      'Gentle progressive loading',
      'Transfer and gait rebuild',
      'Endurance pacing',
      'Caregiver training',
    ],
    equipment: ['Gait belt', 'Bands', 'Positioning aids'],
  },
  {
    id: 'spondylolisthesis',
    name: 'Spondylolisthesis / Stenosis Mobility',
    category: 'spine',
    summary: 'Flexion- or extension-biased programmes matched to symptom response.',
    timeline: '4–8 weeks',
    pmrFocus: 'Directional preference · neurogenic claudication watch',
    protocol: [
      'Symptom-guided positions',
      'Core and hip endurance',
      'Walking tolerance plan',
      'Activity modification',
    ],
    equipment: ['Bands', 'Timer', 'Heat/ice as advised'],
  },
  {
    id: 'cardiac',
    name: 'Cardiac Rehab Support (Home Phase)',
    category: 'cardio',
    summary: 'Monitored activity progression after cardiac events when medically cleared.',
    timeline: '4–12 weeks',
    pmrFocus: 'Heart-rate / symptom rules · risk stratification with physician',
    protocol: [
      'Warm-up and cool-down education',
      'Graded walking programme',
      'Light resistance when cleared',
      'Warning-sign education',
    ],
    equipment: ['Pulse oximeter', 'BP monitor', 'Timer'],
  },
  {
    id: 'pulmonary',
    name: 'Pulmonary / COPD Conditioning',
    category: 'cardio',
    summary: 'Breathing strategies, airway clearance support and activity tolerance.',
    timeline: 'Ongoing',
    pmrFocus: 'Dyspnoea scale · oxygen guidance as prescribed · infection watch',
    protocol: [
      'Breathing pattern training',
      'Paced walking',
      'Upper limb endurance',
      'Energy conservation',
    ],
    equipment: ['Pulse oximeter', 'Incentive spirometer if prescribed', 'Timer'],
  },
  {
    id: 'post-covid',
    name: 'Post-COVID / Long-COVID Recovery',
    category: 'cardio',
    summary: 'Fatigue-aware reconditioning and breathlessness management at home.',
    timeline: 'Variable',
    pmrFocus: 'Post-exertional symptom watch · graded return',
    protocol: [
      'Symptom-guided activity',
      'Breathing recovery drills',
      'Strength in short sessions',
      'Daily routine rebuild',
    ],
    equipment: ['Pulse oximeter', 'Bands', 'Timer'],
  },
  {
    id: 'pelvic',
    name: "Women's Health — Pelvic Floor Support",
    category: 'womens',
    summary: 'Education and guided programmes for common pelvic floor concerns (non-invasive home care).',
    timeline: '4–8 weeks',
    pmrFocus: 'Screening for red flags · referral when specialised internal care needed',
    protocol: [
      'Awareness and breathing coordination',
      'Graded activation or down-training as indicated',
      'Posture and load advice',
      'Home routine building',
    ],
    equipment: ['Education materials', 'Timer', 'Positioning cushions'],
  },
  {
    id: 'antenatal',
    name: 'Antenatal / Postnatal Mobility',
    category: 'womens',
    summary: 'Safe mobility, back/pelvic comfort and return-to-activity after delivery.',
    timeline: 'Variable',
    pmrFocus: 'Trimester-safe loading · postnatal recovery timeline',
    protocol: [
      'Pain-calibrated mobility',
      'Core and pelvic support strategies',
      'Lifting and feeding posture advice',
      'Graded return to fitness',
    ],
    equipment: ['Bands', 'Pillows for positioning', 'Timer'],
  },
  {
    id: 'lymphoedema',
    name: 'Lymphoedema / Swelling Support',
    category: 'other',
    summary: 'Education, exercise and compression-aware routines under clinical guidance.',
    timeline: 'Ongoing',
    pmrFocus: 'Infection watch · garment advice coordination',
    protocol: [
      'Skin care education',
      'Decongestive exercise routines',
      'Activity pacing',
      'When to escalate care',
    ],
    equipment: ['Compression as prescribed', 'Elevation supports'],
  },
  {
    id: 'amputee',
    name: 'Amputee Pre / Post Prosthetic Support',
    category: 'other',
    summary: 'Residual limb care education, strength and gait preparation at home.',
    timeline: 'Phase-based',
    pmrFocus: 'Skin integrity · contracture prevention · prosthetic readiness',
    protocol: [
      'Limb positioning and range',
      'Core and remaining-limb strength',
      'Transfer practice',
      'Gait training when appropriate',
    ],
    equipment: ['Soft wraps as advised', 'Bands', 'Gait belt'],
  },
  {
    id: 'prehab',
    name: 'Pre-habilitation (Before Surgery)',
    category: 'ortho',
    summary: 'Build strength and education before knee, hip or other elective surgery.',
    timeline: '2–6 weeks pre-op',
    pmrFocus: 'Baseline function · realistic goals · post-op readiness',
    protocol: [
      'Strength and mobility baseline',
      'Crutch / walker practice',
      'Home safety setup',
      'What to expect after surgery',
    ],
    equipment: ['Bands', 'Goniometer', 'Walking aids practice'],
  },

];

const CATS: { id: Cat; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ortho', label: 'Post-op ortho' },
  { id: 'sports', label: 'Sports rehab' },
  { id: 'neuro', label: 'Neuro' },
  { id: 'spine', label: 'Spine & joints' },
  { id: 'geriatric', label: 'Geriatric' },
  { id: 'cardio', label: 'Cardio / pulmonary' },
  { id: 'womens', label: "Women's health" },
  { id: 'other', label: 'Other pathways' },
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
      return (
        c.name.toLowerCase().includes(s) ||
        c.summary.toLowerCase().includes(s) ||
        c.equipment.some((e) => e.toLowerCase().includes(s))
      );
    });
  }, [cat, q]);

  return (
    <section id="conditions-treated" className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
            Conditions & home kit
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
            Pathways, protocols and equipment we bring
          </h2>
          <p className="text-[15px] text-slate-600 mt-3 leading-relaxed">
            Click any condition to see the home protocol, PMR oversight points, and the portable equipment typically brought to visits.
          </p>
        </div>

        <div className="relative mb-4">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search conditions or equipment (e.g. NMES, goniometer)…"
            className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600"
          />
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
              <p className="text-[13px] text-slate-600 leading-relaxed line-clamp-2 mb-3">{c.summary}</p>
              <div className="flex flex-wrap gap-1.5">
                {c.equipment.slice(0, 3).map((e) => (
                  <span key={e} className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                    {e}
                  </span>
                ))}
                {c.equipment.length > 3 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-100">
                    +{c.equipment.length - 3} more
                  </span>
                )}
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
            Enquire about this pathway
          </button>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/45" onClick={() => setSelected(null)}>
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl border border-slate-200 p-6 space-y-5"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold uppercase mb-1">
                  <Clock className="w-3.5 h-3.5" /> Typical pathway
                </div>
                <div className="font-medium text-slate-800">{selected.timeline}</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold uppercase mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> PMR oversight
                </div>
                <div className="font-medium text-slate-800">{selected.pmrFocus}</div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-800 mb-2">
                <Activity className="w-4 h-4 text-teal-600" />
                Home protocol focus
              </div>
              <ul className="space-y-1.5">
                {selected.protocol.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[13px] text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-800 mb-2">
                <Briefcase className="w-4 h-4 text-teal-600" />
                Equipment we typically bring
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selected.equipment.map((e) => (
                  <span key={e} className="text-[12px] px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-100">
                    {e}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Kit is matched to the pathway and may vary after assessment.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelected(null);
                openModal('book');
              }}
              className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-[14px] rounded-xl cursor-pointer"
            >
              Contact / Enquiry
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
