const express = require("express");
const router = express.Router();
const {
  login,
  register,
  handleGoogleLogin,
  handleGoogleSignup,
  initiateGoogleAuth,
} = require("../controllers/user/");

router.post("/register", register);
router.post("/login", login);
router.get("/google/initiate", initiateGoogleAuth);
router.get("/google/signup/callback", handleGoogleSignup);
router.get("/google/login/callback", handleGoogleLogin);

module.exports = router;
