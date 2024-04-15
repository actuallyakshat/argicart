import { LoadingSpinner } from "@/components/ui/loading-spinner";
import React from "react";

export default function loading() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
