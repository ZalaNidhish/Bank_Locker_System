import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const id = window.location.pathname.split("/")[2]; // Extract user ID from URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
      id: id,
      password: form.password.value,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/logout`, data);

      if (response.data.success) {
        navigate("/login", {state:{isLoggedin: response.data.isLoggedin}});
      } else {
        setError(response.data.message);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 gap-10">
      <h1 className="text-2xl font-bold">Logout</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/3">
        
        {/* Password */}
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            required
            className="outline-none p-2 border-b-2 border-gray-300 focus:border-blue-500 w-full"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default Logout;
