import React, { useEffect, useState } from "react";
import useAuthStore from "../stores/authStore";
import { authService } from "../services/authService";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingSpinner from "./common/LoadingSpinner";

// const publicPaths = ["/login", "/register", "/error", "/"];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string>("");

  const refreshAccessToken = async () => {
    setErrors("");
    try {
      const res = await authService.refreshToken(); // ส่ง cookie ไป
      if (res.data?.success && res.data?.data?.accessToken) {
        const accessToken = res.data.data.accessToken;
        setAuth(null, accessToken);

        const profile = await authService.getProfile();
        const { id, username, email, role } = profile.data.data;
        const userData = { id, username, email, role };
        setAuth(userData, accessToken);
      } else {
        clearAuth();
      }
    } catch (error) {
      clearAuth();
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Something went wrong";
        setErrors(message);
        console.log(errors)
        if (status !== 401) {
          // ถ้า error ที่ไม่ใช่ 401 ให้ไปหน้า /error
          navigate("/error", { state: { errorsMsg: message } });
        }
        // 401 ไม่ต้อง redirect บังคับ เพราะหมายถึงยังไม่ login
      } else {
        setErrors("Unexpected error");
        navigate("/error", { state: { errorsMsg: "Unexpected error" } });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (publicPaths.includes(location.pathname)) {
    //   setLoading(false);
    //   return;
    // }
    refreshAccessToken();
  }, [location.pathname]);

  if (loading) return <LoadingSpinner />;

  return <>{children}</>;
};
