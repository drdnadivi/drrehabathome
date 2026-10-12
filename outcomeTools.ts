/** Standardized outcome instruments physio can select during assessment */
export interface OutcomeToolDef {
  id: string;
  name: string;
  shortName: string;
  domain: string;
  scoreHint: string;
}

export const OUTCOME_TOOLS: OutcomeToolDef[] = [
  { id: 'vas', name: 'Visual Analogue Scale (Pain)', shortName: 'VAS', domain: 'Pain', scoreHint: '0–10 (0 = no pain, 10 = worst)' },
  { id: 'nprs', name: 'Numeric Pain Rating Scale', shortName: 'NPRS', domain: 'Pain', scoreHint: '0–10' },
  { id: 'womac', name: 'WOMAC (Hip / Knee OA)', shortName: 'WOMAC', domain: 'Ortho lower limb', scoreHint: 'Total or subscale scores as used clinically' },
  { id: 'odi', name: 'Oswestry Disability Index', shortName: 'ODI', domain: 'Spine', scoreHint: '0–100% disability' },
  { id: 'ndi', name: 'Neck Disability Index', shortName: 'NDI', domain: 'Cervical', scoreHint: '0–100% disability' },
  { id: 'lefs', name: 'Lower Extremity Functional Scale', shortName: 'LEFS', domain: 'Lower limb function', scoreHint: '0–80 (higher = better)' },
  { id: 'quickdash', name: 'QuickDASH', shortName: 'QuickDASH', domain: 'Upper limb', scoreHint: '0–100 disability' },
  { id: 'berg', name: 'Berg Balance Scale', shortName: 'BERG', domain: 'Balance / falls', scoreHint: '0–56' },
  { id: 'tug', name: 'Timed Up and Go', shortName: 'TUG', domain: 'Mobility / falls', scoreHint: 'Seconds' },
  { id: 'barthel', name: 'Barthel Index', shortName: 'Barthel', domain: 'ADL / neuro', scoreHint: '0–100 independence' },
  { id: 'fim', name: 'Functional Independence Measure (selected items)', shortName: 'FIM', domain: 'Neuro / rehab', scoreHint: 'As scored by therapist' },
  { id: 'spadi', name: 'SPADI (Shoulder)', shortName: 'SPADI', domain: 'Shoulder', scoreHint: '0–100 disability' },
  { id: 'goniometry', name: 'Goniometry / ROM chart', shortName: 'ROM', domain: 'Joint range', scoreHint: 'Degrees per joint/plane' },
  { id: 'mmt', name: 'Manual Muscle Testing', shortName: 'MMT', domain: 'Strength', scoreHint: '0–5 scale' },
  { id: 'custom', name: 'Other (specify in notes)', shortName: 'Other', domain: 'Custom', scoreHint: 'Describe tool and score' },
];
