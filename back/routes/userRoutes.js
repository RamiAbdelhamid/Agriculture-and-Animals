// routes/userRoutes.js
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();
const { getAllUsers, approveUser } = require("../controller/userController");

router.get("/users", getAllUsers);
router.put("/users/approve/:userId", approveUser);

const {
  registerUser,
  loginUser,
  googleLogin,
  getUserProfile,
  updateUserProfile,
  logoutUser,
  getUserFromToken,
  getUserRoleFromToken,
} = require("../controller/userController");



const verifyToken = require("../middleware/authMiddleware");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google-login", googleLogin);
router.get("/profile", verifyToken, getUserProfile);
router.put(
  "/profile",
  verifyToken,
  upload.single("profilePicture"),
  updateUserProfile
);
router.post("/logout", logoutUser);
router.get("/get-user", getUserFromToken);

module.exports = router;
