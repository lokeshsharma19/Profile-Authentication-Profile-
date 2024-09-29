require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const path = require("path");
const rootRouter = require("./routes/root");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
const leaderBoardRoutes = require("./routes/leaderBoardRoutes");
const { logger, logEvents } = require("./middleware/logger");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

connectDB();

const PORT = process.env.PORT || 3500;

app.use(express.json());

app.use(cors(corsOptions, { credentials: true }));

app.use(cookieParser());

app.use(logger);

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", rootRouter);

app.use("/user", userRoutes);

app.use("/auth", authRoutes);

app.use("/", quizRoutes);

app.use("/leaderboard", leaderBoardRoutes);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "/views", "404page.html"));
  } else if (req.accepts("json")) {
    res.json("404 Not Page Found");
  } else {
    res.type("text").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("connected MongoDB");
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
