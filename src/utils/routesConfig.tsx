import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ErrorRateLimitPage from "../pages/ErrorRateLimitPage";
import ProfilePage from "../pages/ProfilePage";
import FruitPage from "../pages/FruitPage";

export const publicRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/error", element: <ErrorRateLimitPage /> },
];

export const protectedRoutes = [
  { path: "/profile", element: <ProfilePage /> },
  { path: "/fruit", element: <FruitPage /> },
];
