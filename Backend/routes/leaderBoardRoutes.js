const express = require("express");
const leaderBoardControllers = require("../controllers/leaderBoardControllers");

const router = express.Router();

router.get("/", leaderBoardControllers.getLeaderBoard);

router.put("/update", leaderBoardControllers.updateScore);

router.get("/user", leaderBoardControllers.getUserScore);

module.exports = router;
