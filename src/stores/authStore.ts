import { create } from "zustand";

interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  user: UserData | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: UserData | null, token: string) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  setAuth: (user, token) => {
    set({
      user,
      accessToken: token,
      isAuthenticated: true,
    });
  },

  clearAuth: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    }),
}));

export default useAuthStore;
