const express = require("express");
const router = express.Router();
const {
  googleOAuth2,
  googleOAuth2Callback,
  register,
  login,
  googleOAuth2Login,
  googleOAuth2LoginCallback,
} = require("../controllers/user/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/oauth2Login", googleOAuth2Login);
router.get("/google", googleOAuth2);
router.get("/oauth2callback", googleOAuth2Callback);
router.get("/oauth2logincallback", googleOAuth2LoginCallback);

module.exports = router;
