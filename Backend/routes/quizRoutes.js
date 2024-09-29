const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizControllers");

router.route("/quizzes").get(quizController.getQuizzes);

router.route("/quiz/key").post(quizController.getKey);

// router.route("/leaderboard/getAllUsers").post(quizController.getAllUsers);

module.exports = router;
