// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; // Import axios to make requests to the backend
// import Swal from "sweetalert2"; // Import SweetAlert2 for success message

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
//     const regex = /^[0-9]{10}$/; // Example: 10 digits phone number
//     return regex.test(number);
//   };

//   const validatePostalCode = (code) => {
//     const regex = /^[0-9]{5}$/; // Example: 5-digit postal code
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
//           title: "Purchase Complete!",
//           text: "Your order has been successfully processed.",
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
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-xl font-semibold mb-6">Checkout</h2>

//       {/* Name */}
//       <div className="mb-6">
//         <label className="block text-lg font-medium mb-2">Full Name</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full p-3 border rounded-lg"
//           placeholder="Enter your full name"
//         />
//       </div>

//       {/* Phone Number */}
//       <div className="mb-6">
//         <label className="block text-lg font-medium mb-2">Phone Number</label>
//         <input
//           type="text"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           className="w-full p-3 border rounded-lg"
//           placeholder="Enter your phone number"
//         />
//       </div>

//       {/* Location */}
//       <div className="mb-6">
//         <label className="block text-lg font-medium mb-2">Location</label>
//         <input
//           type="text"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           className="w-full p-3 border rounded-lg"
//           placeholder="Enter your location"
//         />
//       </div>

//       {/* Postal Code */}
//       <div className="mb-6">
//         <label className="block text-lg font-medium mb-2">Postal Code</label>
//         <input
//           type="text"
//           value={postalCode}
//           onChange={(e) => setPostalCode(e.target.value)}
//           className="w-full p-3 border rounded-lg"
//           placeholder="Enter your postal code"
//         />
//       </div>

//       {/* Shipping Address */}
//       <div className="mb-6">
//         <label className="block text-lg font-medium mb-2">
//           Shipping Address
//         </label>
//         <input
//           type="text"
//           value={shippingAddress}
//           onChange={(e) => setShippingAddress(e.target.value)}
//           className="w-full p-3 border rounded-lg"
//           placeholder="Enter your shipping address"
//         />
//       </div>

//       {/* Payment Method */}
//       <div className="mb-6">
//         <label className="block text-lg font-medium mb-2">Payment Method</label>
//         <select
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//           className="w-full p-3 border rounded-lg"
//         >
//           <option value="credit-card">Credit Card</option>
//           <option value="paypal">PayPal</option>
//           <option value="visa">Visa</option>
//         </select>
//       </div>

//       {/* Payment Details */}
//       {paymentMethod === "visa" && (
//         <div>
//           <div className="mb-6">
//             <label className="block text-lg font-medium mb-2">
//               Visa Card Number
//             </label>
//             <input
//               type="text"
//               value={cardNumber}
//               onChange={(e) => setCardNumber(e.target.value)}
//               className="w-full p-3 border rounded-lg"
//               placeholder="Enter your Visa card number"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-lg font-medium mb-2">
//               Expiration Date
//             </label>
//             <input
//               type="text"
//               value={cardExpiry}
//               onChange={(e) => setCardExpiry(e.target.value)}
//               className="w-full p-3 border rounded-lg"
//               placeholder="MM/YY"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-lg font-medium mb-2">CVV</label>
//             <input
//               type="text"
//               value={cardCVV}
//               onChange={(e) => setCardCVV(e.target.value)}
//               className="w-full p-3 border rounded-lg"
//               placeholder="Enter CVV"
//             />
//           </div>
//         </div>
//       )}

//       {paymentMethod === "paypal" && (
//         <div className="mb-6">
//           <label className="block text-lg font-medium mb-2">PayPal Email</label>
//           <input
//             type="email"
//             value={paypalEmail}
//             onChange={(e) => setPaypalEmail(e.target.value)}
//             className="w-full p-3 border rounded-lg"
//             placeholder="Enter your PayPal email"
//           />
//         </div>
//       )}

//       {/* Cart Summary */}
//       <div className="mb-6 p-4 border rounded-lg bg-gray-50">
//         <h3 className="font-semibold mb-4">Cart Summary</h3>
//         {cartItems.length === 0 ? (
//           <p className="text-gray-500">Your cart is empty</p>
//         ) : (
//           <div>
//             <ul className="space-y-4">
//               {cartItems.map((item) => (
//                 <li key={item.id} className="flex justify-between items-center">
//                   <div>
//                     <p className="font-medium">
//                       {item.name}
//                       {item.quantity > 1 && ` (x${item.quantity})`}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {item.price} JD{" "}
//                       {item.quantity > 1 &&
//                         `× ${item.quantity} = ${(
//                           item.price * item.quantity
//                         ).toFixed(2)} JD`}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//             <div className="pt-4">
//               <p className="font-semibold">Total: {totalAmount} JD</p>
//             </div>
//           </div>
//         )}
//       </div>

//       <button
//         onClick={handleCheckout}
//         className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//         disabled={cartItems.length === 0}
//       >
//         Complete Purchase
//       </button>

//       {paymentSuccess && (
//         <div className="mt-6 text-center">
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
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
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
    }
  };

  const totalAmount = cartItems
    .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    .toFixed(2);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Customer Info */}
        <div>
          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Customer Information
            </h2>

            {/* Name */}
            <div className="mb-4">
              <label className="block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block mb-1">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your location"
              />
            </div>

            {/* Postal Code */}
            <div className="mb-4">
              <label className="block mb-1">Postal Code</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your postal code"
              />
            </div>

            {/* Shipping Address */}
            <div className="mb-4">
              <label className="block mb-1">Shipping Address</label>
              <input
                type="text"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your shipping address"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Payment and Cart */}
        <div>
          {/* Payment Method */}
          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Payment
            </h2>

            <div className="mb-4">
              <label className="block mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="visa">Visa</option>
              </select>
            </div>

            {/* Payment Details */}
            {paymentMethod === "visa" && (
              <div>
                <div className="mb-4">
                  <label className="block mb-1">Visa Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter your Visa card number"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Expiration Date</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">CVV</label>
                  <input
                    type="text"
                    value={cardCVV}
                    onChange={(e) => setCardCVV(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter CVV"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="mb-4">
                <label className="block mb-1">PayPal Email</label>
                <input
                  type="email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your PayPal email"
                />
              </div>
            )}
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Order Summary
            </h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <div>
                <ul className="space-y-2 mb-4">
                  {cartItems.map((item) => (
                    <li
                      key={item._id}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <p className="font-medium">
                          {item.name}
                          {item.quantity > 1 && ` (x${item.quantity})`}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.price} JD{" "}
                          {item.quantity > 1 &&
                            `× ${item.quantity} = ${(
                              item.price * item.quantity
                            ).toFixed(2)} JD`}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 font-bold">
                  <p>Total: {totalAmount} JD</p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleCheckout}
            className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
            disabled={cartItems.length === 0}
          >
            Complete Purchase
          </button>
        </div>
      </div>

      {paymentSuccess && (
        <div className="mt-6 text-center p-4 bg-green-100 rounded">
          <h3 className="text-lg font-semibold">
            Your purchase was successful!
          </h3>
          <a
            href={pdfUrl}
            target="_blank"
            className="text-blue-600 mt-2 inline-block"
          >
            Download your receipt
          </a>
        </div>
      )}
    </div>
  );
};

export default Checkout;