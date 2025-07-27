import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../components/AuthProvider";
import ProtectedRoute from "../routes/ProtectedRoute";
import { publicRoutes, protectedRoutes } from "../utils/routesConfig.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

          {/* Protected routes */}
          {protectedRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<ProtectedRoute>{element}</ProtectedRoute>}
            />
          ))}

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
