
const express = require("express");
const router = express.Router();
const { generateDescription } = require("../controllers/aiController");

router.post("/generate-post", generateDescription);

module.exports = router;
