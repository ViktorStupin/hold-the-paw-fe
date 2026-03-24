// store/authModal.store.ts
import { create } from 'zustand';

interface IAuthModalState {
  isOpen: boolean;
  message: string;
  open: (message: string) => void;
  close: () => void;
}

export const useAuthModalStore = create<IAuthModalState>((set) => ({
  isOpen: false,
  message: '',
  open: (message) => set({ isOpen: true, message }),
  close: () => set({ isOpen: false, message: '' }),
}));