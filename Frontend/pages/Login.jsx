import { useState, useEffect } from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import api from "../api/index";
import { checkAuth } from "../utils/checkAuth";

export const loginLoader = async ({ request }) => {
  if (checkAuth()) {
    return redirect("/");
  }
  return null;
};

const Login = () => {
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (msg && msg.length > 0) {
      alert(msg);
    }
  }, [msg]);

  const location = useLocation();

  const signInReq = async (user) => {
    const loginUrl =
      window.location.origin + location.pathname + location.search;
    const url = new URL(loginUrl);
    const redirectTo = url.searchParams.get("redirectTo") || "/";
    const endpoint = "/auth";
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    try {
      const response = await api.post(endpoint, user);
      if (response.status >= 200 && response.status < 300) {
        const token = response?.data?.accessToken;
        localStorage.setItem("token", JSON.stringify(token));
        setIsError(false);
        setMsg(response.data.message);
        console.log(redirectTo);
        navigate(`${redirectTo}`, { replace: true });
      }
    } catch (error) {
      setIsError(true);
      setMsg(error?.response?.data?.message);
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
    };
    signInReq(newUser);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-900 to-black">
      <div className="font-semibold bg-gray-800 bg-opacity-70 w-96 p-8 shadow-lg rounded-xl text-gray-50">
        <h3 className="text-2xl text-center mb-6">
          Welcome Back! Please Sign In to Get Started
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            Log In
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-cyan-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
