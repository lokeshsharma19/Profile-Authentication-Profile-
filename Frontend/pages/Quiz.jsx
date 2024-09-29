import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import api from "../api/index";
import { calculateScore } from "../utils/calculateScore";
import useUserData from "../hooks/useUserData";

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quizId = parseInt(id);
  const [quiz, setQuiz] = useState(null);
  const [key, setKey] = useState("");
  const [isSolved, setIsSolved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsQuizLoaded, totalScore, updateScore, time } = useOutletContext();
  const { userData, setUserData } = useUserData();
  console.log(userData);
  const endpoint = `/quizzes?id=${quizId}`;
  const [prevId, setPrevId] = useState(1);
  const getKey = (token) => {
    if (token) {
      console.log("Key is ----> e2324");
    } else {
      console.log("Key is ----> $f9o(A!");
    }
  };

  useEffect(() => {
    if (quiz?.action) {
      switch (quiz.action) {
        case "CONSOLE_INPUT":
          // Handle console input logic here
          console.log("Key is ", quiz.key);
          break;
        case "ELEMENT_INSPECTION":
          // Handle element inspection logic here
          console.log("Quiz requires element inspection.");
          break;
        case "STYLE_INSPECTION":
          // Handle style inspection logic here
          console.log("Quiz requires style inspection.");
          break;
        case "CONSOLE_FUNCTION":
          // Handle console function logic here
          console.log("Quiz requires console function call.");
          break;
        case "SESSION_STORAGE":
          // Handle session storage logic here
          console.log("Quiz requires session storage access.");
          sessionStorage.setItem("key", quiz.key);
          break;
        case "NETWORK_INSPECTION":
          // Handle network inspection logic here
          console.log("Quiz requires network request inspection.");
          api.post("/quiz/key", { key: quiz.key });
          break;
        case "LOCAL_STORAGE":
          // Handle local storage logic here
          console.log("Quiz requires local storage access.");
          localStorage.setItem("key", quiz.key);
          break;
        case "LOADER_INSPECTION":
          // Handle loader inspection logic here
          console.log("Quiz requires loader inspection.");
          break;
        case "TOKEN_UNLOCK":
          // Handle token unlock logic here
          console.log("Quiz requires token unlock.");
          break;
        default:
          console.error("Unknown action type.");
          break;
      }
    }
  }, [quiz]);

  useEffect(() => {
    if (id > prevId + 1) {
      navigate(`/quizzes/${prevId + 1}`);
    }
  }, [id]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await api.get(endpoint);
        if (response?.data?.quiz === null) {
          const scoreStoreRes = await api.put("/leaderboard/update", {
            totalScore,
            userID: userData?.info._id,
          });
          console.log(scoreStoreRes);
          navigate("/leaderboard", { replace: true });
          return;
        }
        setQuiz(response.data.quiz);
        setIsQuizLoaded(true);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setErrorMessage("Quiz not found.");
      }
    };
    fetchQuiz();
    window.getKey = getKey;
  }, [quizId, setIsQuizLoaded]);

  const handleSolveQuiz = async () => {
    if (key === quiz.key) {
      const score = calculateScore(time, quiz.id);
      const currentScore = totalScore + score;
      updateScore(score);
      setIsSolved(true);
      setErrorMessage("");
      setTimeout(() => {
        const nextQuizId = quizId + 1;
        setPrevId(nextQuizId);
        setKey("");
        setIsSolved(false);
        sessionStorage.removeItem("key");
        localStorage.removeItem("key");
        setIsQuizLoaded(false);
        navigate(`/quizzes/${nextQuizId}`, {
          replace: true,
          state: { currentScore },
        });
      }, 1000);
    } else {
      setErrorMessage("Incorrect key, please try again.");
    }
  };

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-gray-50 p-6">
        <p>{errorMessage || "Loading...key-:'dev_19'"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center mt-28 bg-gradient-to-b from-gray-900 to-black text-gray-50 p-6">
      <div className="w-full max-w-4xl bg-gray-800 bg-opacity-70 shadow-lg rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-6">{quiz.title}</h2>
        <p className="descr text-lg mb-6">{quiz.description}</p>

        <div className="w-full max-w-md mx-auto">
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter key"
            className="w-full p-3 mb-6 text-gray-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          <button
            onClick={handleSolveQuiz}
            disabled={!key}
            className={`${
              key
                ? "bg-green-600 hover:bg-green-500 cursor-pointer"
                : "bg-gray-600 cursor-not-allowed"
            } w-full text-white py-3 rounded-full text-xl font-semibold shadow-md transition-all`}>
            Submit Key
          </button>
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>

        {isSolved && (
          <p className="text-green-500 text-lg font-semibold mt-6">
            Quiz Solved! Moving to the next one...
          </p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
