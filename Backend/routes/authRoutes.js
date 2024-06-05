const express = require("express");
const router = express.Router();
// const path = require("path");
const loginLimitter = require("../middleware/loginLimitter");
const authControllers = require("../controllers/authControllers");

router.route("/").post(loginLimitter, authControllers.login);

router.route("/refresh").get(authControllers.refresh);

router.route("/sign-up").post(authControllers.signup);

router.route("/logout").post(authControllers.logout);

module.exports = router;
