import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-black bg-white">
      {/* Background is disabled temporarily by removing image section */}

      {/* Content Container */}
      <div className="w-full max-w-xl px-4">{children}</div>
    </div>
  );
};

export default AuthLayout;
