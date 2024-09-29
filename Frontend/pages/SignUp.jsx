import React, { useEffect, useState } from "react";
import api from "../api/index";
import { Link, redirect, useNavigate } from "react-router-dom";
import { checkAuth } from "../utils/checkAuth";

export const signUpLoader = async ({ request }) => {
  if (checkAuth()) {
    return redirect("/");
  }
  return null;
};

const SignUp = () => {
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (msg && msg.length > 0) {
      alert(msg);
    }
  }, [msg]);

  const signUpReq = async (user) => {
    const endpoint = "/auth/sign-up";
    try {
      const response = await api.post(endpoint, user);
      if (response.status >= 200 && response.status < 300) {
        setIsError(false);
        setMsg(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setMsg(error.response.data.message);
    }
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password,
    };
    signUpReq(newUser);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-900 to-black">
      <div className="font-semibold bg-gray-800 bg-opacity-70 w-96 p-8 shadow-lg rounded-xl text-gray-50">
        <h3 className="text-2xl text-center mb-6">
          Please Sign Up to Get Started...!
        </h3>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
          <div>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              className="w-full px-4 py-2 bg-gray-900 text-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-800"
              placeholder="Username"
              required
            />
          </div>
          <div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-gray-900 text-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-800"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-gray-900 text-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-800"
              placeholder="Password (min 8 characters)"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-cyan-800 hover:bg-cyan-700 text-white rounded-xl font-semibold shadow-md transition-all">
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
