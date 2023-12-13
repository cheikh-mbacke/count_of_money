const express = require("express");
const router = express.Router();
const {
  login,
  register,
  handleGoogleLogin,
  handleGoogleSignup,
  initiateGoogleAuth,
  getUserProfile,
  updateUserProfile
} = require("../controllers/user/");
const auth = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/google/initiate", initiateGoogleAuth);
router.get("/google/signup/callback", handleGoogleSignup);
router.get("/google/login/callback", handleGoogleLogin);
router.get("/profile", auth, getUserProfile);
router.put("/profile", auth, updateUserProfile);

module.exports = router;
