import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import QuizLayout from "./QuizLayout";

const QuizManager = () => {
  const state = useLocation();
  const [totalScore, setTotalScore] = useState(0);
  console.log(totalScore);
  const updateScore = (score) => {
    setTotalScore((prevTotal) => prevTotal + score);
  };

  //   useEffect(() => {
  //     if (state) {
  //       updateScore();
  //     }
  //   }, [state]);

  return (
    <QuizLayout totalScore={totalScore} updateScore={updateScore}>
      <Outlet />
    </QuizLayout>
  );
};

export default QuizManager;
