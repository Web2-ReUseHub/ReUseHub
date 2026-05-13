const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile/me", authMiddleware, userController.getMyProfile);
router.put("/profile/update", authMiddleware, userController.updateProfile);
router.get("/", authMiddleware, userController.getAllUsers);
router.get("/:id", authMiddleware, userController.getUserById);

module.exports = router;