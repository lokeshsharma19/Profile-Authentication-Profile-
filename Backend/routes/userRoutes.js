const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const verifyJWT = require("../middleware/verifyJwt");

router.use(verifyJWT);

router.route("/").get(userController.getUserDetails);

router.route("/:id").patch(userController.updateUserDetails);

module.exports = router;
