import React, { useEffect, useState } from 'react';
import { useApp } from './AppContext';
import { X, Upload, FileText } from 'lucide-react';
import { fetchPatients, uploadPatientDocument, fetchPatientDocuments } from './api';
import { Patient } from './types';

export const DocumentUploadModal: React.FC = () => {
  const { activeModal, closeModal, modalPayload, showToast, triggerRefresh, currentUser } = useApp();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientId, setPatientId] = useState('');
  const [docs, setDocs] = useState<any[]>([]);
  const [notes, setNotes] = useState('');
  const [docType, setDocType] = useState('discharge_summary');
  const [saving, setSaving] = useState(false);

  const loadDocs = async (id: string) => {
    if (!id) return;
    try {
      const list = await fetchPatientDocuments(id);
      setDocs(list);
    } catch {
      setDocs([]);
    }
  };

  useEffect(() => {
    if (activeModal === 'upload_document') {
      fetchPatients().then((p) => {
        setPatients(p);
        const id = modalPayload?.patientId || p[0]?.id || '';
        setPatientId(id);
        loadDocs(id);
      });
    }
  }, [activeModal, modalPayload]);

  if (activeModal !== 'upload_document') return null;

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !patientId) return;
    if (file.size > 1.5 * 1024 * 1024) {
      showToast('Max file size 1.5MB on current storage', 'warning');
      return;
    }
    setSaving(true);
    try {
      const dataBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = String(reader.result || '');
          const b64 = result.includes(',') ? result.split(',')[1] : result;
          resolve(b64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      await uploadPatientDocument(patientId, {
        fileName: file.name,
        mimeType: file.type,
        dataBase64,
        docType,
        notes,
        uploadedBy: currentUser?.name || 'Staff',
      });
      showToast('Document uploaded — visible on doctor portal', 'success');
      setNotes('');
      triggerRefresh();
      loadDocs(patientId);
    } catch (err: any) {
      showToast(err.message || 'Upload failed', 'error');
    } finally {
      setSaving(false);
      e.target.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative my-8">
        <button type="button" onClick={closeModal} className="absolute top-4 right-4 cursor-pointer">
          <X className="w-5 h-5 text-slate-500" />
        </button>
        <div className="flex items-center gap-2 mb-1">
          <Upload className="w-5 h-5 text-teal-700" />
          <h2 className="text-lg font-bold text-slate-900">Upload clinical document</h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Discharge summary, operative notes, or referral letters. Doctor can view these on the patient record.
        </p>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-700">Patient</label>
            <select
              className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm"
              value={patientId}
              onChange={(e) => {
                setPatientId(e.target.value);
                loadDocs(e.target.value);
              }}
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700">Document type</label>
            <select className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm" value={docType} onChange={(e) => setDocType(e.target.value)}>
              <option value="discharge_summary">Hospital discharge summary</option>
              <option value="operative_note">Operative / surgical note</option>
              <option value="referral">Referral letter</option>
              <option value="imaging_report">Imaging report</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700">Notes (optional)</label>
            <input className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Post-TKR discharge from XYZ Hospital" />
          </div>
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-6 cursor-pointer hover:border-teal-400">
            <Upload className="w-6 h-6 text-slate-400" />
            <span className="text-sm font-medium text-slate-700">{saving ? 'Uploading…' : 'Choose PDF or image (max 1.5MB)'}</span>
            <input type="file" accept=".pdf,image/*" className="hidden" onChange={onFile} disabled={saving || !patientId} />
          </label>

          <div className="pt-2">
            <div className="text-xs font-semibold text-slate-700 mb-2">Uploaded for this patient</div>
            {docs.length === 0 && <p className="text-xs text-slate-400">No documents yet.</p>}
            <ul className="space-y-1.5">
              {docs.map((d) => (
                <li key={d.id} className="flex items-center gap-2 text-xs text-slate-600 border border-slate-100 rounded-lg px-2 py-1.5">
                  <FileText className="w-3.5 h-3.5 text-teal-600" />
                  <span className="flex-1 truncate">{d.fileName} · {d.docType}</span>
                  <span className="text-slate-400">{new Date(d.uploadedAt).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
