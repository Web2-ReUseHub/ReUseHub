const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserControllers");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const db = require("../models");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile/me", authMiddleware, userController.getMyProfile);
router.put("/profile/update", authMiddleware, userController.updateProfile);
router.get("/", authMiddleware, userController.getAllUsers);
router.get("/stats/:id", authMiddleware, userController.getUserStats);

// ← أضف هاد قبل /:id
router.post("/rate/:id", authMiddleware, userController.rateUser);

router.get("/:id", authMiddleware, userController.getUserById);

router.post(
  "/upload-avatar",
  authMiddleware,
  upload.single("avatar"),
  async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ error: "No file uploaded" });

      const avatar_url = `/uploads/${req.file.filename}`;

      await db.User.update(
        { avatar_url },
        { where: { user_id: req.user.user_id } }
      );

      res.json({ avatar_url });
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;