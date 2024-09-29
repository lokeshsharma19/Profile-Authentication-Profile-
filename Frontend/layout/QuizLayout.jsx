import React, { useState, useEffect, useRef } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { quizzes } from "../constants";

const QuizLayout = ({ totalScore, updateScore }) => {
  const { id } = useParams();
  const currentQuiz = quizzes.find((quiz) => quiz.id === parseInt(id));
  const [time, setTime] = useState(60); // Time in seconds
  const timeRef = useRef(null);
  const [isQuizLoaded, setIsQuizLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (ev) => {
      ev.preventDefault();
      ev.returnValue = "Are you sure you want to close?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    setTime(60);
    if (isQuizLoaded) {
      timeRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timeRef.current);
            alert("Time's up!");
            navigate("/");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timeRef.current);
  }, [isQuizLoaded, navigate]);

  const formatTime = (timeInSeconds) => {
    const minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, "0");
    const seconds = String(timeInSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-gray-50">
      <nav className="w-full bg-gray-800 p-4 flex justify-between items-center shadow-md">
        <h2 className="text-2xl font-bold">
          Quiz {currentQuiz ? currentQuiz.id : ""}
        </h2>
        <div className="text-xl">
          <span id="timer">{formatTime(time)}</span>
        </div>
      </nav>
      <main className="flex-grow p-4">
        <Outlet
          context={{
            setIsQuizLoaded,
            time,
            totalScore,
            updateScore,
          }}
        />
      </main>
    </div>
  );
};

export default QuizLayout;
