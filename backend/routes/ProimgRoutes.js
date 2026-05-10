const express = require("express");
const router = express.Router();
const proImgController = require("../controllers/proImgController");

router.get("/", proImgController.getAllProImgs);
router.get("/:id", proImgController.getProImgById);
router.post("/", proImgController.createProImg);

module.exports = router;