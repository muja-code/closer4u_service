const express = require("express");

const UsersController = require("../../controllers/users/users");
const authToken = require("../../middlewares/auth-token");

const router = express.Router();
const usersController = new UsersController();

router.get("/", authToken, usersController.getUser);
router.post("/", usersController.signupUser);
router.post("/login", usersController.loginUser);
router.post("/logout", authToken, usersController.logoutUser);

module.exports = router;
