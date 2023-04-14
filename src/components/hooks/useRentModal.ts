import { create } from "zustand";

interface RentModelStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useRentModal = create<RentModelStore>((set) => ({
  isOpen: false,
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}));

export default useRentModal;
