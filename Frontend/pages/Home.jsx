import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkAuth } from "../utils/checkAuth";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (checkAuth()) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleViewProfile = () => {
    navigate("/about");
  };

  return (
    <div className="relative text-center flex flex-col items-center text-gray-50 bg-gradient-to-b from-gray-900 to-black min-h-screen py-10">
      {isLoggedIn && (
        <div className="absolute z-10 top-4 right-4">
          <button
            onClick={handleViewProfile}
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-full text-lg font-semibold shadow-md transition-all">
            Profile
          </button>
        </div>
      )}

      <div className="relative w-full max-w-4xl mx-auto bg-opacity-70 rounded-lg shadow-lg overflow-hidden">
        <img
          src="../public/background.jpg" // Replace this with your actual image
          alt="Developer Game"
          className="w-full h-80 object-cover opacity-80 "
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-4">
          <h1 className="text-6xl font-bold text-white ">Dev Game</h1>
          <p className="text-lg mt-4 text-gray-200">
            Test Your Developer Skills and Complete the Quiz!
          </p>
        </div>
      </div>

      {isLoggedIn ? (
        <div className="mt-8 flex space-x-4">
          <Link
            to="/quizzes/1"
            className="w-40 bg-green-600 hover:bg-green-500 text-white py-3 rounded-full text-center text-xl font-semibold shadow-md transition-all">
            Start Quiz
          </Link>
        </div>
      ) : (
        <div className="mt-8 flex space-x-4">
          <Link
            to="/login"
            className="w-40 bg-green-600 hover:bg-green-500 text-white py-3 rounded-full text-center text-xl font-semibold shadow-md transition-all">
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="w-40 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-full text-center text-xl font-semibold shadow-md transition-all">
            Register
          </Link>
        </div>
      )}

      <div className="">
        <div className="mt-12 max-w-xl mx-auto text-left">
          <h2 className="text-3xl font-bold text-white mb-6">How to Play</h2>
          <div className="space-y-4">
            <p className="text-lg bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
              Answer questions correctly to earn points. The faster you answer,
              the more points you earn!
            </p>
            <p className="text-lg bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
              Use Console, Inspect Element, and other debugging tools to solve
              quizzes, find hints, discover solutions, and unlock keys.
            </p>
            <p className="text-lg bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
              Beat the timer to succeed, or you'll have to start over.
            </p>
          </div>
        </div>

        <div className="mt-12 text-left">
          <h2 className="text-3xl font-bold text-white mb-6 text-left">
            Beat the Clock
          </h2>
          <p className="text-lg bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
            Each quiz is timed. Make sure to finish before time runs out!
          </p>
        </div>

        <div className="mt-12 max-w-xl mx-auto text-left">
          <h2 className="text-3xl font-bold text-white mb-6">
            Unlock Achievements
          </h2>
          <p className="text-lg bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
            Earn badges and rewards by completing quizzes within the time limit
            and discovering hidden keys.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
