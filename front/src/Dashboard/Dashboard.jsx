

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BarChart,
  Calendar,
  Clipboard,
  Droplet,
  Sun,
  Wind,
  Cloud,
  CloudRain,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  Package,
  AlertTriangle,
  ShoppingBag,
  DollarSign,
  PlusCircle,
  CalendarPlus,
  User,
  Filter,
  AlertCircle,
  Check,
  X,
  Clock,
  Sidebar,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedReservations, setCompletedReservations] = useState(0);
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    totalRevenue: 0,
    pendingBookings: 0,
    emergencyBookings: 0,
  });
  const [weather, setWeather] = useState({
    temp: 0,
    humidity: 0,
    wind: 0,
    description: "",
    icon: "sun",
    forecast: [],
  });
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [recentBookings, setRecentBookings] = useState([]);
  const [bookingStats, setBookingStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    completed: 0,
    emergency: 0,
  });
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await axios.get(
          "http://localhost:5000/api/products"
        );
        const activeProducts = productsResponse.data.filter(
          (product) => !product.isDeleted
        );
        setProducts(activeProducts.slice(0, 5)); // Just get the first 5 for the dashboard
        setStats({
          totalProducts: activeProducts.length,
        });
        // Fetch all bookings
        const bookingsResponse = await axios.get(
          "http://localhost:5000/bookings"
        );
        const allBookings = bookingsResponse.data;

        // Get the 5 most recent bookings
        const sortedBookings = [...allBookings].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRecentBookings(sortedBookings.slice(0, 5));

        // Calculate booking statistics
        const completedBookings = allBookings.filter(
          (booking) => booking.completed
        );
        const pendingBookings = allBookings.filter(
          (booking) => booking.status === "pending"
        );
        const approvedBookings = allBookings.filter(
          (booking) => booking.status === "approved"
        );
        const emergencyBookings = allBookings.filter(
          (booking) => booking.emergency
        );

        setCompletedReservations(completedBookings.length);

        // Calculate estimated revenue (you can adjust this calculation based on your business logic)
        const estimatedRevenue = completedBookings.length * 50; // Assuming 50 JOD per booking

        setBookingStats({
          total: allBookings.length,
          pending: pendingBookings.length,
          approved: approvedBookings.length,
          completed: completedBookings.length,
          emergency: emergencyBookings.length,
        });

        setStats({
          totalProducts: activeProducts.length,
          lowStock: activeProducts.filter((product) => product.stock < 10)
            .length,
          totalRevenue: estimatedRevenue,
          pendingBookings: pendingBookings.length,
          emergencyBookings: emergencyBookings.length,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch doctors
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        if (response.data && response.data.length > 0) {
          const formattedDoctors = response.data.map((doctor) => ({
            id: doctor._id,
            name: `Dr. ${doctor.name}`,
          }));

          setDoctors(formattedDoctors);

          if (formattedDoctors.length > 0) {
            setSelectedDoctor(formattedDoctors[0].id);
            // Fetch reserved dates for the first doctor
            fetchReservedDates(formattedDoctors[0].name.replace("Dr. ", ""));
          }
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchReservedDates = async (vetName) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/bookings/vet/${vetName}`
        );
        setReservedDates(response.data);
      } catch (error) {
        console.error("Error fetching reserved dates:", error);
      }
    };

    fetchWeatherData();
    fetchData();
    fetchDoctors();
  }, []);

  // Update reserved dates when doctor changes
  useEffect(() => {
    if (selectedDoctor) {
      const doctor = doctors.find((d) => d.id === selectedDoctor);
      if (doctor) {
        const vetName = doctor.name.replace("Dr. ", "");
        const fetchReservedDates = async () => {
          try {
            const response = await axios.get(
              `http://localhost:5000/api/bookings/vet/${vetName}`
            );
            setReservedDates(response.data);
          } catch (error) {
            console.error("Error fetching reserved dates:", error);
          }
        };
        fetchReservedDates();
      }
    }
  }, [selectedDoctor, doctors]);

  const fetchWeatherData = async () => {
    try {
      const API_KEY = "c97533b51c204ec682e83651252003";
      const CITY = "Amman";

      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?q=${CITY}&key=${API_KEY}&days=5&aqi=no&alerts=no`
      );

      if (response.status === 200) {
        const currentWeather = response.data.current;

        const forecastData = response.data.forecast.forecastday.map(
          (forecast) => {
            const dayName = new Date(forecast.date).toLocaleString("en-us", {
              weekday: "short",
            });

            return {
              day: dayName,
              temp: Math.round(forecast.day.avgtemp_c),
              icon: getWeatherIcon(forecast.day.condition.text),
            };
          }
        );

        setWeather({
          temp: Math.round(currentWeather.temp_c),
          humidity: currentWeather.humidity,
          wind: Math.round(currentWeather.wind_kph),
          description: currentWeather.condition.text,
          icon: getWeatherIcon(currentWeather.condition.text),
          forecast: forecastData,
        });
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const getWeatherIcon = (condition) => {
    const conditions = {
      Clear: "sun",
      Clouds: "cloud",
      Rain: "rain",
      Drizzle: "rain",
      Thunderstorm: "rain",
      Snow: "snow",
      Mist: "cloud",
      Fog: "cloud",
      "Partly cloudy": "cloud",
      Overcast: "cloud",
    };

    return conditions[condition] || "sun";
  };

  // Farm Tasks with actual state management
  const [farmTasks, setFarmTasks] = useState([
    {
      id: 1,
      name: "Fertilizing the cucumber field",
      due: "Today",
      priority: "High",
      status: "Pending",
      completed: false,
    },
    {
      id: 2,
      name: "Tomato harvesting",
      due: "Tomorrow",
      priority: "Medium",
      status: "Pending",
      completed: false,
    },
    {
      id: 3,
      name: "Restocking animal feed",
      due: "March 23",
      priority: "High",
      status: "Pending",
      completed: false,
    },
    {
      id: 4,
      name: "Checking irrigation system",
      due: "March 24",
      priority: "Medium",
      status: "Pending",
      completed: false,
    },
  ]);

  // Fetch farm tasks
  const fetchFarmTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      if (response.data) {
        setFarmTasks(response.data);
      }
    } catch (error) {
      console.error("Error fetching farm tasks:", error);
    }
  };

  const handleTaskToggle = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}/toggle`);
      setFarmTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const handleAddTask = () => {
    navigate("/tasks/new");
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case "addProduct":
        navigate("/products/new");
        break;
      case "newBooking":
        navigate("/bookings/new");
        break;
      case "schedule":
        navigate("/calendar");
        break;
      case "reports":
        navigate("/reports");
        break;
      default:
        break;
    }
  };

  const handleNotifyDoctor = async (bookingId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/bookings/${bookingId}/notify`
      );
      setRecentBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, notified: true } : booking
        )
      );
      alert("Doctor has been notified about this booking");
    } catch (error) {
      console.error("Error notifying doctor:", error);
      alert("Failed to notify doctor");
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}/status`,
        { status }
      );
      setRecentBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status } : booking
        )
      );
      alert(`Booking status updated to ${status}`);
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert("Failed to update booking status");
    }
  };

  const markBookingComplete = async (bookingId, completed) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}/complete`,
        { completed }
      );
      setRecentBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, completed } : booking
        )
      );

      // Update stats to reflect the change
      if (completed) {
        setCompletedReservations((prev) => prev + 1);
      } else {
        setCompletedReservations((prev) => prev - 1);
      }

      alert(`Booking marked as ${completed ? "completed" : "incomplete"}`);
    } catch (error) {
      console.error("Error updating booking completion:", error);
      alert("Failed to update booking completion status");
    }
  };

  // Get today's date for the calendar highlight
  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  // Generate calendar days for current month
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  // Parse reserved dates for the calendar
  const parsedReservedDays = reservedDates.map((dateStr) => {
    const date = new Date(dateStr);
    return date.getDate();
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        <p className="ml-3 text-blue-700">Loading the dashboard...</p>
      </div>
    );
  }

  const renderWeatherIcon = (icon) => {
    switch (icon) {
      case "sun":
        return <Sun size={20} className="mx-auto my-1 text-yellow-500" />;
      case "cloud":
        return <Cloud size={20} className="mx-auto my-1 text-gray-500" />;
      case "rain":
        return <CloudRain size={20} className="mx-auto my-1 text-blue-500" />;
      default:
        return <Sun size={20} className="mx-auto my-1 text-yellow-500" />;
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-xl mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-blue-100 mt-2">
          Welcome back to the farm management system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Package size={24} className="text-green-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 flex items-center">
            <ArrowUp size={12} /> Active products
          </p>
        </div>

        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Bookings</p>
              <p className="text-2xl font-bold">{stats.pendingBookings}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
          <p className="text-xs text-yellow-600 mt-2 flex items-center">
            <ArrowUp size={12} /> Needs attention
          </p>
        </div>

        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed Bookings</p>
              <p className="text-2xl font-bold">{completedReservations}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Check size={24} className="text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 flex items-center">
            <ArrowUp size={12} /> Total completed
          </p>
        </div>

        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">{stats.totalRevenue} JOD</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <DollarSign size={24} className="text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 flex items-center">
            <ArrowUp size={12} /> Revenue to date
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
              <h2 className="font-semibold text-lg text-blue-800">
                Recent Bookings
              </h2>
              <Link
                to="./vet"
                className="text-blue-600 text-sm hover:text-blue-800 flex items-center"
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="p-4">
              {recentBookings.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4" />
                  <p>No bookings found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vet
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Emergency
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentBookings.map((booking) => (
                        <tr key={booking._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <span className="font-medium text-gray-900">
                                Dr. {booking.vet}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {booking.department}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {new Date(booking.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(
                                booking.status
                              )}`}
                            >
                              {booking.status.charAt(0).toUpperCase() +
                                booking.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                booking.emergency
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {booking.emergency ? "Emergency" : "Regular"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm space-x-2">
                            <button
                              onClick={() => handleNotifyDoctor(booking._id)}
                              disabled={booking.notified}
                              className={`px-2 py-1 text-xs rounded ${
                                booking.notified
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                              }`}
                            >
                              {booking.notified ? "Notified" : "Notify"}
                            </button>

                            {booking.status === "pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    updateBookingStatus(booking._id, "approved")
                                  }
                                  className="px-2 py-1 text-xs rounded bg-green-100 text-green-800 hover:bg-green-200"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() =>
                                    updateBookingStatus(booking._id, "rejected")
                                  }
                                  className="px-2 py-1 text-xs rounded bg-red-100 text-red-800 hover:bg-red-200"
                                >
                                  Reject
                                </button>
                              </>
                            )}

                            {booking.status === "approved" &&
                              !booking.completed && (
                                <button
                                  onClick={() =>
                                    markBookingComplete(booking._id, true)
                                  }
                                  className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-800 hover:bg-purple-200"
                                >
                                  Complete
                                </button>
                              )}

                            {booking.completed && (
                              <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                                Completed
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Recent Products */}
          <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
              <h2 className="font-semibold text-lg text-blue-800">
                Recent Products
              </h2>
              <Link
                to="./products"
                className="text-blue-600 text-sm hover:text-blue-800 flex items-center"
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="p-4">
              {products.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-4" />
                  <p>No products found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <img
                                src={`http://localhost:5000${product.image}`}
                                alt={product.name}
                                className="w-10 h-10 rounded-full object-cover mr-3"
                              />
                              <span className="font-medium text-gray-900">
                                {product.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {product.category}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {product.price} JOD
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {product.stock}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                product.stock > 10
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {product.stock > 10 ? "Available" : "Low Stock"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Booking Statistics */}
          <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
              <h2 className="font-semibold text-lg text-blue-800">
                Booking Statistics
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Bookings</span>
                  <span className="font-medium">{bookingStats.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pending</span>
                  <span className="font-medium">{bookingStats.pending}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-yellow-500 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (bookingStats.pending / bookingStats.total) * 100 || 0
                      }%`,
                    }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Approved</span>
                  <span className="font-medium">{bookingStats.approved}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (bookingStats.approved / bookingStats.total) * 100 || 0
                      }%`,
                    }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="font-medium">{bookingStats.completed}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-500 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (bookingStats.completed / bookingStats.total) * 100 || 0
                      }%`,
                    }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Emergency Cases</span>
                  <span className="font-medium">{bookingStats.emergency}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-red-500 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (bookingStats.emergency / bookingStats.total) * 100 || 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Widget */}
          <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
              <h2 className="font-semibold text-lg text-blue-800">
                Weather Information
              </h2>
            </div>
            <div className="p-4">
              <div className="text-center p-2">
                <div className="flex items-center justify-center mb-2">
                  {renderWeatherIcon(weather.icon)}
                  <span className="text-2xl font-bold ml-2">
                    {weather.temp}°C
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{weather.description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-blue-50 p-2 rounded flex items-center justify-center">
                    <Droplet size={16} className="text-blue-600 mr-1" />
                    <span>Humidity: {weather.humidity}%</span>
                  </div>
                  <div className="bg-blue-50 p-2 rounded flex items-center justify-center">
                    <Wind size={16} className="text-blue-600 mr-1" />
                    <span>Wind: {weather.wind} km/h</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-1">
                {weather.forecast.map((day, index) => (
                  <div key={index} className="text-center">
                    <p className="text-xs font-medium">{day.day}</p>
                    {renderWeatherIcon(day.icon)}
                    <p className="text-sm">{day.temp}°C</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Farm Tasks */}
          <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg flex justify-between items-center">
              <h2 className="font-semibold text-lg text-blue-800">
                Farm Tasks
              </h2>
              <button
                onClick={handleAddTask}
                className="text-blue-600 hover:text-blue-800"
              >
                <PlusCircle size={20} />
              </button>
            </div>
            <div className="p-4">
              {farmTasks.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <Clipboard className="w-12 h-12 mx-auto mb-2" />
                  <p>No tasks found</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {farmTasks.map((task) => (
                    <li key={task.id} className="py-3">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span
                              className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                task.priority === "High"
                                  ? "bg-red-500"
                                  : task.priority === "Medium"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                            ></span>
                            <p
                              className={`font-medium ${
                                task.completed
                                  ? "text-gray-400 line-through"
                                  : "text-gray-800"
                              }`}
                            >
                              {task.name}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Due: {task.due}
                          </p>
                        </div>
                        <button
                          onClick={() => handleTaskToggle(task.id)}
                          className={`ml-2 p-1 rounded ${
                            task.completed
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {task.completed ? (
                            <Check size={16} />
                          ) : (
                            <X size={16} />
                          )}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Calendar for Doctor Availability */}
          <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
              <h2 className="font-semibold text-lg text-blue-800">
                Doctor Availability
              </h2>
            </div>
            <div className="p-4">
              {/* Doctor selector */}
              <div className="mb-4">
                <label
                  htmlFor="doctorSelect"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Doctor
                </label>
                <select
                  id="doctorSelect"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Simple calendar grid */}
              <div className="text-center mb-2">
                <h3 className="font-medium text-gray-700 mb-2">
                  {currentDate.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                  (day, index) => (
                    <div key={index} className="font-medium text-gray-500 py-1">
                      {day}
                    </div>
                  )
                )}

                {/* Empty cells for days before the first day of month */}
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                  <div key={`empty-${index}`} className="py-2"></div>
                ))}

                {/* Calendar days */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const isToday = day === currentDay;
                  const isReserved = parsedReservedDays.includes(day);

                  return (
                    <div
                      key={day}
                      className={`py-2 rounded-full w-8 h-8 mx-auto flex items-center justify-center ${
                        isToday
                          ? "bg-blue-500 text-white"
                          : isReserved
                          ? "bg-red-100 text-red-800"
                          : ""
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                  <span>Today</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-100 mr-1"></div>
                  <span>Booked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <button
          onClick={() => handleQuickAction("addProduct")}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col items-center"
        >
          <ShoppingBag size={24} className="text-blue-600 mb-2" />
          <span className="text-sm font-medium">Add Product</span>
        </button>

        <button
          onClick={() => handleQuickAction("newBooking")}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col items-center"
        >
          <CalendarPlus size={24} className="text-blue-600 mb-2" />
          <span className="text-sm font-medium">New Booking</span>
        </button>

        <button
          onClick={() => handleQuickAction("schedule")}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col items-center"
        >
          <Calendar size={24} className="text-blue-600 mb-2" />
          <span className="text-sm font-medium">View Schedule</span>
        </button>

        <button
          onClick={() => handleQuickAction("reports")}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col items-center"
        >
          <BarChart size={24} className="text-blue-600 mb-2" />
          <span className="text-sm font-medium">Generate Reports</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
