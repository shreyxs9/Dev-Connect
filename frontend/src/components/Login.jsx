import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {addUser} from "../Redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../utils/constant.js'
const Login = () => {
  const [email, setEmailId] = useState("shreyas@gmail.com");
  const [password, setPassword] = useState("shreyaskumaR999#");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(BASE_URL+"/login", {
        email,
        password,
      },
      {withCredentials:true}
    );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm md:max-w-md p-8 bg-white rounded-lg shadow-md"
      >
        <div className="mb-6">
          <label htmlFor="email1" className="block text-sm font-medium text-gray-700">
            Your email
          </label>
          <input
            onChange={(e) => setEmailId(e.target.value)}
            value={email}
            id="email1"
            type="email"
            placeholder="name@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password1" className="block text-sm font-medium text-gray-700">
            Your password 
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password1"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex items-center mb-6">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;