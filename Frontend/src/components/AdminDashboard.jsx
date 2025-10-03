import React from "react";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";


const AdminDashboard = () => {
  const location = useLocation();

  try {
    var { username, id, isLoggedin } = location.state;
  } catch (err) {
    console.error("Error accessing location state:", err);
    isLoggedin = false;
  }

  if (!isLoggedin) {
    return (
      <div className="flex items-center justify-center flex-col h-screen w-screen">
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p>You must be logged in to view this page.</p>
        <Link to="/login" className="text-blue-500 underline">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h5>Welcome {username}</h5>
    </div>
  );
};

export default AdminDashboard;
