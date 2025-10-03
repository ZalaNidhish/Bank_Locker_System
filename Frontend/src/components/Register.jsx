import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      username: form.username.value,
      password: form.password.value,
      email: form.email.value,
      phone: form.phone.value,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, data);

      if (response.data.success) {
        navigate("/userdashboard", {
          state: { username: response.data.username, id: response.data.id, isLoggedin: response.data.isLoggedin, lockers:0 },
        });
      } else {
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
      <h1 className="font-bold text-3xl">Register</h1>
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
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            required
            className="outline-none p-2 border-none border-b-2 border-gray-300 focus:border-blue-500 w-full"
          />
        </div>
        <div>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone Number"
            autoComplete="phone"
            required
            className="outline-none p-2 border-none border-b-2 border-gray-300 focus:border-blue-500 w-full  "
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 cursor-pointer transition duration-300"
        >
          Register
        </button>
      </form>
      <h3 className="text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </h3>
    </div>
  );
};

export default Register;
