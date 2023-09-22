const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
//authController.verifyToken,
router.post("/", authController.authUser);

module.exports = router;