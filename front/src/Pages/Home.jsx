

import Navbar from "../Component/Shared/Navbar";
import CategoryCards from "../Component/HomeComponent/Category";
import ThymeCrop from "../Component/HomeComponent/ThymeCrop";
import ChickenSection from "../Component/HomeComponent/ChickenSection";
import Reviews from "../Component/HomeComponent/Reviews";
import Carousel from "../Component/HomeComponent/Carousel";
import Footer from "../Component/Shared/Footer";
import { useRef } from "react";
import PartnerAnimation from "./PartnerAnimation";
import { Link } from "react-router-dom"; // استيراد Link من react-router-dom
const Home = () => {
  const categorySectionRef = useRef(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div ref={categorySectionRef} id="category-section">
        {/* Hero Section with Carousel */}
        <section className="relative">
          <Carousel />
        </section>
      </div>

      {/* Categories Section with improved spacing */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our complete range of agricultural and poultry products,
            from vaccines to equipment
          </p>
        </div>
        <CategoryCards />
      </section>

      {/* Featured Products - Thyme Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
              Featured Product
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mt-2">
              From Our Fields
            </h2>
          </div>
          <ThymeCrop />
        </div>
      </section>

      {/* Chicken Farming Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">
            Poultry Solutions
          </span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2">
            Broiler Farming Excellence
          </h2>
        </div>
        <ChickenSection />
      </section>

      {/* NEW: Seasonal Farming Calendar */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
              Plan Your Year
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mt-2">
              Seasonal Farming Calendar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Stay ahead with our seasonal guidelines for optimal farm
              management
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Spring */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
              <h3 className="text-xl font-bold text-green-600 mb-3">Spring</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Soil preparation and testing</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Early crop planting</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Livestock vaccination schedule</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Chick brooding season</span>
                </li>
              </ul>
            </div>
            {/* Summer */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
              <h3 className="text-xl font-bold text-yellow-600 mb-3">Summer</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Irrigation management</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Pest control solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Heat stress management for livestock</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Early harvest preparations</span>
                </li>
              </ul>
            </div>
            {/* Fall */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-500">
              <h3 className="text-xl font-bold text-orange-600 mb-3">Fall</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Harvest season equipment</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Soil amendments and cover crops</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Feed storage solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Preparing coops for winter</span>
                </li>
              </ul>
            </div>
            {/* Winter */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
              <h3 className="text-xl font-bold text-blue-600 mb-3">Winter</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Equipment maintenance</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Farm planning for next season</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Livestock housing solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Cold weather feed supplements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Services Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mt-2">
            Our Agricultural Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            From consultation to implementation, we provide comprehensive
            support for your farming needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/Shop">
            <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 5h12a2 2 0 002-2V7H5.4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Shop</h3>
              <p className="text-gray-600">
                Browse our store for farming essentials — seeds, tools,
                supplements, and more at competitive prices.
              </p>
            </div>
          </Link>

          <Link to="/HealthGuide">
            <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 4c-2.21 0-4 1.79-4 4v2h8v-2c0-2.21-1.79-4-4-4zm0-10C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Health Guide
              </h3>
              <p className="text-gray-600">
                Learn how to maintain optimal animal health with our expert
                guides, covering nutrition, prevention, and care tips.
              </p>
            </div>
          </Link>

          <Link to="/veterinarians">
            <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Veterinary Services
              </h3>
              <p className="text-gray-600">
                Professional animal healthcare services, regular check-ups,
                vaccinations, and emergency care for your livestock
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* NEW: Partners & Suppliers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10"></div>
          <div className="relative h-[800px] perspective-[1500px] mx-auto max-w-7xl">
            <PartnerAnimation />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Grow with Us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with our experts to find the best agricultural solutions for
            your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/veterinarians">
              {" "}
              <button className="px-8 py-3 bg-white text-green-700 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all cursor-pointer">
                Veterinary service
              </button>
            </a>
            <a href="/shop">
              {" "}
              <button className="px-8 py-3 bg-transparent border-2 border-white rounded-lg font-bold text-lg hover:bg-green-600 transition-all cursor-pointer">
                View Products
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;