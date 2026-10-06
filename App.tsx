import React from 'react';
import { useApp } from './AppContext';
import { QuickRoleSwitcher } from './QuickRoleSwitcher';
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
import { ToastContainer } from './ToastContainer';

export const AppContent: React.FC = () => {
  const { currentRole } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased selection:bg-teal-500 selection:text-white">
      {/* 1-Click Role Switcher Demo Bar at the very top */}
      <QuickRoleSwitcher />

      {/* Main Navigation */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {currentRole === 'public' && <PublicHome />}
        {currentRole === 'doctor' && <DoctorDashboard />}
        {currentRole === 'staff' && <StaffDashboard />}
        {currentRole === 'patient' && <PatientDashboard />}
        {currentRole === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <LoginModal />
      <BookAssessmentModal />
      <LogSessionModal />
      <DoctorReviewModal />
      <BlogReaderModal />
      <BlogEditorModal />
      <ClinicalReportModal />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};
