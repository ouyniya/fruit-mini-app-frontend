import { HomeIcon, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import type { UserData } from "../types/user";

const FruitHeader = ({
  userData,
  handleLogout,
}: {
  userData: UserData;
  handleLogout: () => void;
}) => {
  return (
    <header className="bg-sidebar-primary-foreground shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" className="hover:cursor-pointer">
                <HomeIcon />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Fruit Inventory System</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <span className="text-sm">Welcome, {userData?.username}</span>
            </Link>

            <Button onClick={handleLogout} className="hover:cursor-pointer">
              <LogOut size={16} className="mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default FruitHeader;
