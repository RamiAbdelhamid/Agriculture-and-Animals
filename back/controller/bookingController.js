// // booking controller

// const Booking = require("../model/bookingModel");

// // دالة لحفظ الحجز
// const createBooking = async (req, res) => {
//   const { department, vet, date, emergency, reason } = req.body;

//   if (!vet) {
//     return res.status(400).json({ message: "Vet is required" });
//   }

//   try {
//     // التحقق إذا كان الطبيب محجوزًا في نفس اليوم
//     const existingBooking = await Booking.findOne({
//       vet: vet, // التحقق من الطبيب
//       date: date, // التحقق من التاريخ
//     });

//     if (existingBooking) {
//       return res
//         .status(400)
//         .json({ message: "This vet is already booked on the selected date." });
//     }

//     // إنشاء حجز جديد
//     const newBooking = new Booking({
//       department,
//       vet,
//       date,
//       emergency,
//       reason,
//     });

//     // حفظ الحجز في قاعدة البيانات
//     await newBooking.save();
//     res
//       .status(201)
//       .json({ message: "Booking created successfully", booking: newBooking });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Error saving booking", error: error.message });
//   }
// };

// module.exports = {
//   createBooking,
// };





const Booking = require("../model/bookingModel"); // استيراد نموذج الحجز

// دالة لحفظ الحجز
const createBooking = async (req, res) => {
  const { department, vet, date, emergency, reason, phoneNumber } = req.body;

  if (!vet) {
    return res.status(400).json({ message: "Vet is required" });
  }

  try {
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









module.exports = {
  createBooking,
  getReservedDates,
  getAllBookings,
  notifyDoctor,
  updateBookingStatus,
  completeBooking,
};
