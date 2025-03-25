const express = require("express");
const router = express.Router();
const bookingController = require("../controller/bookingController");
const verifyToken = require("..//middleware/authMiddleware");


// مسار لإنشاء الحجز
router.post("/bookings", verifyToken, bookingController.createBooking);


router.get("/bookings/user", verifyToken, bookingController.getUserBookings);


// مسار لجلب التواريخ المحجوزة للطبيب البيطري
router.get("/bookings/vet/:vetName", bookingController.getReservedDates);


// Notify doctor about booking
router.post("/bookings/:id/notify", bookingController.notifyDoctor);

// Route to get all bookings
router.get("/bookings", bookingController.getAllBookings);


// Update booking status (approve/reject)
router.put("/bookings/:id/status", bookingController.updateBookingStatus);


// Mark booking as completed
router.put('/bookings/:id/complete', bookingController.completeBooking);



module.exports = router;
