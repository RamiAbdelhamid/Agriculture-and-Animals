const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cartItems: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  paymentMethod: String,
  shippingAddress: String,
  name: String,
  phoneNumber: String,
  location: String,
  postalCode: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
