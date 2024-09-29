import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import api from "../api/index";

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quizId = parseInt(id);
  const [quiz, setQuiz] = useState(null);
  const [key, setKey] = useState("");
  const [isSolved, setIsSolved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [prevId, setPrevId] = useState(1);

  const { setIsQuizLoaded } = useOutletContext();

  const endpoint = `/quizzes?id=${quizId}`;

  const getKey = (token) => {
    if (token) {
      console.log("Key is ----> e2324");
    } else {
      console.log("Key is ----> $f9o(A!");
    }
  };

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
          navigate("/leaderboard", { replace: true });
          return;
        }
        setQuiz(response.data.quiz);
        setIsQuizLoaded(true); // Indicate the quiz has loaded
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setErrorMessage("Quiz not found.");
      }
    };
    fetchQuiz();
    window.getKey = getKey;
  }, [quizId, setIsQuizLoaded, navigate]);

  const handleSolveQuiz = () => {
    if (key === quiz.key) {
      setIsSolved(true);
      setErrorMessage("");

      setTimeout(() => {
        const nextQuizId = quizId + 1;
        setPrevId(nextQuizId);
        setKey("");
        setIsSolved(false);
        sessionStorage.removeItem("key");
        localStorage.removeItem("key");
        setIsQuizLoaded(false); // Reset the quiz loaded state for the next quiz
        navigate(`/quizzes/${nextQuizId}`, { replace: true });
      }, 1000);
    } else {
      setErrorMessage("Incorrect key, please try again.");
    }
  };

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-gray-50 p-6">
        <p>{errorMessage || "Loading...dev_19"}</p>
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
            className={${key ? "bg-green-600 hover:bg-green-500 cursor-pointer": "bg-gray-600 cursor-not-allowed"
            } w-full text-white py-3 rounded-full text-xl font-semibold shadow-md transition-all}>
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






