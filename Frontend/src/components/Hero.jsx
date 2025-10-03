import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-8 bg-gray-100">
      <h1 className="text-5xl font-bold">Welcome to the Bank Locker System</h1>
      <p className="text-lg">
        Secure your valuables with our state-of-the-art locker system.
      </p>

      <div className="flex gap-4">
        <Link
          to="/register"
          className="text-white hover:underline p-4 bg-blue-500 rounded-md"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="text-white hover:underline p-4 bg-blue-500 rounded-md"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Hero;
