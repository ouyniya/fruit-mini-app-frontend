import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import useAuthStore from "../stores/authStore";
import MessageBox from "../components/common/MessageBox";
import { Button } from "../components/ui/button";
import { authService } from "../services/authService";

const HomePage: React.FC = () => {
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info"
  );

  const handleLogout = async () => {
    try {
      await authService.logout();

      setTimeout(() => {
        clearAuth(); // ล้าง token และ user ใน memory
      }, 1000);

      setMessage("Logout Success!");
      setMessageType("success");
    } catch (error) {
      console.log(error);
      setMessage("Logout Error");
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen bg-primary-foreground flex flex-col items-center justify-center p-4">
      <MessageBox
        message={message}
        type={messageType}
        onClose={() => setMessage(null)}
      />
      <div className="bg-primary-foreground p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-4xl font-extrabold mb-6">Welcome!</h1>
        {isAuthenticated ? (
          <>
            <p className="text-lg mb-4">
              You are logged in as:{" "}
              <span className="font-semibold">{user?.username}</span>
            </p>
            <p className="text-md mb-6">
              Role: <span className="font-semibold">{user?.role}</span>
            </p>
            <div className="flex flex-col space-y-4">
              {/* Use Link component for navigation */}
              <Link to="/fruit">
                <Button className="hover:cursor-pointer w-full">
                  Manage Fruits
                </Button>
              </Link>
              <Link to="/profile">
                <Button
                  variant="outline"
                  className="hover:cursor-pointer w-full"
                >
                  Profile
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full bg-red-500 text-white hover:cursor-pointer  hover:bg-red-700 hover:text-white"
              >
                Logout
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg mb-6">Please log in to continue.</p>
            <div className="flex flex-col space-y-4">
              {/* Use Link component for navigation */}
              <Link to="/login">
                <Button className="w-full hover:cursor-pointer"> Log in</Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline"
                  className="w-full hover:cursor-pointer"
                >
                  Register
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
