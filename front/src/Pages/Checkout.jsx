import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";





  /************************************************************************************************ */
  /************************************************************************************************ */



const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const navigate = useNavigate();

  /************************************************************************************************ */
  /************************************************************************************************ */

  useEffect(() => {
    // Get cart data from localStorage
    const savedCart = localStorage.getItem("cartItems");
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  const handleCheckout = () => {
    if (!shippingAddress || !paymentMethod) {
      alert("Please fill out all the details.");
      return;
    }

    navigate("/proceed-to-payment", {
      state: { cartItems, totalAmount, paymentMethod, shippingAddress },
    });
  };

  const totalAmount = cartItems
    .reduce((sum, item) => sum + item.price, 0)
    .toFixed(2);

  /************************************************************************************************ */
  /************************************************************************************************ */

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-6">Checkout</h2>

      {/* Shipping Address */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">
          Shipping Address
        </label>
        <input
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          className="w-full p-3 border rounded-lg"
          placeholder="Enter your shipping address"
        />
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      {/* Cart Summary */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h3 className="font-semibold mb-4">Cart Summary</h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <p className="font-semibold">Total: ${totalAmount}</p>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
