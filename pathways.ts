/** Clinical pathway presets — outcome measures + suggested tools by condition family */

export type PathwayId = 'knee' | 'hip' | 'stroke' | 'shoulder' | 'spine' | 'geriatric' | 'general';

export interface OutcomeMeasureDef {
  key: string;
  label: string;
  unit: string;
  /** How the measure is decided / used clinically */
  decisionRule: string;
}

export interface PathwayPreset {
  id: PathwayId;
  label: string;
  matchKeywords: string[];
  outcomeMeasures: OutcomeMeasureDef[];
  suggestedTools: string[];
  baselineFields: string[];
}

export const PATHWAYS: PathwayPreset[] = [
  {
    id: 'knee',
    label: 'Knee (TKR / ligament / OA)',
    matchKeywords: ['knee', 'tkr', 'tka', 'acl', 'meniscus'],
    outcomeMeasures: [
      { key: 'vas', label: 'Pain VAS', unit: '0–10', decisionRule: 'Patient-reported pain at rest/activity; primary comfort outcome.' },
      { key: 'flexion', label: 'Active knee flexion', unit: 'degrees', decisionRule: 'Goniometer; Day 14 aim ~90°, later toward target flexion.' },
      { key: 'extension', label: 'Active knee extension', unit: 'degrees lag', decisionRule: 'Lag from 0°; lag >5° triggers doctor review.' },
      { key: 'walkAid', label: 'Walking aid stage', unit: 'level', decisionRule: 'Walker → stick → independent as function allows.' },
    ],
    suggestedTools: ['Digital goniometer', 'TheraBand', 'Ankle weights', 'NMES unit', 'Cryotherapy pack'],
    baselineFields: ['vas', 'flexion', 'extension', 'walkAid', 'swelling', 'wound'],
  },
  {
    id: 'hip',
    label: 'Hip replacement',
    matchKeywords: ['hip', 'thr', 'tha'],
    outcomeMeasures: [
      { key: 'vas', label: 'Pain VAS', unit: '0–10', decisionRule: 'Patient-reported pain.' },
      { key: 'walkAid', label: 'Walking aid stage', unit: 'level', decisionRule: 'Progress weight-bearing as cleared.' },
      { key: 'precaution', label: 'Precaution adherence', unit: 'yes/no', decisionRule: 'Hip precaution compliance each visit.' },
    ],
    suggestedTools: ['Goniometer', 'Loop bands', 'Cryotherapy wrap', 'Vitals kit'],
    baselineFields: ['vas', 'walkAid', 'precaution', 'transfer'],
  },
  {
    id: 'stroke',
    label: 'Stroke / neuro',
    matchKeywords: ['stroke', 'neuro', 'hemip', 'parkinson'],
    outcomeMeasures: [
      { key: 'vas', label: 'Pain / discomfort', unit: '0–10', decisionRule: 'If pain present; else mark N/A.' },
      { key: 'tone', label: 'Tone (affected limb)', unit: '0–4 scale', decisionRule: 'Modified Ashworth-style clinical estimate.' },
      { key: 'balance', label: 'Standing balance', unit: 'seconds', decisionRule: 'Timed supported/unsupported stand as safe.' },
      { key: 'mobility', label: 'Mobility stage', unit: 'level', decisionRule: 'Bed → chair → assisted walk progression.' },
    ],
    suggestedTools: ['NMES unit', 'Positioning pillows', 'Balance tools', 'Gait belt'],
    baselineFields: ['tone', 'balance', 'mobility', 'shoulderProtect'],
  },
  {
    id: 'shoulder',
    label: 'Shoulder / frozen shoulder / cuff',
    matchKeywords: ['shoulder', 'rotator', 'frozen', 'cuff'],
    outcomeMeasures: [
      { key: 'vas', label: 'Pain VAS', unit: '0–10', decisionRule: 'Include night pain note.' },
      { key: 'elevation', label: 'Active elevation', unit: 'degrees', decisionRule: 'Goniometer active forward elevation.' },
      { key: 'externalRot', label: 'External rotation', unit: 'degrees', decisionRule: 'At side or in plane as tolerated.' },
    ],
    suggestedTools: ['Goniometer', 'Wand / stick', 'Light bands', 'Ice pack'],
    baselineFields: ['vas', 'elevation', 'externalRot', 'nightPain'],
  },
  {
    id: 'spine',
    label: 'Spine / sciatica',
    matchKeywords: ['spine', 'lumbar', 'sciatica', 'disc', 'back'],
    outcomeMeasures: [
      { key: 'vasBack', label: 'Back pain VAS', unit: '0–10', decisionRule: 'Separate from leg pain when possible.' },
      { key: 'vasLeg', label: 'Leg pain VAS', unit: '0–10', decisionRule: 'Radicular component.' },
      { key: 'sitTol', label: 'Sitting tolerance', unit: 'minutes', decisionRule: 'Functional desk/car tolerance.' },
    ],
    suggestedTools: ['Resistance bands', 'Timer for pacing', 'Heat/ice as advised'],
    baselineFields: ['vasBack', 'vasLeg', 'sitTol', 'walkTol'],
  },
  {
    id: 'geriatric',
    label: 'Geriatric / falls',
    matchKeywords: ['fall', 'geriatric', 'elderly', 'balance', 'frailty'],
    outcomeMeasures: [
      { key: 'tug', label: 'Timed Up & Go', unit: 'seconds', decisionRule: 'Higher time = higher fall risk.' },
      { key: 'sitStand', label: '30s sit-to-stand', unit: 'reps', decisionRule: 'Lower limb strength proxy.' },
      { key: 'vas', label: 'Pain VAS', unit: '0–10', decisionRule: 'If limiting mobility.' },
    ],
    suggestedTools: ['Balance pad', 'Chair support', 'Resistance bands', 'Gait belt'],
    baselineFields: ['tug', 'sitStand', 'vas', 'homeHazard'],
  },
  {
    id: 'general',
    label: 'General musculoskeletal',
    matchKeywords: [],
    outcomeMeasures: [
      { key: 'vas', label: 'Pain VAS', unit: '0–10', decisionRule: 'Primary symptom score.' },
      { key: 'function', label: 'Function note', unit: 'text', decisionRule: 'Key daily activity limitation.' },
    ],
    suggestedTools: ['Goniometer', 'Resistance bands', 'Vitals kit'],
    baselineFields: ['vas', 'function'],
  },
];

export function detectPathway(diagnosis: string): PathwayPreset {
  const d = (diagnosis || '').toLowerCase();
  for (const p of PATHWAYS) {
    if (p.id === 'general') continue;
    if (p.matchKeywords.some((k) => d.includes(k))) return p;
  }
  return PATHWAYS.find((p) => p.id === 'general')!;
}
