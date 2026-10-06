# DrRehabAtHome.in | PMR Doctor-Directed Home Physiotherapy Platform

> **Clinical USP**: In-home physical therapy directed by a **Physical Medicine & Rehabilitation (PMR / Physiatrist) Specialist, Dr. Dharshan N A, MD (PMR)**. Therapists visit your home, log objective telemetry (ROM goniometry, VAS pain, vitals), while Dr. Dharshan audits recovery milestones (Day 7, 14, 21) and acts on clinical alerts within 4 hours.

---

## 🚀 Quick Start Guide (Run on Your Computer)

### 1. Requirements:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Steps to Run:
```bash
# 1. Unzip the downloaded archive:
unzip drrehabathome-fullstack.zip
cd drrehabathome-fullstack

# 2. Install all dependencies:
npm install

# 3. Build the frontend and start the full-stack server:
npm run build
npm start
```

Open your browser at **`http://localhost:3000`** to access the complete website and all backend portals.

---

## 🐳 Docker Quick Start
```bash
# Build and run with Docker Compose:
docker-compose up --build
```
Access at `http://localhost:3000`. Persistent database files are mounted in `./data`.

---

## 🌟 Key Features & Clinical Portals

### 1. Public Healthcare Platform (`drrehabathome.in`)
- **Hero & Timeline Predictor**: Interactive recovery milestone benchmark calculator for TKR, Stroke, and Frozen Shoulder.
- **Conditions Treated at Home**: 22 detailed clinical protocols across 6 categories:
  - 🦴 Post-Op Orthopedic Care (TKR, THR, ACL, Rotator Cuff, ORIF, Spine)
  - 🧠 Neurology & Stroke (Brunnstrom Stages, CIMT, Parkinson's, Bell's Palsy, SCI)
  - ⚡ Spine & Joint Pain (Disc Bulge/Sciatica, Cervical Spondylosis, Knee OA, Frozen Shoulder)
  - 👴 Geriatric Mobility & Fall Prevention (VOR balance, sarcopenia, frailty)
  - 🫁 Cardiopulmonary & ICU Rehab (CABG sternotomy care, COPD chest physio)
- **Care Packages & Pricing**: Transparent rehabilitation packages with an automatic **5% discount on packages longer than 1 week**.
- **Hospital-in-a-Bag Modality Kit**: Portable NMES, TENS, digital goniometers, and resistance systems.
- **Dynamic Blogs CMS**: Real-time articles authored by Dr. Dharshan N A & clinical team with category filters, reading time, and interactive comments.

### 2. Practical Assessment Booking Flow
- **Option 1**: In-Home Physiotherapist Visit + Dr. Dharshan's PMR Review & Blueprint *(Standard / Most Popular)*
- **Option 2**: In-Clinic Physiatrist Consultation with Dr. Dharshan (Central OPD) + In-Home Physical Therapy

### 3. Role-Based Portals (1-Click Switcher at Top of Website)
| Role | Portal / Capabilities | Demo Account |
|---|---|---|
| **🩺 PMR Doctor** | Dr. Dharshan N A, MD (PMR) — Milestone audit queue, goniometry review, exercise prescription calibration, surgeon dossier signing | `doctor@physiopmr.com` / `demo123` |
| **🏃 Physiotherapist** | PT Rahul Sharma, MPT — Home visit schedule, digital telemetry logging (BP, SpO2, VAS pain, goniometer ROM angles), urgent review flags | `staff@physiopmr.com` / `demo123` |
| **📈 Patient** | Rajesh Mehta (Post-TKR Day 18) — Interactive recovery curves (ROM & VAS), daily exercise checklists, doctor-certified milestone timeline | `patient@physiopmr.com` / `demo123` |
| **⚙️ Admin** | Clinical Operations Console — Dynamic Blog CMS (CRUD), booking manager, patient admissions roster | `admin@physiopmr.com` / `demo123` |

---

## 📁 Project Directory Structure
```
├── data/
│   ├── db.json               # Persistent JSON database (Users, Patients, Sessions, Blogs, Bookings)
│   └── initialData.json      # Factory reset seed data
├── public/
│   └── dr-dharshan.jpg       # Lead Physiatrist verified photo
├── server/
│   └── server.js             # Express.js REST API & static production server
├── src/
│   ├── api.ts                # Frontend API client
│   ├── types.ts              # Complete TypeScript interfaces
│   ├── App.tsx               # Root component & role view router
│   ├── components/
│   │   ├── AdminDashboard.tsx
│   │   ├── BlogEditorModal.tsx
│   │   ├── BlogReaderModal.tsx
│   │   ├── BookAssessmentModal.tsx
│   │   ├── ClinicalReportModal.tsx
│   │   ├── DoctorDashboard.tsx
│   │   ├── DoctorReviewModal.tsx
│   │   ├── LogSessionModal.tsx
│   │   ├── LoginModal.tsx
│   │   ├── Navbar.tsx
│   │   ├── PatientDashboard.tsx
│   │   ├── PublicHome.tsx
│   │   ├── QuickRoleSwitcher.tsx
│   │   ├── StaffDashboard.tsx
│   │   └── public/
│   │       ├── ConditionsTreatedSection.tsx
│   │       ├── CostCalculatorSection.tsx
│   │       ├── DynamicBlogsSection.tsx
│   │       ├── HeroSection.tsx
│   │       ├── RecoveryEvidenceSection.tsx
│   │       ├── SpecialtiesSection.tsx
│   │       ├── UspPmrSection.tsx
│   │       └── WorkflowSection.tsx
│   └── context/
│       └── AppContext.tsx    # Global React state management
├── Dockerfile                # Multi-stage production container
├── docker-compose.yml        # Compose configuration with volume persistence
├── DEPLOYMENT.md             # One-click cloud deployment guide (Render, Railway, VPS)
└── start.sh                  # One-command startup script
```
