import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import CreateLocker from "./components/CreateLocker";
import Hero from "./components/Hero";
import Logout from "./components/Logout"

const App = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4 bg-gray-100">

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/createLocker/:id" element={<CreateLocker />} />
        <Route path="/logout/:id" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default App;
