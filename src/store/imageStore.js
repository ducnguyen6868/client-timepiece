import { create } from "zustand";

export const useImageStore = create((set) => ({
    formData: null,
    setFormData: (data) => set({ formData: data }),
    clearFormData: () => set({ formData: null }),
}));
