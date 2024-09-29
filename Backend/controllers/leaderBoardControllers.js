const asyncHandler = require("express-async-handler");
const Score = require("../model/Score");
const mongoose = require("mongoose");

const getUserScore = asyncHandler(async (req, res) => {
  const { userID } = req.query;
  const userObjID = new mongoose.Types.ObjectId(userID);
  const scoreData = await Score.findOne({
    userID: userObjID,
  });
  if (scoreData) {
    return res.status(200).json({
      message: "Found score",
      scoreData,
    });
  }
  return res.status(400).json({
    message: "Not Found",
  });
});

const getLeaderBoard = asyncHandler(async (req, res) => {
  const data = await Score.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userID",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    {
      $addFields: {
        userInfo: {
          $arrayElemAt: ["$userInfo", 0],
        },
      },
    },
  ]);

  if (data.length > 0) {
    const leaderBoardData = data.slice(0, 10);
    return res.status(200).json({
      message: "Found successfully",
      leaderBoardData,
    });
  }
  return res.status(400).json({
    message: "Not Found",
  });
});

const updateScore = asyncHandler(async (req, res) => {
  const { totalScore, userID } = req.body;
  let userScore = await Score.findOne({ userID: userID }).exec();
  console.log(userScore);
  if (!userScore || userScore?.length === 0) {
    userScore = await Score.create({
      userID,
      latestScore: totalScore,
      dateModified: new Date().toLocaleDateString().slice(0, 19) + "Z",
    });
  } else {
    (userScore.latestScore = totalScore),
      (userScore.dateModified =
        new Date().toLocaleDateString().slice(0, 19) + "Z");
    userScore = await userScore.save();
  }
  console.log("updated userScore", userScore);
  return res.status(200).json({
    message: "updated userScore",
  });
});

module.exports = { getLeaderBoard, updateScore, getUserScore };
