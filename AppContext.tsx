import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Blog, Session, Patient } from './types';
import { fetchUsers } from './api';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  currentUser: User | null;
  currentRole: UserRole;
  selectedPatientId: string;
  setSelectedPatientId: (id: string) => void;
  setCurrentUser: (user: User | null) => void;
  switchRole: (role: UserRole) => void;
  allUsers: User[];
  
  // Modals
  activeModal: string | null;
  openModal: (modal: string, payload?: any) => void;
  closeModal: () => void;
  modalPayload: any;
  
  // Notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Refresh trigger for components
  refreshCount: number;
  triggerRefresh: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('public');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('pat-101');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalPayload, setModalPayload] = useState<any>(null);
  
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  useEffect(() => {
    fetchUsers().then(users => {
      setAllUsers(users);
    }).catch(err => {
      console.warn('Could not prefetch users:', err);
    });
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const triggerRefresh = () => {
    setRefreshCount(c => c + 1);
  };

  const openModal = (modal: string, payload: any = null) => {
    setActiveModal(modal);
    setModalPayload(payload);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalPayload(null);
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'public') {
      setCurrentUser(null);
      showToast('Switched to Public Website view', 'info');
      return;
    }

    const matchedUser = allUsers.find(u => u.role === role);
    if (matchedUser) {
      setCurrentUser(matchedUser);
      if (matchedUser.patientId) {
        setSelectedPatientId(matchedUser.patientId);
      }
      showToast(`Logged in as ${matchedUser.name} (${matchedUser.title || matchedUser.role.toUpperCase()})`, 'success');
    } else {
      // Fallback mock
      const mockUser: User = {
        id: `mock-${role}`,
        email: `${role}@physiopmr.com`,
        name: role === 'doctor' ? 'Dr. Dharshan N A, MD (PMR)' : role === 'staff' ? 'PT Rahul Sharma, MPT' : role === 'patient' ? 'Rajesh Mehta' : 'Dr. Sameer Verma',
        role,
        title: role === 'doctor' ? 'PMR Specialist (Physiatrist)' : role === 'staff' ? 'Senior Home Physiotherapist' : role === 'patient' ? 'Post-TKR Patient' : 'Platform Administrator'
      };
      setCurrentUser(mockUser);
      showToast(`Switched view to ${mockUser.name}`, 'info');
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        selectedPatientId,
        setSelectedPatientId,
        setCurrentUser,
        switchRole,
        allUsers,
        activeModal,
        openModal,
        closeModal,
        modalPayload,
        toasts,
        showToast,
        removeToast,
        refreshCount,
        triggerRefresh,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
