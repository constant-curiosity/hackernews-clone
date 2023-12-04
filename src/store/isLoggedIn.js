import { create } from "zustand";
import { persist } from "zustand/middleware";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const storage = {
  getItem: (name) => JSON.parse(sessionStorage.getItem(name)),
  setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
  removeItem: (name) => sessionStorage.removeItem(name),
};

const userIsLoggedInStore = create(
  persist(
    (set) => ({
      isLoggedInGlobal: !!getCookie("authToken"),
      setIsLoggedInGlobal: (isUserLoggedInGlobal) => {
        if (!isUserLoggedInGlobal) {
          document.cookie =
            "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict;";
        }
        set({ isLoggedInGlobal: isUserLoggedInGlobal });
      },
    }),
    {
      name: "login-storage",
      storage: storage,
    }
  )
);

export default userIsLoggedInStore;
