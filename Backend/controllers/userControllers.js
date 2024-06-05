const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const express = require("express");
const newToken = require("../config/newToken");
// const newToken = require("");

express.json();

const getUserDetails = asyncHandler(async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }
  const user = await User.findOne({ username })
    .select("-password")
    .lean()
    .exec();
  if (!user) {
    return res.status(400).json({ message: " Users Details Not Found" });
  }
  res.json(user);
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { username, email, password } = req.body;
  if (!id || !username) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User Not Found!" });
  }

  const duplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate && duplicate?._id?.toString() != id) {
    return res.status(409).json({ message: "Duplicate Username" });
  }

  user.username = username;
  user.email = email;

  if (password || password?.length > 0) {
    const hashedPwd = await bcrypt.hash(password, 10);
    user.password = hashedPwd;
  }
  const updatedUser = await user.save();

  const { accessToken, refreshToken } = newToken(updatedUser.username);

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: `User ${updatedUser.username} Updated Successfully!`,
    accessToken,
  });
});

module.exports = { getUserDetails, updateUserDetails };
