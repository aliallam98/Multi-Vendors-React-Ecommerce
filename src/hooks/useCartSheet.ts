import { create } from "zustand";

interface CartSheetStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCartSheet = create<CartSheetStore>((set) => ({
    isOpen: false,
    onOpen: () =>
    set(() => ({
        isOpen: true,
    })),
    onClose: () =>
    set(() => ({
        isOpen: false,
    })),
}));

export default useCartSheet;
