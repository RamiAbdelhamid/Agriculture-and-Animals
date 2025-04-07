// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Calendar, AlertCircle, Check, X, Send, Filter } from "lucide-react";

// const VetDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("all"); // all, emergency, regular
//   const [selectedVet, setSelectedVet] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all"); // all, pending, approved, rejected
//   const [vets, setVets] = useState([]);

//   // Fetch all bookings
//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:5000/bookings");
//       setBookings(response.data);

//       // Extract unique vet names for the filter
//       const uniqueVets = [
//         ...new Set(response.data.map((booking) => booking.vet)),
//       ];
//       setVets(uniqueVets);

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//       setError("Failed to load bookings. Please try again later.");
//       setLoading(false);
//     }
//   };

//   // Send task to doctor
//   const sendTaskToDoctor = async (bookingId) => {
//     try {
//       await axios.post(`http://localhost:5000/bookings/${bookingId}/notify`);

//       // Update the local state to mark this booking as notified
//       setBookings(
//         bookings.map((booking) =>
//           booking._id === bookingId ? { ...booking, notified: true } : booking
//         )
//       );

//       alert("Task sent to doctor successfully!");
//     } catch (error) {
//       console.error("Error sending task to doctor:", error);
//       alert("Failed to send task to doctor. Please try again.");
//     }
//   };

//   // Approve booking
//   const approveBooking = async (bookingId) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/bookings/${bookingId}/status`,
//         {
//           status: "approved",
//         }
//       );

//       // Update the local state to mark this booking as approved
//       setBookings(
//         bookings.map((booking) =>
//           booking._id === bookingId
//             ? { ...booking, status: "approved" }
//             : booking
//         )
//       );

//       alert("Booking approved successfully!");
//     } catch (error) {
//       console.error("Error approving booking:", error);
//       alert("Failed to approve booking. Please try again.");
//     }
//   };

//   // Reject booking
//   const rejectBooking = async (bookingId) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/bookings/${bookingId}/status`,
//         {
//           status: "rejected",
//         }
//       );

//       // Update the local state to mark this booking as rejected
//       setBookings(
//         bookings.map((booking) =>
//           booking._id === bookingId
//             ? { ...booking, status: "rejected" }
//             : booking
//         )
//       );

//       alert("Booking rejected successfully!");
//     } catch (error) {
//       console.error("Error rejecting booking:", error);
//       alert("Failed to reject booking. Please try again.");
//     }
//   };

//   // Filter bookings
//   const filteredBookings = bookings.filter((booking) => {
//     const matchesEmergencyFilter =
//       filter === "all" ||
//       (filter === "emergency" && booking.emergency) ||
//       (filter === "regular" && !booking.emergency);

//     const matchesVetFilter =
//       selectedVet === "all" || booking.vet === selectedVet;

//     const matchesStatusFilter =
//       statusFilter === "all" ||
//       (statusFilter === "pending" &&
//         (!booking.status || booking.status === "pending")) ||
//       (statusFilter === "approved" && booking.status === "approved") ||
//       (statusFilter === "rejected" && booking.status === "rejected");

//     return matchesEmergencyFilter && matchesVetFilter && matchesStatusFilter;
//   });

//   // Get status badge color
//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "approved":
//         return (
//           <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm">
//             Approved
//           </span>
//         );
//       case "rejected":
//         return (
//           <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-sm">
//             Rejected
//           </span>
//         );
//       default:
//         return (
//           <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">
//             Pending
//           </span>
//         );
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="bg-white rounded-xl shadow-lg">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-xl">
//           <h1 className="text-2xl font-bold text-white">
//             Veterinary Bookings Dashboard
//           </h1>
//           <p className="text-blue-100 mt-2">
//             Manage all veterinary appointments and tasks
//           </p>
//         </div>

//         {/* Filters */}
//         <div className="p-6 border-b">
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="flex items-center">
//               <Filter className="w-5 h-5 text-gray-500 mr-2" />
//               <span className="font-medium text-gray-700">Filters:</span>
//             </div>

//             {/* Emergency Filter */}
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setFilter("all")}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   filter === "all"
//                     ? "bg-blue-100 text-blue-600"
//                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}
//               >
//                 All
//               </button>
//               <button
//                 onClick={() => setFilter("emergency")}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   filter === "emergency"
//                     ? "bg-red-100 text-red-600"
//                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}
//               >
//                 Emergency
//               </button>
//               <button
//                 onClick={() => setFilter("regular")}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   filter === "regular"
//                     ? "bg-green-100 text-green-600"
//                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}
//               >
//                 Regular
//               </button>
//             </div>

//             {/* Status Filter */}
//             <div className="flex gap-2 ml-4">
//               <button
//                 onClick={() => setStatusFilter("all")}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   statusFilter === "all"
//                     ? "bg-blue-100 text-blue-600"
//                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}
//               >
//                 All Status
//               </button>
//               <button
//                 onClick={() => setStatusFilter("pending")}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   statusFilter === "pending"
//                     ? "bg-yellow-100 text-yellow-600"
//                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}
//               >
//                 Pending
//               </button>
//               <button
//                 onClick={() => setStatusFilter("approved")}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   statusFilter === "approved"
//                     ? "bg-green-100 text-green-600"
//                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}
//               >
//                 Approved
//               </button>
//               <button
//                 onClick={() => setStatusFilter("rejected")}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   statusFilter === "rejected"
//                     ? "bg-red-100 text-red-600"
//                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}
//               >
//                 Rejected
//               </button>
//             </div>

//             {/* Vet Filter */}
//             <div className="ml-4">
//               <select
//                 value={selectedVet}
//                 onChange={(e) => setSelectedVet(e.target.value)}
//                 className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="all">All Veterinarians</option>
//                 {vets.map((vet) => (
//                   <option key={vet} value={vet}>
//                     {vet}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Refresh Button */}
//             <button
//               onClick={fetchBookings}
//               className="ml-auto px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
//             >
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {loading ? (
//             <div className="text-center py-10">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading bookings...</p>
//             </div>
//           ) : error ? (
//             <div className="text-center py-10 text-red-500">
//               <AlertCircle className="w-12 h-12 mx-auto mb-4" />
//               <p>{error}</p>
//             </div>
//           ) : filteredBookings.length === 0 ? (
//             <div className="text-center py-10 text-gray-500">
//               <Calendar className="w-12 h-12 mx-auto mb-4" />
//               <p>No bookings found matching your filters.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-6">
//               {filteredBookings.map((booking) => (
//                 <div
//                   key={booking._id}
//                   className={`border rounded-lg p-4 ${
//                     booking.status === "approved"
//                       ? "border-green-200 bg-green-50"
//                       : booking.status === "rejected"
//                       ? "border-red-200 bg-red-50"
//                       : booking.emergency
//                       ? "border-yellow-200 bg-yellow-50"
//                       : "border-gray-200"
//                   }`}
//                 >
//                   <div className="flex flex-wrap justify-between items-start gap-4">
//                     {/* Left Side - Booking Details */}
//                     <div className="space-y-3">
//                       <div className="flex items-center gap-2">
//                         <span className="text-lg font-medium text-gray-800">
//                           Dr. {booking.vet}
//                         </span>
//                         {booking.emergency && (
//                           <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-sm flex items-center">
//                             <AlertCircle className="w-4 h-4 mr-1" />
//                             Emergency
//                           </span>
//                         )}
//                         {getStatusBadge(booking.status)}
//                       </div>

//                       <div className="flex items-center gap-2 text-gray-600">
//                         <Calendar className="w-5 h-5" />
//                         <span>
//                           {new Date(booking.date).toLocaleDateString(
//                             undefined,
//                             {
//                               weekday: "long",
//                               year: "numeric",
//                               month: "long",
//                               day: "numeric",
//                             }
//                           )}
//                         </span>
//                       </div>

//                       <div>
//                         <span className="font-medium text-gray-700">
//                           Department:
//                         </span>
//                         <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
//                           {booking.department}
//                         </span>
//                       </div>

//                       <div>
//                         <span className="font-medium text-gray-700">
//                          Customer Phone Number:
//                         </span>
//                         <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
//                           {booking.phoneNumber}
//                         </span>
//                       </div>

//                       <div>
//                         <h3 className="font-medium text-gray-700">
//                           Reason for Visit:
//                         </h3>
//                         <p className="mt-1 text-gray-600 bg-white p-3 rounded border">
//                           {booking.reason}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Right Side - Actions */}
//                     <div className="flex flex-col gap-3">
//                       <div className="text-right">
//                         <span className="text-sm text-gray-500">
//                           Booking ID: {booking._id}
//                         </span>
//                       </div>

//                       <div className="flex flex-col gap-2 mt-auto">
//                         <button
//                           onClick={() => sendTaskToDoctor(booking._id)}
//                           disabled={booking.notified}
//                           className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${
//                             booking.notified
//                               ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                               : "bg-blue-600 text-white hover:bg-blue-700"
//                           }`}
//                         >
//                           <Send className="w-4 h-4" />
//                           {booking.notified ? "Task Sent" : "Send to Doctor"}
//                         </button>

//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => approveBooking(booking._id)}
//                             disabled={booking.status === "approved"}
//                             className={`flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${
//                               booking.status === "approved"
//                                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                                 : "bg-green-100 text-green-600 hover:bg-green-200"
//                             }`}
//                           >
//                             <Check className="w-4 h-4 mr-1" />
//                             <span>Approve</span>
//                           </button>
//                           <button
//                             onClick={() => rejectBooking(booking._id)}
//                             disabled={booking.status === "rejected"}
//                             className={`flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${
//                               booking.status === "rejected"
//                                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                                 : "bg-red-100 text-red-600 hover:bg-red-200"
//                             }`}
//                           >
//                             <X className="w-4 h-4 mr-1" />
//                             <span>Reject</span>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VetDashboard;
