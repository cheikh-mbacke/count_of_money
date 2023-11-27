const express = require("express");
const router = express.Router();
const authCrtl = require("../controllers/auth");

router.post("/signup", authCrtl.signup);
router.post("/login", authCrtl.login);

module.exports = router;
