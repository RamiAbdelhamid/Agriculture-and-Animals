const Booking = require("../model/bookingModel"); // استيراد نموذج الحجز

// دالة لحفظ الحجز
const createBooking = async (req, res) => {
  const { department, vet, date, emergency, reason, phoneNumber } = req.body;

  if (!vet) {
    return res.status(400).json({ message: "Vet is required" });
  }

  try {
    // Extract the userId from the request object (this is available if the user is authenticated)
    const userId = req.user.id; // Assuming you have a middleware to verify JWT and add user info to req

    // التحقق إذا كان الطبيب محجوزًا في نفس اليوم
    const existingBooking = await Booking.findOne({
      vet: vet, // التحقق من الطبيب
      date: date, // التحقق من التاريخ
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "This vet is already booked on the selected date." });
    }

    // إنشاء حجز جديد
    const newBooking = new Booking({
      department,
      vet,
      date,
      emergency,
      reason,
      phoneNumber,
      userId, // Save the userId along with the booking
    });

    // حفظ الحجز في قاعدة البيانات
    await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error saving booking", error: error.message });
  }
};

// دالة لجلب التواريخ المحجوزة للطبيب البيطري
const getReservedDates = async (req, res) => {
  const vetName = req.params.vetName;

  try {
    // جلب جميع الحجوزات للطبيب البيطري
    const bookings = await Booking.find({ vet: vetName });

    // إرجاع التواريخ المحجوزة
    const reservedDates = bookings.map((booking) => booking.date);
    res.json(reservedDates);
  } catch (error) {
    console.error("Error fetching reserved dates:", error);
    res.status(500).json({ message: "Error fetching reserved dates" });
  }
};


// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: -1 });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};


// Notify doctor about a booking
const notifyDoctor = async (req, res) => {
  const bookingId = req.params.id;
  
  try {
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    // Update the booking to mark it as notified
    booking.notified = true;
    await booking.save();
    
    // In a real application, you might send an email or notification to the doctor here
    // For example:
    // await sendEmailToDoctor(booking.vet, booking);
    
    res.json({ message: "Doctor notified successfully", booking });
  } catch (error) {
    console.error("Error notifying doctor:", error);
    res.status(500).json({ message: "Error notifying doctor" });
  }
};





// Update booking status (approve/reject)
const updateBookingStatus = async (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;
  
  // Validate status input
  if (!status || !['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }
  
  try {
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    // Update the booking status
    booking.status = status;
    await booking.save();
    
    res.json({ 
      message: `Booking ${status} successfully`, 
      booking 
    });
  } catch (error) {
    console.error(`Error updating booking status:`, error);
    res.status(500).json({ message: "Error updating booking status" });
  }
};





/**
 * Mark booking as completed
 */
const completeBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Booking completion status updated successfully', 
      booking 
    });
  } catch (error) {
    console.error('Error updating booking completion status:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating booking completion status' 
    });
  }
};

// Add this in the bookingController.js file
const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from authenticated token

    // Pagination parameters with defaults
    const page = parseInt(req.query.page) || 1; // Current page, default to 1
    const limit = parseInt(req.query.limit) || 10; // Items per page, default to 10
    const skipIndex = (page - 1) * limit; // Calculate skip index

    // Find total number of bookings for this user
    const totalBookings = await Booking.countDocuments({
      userId,
      completed: true,
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalBookings / limit);

    // Fetch paginated bookings
    const bookings = await Booking.find({ userId, completed: true })
      .sort({ date: -1 })
      .skip(skipIndex)
      .limit(limit);

    res.status(200).json({
      bookings,
      currentPage: page,
      totalPages,
      totalBookings,
      pageSize: limit,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};









module.exports = {
  createBooking,
  getReservedDates,
  getAllBookings,
  notifyDoctor,
  updateBookingStatus,
  completeBooking,
  getUserBookings,
};
