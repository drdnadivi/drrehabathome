import React, { useState, useMemo } from 'react';
import { useApp } from './AppContext';
import {
  Stethoscope,
  Search,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  Zap,
  Clock,
  Briefcase,
  AlertCircle,
  PhoneCall,
  Check,
  X,
  FileText,
  Percent
} from 'lucide-react';

interface ConditionItem {
  id: string;
  name: string;
  category: 'ortho' | 'neuro' | 'spine' | 'geriatric' | 'cardio' | 'sports';
  categoryLabel: string;
  stage: string;
  summary: string;
  homeProtocol: string[];
  equipmentBrought: string[];
  pmrOversight: string;
  recoveryTimeline: string;
  severityLevel: 'Post-Surgical' | 'Acute / Subacute' | 'Chronic / Progressive';
}

export const ConditionsTreatedSection: React.FC = () => {
  const { openModal } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedConditionModal, setSelectedConditionModal] = useState<ConditionItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Conditions', icon: Layers, count: 22 },
    { id: 'ortho', label: 'Post-Op Orthopedic', icon: ShieldCheck, count: 6 },
    { id: 'neuro', label: 'Neurology & Stroke', icon: Activity, count: 5 },
    { id: 'spine', label: 'Spine & Joint Pain', icon: Zap, count: 5 },
    { id: 'geriatric', label: 'Geriatric & Mobility', icon: Sparkles, count: 3 },
    { id: 'cardio', label: 'Cardiopulmonary & ICU', icon: Stethoscope, count: 3 },
  ];

  const conditionsList: ConditionItem[] = [
    // 1. Post-Op Orthopedic
    {
      id: 'tkr',
      name: 'Total Knee Replacement (TKR / TKA)',
      category: 'ortho',
      categoryLabel: 'Post-Op Orthopedic',
      stage: 'Day 1 Post-Discharge to Week 8',
      severityLevel: 'Post-Surgical',
      summary: 'Preventing arthrofibrosis scar adhesions, eliminating quadriceps extensor lag, and restoring 0° to 115° knee flexion.',
      homeProtocol: [
        'Passive patellar glides (superior/inferior) to free kneecap',
        'Active-assisted heel slides with slider board',
        'Terminal knee extension over bolster + isometric quad sets',
        'Gait weaning: walker -> elbow crutches -> unassisted walking',
        'Reciprocal stair ascending & descending training'
      ],
      equipmentBrought: ['Digital Goniometer', 'TheraBand Green/Blue', '1-2kg Ankle Cuffs', 'NMES Stimulator', 'Cryo-Pack'],
      pmrOversight: 'Dr. Dharshan audits Day 7 wound integrity, Day 14 90° flexion benchmark, and Day 21 stair readiness.',
      recoveryTimeline: '3 to 6 Weeks'
    },
    {
      id: 'thr',
      name: 'Total Hip Replacement (THR / THA)',
      category: 'ortho',
      categoryLabel: 'Post-Op Orthopedic',
      stage: 'Day 1 Post-Discharge to Week 8',
      severityLevel: 'Post-Surgical',
      summary: 'Strict posterior/anterior hip precaution enforcement, gluteus medius reactivation, and Trendelenburg limp correction.',
      homeProtocol: [
        'Hip precaution adherence (preventing >90° flexion & internal rotation)',
        'Isometric gluteal setting & supine heel slides within safe arc',
        'Side-lying & standing hip abduction with manual stabilization',
        'Sit-to-stand mechanics with raised commode / chair adjustments',
        'Progressive weight-bearing ambulation with posture re-education'
      ],
      equipmentBrought: ['Goniometer', 'Loop Bands', 'Cryotherapy Wrap', 'Vitals Diagnostic Kit'],
      pmrOversight: 'Dr. Dharshan reviews post-surgical x-ray prosthetic alignment and approves progressive abductor loading.',
      recoveryTimeline: '4 to 8 Weeks'
    },
    {
      id: 'acl',
      name: 'ACL / PCL & Meniscus Reconstruction',
      category: 'ortho',
      categoryLabel: 'Post-Op Orthopedic',
      stage: 'Phase 1 to Phase 3 Rehab',
      severityLevel: 'Post-Surgical',
      summary: 'Protecting fragile surgical graft while rapidly restoring terminal knee extension and preventing hamstring donor site inhibition.',
      homeProtocol: [
        'Immediate full active terminal extension restoration (0° hyperextension)',
        'NMES-augmented isometric quad contractions to combat arthrogenic inhibition',
        'Patellar tendon / hamstring graft safe mobility drills',
        'Closed kinetic chain mini-squats & wall sits under therapist supervision',
        'Proprioceptive single-leg balance and reactive wobble board training'
      ],
      equipmentBrought: ['Dual-Channel NMES', 'Digital Goniometer', 'Balance Foam Pad', 'TheraBand loops'],
      pmrOversight: 'Dr. Dharshan oversees graft phase progression criteria before clearing dynamic single-leg loading.',
      recoveryTimeline: '6 to 12 Weeks'
    },
    {
      id: 'shoulder-cuff',
      name: 'Rotator Cuff Repair & Shoulder Arthroscopy',
      category: 'ortho',
      categoryLabel: 'Post-Op Orthopedic',
      stage: 'Phase 1 Passive to Phase 3 Active',
      severityLevel: 'Post-Surgical',
      summary: 'Protecting supraspinatus tendon anchor sutures while preventing severe secondary adhesive capsulitis and shoulder stiffness.',
      homeProtocol: [
        'Therapist-led passive forward elevation in scapular plane',
        'Codman pendulum swings and gentle external rotation up to 30°',
        'Scapulothoracic manual mobilizations (preventing trap shrugging)',
        'Safe sling weaning protocol and supine active-assisted wand drills',
        'Sub-maximal isometric rotator cuff recruitment (Week 6+)'
      ],
      equipmentBrought: ['Digital Inclinometer', 'Pulleys & Wand Kit', 'Cryo-Compression', 'Yellow Light TheraBand'],
      pmrOversight: 'Dr. Dharshan verifies ultrasound tendon healing status before clearing active overhead abduction.',
      recoveryTimeline: '6 to 14 Weeks'
    },
    {
      id: 'fracture-orif',
      name: 'Fracture Fixation & ORIF (Femur, Tibia, Humerus)',
      category: 'ortho',
      categoryLabel: 'Post-Op Orthopedic',
      stage: 'Non-Weight Bearing to Full Ambulation',
      severityLevel: 'Post-Surgical',
      summary: 'Reversing muscle atrophy and joint stiffness adjacent to hardware fixation plates, nails, and surgical screws.',
      homeProtocol: [
        'Non-weight bearing / partial weight bearing transfer training',
        'Adjacent joint mobilization (ankle pumps, hip pumps, knee flex)',
        'Post-surgical limb edema management and lymphatic drainage',
        'Graduated weight-bearing bathroom and bedroom navigation',
        'Bone callus consolidation progressive resistance exercises'
      ],
      equipmentBrought: ['Digital Goniometer', 'TENS Unit', 'TheraBands', 'Calibrated Scale for Weight Bearing'],
      pmrOversight: 'Dr. Dharshan correlates follow-up x-ray callus formation with surgeon-ordered weight-bearing percentages.',
      recoveryTimeline: '6 to 12 Weeks'
    },
    {
      id: 'spine-surgery',
      name: 'Post-Spine Surgery (Discectomy, Laminectomy & Fusion)',
      category: 'ortho',
      categoryLabel: 'Post-Op Orthopedic',
      stage: 'Day 2 Post-Op to Functional Life',
      severityLevel: 'Post-Surgical',
      summary: 'Protecting spinal instrumentation, preventing neural dural tethering, and building deep transverse abdominis spinal bracing.',
      homeProtocol: [
        'Log-roll bed mobility and non-flexion transfers',
        'Deep transverse abdominis & multifidus gentle activation',
        'Gentle neural flossing (sciatic/femoral nerve mobility)',
        'Ergonomic workstation and home seating audit',
        'Progressive brisk hallway and room walking endurance'
      ],
      equipmentBrought: ['Lumbar Support Evaluator', 'TENS Unit', 'Digital Vitals Monitor'],
      pmrOversight: 'Dr. Dharshan audits neurological dermatome/myotome integrity and monitors for dural irritation.',
      recoveryTimeline: '4 to 8 Weeks'
    },

    // 2. Neurology & Stroke
    {
      id: 'stroke',
      name: 'Stroke Recovery (Ischemic / Hemorrhagic Hemiplegia)',
      category: 'neuro',
      categoryLabel: 'Neurology & Stroke',
      stage: 'Acute Plasticity Window (Days 1–90) & Beyond',
      severityLevel: 'Acute / Subacute',
      summary: 'Harnessing the critical 90-day neuroplasticity window to recover voluntary limb control, overcome flaccidity, and correct pathological gait.',
      homeProtocol: [
        'Brunnstrom stage-specific synergistic pattern guidance',
        'Constraint-Induced Movement Therapy (CIMT) for functional hand use',
        'Tone-inhibiting positioning to prevent spastic contractures',
        'Pelvic stability & trunk control exercises in sitting and standing',
        'Weight-shifting and step training over varied home surfaces'
      ],
      equipmentBrought: ['Dual NMES for Drop Foot & Wrist Extensors', 'Balance Foam', 'Fine Motor Kit', 'Arm Sling'],
      pmrOversight: 'Dr. Dharshan audits Brunnstrom stage progression, FIM functional scores, and prescribes antispasticity adjustments.',
      recoveryTimeline: '8 to 16 Weeks'
    },
    {
      id: 'parkinsons',
      name: "Parkinson's Disease Mobility & Gait Retraining",
      category: 'neuro',
      categoryLabel: 'Neurology & Stroke',
      stage: 'Hoehn & Yahr Stages I to IV',
      severityLevel: 'Chronic / Progressive',
      summary: 'Combating hypokinesia, eliminating freezing of gait (FOG), and restoring high-amplitude functional movement.',
      homeProtocol: [
        'Big-amplitude trunk rotation and reciprocal arm-swing drills',
        'Visual and auditory sensory cueing to break gait freezing episodes',
        'Chair rise and bed turning compensatory motor strategies',
        'Dual-task cognitive-motor balance challenges',
        'Diaphragmatic expansion and posture alignment against stoop'
      ],
      equipmentBrought: ['Visual Floor Laser Markers', 'Metronome Rhythm Audio', 'Balance Pad', 'Resistance Loops'],
      pmrOversight: 'Dr. Dharshan coordinates therapy timing with On/Off Levodopa medication cycles for optimal neuroplastic response.',
      recoveryTimeline: 'Ongoing Maintenance (8-Week Cycles)'
    },
    {
      id: 'bell-palsy',
      name: "Bell's Palsy & Facial Nerve Rehabilitation",
      category: 'neuro',
      categoryLabel: 'Neurology & Stroke',
      stage: 'Acute to Subacute Regeneration',
      severityLevel: 'Acute / Subacute',
      summary: 'Promoting symmetrical facial re-innervation while strictly guarding against aberrant synkinesis and eye closure complications.',
      homeProtocol: [
        'Mirror biofeedback for isolated facial muscle firing',
        'Manual myofascial facial release and lymphatic drainage',
        'Eyelid closure training and corneal moisture hygiene education',
        'Selective muscle facilitation (frontalis, orbicularis oris, zygomaticus)',
        'Speech articulation and chewing coordination exercises'
      ],
      equipmentBrought: ['Biofeedback Mirror Kit', 'Facial Acupressure Probes', 'Low-Current Selective Facial Stimulator'],
      pmrOversight: 'Dr. Dharshan monitors House-Brackmann facial nerve recovery grading and prevents aberrant regeneration.',
      recoveryTimeline: '3 to 8 Weeks'
    },
    {
      id: 'sci',
      name: 'Spinal Cord Injury (Incomplete Paraplegia / Paresis)',
      category: 'neuro',
      categoryLabel: 'Neurology & Stroke',
      stage: 'Subacute Post-Discharge',
      severityLevel: 'Post-Surgical',
      summary: 'Maximizing residual motor function, standing frame tolerance, autonomic stability, and independent wheelchair transfers.',
      homeProtocol: [
        'Head-hips relationship transfer training (bed to chair, commode)',
        'Upper-body preservation & latissimus/triceps hypertrophy',
        'NMES-driven lower limb functional muscle recruitment',
        'Passive lower limb ranging to prevent heterotopic ossification',
        'Orthostatic hypotension tolerance drills and abdominal binding'
      ],
      equipmentBrought: ['Transfer Slide Board', 'Heavy-Duty Loop Bands', 'NMES Unit', 'Digital Blood Pressure Monitor'],
      pmrOversight: 'Dr. Dharshan monitors ASIA motor/sensory scores and screens for autonomic dysreflexia red flags.',
      recoveryTimeline: '12 to 24 Weeks'
    },
    {
      id: 'neuropathy-gbs',
      name: 'Peripheral Neuropathy & Post-GBS Rehabilitation',
      category: 'neuro',
      categoryLabel: 'Neurology & Stroke',
      stage: 'Recovery Plateau to Ambulation',
      severityLevel: 'Chronic / Progressive',
      summary: 'Guarded motor reconditioning without precipitating fatigue-induced relapses in demyelinating conditions.',
      homeProtocol: [
        'Sub-maximal, fatigue-free progressive resistance training',
        'Ankle foot orthosis (AFO) gait optimization and shoe adaptations',
        'Sensory re-education and proprioceptive foot tactile mapping',
        'Endurance pacing strategies for energy preservation',
        'Night-splinting and calf stretch to prevent equinus deformity'
      ],
      equipmentBrought: ['Sensory Desensitization Textures', 'Light Resistance Bands', 'Balance Board'],
      pmrOversight: 'Dr. Dharshan oversees neurological endurance limits and orders appropriate custom orthotics.',
      recoveryTimeline: '6 to 16 Weeks'
    },

    // 3. Spine & Joint Pain
    {
      id: 'sciatica-disc',
      name: 'Lumbar Disc Bulge / Herniation & Sciatica',
      category: 'spine',
      categoryLabel: 'Spine & Joint Pain',
      stage: 'Acute Flare-up or Recurrent Radiculopathy',
      severityLevel: 'Acute / Subacute',
      summary: 'Centralizing radiating leg pain, decompressing inflamed nerve roots, and restoring neutral lumbar lordosis.',
      homeProtocol: [
        'Directional preference mechanical diagnosis (McKenzie extension)',
        'Sciatic nerve flossing & gentle neural mobilization',
        'Deep core stabilization: Transverse Abdominis & pelvic floor activation',
        'Prone on elbows decompression & pain-relieving positioning',
        'Safe ergonomic lifting, sitting, and sleep posture training'
      ],
      equipmentBrought: ['Dual TENS Unit for Nerve Root Pain', 'Lumbar Roll', 'TheraBand Blue', 'Mat Equipment'],
      pmrOversight: 'Dr. Dharshan screens MRI neuroforaminal stenosis, rules out cauda equina red flags, and directs pain protocols.',
      recoveryTimeline: '2 to 5 Weeks'
    },
    {
      id: 'cervical-spondylosis',
      name: 'Cervical Spondylosis, Pinched Nerve & Neck Pain',
      category: 'spine',
      categoryLabel: 'Spine & Joint Pain',
      stage: 'Subacute Neck Stiffness & Arm Tingling',
      severityLevel: 'Chronic / Progressive',
      summary: 'Relieving cervical radicular compression, correcting forward head posture, and restoring pain-free neck rotation.',
      homeProtocol: [
        'Deep cervical neck flexor retraining (chin tucks with stabilizer biofeedback)',
        'Thoracic spine extension and scapular retractor activation',
        'Median / Radial / Ulnar nerve dynamic tensioning glides',
        'Manual upper trapezius and levator scapulae myofascial release',
        'Bed pillow, monitor height, and ergonomic laptop setup audit'
      ],
      equipmentBrought: ['Cervical Traction Sling / Stabilizer', 'TENS Unit', 'Posture Grid Sheet'],
      pmrOversight: 'Dr. Dharshan correlates spurring/osteophytes on cervical x-rays and monitors for myelopathic cord signs.',
      recoveryTimeline: '3 to 6 Weeks'
    },
    {
      id: 'knee-oa',
      name: 'Knee Osteoarthritis (Grade II to IV Non-Surgical)',
      category: 'spine',
      categoryLabel: 'Spine & Joint Pain',
      stage: 'Degenerative Joint Stiffness & Crepitus',
      severityLevel: 'Chronic / Progressive',
      summary: 'Strengthening shock-absorbing quadriceps, decompressing patellofemoral friction, and postponing joint replacement surgery.',
      homeProtocol: [
        'Non-weight bearing isometric quadriceps and hamstrings co-contractions',
        'Vastus Medialis Oblique (VMO) isolated recruitment',
        'Joint traction and manual patellofemoral glides',
        'Low-impact static cycling or stationary pedal therapy',
        'Stair negotiation biomechanics to unload articular cartilage'
      ],
      equipmentBrought: ['Portable Stationary Pedal Exerciser', 'TheraBand Yellow/Red', 'Ankle Weights', 'Cryo/Heat Packs'],
      pmrOversight: 'Dr. Dharshan reviews joint space narrowing, assesses intra-articular injection indications, and charts unloaders.',
      recoveryTimeline: '4 to 8 Weeks'
    },
    {
      id: 'frozen-shoulder',
      name: 'Frozen Shoulder (Adhesive Capsulitis)',
      category: 'spine',
      categoryLabel: 'Spine & Joint Pain',
      stage: 'Freezing, Frozen & Thawing Stages',
      severityLevel: 'Chronic / Progressive',
      summary: 'Restoring glenohumeral joint capsule elasticity, relieving agonizing night pain, and regaining functional 150° reaching.',
      homeProtocol: [
        'Grade II–IV caudal, posterior, and anterior glenohumeral joint mobilizations',
        'Capsular stretching (inferior capsule and posterior capsule stretch)',
        'Active-assisted pulley and wall-climbing overhead stretches',
        'Scapulohumeral rhythm correction to eliminate shoulder shrugging',
        'Gentle isometric rotator cuff strengthening in pain-free ranges'
      ],
      equipmentBrought: ['Overhead Door Pulley', 'Digital Inclinometer', 'Moist Heat / Cryo Wraps', 'TheraBand'],
      pmrOversight: 'Dr. Dharshan determines exact stage (inflammatory vs. fibrotic) and directs mobilization grade boundaries.',
      recoveryTimeline: '6 to 12 Weeks'
    },
    {
      id: 'ankylosing-spondylitis',
      name: 'Ankylosing Spondylitis & Axial Spondyloarthritis',
      category: 'spine',
      categoryLabel: 'Spine & Joint Pain',
      stage: 'Active Inflammatory or Chronic Rigidity',
      severityLevel: 'Chronic / Progressive',
      summary: 'Preventing spinal fusion into irreversible kyphosis, maximizing chest expansion, and preserving functional mobility.',
      homeProtocol: [
        'Prone spinal extension and prone-on-elbows postural positioning',
        'Deep costal expansion breathing and thoracic rib mobilizations',
        'Pectoral and anterior hip flexor active stretching',
        'Axial spine elongation and postural awareness drills',
        'Night sleeping position guidance (flat pillow, firm mattress)'
      ],
      equipmentBrought: ['Chest Expansion Tape Measure', 'Thoracic Foam Roller', 'Digital Spirometer'],
      pmrOversight: 'Dr. Dharshan tracks BASDAI disease activity indices and correlates with rheumatological DMARD medications.',
      recoveryTimeline: '6 to 12 Weeks'
    },

    // 4. Geriatric & Mobility
    {
      id: 'fall-prevention',
      name: 'Post-Fall Recovery & Senior Balance Retraining',
      category: 'geriatric',
      categoryLabel: 'Geriatric & Mobility',
      stage: 'Post-Fall Fear, Instability & Gait Hesitation',
      severityLevel: 'Chronic / Progressive',
      summary: 'Overcoming the debilitating fear of falling, retraining reactive stepping reflexes, and securing home safety.',
      homeProtocol: [
        'Static and dynamic balance: Tandem stance, semi-tandem, single-leg hold',
        'Vestibular-ocular reflex (VOR) gaze stabilization exercises',
        'Reactive perturbation stepping drills with therapist gait belt support',
        'Timed Up and Go (TUG) optimization and obstacle clearance',
        'Full home fall hazard audit (lighting, throw rugs, bathroom grab rails)'
      ],
      equipmentBrought: ['Clinical Gait Belt', 'Non-Slip Proprioceptive Balance Mat', 'Agility Obstacle Cones'],
      pmrOversight: 'Dr. Dharshan audits polypharmacy sedative fall risks, bone mineral DEXA density, and prescribes walking aids.',
      recoveryTimeline: '4 to 8 Weeks'
    },
    {
      id: 'bedbound-sarcopenia',
      name: 'Severe Bedbound Deconditioning & Sarcopenia',
      category: 'geriatric',
      categoryLabel: 'Geriatric & Mobility',
      stage: 'Prolonged Bedrest Post-Hospitalization',
      severityLevel: 'Acute / Subacute',
      summary: 'Safely transitioning long-term bedbound patients to sitting upright, standing, and taking independent steps.',
      homeProtocol: [
        'Bed-to-edge sitting tolerance and trunk balance retraining',
        'Orthostatic vital signs monitoring during posture transitions',
        'Active-assisted lower limb cycling in bed to stimulate circulation',
        'Sit-to-stand repetitions with quad and gluteal facilitation',
        'Short-distance room ambulation with calibrated walking frame'
      ],
      equipmentBrought: ['Portable Pulse Oximeter & BP Monitor', 'In-Bed Pedal Exerciser', 'Gait Safety Belt', 'Cuff Weights'],
      pmrOversight: 'Dr. Dharshan verifies hemodynamic stability, screening for deep vein thrombosis (DVT) before verticalization.',
      recoveryTimeline: '6 to 12 Weeks'
    },
    {
      id: 'osteoporosis-frailty',
      name: 'Osteoporosis & Frailty Syndrome Management',
      category: 'geriatric',
      categoryLabel: 'Geriatric & Mobility',
      stage: 'High Fracture Risk (T-Score < -2.5)',
      severityLevel: 'Chronic / Progressive',
      summary: 'Safe mechanical bone stimulation without compressive spine flexion that could trigger wedge fractures.',
      homeProtocol: [
        'Spine-safe extensor muscle loading (avoiding crunches and heavy twisting)',
        'Closed-chain heel drops and gentle impact weight-bearing',
        'Core bracing and postural realignment to counter dowager’s hump',
        'Safe bathroom, bed, and car transfer techniques',
        'Safe bone-density building resistance band workouts'
      ],
      equipmentBrought: ['Light Color-Coded Bands', 'Bone Safe Posture Support', 'Balance Foam'],
      pmrOversight: 'Dr. Dharshan correlates DEXA T-scores, FRAX 10-year fracture risk, and approves weight resistance levels.',
      recoveryTimeline: '8 to 16 Weeks'
    },

    // 5. Cardiopulmonary & ICU
    {
      id: 'post-cabg',
      name: 'Post-CABG (Coronary Bypass) & Cardiac Rehab',
      category: 'cardio',
      categoryLabel: 'Cardiopulmonary & ICU',
      stage: 'Phase II Home Cardiac Rehab',
      severityLevel: 'Post-Surgical',
      summary: 'Safely restoring cardiovascular stamina within sternotomy precautions and target heart rate zones.',
      homeProtocol: [
        'Strict sternal precaution adherence (preventing bilateral chest pushing/pulling)',
        'Incentive spirometry for basal atelectasis clearance',
        'Telemetry-guided progressive interval hallway walking',
        'Continuous monitoring of HR, BP, SpO2, and Rate of Perceived Exertion (Borg)',
        'Energy conservation and daily living pacing instruction'
      ],
      equipmentBrought: ['Tri-Ball Incentive Spirometer', 'Medical Pulse Oximeter', 'Digital Sphygmomanometer', 'Borg RPE Scale'],
      pmrOversight: 'Dr. Dharshan calculates Karvonen target heart rate zones and checks surgical sternal stability.',
      recoveryTimeline: '4 to 8 Weeks'
    },
    {
      id: 'copd-respiratory',
      name: 'COPD, Bronchiectasis & Post-Pneumonia Rehab',
      category: 'cardio',
      categoryLabel: 'Cardiopulmonary & ICU',
      stage: 'Subacute Exacerbation Recovery',
      severityLevel: 'Chronic / Progressive',
      summary: 'Clearing trapped bronchial secretions, relieving breathlessness, and rebuilding diaphragmatic breathing stamina.',
      homeProtocol: [
        'Active Cycle of Breathing Techniques (ACBT) & huffing for sputum clearance',
        'Postural drainage positioning with chest percussion/vibrations',
        'Pursed-lip breathing to prevent airway collapse during exertion',
        'Upper limb supported breathing positions for dyspnea relief',
        'Sub-maximal aerobic walking intervals with oxygen saturation checks'
      ],
      equipmentBrought: ['Acapella / Flutter Mucus Clearance Device', 'Incentive Spirometer', 'SpO2 Continuous Monitor'],
      pmrOversight: 'Dr. Dharshan audits oxygen desaturation index and coordinates with treating pulmonologist.',
      recoveryTimeline: '4 to 8 Weeks'
    },
    {
      id: 'post-icu-myopathy',
      name: 'Post-ICU Weakness & Critical Illness Neuromyopathy',
      category: 'cardio',
      categoryLabel: 'Cardiopulmonary & ICU',
      stage: 'Post-Ventilator / Post-Sepsis Recovery',
      severityLevel: 'Acute / Subacute',
      summary: 'Rehabilitating profound limb muscle wasting and diaphragmatic weakness following long ICU ventilator stays.',
      homeProtocol: [
        'Gentle active-assisted limb ranging to combat contractures',
        'Graduated sitting tolerance and tilt adaptation',
        'Low-intensity NMES stimulation for severely wasted quadriceps',
        'Diaphragmatic inspiratory muscle training',
        'Functional task practice: holding cups, sitting without back support'
      ],
      equipmentBrought: ['Portable NMES System', 'Medical Vitals Telemetry Kit', 'Inspiratory Muscle Trainer (IMT)'],
      pmrOversight: 'Dr. Dharshan oversees metabolic recovery biomarkers, nutritional state, and safe hemodynamic thresholds.',
      recoveryTimeline: '6 to 16 Weeks'
    }
  ];

  // Filtered conditions based on search and category
  const filteredConditions = useMemo(() => {
    return conditionsList.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.homeProtocol.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleBookForCondition = (condition: ConditionItem) => {
    openModal('book', {
      serviceType: condition.name,
      condition: condition.name,
      category: condition.categoryLabel
    });
  };

  return (
    <section id="conditions-treated" className="py-20 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Conditions Treated at Home • PMR Doctor-Directed Care
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Percent className="w-3.5 h-3.5 text-emerald-600" />
              Structured Packages • 5% Multi-Week Discount
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            What Can Be Treated by Our Home Physiotherapist?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Our certified physiotherapists bring hospital-grade portable modalities, digital telemetry goniometers, and evidence-based clinical protocols directly into your living room — structured into tailored <strong>rehabilitation care packages (with a 5% multi-week discount)</strong> under the clinical triage and milestone oversight of <strong>Dr. Dharshan N A, MD (PMR)</strong>.
          </p>
        </div>

        {/* Doctor Triaging Reassurance Banner */}
        <div className="mt-8 p-4 bg-teal-900 text-white rounded-2xl shadow-lg border border-teal-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-xl border-2 border-teal-400 overflow-hidden shrink-0 shadow-md">
              <img
                src="/dr-dharshan.jpg"
                alt="Dr. Dharshan N A"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-teal-300 flex items-center gap-1.5 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                Pre-Treatment PMR Triaging Guarantee
              </div>
              <div className="text-sm font-bold text-white">
                "Every home patient is triaged by me before the therapist rings your doorbell."
              </div>
              <p className="text-xs text-teal-100/90 mt-0.5">
                — <strong>Dr. Dharshan N A, MD (PMR)</strong> • Reviews hospital discharge summaries, scans & vitals to verify home therapy is safe.
              </p>
            </div>
          </div>

          <button
            onClick={() => openModal('book')}
            className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Calendar className="w-4 h-4" />
            Check My Condition Eligibility
          </button>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-10 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search condition (e.g., knee replacement, stroke, sciatica, frozen shoulder, Bell's palsy)..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-md ring-2 ring-teal-500/50'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-teal-600'}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive ? 'bg-teal-800 text-teal-200' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count & Match Indicator */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-3">
          <div>
            Showing <strong className="text-slate-800">{filteredConditions.length}</strong> conditions treated at home
            {activeCategory !== 'all' && <span> in <strong className="text-teal-700">{categories.find(c => c.id === activeCategory)?.label}</strong></span>}
            {searchQuery && <span> matching "<strong className="text-teal-700">{searchQuery}</strong>"</span>}
          </div>
          <span className="text-[11px] text-teal-700 font-medium hidden sm:inline-flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-teal-600" />
            All conditions include PMR Doctor Milestone Audits
          </span>
        </div>

        {/* Conditions Grid */}
        {filteredConditions.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300 mt-6">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No condition matches your search</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Have a rare or unlisted condition? Speak directly with Dr. Dharshan's triage desk to see if our home therapists can support you.
            </p>
            <button
              onClick={() => openModal('book')}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-700 transition cursor-pointer"
            >
              Consult Clinical Triage Desk
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredConditions.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-teal-400"
              >
                {/* Top Badge & Category */}
                <div className="p-5 pb-3 border-b border-slate-100">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.8 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                      {item.categoryLabel}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        item.severityLevel === 'Post-Surgical'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : item.severityLevel === 'Acute / Subacute'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}
                    >
                      {item.severityLevel}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>Stage: <strong className="text-slate-700">{item.stage}</strong></span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3.5 flex-1 text-xs">
                  {/* What Therapist Does at Home */}
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      What Therapist Does at Home:
                    </div>
                    <ul className="space-y-1">
                      {item.homeProtocol.slice(0, 3).map((p, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-slate-700 text-[11.5px] leading-snug">
                          <span className="text-teal-500 font-bold shrink-0">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Portable Equipment Brought */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                      Equipment Brought to Your Home:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.equipmentBrought.map((eq, i) => (
                        <span
                          key={i}
                          className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium border border-slate-200"
                        >
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dr. Dharshan PMR Direction */}
                  <div className="p-2.5 bg-teal-50/80 rounded-xl border border-teal-100 text-[11px] text-teal-950">
                    <div className="font-bold text-teal-900 flex items-center gap-1 mb-0.5">
                      <Stethoscope className="w-3.5 h-3.5 text-teal-700" />
                      Dr. Dharshan's PMR Direction:
                    </div>
                    <p className="text-[11px] text-teal-900 leading-tight">
                      {item.pmrOversight}
                    </p>
                  </div>
                </div>

                {/* Footer Action Card */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[11px] font-bold text-teal-800">Care Package Available</div>
                    <div className="text-[10px] text-emerald-700 font-medium">5% off multi-week care</div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedConditionModal(item)}
                      className="px-2.5 py-2 border border-slate-200 hover:border-teal-500 bg-white text-slate-700 hover:text-teal-700 font-semibold text-xs rounded-xl transition cursor-pointer"
                    >
                      Protocol
                    </button>
                    <button
                      onClick={() => handleBookForCondition(item)}
                      className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>Book Package</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Portable Equipment / Hospital-in-a-Bag Showcase Strip */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200 mb-1.5">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                "Hospital-Grade Rehabilitation In A Bag"
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                What Equipment Does Our Home Physiotherapist Bring?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                You never need to buy expensive hospital machines. Our licensed physiotherapists arrive with sanitized, medical-grade diagnostic & electrotherapy equipment for every visit.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openModal('book')}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-teal-400" />
                Schedule Home Assessment
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mx-auto font-black text-xs">
                NMES
              </div>
              <div className="font-bold text-xs text-slate-900">Muscle Stimulator</div>
              <p className="text-[10px] text-slate-500 leading-tight">Reactivates paretic stroke limbs & post-op quad lag.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center mx-auto font-black text-xs">
                TENS/IFT
              </div>
              <div className="font-bold text-xs text-slate-900">Portable Electrotherapy</div>
              <p className="text-[10px] text-slate-500 leading-tight">Sensory gate pain relief for sciatica, knees & shoulders.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto font-black text-xs">
                0.1°
              </div>
              <div className="font-bold text-xs text-slate-900">Digital Goniometer</div>
              <p className="text-[10px] text-slate-500 leading-tight">Precision ROM degree tracking reported to Dr. Dharshan.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto font-black text-xs">
                BAND
              </div>
              <div className="font-bold text-xs text-slate-900">TheraBand Resistance</div>
              <p className="text-[10px] text-slate-500 leading-tight">Progressive tension loops for rotator cuff & joint strength.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center mx-auto font-black text-xs">
                BAL
              </div>
              <div className="font-bold text-xs text-slate-900">Proprioception Mats</div>
              <p className="text-[10px] text-slate-500 leading-tight">Balance foam & wobble boards for fall prevention.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mx-auto font-black text-xs">
                VIT
              </div>
              <div className="font-bold text-xs text-slate-900">Clinical Vitals Kit</div>
              <p className="text-[10px] text-slate-500 leading-tight">BP, pulse oximeter & temperature before each session.</p>
            </div>
          </div>
        </div>

        {/* Why Home Therapy is Superior for These Conditions Callout */}
        <div className="mt-10 p-6 bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 rounded-2xl text-white shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="space-y-1.5">
              <div className="text-teal-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 justify-center md:justify-start">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Zero Painful Hospital Transit
              </div>
              <div className="text-sm font-bold text-white">No Straining In Traffic After Surgery</div>
              <p className="text-xs text-slate-300">
                Patients with fresh TKR wounds or post-stroke hemiplegia avoid agonizing car rides and wheelchair bumps.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-teal-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 justify-center md:justify-start">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Zero Hospital Infection Exposure
              </div>
              <div className="text-sm font-bold text-white">Protection Against Superbugs (MRSA)</div>
              <p className="text-xs text-slate-300">
                Recovering at home protects vulnerable surgical implants and low-immunity patients from nosocomial hospital infections.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-teal-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 justify-center md:justify-start">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Real-World Home Ergonomics
              </div>
              <div className="text-sm font-bold text-white">Trained in Your Real Living Environment</div>
              <p className="text-xs text-slate-300">
                We train you on your exact bathroom commode, your exact bed height, and your exact home staircase steps.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Condition Protocol Dossier Modal */}
        {selectedConditionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                      {selectedConditionModal.categoryLabel} • {selectedConditionModal.severityLevel}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                      {selectedConditionModal.name}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedConditionModal(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
                {/* Clinical Objective */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Clinical Objective</div>
                  <p className="text-xs text-slate-800 font-medium leading-relaxed">
                    {selectedConditionModal.summary}
                  </p>
                  <div className="text-[11px] text-teal-800 font-semibold pt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>Target Recovery Horizon: <strong>{selectedConditionModal.recoveryTimeline}</strong> (Stage: {selectedConditionModal.stage})</span>
                  </div>
                </div>

                {/* Home Therapy Interventions */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    What the Physiotherapist Does in Every Home Visit:
                  </div>
                  <div className="space-y-2">
                    {selectedConditionModal.homeProtocol.map((protocol, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-teal-50/50 border border-teal-100/60">
                        <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-xs text-slate-800">{protocol}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Portable Equipment Brought */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                    Equipment & Modalities Brought To Your Doorstep:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedConditionModal.equipmentBrought.map((eq, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 font-semibold text-xs flex items-center gap-1"
                      >
                        <Check className="w-3 h-3 text-indigo-600" />
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dr. Dharshan's Oversight */}
                <div className="p-4 bg-gradient-to-r from-teal-900 to-slate-900 rounded-xl text-white space-y-2 border border-teal-700">
                  <div className="flex items-center gap-3">
                    <img
                      src="/dr-dharshan.jpg"
                      alt="Dr. Dharshan N A"
                      className="w-10 h-10 rounded-full object-cover border-2 border-teal-400 shrink-0"
                    />
                    <div>
                      <div className="text-xs font-bold text-teal-300">Dr. Dharshan N A, MD (PMR) Oversight</div>
                      <div className="text-[10px] text-teal-100">Lead Physiatrist & Rehabilitation Specialist</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed pl-13">
                    {selectedConditionModal.pmrOversight}
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedConditionModal(null)}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-white cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const c = selectedConditionModal;
                    setSelectedConditionModal(null);
                    handleBookForCondition(c);
                  }}
                  className="flex-1 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Book Home Assessment for {selectedConditionModal.name.split('(')[0].trim()}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
