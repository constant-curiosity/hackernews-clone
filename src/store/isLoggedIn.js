import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useisLoggedInStore = create(
  devtools((set) => ({
    isLoggedInGlobal: false,
    setIsLoggedInGlobal: (boolean) =>
      set(() => ({ isLoggedInGlobal: boolean })),
  }))
);

export default useisLoggedInStore;
