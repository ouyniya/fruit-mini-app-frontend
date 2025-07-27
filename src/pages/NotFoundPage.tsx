import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const NotFoundPage: React.FC = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-primary-foreground to-primary/10 flex flex-col justify-center items-center font-sans text-center px-4">
      <h1 className="text-[6rem] m-0 font-bold">404</h1>
      <h2 className="text-2xl mt-2 mb-6">Page Not Found</h2>
      <p className="max-w-md text-lg leading-relaxed">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="mt-8">
        <Button variant="default" className="hover:cursor-pointer">Go to Homepage</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
