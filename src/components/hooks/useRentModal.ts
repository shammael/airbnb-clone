import { create } from "zustand";

export interface RentModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useRentModal = create<RentModalStore>((set) => ({
  isOpen: false,
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}));

export default useRentModal;
