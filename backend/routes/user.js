const express = require("express");
const router = express.Router();
const authCrtl = require("../controllers/user");

router.post("/register", authCrtl.register);
router.post("/login", authCrtl.login);

module.exports = router;
