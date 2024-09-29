const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  key: String,
  action: String,
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = { Quiz };
