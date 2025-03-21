import React, { useState } from "react";
import { Calendar, Clock, Star, Award, AlertCircle } from "lucide-react";

const VetBooking = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedVet, setSelectedVet] = useState(null);
  const [emergency, setEmergency] = useState(false);

  // Sample departments
  const departments = [
    { id: "poultry", name: "Poultry Care", icon: "🐔" },
    { id: "cattle", name: "Cattle Care", icon: "🐄" },
    { id: "sheep", name: "Sheep & Goats", icon: "🐑" },
    { id: "pets", name: "Farm Pets", icon: "🐕" },
  ];

  // Sample anonymous vet data
  const vets = [
    {
      id: 1,
      department: "poultry",
      experience: 8,
      rating: 4.8,
      reviewCount: 156,
      specializations: ["Disease Prevention", "Flock Health"],
      nextAvailable: "2024-02-19",
    },
    {
      id: 2,
      department: "cattle",
      experience: 12,
      rating: 4.9,
      reviewCount: 243,
      specializations: ["Dairy Health", "Reproductive Health"],
      nextAvailable: "2024-02-20",
    },
  ];

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const handleBooking = (e) => {
    e.preventDefault();
    // Handle booking submission
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-xl">
          <h1 className="text-2xl font-bold text-white">Book a Veterinarian</h1>
          <p className="text-blue-100 mt-2">
            Select a department and book a qualified veterinarian
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Department Selection */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Select Department
              </h2>
              <div className="space-y-3">
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDepartment(dept.id)}
                    className={`w-full p-4 rounded-lg border transition-all duration-200 flex items-center gap-3
                      ${
                        selectedDepartment === dept.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-200"
                      }`}
                  >
                    <span className="text-2xl">{dept.icon}</span>
                    <span className="font-medium text-gray-700">
                      {dept.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Emergency Toggle */}
              <div className="mt-6">
                <button
                  onClick={() => setEmergency(!emergency)}
                  className={`w-full p-4 rounded-lg border transition-all duration-200 flex items-center gap-3
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
              </div>
            </div>

            {/* Middle Column - Vet Selection */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Available Veterinarians
              </h2>
              {selectedDepartment ? (
                <div className="space-y-4">
                  {vets
                    .filter((vet) => vet.department === selectedDepartment)
                    .map((vet) => (
                      <button
                        key={vet.id}
                        onClick={() => setSelectedVet(vet)}
                        className={`w-full p-4 rounded-lg border transition-all duration-200
                          ${
                            selectedVet?.id === vet.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-200"
                          }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Award className="w-5 h-5 text-blue-600" />
                              <span className="text-gray-600">
                                {vet.experience} Years Experience
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="w-5 h-5 text-yellow-500" />
                              <span className="text-gray-600">
                                {vet.rating} ({vet.reviewCount} reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="text-sm text-gray-600">
                            Specializations:
                          </div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {vet.specializations.map((spec) => (
                              <span
                                key={spec}
                                className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
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
                <div className="text-center text-gray-500 p-6">
                  Please select a department first
                </div>
              )}
            </div>

            {/* Right Column - Booking Details */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Appointment Details
              </h2>
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Time
                  </label>
                  <div className="relative">
                    <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <select
                      required
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for Visit
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please describe the issue..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={
                    !selectedDepartment ||
                    !selectedVet ||
                    !selectedDate ||
                    !selectedTime
                  }
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 
                    transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Book Appointment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetBooking;
