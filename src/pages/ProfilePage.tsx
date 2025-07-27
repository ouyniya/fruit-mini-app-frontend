import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import useAuthStore from "../stores/authStore";
import { Button } from "../components/ui/button";

interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    setUserData(user);
  }, []);

  if (!userData) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-primary-foreground flex items-center justify-center p-4">
      <div className="p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Profile</h2>
        <div className="space-y-4">
          <p>
            <strong>ID:</strong> {userData.id}
          </p>
          <p>
            <strong>Username:</strong> {userData.username}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Role:</strong> {userData.role}
          </p>
        </div>
        <div className="mt-8 text-center">
          <Link to="/">
            <Button className="hover:cursor-pointer">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
