export type UserRole = 'public' | 'doctor' | 'staff' | 'patient' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  title?: string;
  credentials?: string;
  registrationNo?: string;
  avatar?: string;
  bio?: string;
  patientId?: string;
  phone?: string;
  age?: number;
  gender?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  diagnosis: string;
  surgeryDate: string;
  postOpDay: number;
  primarySurgeon: string;
  assignedDoctor: string;
  assignedTherapist: string;
  status: string;
  recoveryScore: number;
  targetROM: string;
  currentROM: string;
  baselineVAS: number;
  currentVAS: number;
  totalSessionsPlanned: number;
  sessionsCompleted: number;
  clinicalGoals: string[];
  sessions?: Session[];
  exercises?: Exercise[];
}

export interface Session {
  id: string;
  patientId: string;
  patientName: string;
  sessionNumber: number;
  date: string;
  time: string;
  therapistName: string;
  vitals: {
    bp: string;
    pulse: string;
    spo2: string;
  };
  painScoreVAS: number;
  romMeasurements: Record<string, string>;
  exercisesPerformed: string[];
  functionalMobility: string;
  therapistNotes: string;
  pmrDoctorStatus: 'pending_review' | 'reviewed';
  pmrDoctorName: string;
  pmrDoctorReviewedAt?: string;
  pmrDoctorNotes?: string;
  pmrDoctorAction?: string;
  flaggedUrgent: boolean;
  complianceRate: string;
}

export interface Exercise {
  id: string;
  patientId: string;
  title: string;
  category: string;
  frequency: string;
  sets: string;
  reps: string;
  targetMuscle: string;
  instructions: string;
  precautions: string;
  completedToday: boolean;
  doctorPrescriptionNote: string;
}

export interface BlogComment {
  id: string;
  author: string;
  date: string;
  text: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  coverImage: string;
  summary: string;
  content: string;
  tags: string[];
  views: number;
  featured?: boolean;
  comments?: BlogComment[];
}

export interface Booking {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  serviceType: string;
  address: string;
  preferredDate: string;
  preferredSlot: string;
  doctorConsultation: string;
  symptoms: string;
  status: string;
  createdAt: string;
}

export interface SystemStats {
  totalPatients: number;
  activePatients: number;
  totalSessions: number;
  reviewedSessions: number;
  pendingReviews: number;
  doctorReviewRate: string;
  avgRecoveryScore: string;
  totalBlogs: number;
  totalBookings: number;
}
