import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  hasOnboarded: boolean;
  walletAddress: string | null;
  token: string | null;
  setOnboarded: () => void;
  setSession: (walletAddress: string, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      hasOnboarded: false,
      walletAddress: null,
      token: null,

      setOnboarded: () => set({ hasOnboarded: true }),

      setSession: (walletAddress, token) =>
        set({ walletAddress, token }),

      logout: () => set({ walletAddress: null, token: null }),
    }),
    {
      name: "swipepay-auth",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);