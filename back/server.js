const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/productRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const vetRoutes = require("./routes/vetRoutes");
const departmentRoutes = require('./routes/departmentRoutes'); // Import department routes
const contactRoutes = require("./routes/contactusRoutes"); // Import contact routes
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const path = require("path");
const reviewRoutes = require('./routes/reviewRoutes');
const emailRoutes = require("./routes/emailRoutes");
const articleRoutes = require("./routes/articleRoutes");



//************************************************************************************************** */


dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));  // تأكد من أن هذا السطر موجود

// Use Routes
app.use("/api",productRoutes);
app.use("/bookings", bookingRoutes);
app.use('/api', userRoutes); // Ensure that this is correctly set up


app.use(bookingRoutes);  // توجيه المسارات الخاصة بالحجز
app.use("/api/vets", vetRoutes);
app.use('/api/departments', departmentRoutes); // Use department routes

app.use("/api/contact", contactRoutes);


app.use("/api/users", userRoutes);

app.use("/api", orderRoutes);

app.use('/pdf', express.static(path.join(__dirname, 'pdfs')));  // Serve PDFs at /pdf URL


app.use("/api/reviews", reviewRoutes);
app.use("/api", emailRoutes);


app.use("/vets", vetRoutes); // This creates the /vets endpoint
app.use("/api/articles", articleRoutes);



//************************************************************************************************** */
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
//************************************************************************************************** */







const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/************************************************************************* */