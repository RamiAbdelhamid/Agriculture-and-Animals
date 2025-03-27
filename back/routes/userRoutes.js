// routes/userRoutes.js
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();
const bookingController = require("../controller/bookingController");


const {
  registerUser,
  loginUser,
  googleLogin,
  getUserProfile,
  updateUserProfile,
  logoutUser,
  getUserFromToken,
  getUserRoleFromToken,
  updateUserRole,
  getAllUsers,
} = require("../controller/userController");

const verifyToken = require("../middleware/authMiddleware");

router.put(
  "/profileProf",
  verifyToken,
);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google-login", googleLogin);
router.get("/profile", verifyToken, getUserProfile);
router.put(
  "/profile",
  verifyToken,
  upload.single("profilePicture"),
  updateUserProfile
);router.get("/get-role", getUserRoleFromToken);
router.post("/logout", logoutUser);
router.get("/get-user", getUserFromToken);

router.get("/bookings/user", verifyToken, bookingController.getUserBookings);




// Route to get all users (protected route)
router.get("/users", verifyToken, getAllUsers);

// Route to update user role (protected route)
router.put("/:userId/role", verifyToken, updateUserRole);






module.exports = router;
