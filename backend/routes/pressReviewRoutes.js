const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");
const { getArticles } = require("../controllers/pressReview/pressReview");

router.get("/", getArticles);

module.exports = router;