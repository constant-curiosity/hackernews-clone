import { create } from "zustand";
import { persist } from "zustand/middleware";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const useisLoggedInStore = create(
  persist(
    (set) => ({
      isLoggedInGlobal: !!getCookie("authToken"),
      setIsLoggedInGlobal: (isUserLoggedInGlobal) => {
        if (!isUserLoggedInGlobal) {
          document.cookie =
            "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
        set({ isLoggedInGlobal: isUserLoggedInGlobal });
      },
    }),
    {
      name: "login-storage",
      getStorage: () => sessionStorage,
    }
  )
);

export default useisLoggedInStore;
