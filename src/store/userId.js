import { create } from "zustand";
import { persist } from "zustand/middleware";

const storage = {
  getItem: (name) => JSON.parse(sessionStorage.getItem(name)),
  setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
  removeItem: (name) => sessionStorage.removeItem(name),
};

const userIdStore = create(
  persist(
    (set) => ({
      userId: null,
      setUserId: (id) => set({ userId: id }),
      clearUserId: () => set({ userId: null }),
    }),
    {
      name: "user-id-storage",
      storage: storage,
    }
  )
);

export default userIdStore;
