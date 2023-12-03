import { create } from "zustand";

const useUserIdStore = create((set) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),
  clearUserId: () => set({ userId: null }),
}));

export default useUserIdStore;
