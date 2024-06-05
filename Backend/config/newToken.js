const jwt = require("jsonwebtoken");

const newToken = (username) => {
  const accessToken = jwt.sign(
    {
      username: username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    {
      username: username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};

module.exports = newToken;
