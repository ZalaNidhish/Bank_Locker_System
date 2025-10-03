import React from "react";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

const UserDashboard = () => {

  const location = useLocation();


  try {
    var { username, id, isLoggedin, lockers } = location.state;
  } catch(err) {
    console.error("Error accessing location state:", err);
    isLoggedin = false;
  }

  if(!isLoggedin){
    return (
      <div className="flex items-center justify-center flex-col h-screen w-screen">
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p>You must be logged in to view this page.</p>
        <Link to="/login" className="text-blue-500 underline">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center flex-col h-screen w-screen">
      <h1 className="text-3xl font-bold">Welcome {username}</h1>
      <div className="tabs grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        <div className="text-xl h-20 w-50 flex items-center justify-center rounded-2xl bg-sky-300">
          My Locker ({lockers})
        </div>
        <div className="text-xl h-20 w-50 flex items-center justify-center rounded-2xl bg-sky-300">
          <Link to={`/createLocker/${id}`}>Book a Locker</Link> 
        </div>
        <div className="text-xl h-20 w-50 flex items-center justify-center rounded-2xl bg-sky-300">
          View Locker History
        </div>
        <div className="text-xl h-20 w-50 flex items-center justify-center rounded-2xl bg-red-300">
          <Link to={`/logout/${id}`}>Logout</Link> 
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
