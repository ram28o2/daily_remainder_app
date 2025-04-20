const express = require("express");
const { signup, login, profile } = require("../controllers/authController");
const authProfile = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authProfile, profile); // Protect the profile route

module.exports = router;
