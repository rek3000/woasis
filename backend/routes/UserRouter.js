const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post('/sign-up', userController.createUser);
// router.post('/signin', userController.loginUser)

module.exports = router;