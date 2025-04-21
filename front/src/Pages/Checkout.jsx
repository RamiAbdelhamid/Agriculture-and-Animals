
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";

// const Checkout = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [shippingAddress, setShippingAddress] = useState("");
//   const [name, setName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [location, setLocation] = useState("");
//   const [postalCode, setPostalCode] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("credit-card");
//   const [cardNumber, setCardNumber] = useState("");
//   const [cardExpiry, setCardExpiry] = useState("");
//   const [cardCVV, setCardCVV] = useState("");
//   const [paypalEmail, setPaypalEmail] = useState("");
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cartItems");
//     setCartItems(savedCart ? JSON.parse(savedCart) : []);
//   }, []);

//   // Regex validation
//   const validatePhoneNumber = (number) => {
//     const regex = /^[0-9]{10}$/;
//     return regex.test(number);
//   };

//   const validatePostalCode = (code) => {
//     const regex = /^[0-9]{5}$/;
//     return regex.test(code);
//   };

//   const handleCheckout = async () => {
//     if (
//       !shippingAddress ||
//       !paymentMethod ||
//       !name ||
//       !phoneNumber ||
//       !location ||
//       !postalCode
//     ) {
//       Swal.fire("Error", "Please fill out all the details.", "error");
//       return;
//     }

//     // Validate phone number and postal code using regex
//     if (!validatePhoneNumber(phoneNumber)) {
//       Swal.fire(
//         "Invalid Phone",
//         "Please enter a valid 10-digit phone number.",
//         "error"
//       );
//       return;
//     }

//     if (!validatePostalCode(postalCode)) {
//       Swal.fire(
//         "Invalid Postal Code",
//         "Please enter a valid 5-digit postal code.",
//         "error"
//       );
//       return;
//     }

//     const orderData = {
//       cartItems,
//       totalAmount,
//       paymentMethod,
//       shippingAddress,
//       name,
//       phoneNumber,
//       location,
//       postalCode,
//       cardNumber,
//       cardExpiry,
//       cardCVV,
//       paypalEmail,
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/checkout",
//         orderData
//       );
//       if (response.data.success) {
//         setPaymentSuccess(true);
//         setPdfUrl(response.data.pdfUrl);

//         // Show SweetAlert success message
//         Swal.fire({
//           title: "Order Confirmed",
//           text: "Thank you for your purchase!",
//           icon: "success",
//           confirmButtonText: "OK",
//         }).then(() => {
//           // Clear the cart and redirect to the homepage
//           localStorage.removeItem("cartItems");
//           navigate("/"); // Redirect to the homepage
//         });
//       }
//     } catch (error) {
//       console.error("Error during checkout:", error);
//     }
//   };

//   const totalAmount = cartItems
//     .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
//     .toFixed(2);

//   return (
//     <div className="max-w-4xl mx-auto p-4 bg-gray-50">
//       <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Left Column - Customer Info */}
//         <div>
//           <div className="bg-white p-4 rounded shadow mb-4">
//             <h2 className="text-xl font-semibold mb-4 border-b pb-2">
//               Customer Information
//             </h2>

//             {/* Name */}
//             <div className="mb-4">
//               <label className="block mb-1">Full Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Enter your full name"
//               />
//             </div>

//             {/* Phone Number */}
//             <div className="mb-4">
//               <label className="block mb-1">Phone Number</label>
//               <input
//                 type="text"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Enter your phone number"
//               />
//             </div>

//             {/* Location */}
//             <div className="mb-4">
//               <label className="block mb-1">Location</label>
//               <input
//                 type="text"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Enter your location"
//               />
//             </div>

//             {/* Postal Code */}
//             <div className="mb-4">
//               <label className="block mb-1">Postal Code</label>
//               <input
//                 type="text"
//                 value={postalCode}
//                 onChange={(e) => setPostalCode(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Enter your postal code"
//               />
//             </div>

//             {/* Shipping Address */}
//             <div className="mb-4">
//               <label className="block mb-1">Shipping Address</label>
//               <input
//                 type="text"
//                 value={shippingAddress}
//                 onChange={(e) => setShippingAddress(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Enter your shipping address"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Payment and Cart */}
//         <div>
//           {/* Payment Method */}
//           <div className="bg-white p-4 rounded shadow mb-4">
//             <h2 className="text-xl font-semibold mb-4 border-b pb-2">
//               Payment
//             </h2>

//             <div className="mb-4">
//               <label className="block mb-1">Payment Method</label>
//               <select
//                 value={paymentMethod}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//                 className="w-full p-2 border rounded"
//               >
//                 <option value="credit-card">Credit Card</option>
//                 <option value="paypal">PayPal</option>
//                 <option value="visa">Visa</option>
//               </select>
//             </div>

//             {/* Payment Details */}
//             {paymentMethod === "visa" && (
//               <div>
//                 <div className="mb-4">
//                   <label className="block mb-1">Visa Card Number</label>
//                   <input
//                     type="text"
//                     value={cardNumber}
//                     onChange={(e) => setCardNumber(e.target.value)}
//                     className="w-full p-2 border rounded"
//                     placeholder="Enter your Visa card number"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-1">Expiration Date</label>
//                   <input
//                     type="text"
//                     value={cardExpiry}
//                     onChange={(e) => setCardExpiry(e.target.value)}
//                     className="w-full p-2 border rounded"
//                     placeholder="MM/YY"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-1">CVV</label>
//                   <input
//                     type="text"
//                     value={cardCVV}
//                     onChange={(e) => setCardCVV(e.target.value)}
//                     className="w-full p-2 border rounded"
//                     placeholder="Enter CVV"
//                   />
//                 </div>
//               </div>
//             )}

//             {paymentMethod === "paypal" && (
//               <div className="mb-4">
//                 <label className="block mb-1">PayPal Email</label>
//                 <input
//                   type="email"
//                   value={paypalEmail}
//                   onChange={(e) => setPaypalEmail(e.target.value)}
//                   className="w-full p-2 border rounded"
//                   placeholder="Enter your PayPal email"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Cart Summary */}
//           <div className="bg-white p-4 rounded shadow mb-4">
//             <h2 className="text-xl font-semibold mb-4 border-b pb-2">
//               Order Summary
//             </h2>
//             {cartItems.length === 0 ? (
//               <p className="text-gray-500">Your cart is empty</p>
//             ) : (
//               <div>
//                 <ul className="space-y-2 mb-4">
//                   {cartItems.map((item) => (
//                     <li
//                       key={item._id}
//                       className="flex justify-between items-center border-b pb-2"
//                     >
//                       <div>
//                         <p className="font-medium">
//                           {item.name}
//                           {item.quantity > 1 && ` (x${item.quantity})`}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           {item.price} JD{" "}
//                           {item.quantity > 1 &&
//                             `× ${item.quantity} = ${(
//                               item.price * item.quantity
//                             ).toFixed(2)} JD`}
//                         </p>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//                 <div className="pt-2 font-bold">
//                   <p>Total: {totalAmount} JD</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handleCheckout}
//             className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
//             disabled={cartItems.length === 0}
//           >
//             Complete Purchase
//           </button>
//         </div>
//       </div>

//       {paymentSuccess && (
//         <div className="mt-6 text-center p-4 bg-green-100 rounded">
//           <h3 className="text-lg font-semibold">
//             Your purchase was successful!
//           </h3>
//           <a
//             href={pdfUrl}
//             target="_blank"
//             className="text-blue-600 mt-2 inline-block"
//           >
//             Download your receipt
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  // Regex validation
  const validatePhoneNumber = (number) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
  };

  const validatePostalCode = (code) => {
    const regex = /^[0-9]{5}$/;
    return regex.test(code);
  };

  const handleCheckout = async () => {
    if (
      !shippingAddress ||
      !paymentMethod ||
      !name ||
      !phoneNumber ||
      !location ||
      !postalCode
    ) {
      Swal.fire("Error", "Please fill out all the details.", "error");
      return;
    }

    // Validate phone number and postal code using regex
    if (!validatePhoneNumber(phoneNumber)) {
      Swal.fire(
        "Invalid Phone",
        "Please enter a valid 10-digit phone number.",
        "error"
      );
      return;
    }

    if (!validatePostalCode(postalCode)) {
      Swal.fire(
        "Invalid Postal Code",
        "Please enter a valid 5-digit postal code.",
        "error"
      );
      return;
    }

    // Validate payment details based on method
    if (
      (paymentMethod === "visa" || paymentMethod === "stripe") &&
      (!cardNumber || !cardExpiry || !cardCVV)
    ) {
      Swal.fire("Error", "Please fill in all card details.", "error");
      return;
    }

    if (paymentMethod === "paypal" && !paypalEmail) {
      Swal.fire("Error", "Please enter your PayPal email.", "error");
      return;
    }

    const orderData = {
      cartItems,
      totalAmount,
      paymentMethod,
      shippingAddress,
      name,
      phoneNumber,
      location,
      postalCode,
      cardNumber,
      cardExpiry,
      cardCVV,
      paypalEmail,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/checkout",
        orderData
      );
      if (response.data.success) {
        setPaymentSuccess(true);
        setPdfUrl(response.data.pdfUrl);

        // Show SweetAlert success message
        Swal.fire({
          title: "Order Confirmed",
          text: "Thank you for your purchase!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Clear the cart and redirect to the homepage
          localStorage.removeItem("cartItems");
          navigate("/"); // Redirect to the homepage
        });
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      Swal.fire({
        title: "Payment Failed",
        text: "There was an issue processing your payment. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const totalAmount = cartItems
    .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    .toFixed(2);

  // Payment method icons - would typically use actual image paths
  const paymentIcons = {
    stripe: "/images/stripe-logo.png",
    paypal: "/images/paypal-logo.png",
    visa: "/images/visa-logo.png",
    click: "/images/click-logo.png",
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-green-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
        Secure Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Customer Info */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-4 border-t-4 border-green-600">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-green-700">
              Customer Information
            </h2>

            {/* Name */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-green-200 focus:border-green-500"
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-green-200 focus:border-green-500"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-green-200 focus:border-green-500"
                placeholder="Enter your location"
              />
            </div>

            {/* Postal Code */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Postal Code</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-green-200 focus:border-green-500"
                placeholder="Enter your postal code"
              />
            </div>

            {/* Shipping Address */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Shipping Address</label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-green-200 focus:border-green-500"
                placeholder="Enter your complete shipping address"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Payment and Cart */}
        <div>
          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-4 border-t-4 border-green-600">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-green-700">
              Payment Method
            </h2>

            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Payment Method Options with Images */}
                <div
                  className={`flex flex-col items-center border rounded-lg p-3 cursor-pointer ${
                    paymentMethod === "stripe"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("stripe")}
                >
                  <div className="h-25 w-40 flex items-center justify-center mb-2">
                    <img
                      src="../../src/assets/pic/stripe.gif"
                      alt="Stripe"
                      className="max-h-full"
                    />
                  </div>
                  {/* <span className="text-sm font-medium">Stripe</span> */}
                </div>

                <div
                  className={`flex flex-col items-center border rounded-lg p-3 cursor-pointer ${
                    paymentMethod === "paypal"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("paypal")}
                >
                  <div className="h-25 w-40 flex items-center justify-center mb-2">
                    <img
                      src="../../src/assets/pic/payy.gif"
                      alt="PayPal"
                      className="max-h-full"
                    />
                  </div>
                  {/* <span className="text-sm font-medium">PayPal</span> */}
                </div>

                <div
                  className={`flex flex-col items-center border rounded-lg p-3 cursor-pointer ${
                    paymentMethod === "visa"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("visa")}
                >
                  <div className="h-25 w-40 flex items-center justify-center mb-2">
                    <img
                      src="../../src/assets/pic/visa.jpeg"
                      alt="Visa"
                      className="max-h-full"
                    />
                  </div>
                  <span className="text-sm font-medium">Visa Card</span>
                </div>

                <div
                  className={`flex flex-col items-center border rounded-lg p-3 cursor-pointer ${
                    paymentMethod === "click"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("click")}
                >
                  <div className="h-25 w-40 flex items-center justify-center mb-2">
                    <img
                      src="../../src/assets/pic/click.gif"
                      alt="Click"
                      className="max-h-full"
                    />
                  </div>
                  <span className="text-sm font-medium">Click Payment</span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            {(paymentMethod === "visa" || paymentMethod === "stripe") && (
              <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-green-200"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block mb-1 font-medium">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-green-200"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 font-medium">CVV</label>
                    <input
                      type="text"
                      value={cardCVV}
                      onChange={(e) => setCardCVV(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-green-200"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <div className="mb-4">
                  <label className="block mb-1 font-medium">PayPal Email</label>
                  <input
                    type="email"
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-green-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "click" && (
              <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <p className="text-center text-gray-700">
                  You'll be redirected to Click Payment to complete your
                  purchase after confirming your order.
                </p>
              </div>
            )}
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-4 border-t-4 border-green-600">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-green-700">
              Order Summary
            </h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <div>
                <ul className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <li
                      key={item._id}
                      className="flex justify-between items-center border-b pb-3"
                    >
                      <div className="flex items-center">
                        {item.image && (
                          <div className="w-12 h-12 mr-3 bg-gray-100 rounded overflow-hidden">
                            <img
                              src={`http://localhost:5000${item.image}`}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-green-800">
                            {item.name}
                          </p>
                          {item.category && (
                            <p className="text-xs text-gray-500">
                              {item.category}
                            </p>
                          )}
                          {item.quantity > 1 && (
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{item.price} JD</p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-600">
                            {(item.price * item.quantity).toFixed(2)} JD total
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t pt-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>{totalAmount} JD</span>
                  </div>

                  <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                    <span className="text-green-800">Total:</span>
                    <span className="text-green-800">
                      {parseFloat(totalAmount).toFixed(2)} JD
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleCheckout}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold shadow-md transition duration-200 flex items-center justify-center"
            disabled={cartItems.length === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Complete Secure Purchase
          </button>
        </div>
      </div>

      {paymentSuccess && (
        <div className="mt-6 text-center p-6 bg-green-100 rounded-lg border border-green-300">
          <div className="text-green-600 text-5xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-green-800 mb-2">
            Your purchase was successful!
          </h3>
          <p className="text-green-700 mb-4">
            Thank you for supporting local agriculture. Your order is being
            processed.
          </p>
          {/* <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
          >
            Download Receipt
          </a> */}
        </div>
      )}
    </div>
  );
};

export default Checkout;