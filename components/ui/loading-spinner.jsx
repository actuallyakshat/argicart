import { Loader } from "lucide-react";
import React from "react";

export const LoadingSpinner = () => {
  return (
    <div>
      <Loader size={20} strokeWidth={3} className="animate-spin" />
    </div>
  );
};
