import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      username: form.username.value,
      password: form.password.value,
    };


    try {
      const response = await axios.post("http://localhost:5000/login", data);
      // Optionally, redirect or show success message here
      if(response.data.success){
        if(response.data.isLoggedin && response.data.isAdmin){
          navigate("/admindashboard", {state:{username:response.data.username, id:response.data.id, isLoggedin: response.data.isLoggedin}})
        }else if(response.data.isLoggedin && !response.data.isAdmin){
          navigate("/userdashboard", {state:{username:response.data.username, id:response.data.id, isLoggedin: response.data.isLoggedin, lockers:response.data.lockers}})
        }
      }else {
        setError(response.data.message); // show backend error
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-8 bg-white">
      <h1 className="font-bold text-3xl">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="p-6 w-80 flex flex-col gap-4 bg-white shadow-md rounded"
      >
        <div>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            autoComplete="username"
            required
            className="outline-none p-2 border-none border-b-2 border-gray-300 focus:border-blue-500 w-full"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            required
            className="outline-none p-2 border-none border-b-2 border-gray-300 focus:border-blue-500 w-full"
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 cursor-pointer transition duration-300"
        >
          Login
        </button>
      </form>
      <h3 className="text-gray-500">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </h3>
    </div>
  );
};

export default Login;
