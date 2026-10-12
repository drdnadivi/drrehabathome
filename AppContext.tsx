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
  /** Navigate after real login, or return to public site. Does not fake-login. */
  goToRole: (role: UserRole) => void;
  logout: () => void;
  allUsers: User[];

  activeModal: string | null;
  openModal: (modal: string, payload?: any) => void;
  closeModal: () => void;
  modalPayload: any;

  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  refreshCount: number;
  triggerRefresh: () => void;

  /** @deprecated use goToRole — kept so older calls compile during transition */
  switchRole: (role: UserRole) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('public');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalPayload, setModalPayload] = useState<any>(null);

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  useEffect(() => {
    fetchUsers()
      .then((users) => setAllUsers(users))
      .catch((err) => console.warn('Could not prefetch users:', err));
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerRefresh = () => setRefreshCount((c) => c + 1);

  const openModal = (modal: string, payload: any = null) => {
    setActiveModal(modal);
    setModalPayload(payload);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalPayload(null);
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole('public');
    setSelectedPatientId('');
    showToast('Signed out', 'info');
  };

  const goToRole = (role: UserRole) => {
    if (role === 'public') {
      setCurrentRole('public');
      return;
    }
    if (!currentUser || currentUser.role !== role) {
      setCurrentRole('public');
      openModal('login');
      showToast('Please sign in to open your portal', 'info');
      return;
    }
    setCurrentRole(role);
    if (currentUser.patientId) {
      setSelectedPatientId(currentUser.patientId);
    }
  };

  /** After successful API login */
  const enterAsUser = (user: User) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    if (user.patientId) setSelectedPatientId(user.patientId);
  };

  // Expose enter via setCurrentUser wrapper used by LoginModal
  const setCurrentUserAndRole = (user: User | null) => {
    if (!user) {
      logout();
      return;
    }
    enterAsUser(user);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        selectedPatientId,
        setSelectedPatientId,
        setCurrentUser: setCurrentUserAndRole,
        goToRole,
        logout,
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
        switchRole: goToRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
