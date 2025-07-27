import { Loader2 } from "lucide-react";
import React from "react";

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center gap-2 h-screen">
    <div className="animate-spin">
      <Loader2 />
    </div>
    Loading...
  </div>
);

export default LoadingSpinner;
