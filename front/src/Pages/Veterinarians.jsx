

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  Star,
  Award,
  AlertCircle,
  Clock,
  MapPin,
  Leaf,
  Phone,
} from "lucide-react";
import Swal from "sweetalert2";

const VetBooking = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedVet, setSelectedVet] = useState(null);
  const [emergency, setEmergency] = useState(false);
  const [reason, setReason] = useState("");
  const [reservedDates, setReservedDates] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [departments, setDepartments] = useState([]);
  const [vets, setVets] = useState([]);

  // Alert functions
  const showSuccessAlert = (message) => {
    Swal.fire({
      title: "Success!",
      text: message,
      icon: "success",
      confirmButtonColor: "#16a34a",
    });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
      confirmButtonColor: "#dc2626",
    });
  };

  const showWarningAlert = (message) => {
    Swal.fire({
      title: "Warning!",
      text: message,
      icon: "warning",
      confirmButtonColor: "#d97706",
    });
  };

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/departments",
          { withCredentials: true }
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        if (error.response?.status === 401) {
          showErrorAlert("Please login to access veterinary services");
        } else {
          showErrorAlert("Failed to load departments. Please try again later.");
        }
      }
    };

    fetchDepartments();
  }, []);

  // Fetch vets when department is selected
  useEffect(() => {
    if (selectedDepartment) {
      const fetchVets = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/vets/by-department/${selectedDepartment}`,
            { withCredentials: true }
          );
          setVets(response.data);
        } catch (error) {
          console.error("Error fetching vets:", error);
          if (error.response?.status === 401) {
            showErrorAlert("Please login to view available veterinarians");
          } else {
            showErrorAlert(
              "Failed to load veterinarians. Please try again later."
            );
          }
        }
      };

      fetchVets();
    }
  }, [selectedDepartment]);

  // Fetch reserved dates when vet is selected
  useEffect(() => {
    if (selectedVet) {
      fetchReservedDates(selectedVet.name);
    } else {
      setReservedDates([]);
    }
  }, [selectedVet]);

  const fetchReservedDates = async (vetName) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/bookings/vet/${vetName}`,
        { withCredentials: true }
      );
      setReservedDates(response.data);
    } catch (error) {
      console.error("Error fetching reserved dates:", error);
      if (error.response?.status === 401) {
        showErrorAlert("Please login to view available dates");
      } else {
        showErrorAlert(
          "Failed to load reserved dates. Please try again later."
        );
      }
    }
  };

  const getNextAvailableDate = (vetName) => {
    if (!reservedDates || reservedDates.length === 0) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toLocaleDateString();
    }

    const reservedDateObjects = reservedDates.map((date) => new Date(date));
    let nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1); // نبدأ من الغد

    let daysToCheck = 30;
    while (daysToCheck > 0) {
      const isReserved = reservedDateObjects.some(
        (reservedDate) =>
          reservedDate.toDateString() === nextDate.toDateString()
      );

      if (!isReserved) {
        return nextDate.toLocaleDateString();
      }

      nextDate.setDate(nextDate.getDate() + 1);
      daysToCheck--;
    }

    return nextDate.toLocaleDateString();
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (
      !selectedDepartment ||
      !selectedVet ||
      !selectedDate ||
      !reason ||
      !phoneNumber
    ) {
      showWarningAlert("Please fill in all required fields!");
      return;
    }

    if (reservedDates.includes(selectedDate)) {
      showWarningAlert(
        "This date is already booked for the selected veterinarian. Please choose another date."
      );
      return;
    }

    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ""))) {
      showWarningAlert("Please enter a valid phone number (10-15 digits)");
      return;
    }

    const bookingData = {
      department: selectedDepartment,
      vet: selectedVet.name,
      date: selectedDate,
      emergency,
      reason,
      phoneNumber,
    };

    try {
      Swal.fire({
        title: "Processing...",
        text: "Please wait while we book your appointment",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await axios.post("http://localhost:5000/bookings", bookingData, {
        withCredentials: true,
      });

      Swal.close();
      showSuccessAlert("Your appointment has been booked successfully!");

      fetchReservedDates(selectedVet.name);
      setSelectedDate("");
      setReason("");
      setPhoneNumber("");
    } catch (error) {
      console.error(error);
      Swal.close();

      if (error.response) {
        if (error.response.status === 401) {
          showErrorAlert("Please login to book an appointment");
        } else {
          showErrorAlert(
            error.response.data.message ||
              "An error occurred while saving your booking. Please try again."
          );
        }
      } else {
        showErrorAlert(
          "Network error. Please check your connection and try again."
        );
      }
    }
  };

const DatePicker = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="relative">
      <input
        type="date"
        required
        min={minDate}
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
      />

      {selectedVet && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            Reserved Dates:
          </h3>
          <div className="flex overflow-x-auto gap-2">
            {reservedDates.length > 0 ? (
              reservedDates
                .sort((a, b) => new Date(b) - new Date(a))
                .map((date, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium shadow-sm"
                  >
                    {formatDate(date)}
                  </span>
                ))
            ) : (
              <span className="text-sm text-gray-500 italic">
                No reserved dates found for this vet
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
  return (
    <div className="max-w-6xl mx-auto p-6 bg-green-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-green-100">
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500 rounded-full opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="flex items-center">
            <Leaf className="w-10 h-10 text-white mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-white">
                Farm Vet Services
              </h1>
              <p className="text-green-100 mt-2 text-lg">
                Expert veterinary care for your farm animals
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center mb-6 pb-4 border-b border-green-100">
            <MapPin className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-gray-600">
              Rural Agricultural Support Program
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-2">
                  1
                </span>
                Select Department
              </h2>
              <div className="space-y-3">
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => {
                      setSelectedDepartment(dept.id);
                      setSelectedVet(null);
                      setSelectedDate("");
                    }}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center gap-3 shadow-sm hover:shadow cursor-pointer
    ${
      selectedDepartment === dept.id
        ? "border-green-500 bg-green-50"
        : "border-gray-200 hover:border-green-200"
    }`}
                  >
                    <span className="text-2xl">{dept.icon}</span>
                    <span className="font-medium text-gray-700">
                      {dept.name}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setEmergency(!emergency)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center gap-3 shadow-sm cursor-pointer
                    ${
                      emergency
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-red-200"
                    }`}
                >
                  <AlertCircle
                    className={`w-6 h-6 ${
                      emergency ? "text-red-500" : "text-gray-400"
                    }`}
                  />
                  <span className="font-medium text-gray-700">
                    Emergency Case
                  </span>
                </button>
                {emergency && (
                  <p className="text-sm text-red-500 mt-2 pl-2">
                    Emergency cases receive priority scheduling
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-2">
                  2
                </span>
                Choose Veterinarian
              </h2>

              {selectedDepartment ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select a Veterinarian
                    </label>
                    <select
                      value={selectedVet ? selectedVet.name : ""}
                      onChange={(e) => {
                        const vet = vets.find((v) => v.name === e.target.value);
                        setSelectedVet(vet);
                      }}
                      className="w-full p-3 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                    >
                      <option value="">-- Select a Veterinarian --</option>
                      {vets
                        .filter((vet) => vet.department === selectedDepartment)
                        .map((vet) => (
                          <option key={vet.name} value={vet.name}>
                            Dr. {vet.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {selectedVet && (
                    <div className="mt-6 p-5 rounded-lg border-2 border-green-200 bg-green-50 shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-2xl">
                          {selectedVet.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-xl">
                            Dr. {selectedVet.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {selectedVet.experience} Years Experience
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="text-sm text-gray-600 mb-2">
                          Specializations:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedVet.specializations.map((spec) => (
                            <span
                              key={spec}
                              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <Clock className="w-4 h-4 text-green-600 inline-block mr-2" />
                        <span className="text-sm text-gray-700">
                          Next Available:{" "}
                          {getNextAvailableDate(selectedVet.name)}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-gray-500 p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <Leaf className="w-12 h-12 text-green-200 mx-auto mb-3" />
                  <p>Please select a department first</p>
                </div>
              )}
            </div>

            {/* 
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-2 ">
                  2
                </span>
                Choose Veterinarian
              </h2>
              {selectedDepartment ? (
                <div className="space-y-6">
                  {vets
                    .filter((vet) => vet.department === selectedDepartment)
                    .map((vet) => (
                      <button
                        key={vet.name}
                        onClick={() => setSelectedVet(vet)}
                        className={`w-full p-5 rounded-lg border-2 transition-all duration-200 hover:shadow-md cursor-pointer
                          ${
                            selectedVet?.name === vet.name
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-green-200"
                          }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                              {vet.name.charAt(0)}
                            </div>
                            <div className="space-y-1 text-left">
                              <h3 className="font-semibold text-gray-800 text-lg">
                                Dr. {vet.name}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div className="bg-green-50 p-2 rounded-lg">
                            <Award className="w-4 h-4 text-green-600 inline-block mr-1" />
                            <span className="text-sm text-gray-700">
                              {vet.experience} Years Experience
                            </span>
                          </div>

                          <div className="bg-green-50 p-2 rounded-lg">
                            <Clock className="w-4 h-4 text-green-600 inline-block mr-1" />
                            <span className="text-sm text-gray-700">
                              Next Available:{" "}
                              {selectedVet && selectedVet.name === vet.name
                                ? getNextAvailableDate(vet.name)
                                : "Select to see"}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="text-sm text-gray-600 mb-2">
                            Specializations:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {vet.specializations.map((spec) => (
                              <span
                                key={spec}
                                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <Leaf className="w-12 h-12 text-green-200 mx-auto mb-3" />
                  <p>Please select a department first</p>
                </div>
              )}
            </div> */}

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-2">
                  3
                </span>
                Appointment Details
              </h2>

              <form
                onSubmit={handleBooking}
                className="space-y-6 bg-white p-6 rounded-lg border border-green-100 shadow-sm"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <DatePicker />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-green-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full pl-10 pr-4 py-3 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-1">
                    Format: +1234567890 or 0123456789
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Visit
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                    placeholder="Please describe the issue or reason for your visit..."
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={
                      !selectedDepartment ||
                      !selectedVet ||
                      !selectedDate ||
                      !reason ||
                      !phoneNumber
                    }
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 
                      transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed
                      font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Book Appointment
                  </button>

                  {selectedVet && selectedDepartment && (
                    <p className="text-sm text-gray-500 text-center mt-3">
                      You're booking with Dr. {selectedVet.name} for{" "}
                      {
                        departments.find((d) => d.id === selectedDepartment)
                          ?.name
                      }
                    </p>
                  )}
                </div>
              </form>

              {/* {selectedVet && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-4">
                  <h3 className="text-sm font-semibold text-green-800">
                    Booking Information
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>• Farm visits available upon request</li>
                    <li>• Appointments typically last 30-45 minutes</li>
                    <li>• Please arrive 10 minutes before your appointment</li>
                    <li>• We'll send a confirmation to your phone</li>
                  </ul>
                </div>
              )} */}
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 text-center text-sm text-gray-600 border-t border-green-100">
          Farm Vet Services - Providing quality care to farm animals since 2010
        </div>
      </div>
    </div>
  );
};

export default VetBooking;
