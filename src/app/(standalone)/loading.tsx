"use client";

import { Loader } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Loader className="size-5 animate-spin" />
    </div>
  );
};

export default LoadingPage;