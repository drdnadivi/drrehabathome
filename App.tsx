import React from 'react';
import { useApp } from './AppContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PublicHome } from './PublicHome';
import { DoctorDashboard } from './DoctorDashboard';
import { StaffDashboard } from './StaffDashboard';
import { PatientDashboard } from './PatientDashboard';
import { AdminDashboard } from './AdminDashboard';
import { LoginModal } from './LoginModal';
import { BookAssessmentModal } from './BookAssessmentModal';
import { LogSessionModal } from './LogSessionModal';
import { DoctorReviewModal } from './DoctorReviewModal';
import { BlogReaderModal } from './BlogReaderModal';
import { BlogEditorModal } from './BlogEditorModal';
import { ClinicalReportModal } from './ClinicalReportModal';
import { ProfileModal } from './ProfileModal';
import { BaselineAssessmentModal } from './BaselineAssessmentModal';
import { PrescribeToolsModal } from './PrescribeToolsModal';
import { DocumentUploadModal } from './DocumentUploadModal';
import { ToastContainer } from './ToastContainer';
import { WhatsAppFloat } from './WhatsAppFloat';

export const AppContent: React.FC = () => {
  const { currentRole, currentUser } = useApp();

  // Portal views only when logged in with matching role
  const view =
    currentUser && currentRole === 'doctor' && currentUser.role === 'doctor'
      ? 'doctor'
      : currentUser && currentRole === 'staff' && currentUser.role === 'staff'
        ? 'staff'
        : currentUser && currentRole === 'patient' && currentUser.role === 'patient'
          ? 'patient'
          : currentUser && currentRole === 'admin' && currentUser.role === 'admin'
            ? 'admin'
            : 'public';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased selection:bg-teal-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {view === 'public' && <PublicHome />}
        {view === 'doctor' && <DoctorDashboard />}
        {view === 'staff' && <StaffDashboard />}
        {view === 'patient' && <PatientDashboard />}
        {view === 'admin' && <AdminDashboard />}
      </main>

      {view === 'public' && <Footer />}

      <LoginModal />
      <BookAssessmentModal />
      <LogSessionModal />
      <DoctorReviewModal />
      <BlogReaderModal />
      <BlogEditorModal />
      <ClinicalReportModal />
      <ProfileModal />
      <BaselineAssessmentModal />
      <PrescribeToolsModal />
      <DocumentUploadModal />
      <ToastContainer />
      <WhatsAppFloat />
    </div>
  );
};
