import React from 'react';
import { X } from 'lucide-react';
import { useApp } from './AppContext';
import { CARE_EMAIL, DISPLAY_PHONE } from './config';

export const PrivacyPolicyModal: React.FC = () => {
  const { activeModal, closeModal } = useApp();
  if (activeModal !== 'privacy') return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-900/50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 sticky top-0 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Privacy policy</h2>
          <button type="button" onClick={closeModal} className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="px-5 py-4 space-y-3 text-[13px] text-slate-600 leading-relaxed">
          <p>
            DrRehab@Home collects enquiry and care-related information (such as contact details, clinical notes, progress scores, and documents you or the care team upload) to coordinate home rehabilitation.
          </p>
          <p>
            Patient health information in clinical portals is accessible only through secure sign-in to authorised roles (patient, therapist, doctor, admin). We do not sell patient medical data. We do not share identifiable health records with third parties for marketing.
          </p>
          <p>
            Data is stored and transmitted using industry-standard safeguards appropriate to a small clinical operation. Access is limited to people involved in your care or administration. You may contact us to request correction of your contact details.
          </p>
          <p>
            This notice is general information under applicable Indian data-protection expectations (including the Digital Personal Data Protection Act framework as it applies). It is not a claim of foreign certification (for example HIPAA) unless separately audited and stated.
          </p>
          <p>
            Contact: {CARE_EMAIL} · {DISPLAY_PHONE}
          </p>
        </div>
        <div className="px-5 py-3 border-t border-slate-100">
          <button type="button" onClick={closeModal} className="w-full py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
