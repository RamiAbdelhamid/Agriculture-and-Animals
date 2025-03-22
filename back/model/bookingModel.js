const mongoose = require("mongoose");

// Updated booking schema with phoneNumber field
const bookingSchema = new mongoose.Schema({
  department: { type: String, required: true },
  vet: { type: String, required: true },
  date: { type: String, required: true },
  emergency: { type: Boolean, default: false },
  reason: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // Regex to ensure the phone number is 10 digits (you can adjust the regex to suit your needs)
  },
  notified: { type: Boolean, default: false },
  completed: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
