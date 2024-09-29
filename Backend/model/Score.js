const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  latestScore: {
    type: Number,
    required: true,
  },
  dateModified: {
    type: Date,
    required: true,
  },
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
