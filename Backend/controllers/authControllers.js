const User = require("../model/User");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const newToken = require("../config/newToken");

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ username });

  if (!foundUser) {
    return res.status(400).json({ message: "Unauthorized" });
  }
  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(400).json({ message: "Unauthorized" });

  const { accessToken, refreshToken } = newToken(foundUser.username);

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    message: `User ${foundUser.username} Logged-in Successfully!`,
    accessToken,
  });
});

const signup = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: "All fields are required! " });
  }
  const duplicate = await User.findOne({ username })
    .collation({
      locale: "en",
      strength: 2,
    })
    .lean()
    .exec();
  if (duplicate) {
    return res.status(409).json({ message: "User Already Exists" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const newUser = {
    username,
    email,
    password: hashedPwd,
  };
  const user = await User.create(newUser);
  if (user) {
    return res
      .status(201)
      .json({ message: `User ${user.username} created successfully` });
  } else {
    return res.status(400).json({ message: "Invalid user data received" });
  }
});

const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies?.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" }); // refresh token expire
      }

      const foundUser = await User.findOne({ username: decoded.username });

      if (!foundUser) {
        return res
          .status(401)
          .json({ message: "Unauthorized authcontrollers" });
      }

      const { accessToken } = newToken(foundUser.username);

      res.json({ accessToken });
    })
  );
});

const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(401).json({
      message: "Unauthorized",
    });
  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
  res.json({
    message: "cookies cleared",
  });
});

module.exports = {
  login,
  logout,
  signup,
  refresh,
};
