const asyncHandler = require("express-async-handler");
const { Quiz } = require("../model/Quiz");
const mongoose = require("mongoose");

const getQuizzes = asyncHandler(async (req, res) => {
  const id = parseInt(req.query.id);

  if (!id || id === 0) {
    res.status(400).json({
      message: "Id is not available",
    });
    return;
  }
  const quiz = await Quiz.findOne({ id });
  console.log(quiz);
  return res.status(200).json({
    quiz: quiz,
  });
});

const getKey = (req, res) => {
  res.status(200).json({
    message: "Check Payload",
  });
};

const getAllUsers = (req, res) => {
  // const
};

module.exports = {
  getQuizzes,
  getKey,
};
