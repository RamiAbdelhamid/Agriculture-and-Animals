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
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [weather, setWeather] = useState({
    temp: 0,
    humidity: 0,
    wind: 0,
    description: "",
    icon: "sun",
    forecast: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        const activeProducts = response.data.filter(
          (product) => !product.isDeleted
        );
        setProducts(activeProducts.slice(0, 5)); // Just get the first 5 for the dashboard
        setStats({
          totalProducts: activeProducts.length,
          lowStock: activeProducts.filter((product) => product.stock < 10)
            .length,
          totalOrders: 128, // Demo data
          totalRevenue: 15750, // Demo data
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
    fetchData();
  }, []);
const fetchWeatherData = async () => {
  try {
    // استبدال مفتاح API بمفتاح WeatherAPI
    const API_KEY = "c97533b51c204ec682e83651252003"; // استبدلها بمفتاحك الخاص
    const CITY = "Amman"; // المدينة الافتراضية

    // إرسال الطلب إلى WeatherAPI للحصول على بيانات الطقس
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?q=${CITY}&key=${API_KEY}&days=5&aqi=no&alerts=no`
    );

    // التحقق من حالة الاستجابة
    if (response.status === 200) {
      // الطقس الحالي
      const currentWeather = response.data.current;

      // بيانات التوقعات (أخذ التوقعات اليومية)
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

      // تحديث الحالة بالبيانات المسترجعة
      setWeather({
        temp: Math.round(currentWeather.temp_c),
        humidity: currentWeather.humidity,
        wind: Math.round(currentWeather.wind_kph),
        description: currentWeather.condition.text,
        icon: getWeatherIcon(currentWeather.condition.text),
        forecast: forecastData,
      });
    } else {
      console.error("API Error: ", response.status);
      setWeatherWithDemoData(); // العودة إلى البيانات الافتراضية إذا فشل الاتصال
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    setWeatherWithDemoData(); // العودة إلى البيانات الافتراضية في حال حدوث خطأ
  }
};

// تعيين البيانات الافتراضية
const setWeatherWithDemoData = () => {
  setWeather({
    temp: 22,
    humidity: 65,
    wind: 12,
    description: "Sunny",
    icon: "sun",
    forecast: [
      { day: "Mon", temp: 22, icon: "sun" },
      { day: "Tue", temp: 24, icon: "sun" },
      { day: "Wed", temp: 21, icon: "cloud" },
      { day: "Thu", temp: 19, icon: "rain" },
      { day: "Fri", temp: 20, icon: "sun" },
    ],
  });
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

  const handleTaskToggle = (taskId) => {
    setFarmTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = () => {
    navigate("/tasks/new");
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case "addProduct":
        navigate("/products/new");
        break;
      case "newOrder":
        navigate("/orders/new");
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

  // Calendar days with planting and harvesting days
  const plantingDays = [3, 12, 24];
  const harvestingDays = [8, 19, 27];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        <p className="mr-3 text-green-700">Loading the dashboard...</p>
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

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Farm Dashboard</h1>
        <p className="text-gray-600">
          Welcome back to the farm management system.
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
            <ArrowUp size={12} /> 12% from last month
          </p>
        </div>

        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Stock Products</p>
              <p className="text-2xl font-bold">{stats.lowStock}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <AlertTriangle size={24} className="text-yellow-600" />
            </div>
          </div>
          <p className="text-xs text-red-600 mt-2 flex items-center">
            <ArrowUp size={12} /> 3 more than last week
          </p>
        </div>

        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <ShoppingBag size={24} className="text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 flex items-center">
            <ArrowUp size={12} /> 8% from last month
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
            <ArrowUp size={12} /> 15% from last month
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Products */}
          <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-semibold text-lg">Recent Products</h2>
              <Link
                to="/products"
                className="text-green-600 text-sm hover:text-green-800 flex items-center"
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                              className="w-10 h-10 rounded-full object-cover ml-3"
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
                          {product.stock || Math.floor(Math.random() * 100)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              (product.stock ||
                                Math.floor(Math.random() * 100)) > 10
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {(product.stock ||
                              Math.floor(Math.random() * 100)) > 10
                              ? "Available"
                              : "Low Stock"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Farm Tasks */}
          <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-semibold text-lg">Farm Tasks</h2>
              <Link
                to="/tasks"
                className="text-green-600 text-sm hover:text-green-800 flex items-center"
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="p-4">
              <ul className="divide-y divide-gray-200">
                {farmTasks.map((task) => (
                  <li key={task.id} className="py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleTaskToggle(task.id)}
                          className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <div className="mr-3">
                          <p
                            className={`text-sm font-medium ${
                              task.completed
                                ? "text-gray-400 line-through"
                                : "text-gray-900"
                            }`}
                          >
                            {task.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Due: {task.due}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          task.priority === "High"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleAddTask}
                className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Add New Task
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg">Weather Forecast</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold">{weather.temp}°C</p>
                  <p className="text-sm text-gray-500">{weather.description}</p>
                </div>
                <div className="text-yellow-500">
                  {weather.icon === "sun" && <Sun size={48} />}
                  {weather.icon === "cloud" && (
                    <Cloud size={48} className="text-gray-500" />
                  )}
                  {weather.icon === "rain" && (
                    <CloudRain size={48} className="text-blue-500" />
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Droplet size={16} className="text-blue-500 ml-1" />
                  <span className="text-sm">{weather.humidity}%</span>
                </div>
                <div className="flex items-center">
                  <Wind size={16} className="text-blue-500 ml-1" />
                  <span className="text-sm">{weather.wind} km/h</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between">
                  {weather.forecast.map((day, index) => (
                    <div key={index} className="text-center">
                      <p className="text-xs text-gray-500">{day.day}</p>
                      {renderWeatherIcon(day.icon)}
                      <p className="text-sm font-medium">{day.temp}°</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg">Planting Calendar</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-7 gap-2 mb-2">
                <div className="text-center text-xs text-gray-500">Sun</div>
                <div className="text-center text-xs text-gray-500">Mon</div>
                <div className="text-center text-xs text-gray-500">Tue</div>
                <div className="text-center text-xs text-gray-500">Wed</div>
                <div className="text-center text-xs text-gray-500">Thu</div>
                <div className="text-center text-xs text-gray-500">Fri</div>
                <div className="text-center text-xs text-gray-500">Sat</div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for days before the first day of month */}
                {[...Array(firstDayOfMonth)].map((_, i) => (
                  <div key={`empty-${i}`} className="h-8"></div>
                ))}

                {/* Calendar days */}
                {[...Array(daysInMonth)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-8 flex items-center justify-center text-sm rounded-full cursor-pointer ${
                      i + 1 === currentDay
                        ? "bg-green-600 text-white"
                        : harvestingDays.includes(i + 1)
                        ? "bg-green-600 text-white"
                        : plantingDays.includes(i + 1)
                        ? "bg-green-100 text-green-800"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => alert(`Day ${i + 1} selected`)}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="flex items-center text-sm mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-600 ml-2"></div>
                  <span>Harvest Day</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-100 ml-2"></div>
                  <span>Planting Day</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg">Quick Actions</h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleQuickAction("addProduct")}
                className="bg-green-50 p-3 rounded-lg text-green-700 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex flex-col items-center"
              >
                <PlusCircle size={24} className="mb-1" />
                <span className="text-sm">Add Product</span>
              </button>
              <button
                onClick={() => handleQuickAction("newOrder")}
                className="bg-blue-50 p-3 rounded-lg text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex flex-col items-center"
              >
                <Clipboard size={24} className="mb-1" />
                <span className="text-sm">New Order</span>
              </button>
              <button
                onClick={() => handleQuickAction("schedule")}
                className="bg-purple-50 p-3 rounded-lg text-purple-700 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex flex-col items-center"
              >
                <CalendarPlus size={24} className="mb-1" />
                <span className="text-sm">Schedule</span>
              </button>
              <button
                onClick={() => handleQuickAction("reports")}
                className="bg-yellow-50 p-3 rounded-lg text-yellow-700 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 flex flex-col items-center"
              >
                <BarChart size={24} className="mb-1" />
                <span className="text-sm">Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
