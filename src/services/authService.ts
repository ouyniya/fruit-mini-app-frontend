import axiosInstance from "../utils/axiosInstance";

export const authService = {
  login: (email: string, password: string) =>
    axiosInstance.post("/auth/login", { email, password }),

  register: (username: string, email: string, password: string) =>
    axiosInstance.post("/auth/register", { username, email, password }),

  refreshToken: () => axiosInstance.post("/auth/refresh-token", null),

  changePassword: (currentPassword: string, newPassword: string) =>
    axiosInstance.post("/auth/change-password", { currentPassword, newPassword }),

  logout: () => axiosInstance.post("/auth/logout", null),

  getProfile: () => axiosInstance.get("/auth/profile"),
};
