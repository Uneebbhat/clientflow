import { DEFAULT_IMG } from "@/config/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStoreProps {
  id: string;
  name: string;
  email: string;
  profilePic: File | string;
  token: string | null;
}

interface Store {
  user: UserStoreProps;
  setUser: (user: Partial<UserStoreProps>) => void;
  logout: () => void;
}

const useUserStore = create<Store>()(
  persist(
    (set) => ({
      user: {
        id: "",
        name: "",
        email: "",
        profilePic: DEFAULT_IMG as string,
        token: null,
      },
      setUser: (user) =>
        set((state) => ({
          user: { ...state.user, ...user },
        })),
      logout: () =>
        set(() => ({
          user: {
            id: "",
            name: "",
            email: "",
            profilePic: DEFAULT_IMG as string,
            token: null,
          },
        })),
    }),
    {
      name: "user-store",
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useUserStore;
