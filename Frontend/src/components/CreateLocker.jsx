import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateLocker = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [items, setItems] = useState(""); // comma-separated input

  const id = window.location.pathname.split("/")[2]; // Extract user ID from URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
      id: id,
      password: form.password.value,
      items: items.split(",").map((i) => i.trim()), // convert CSV → array
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/locker/create`, data);

      if (response.data.success) {
        navigate("/userdashboard", { 
          state: { username: response.data.username, id: id, isLoggedin: true, lockers: response.data.lockers } 
        });
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
      <h1 className="text-2xl font-bold">Create Locker</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/3">
        
        {/* Password */}
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            required
            className="outline-none p-2 border-b-2 border-gray-300 focus:border-blue-500 w-full"
          />
        </div>

        {/* Items */}
        <div>
          <input
            type="text"
            id="items"
            name="items"
            placeholder="Enter items (comma separated)"
            value={items}
            onChange={(e) => setItems(e.target.value)}
            className="outline-none p-2 border-b-2 border-gray-300 focus:border-blue-500 w-full"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateLocker;
