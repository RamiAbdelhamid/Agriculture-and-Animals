

import Navbar from "../Component/Shared/Navbar";
import CategoryCards from "../Component/HomeComponent/Category";
import ThymeCrop from "../Component/HomeComponent/ThymeCrop";
import ChickenSection from "../Component/HomeComponent/ChickenSection";
import Reviews from "../Component/HomeComponent/Reviews";
import Carousel from "../Component/HomeComponent/Carousel";
import Footer from "../Component/Shared/Footer";
import { useRef } from "react";

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
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            How We Help
          </span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2">
            Our Agricultural Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            From consultation to implementation, we provide comprehensive
            support for your farming needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Farm Consultation
            </h3>
            <p className="text-gray-600">
              Expert advice on farm management, crop selection, and livestock
              breeding from our experienced agricultural specialists
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
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
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Equipment Rental
            </h3>
            <p className="text-gray-600">
              Access to high-quality agricultural equipment without the initial
              investment, perfect for seasonal operations
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
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
        </div>
      </section>

      {/* NEW: Latest News & Agricultural Tips */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">
            Stay Informed
          </span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2">
            Latest Agricultural News
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Updates on agricultural practices, market trends, and seasonal tips
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-gray-300">
              <div className="h-full w-full flex items-center justify-center text-gray-500">
                <span>Farm Image</span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-emerald-600 text-sm font-semibold">
                April 2, 2025
              </p>
              <h3 className="text-xl font-bold text-gray-800 mt-2 mb-3">
                Sustainable Farming Practices for Long-term Soil Health
              </h3>
              <p className="text-gray-600 mb-4">
                Discover how implementing regenerative agriculture techniques
                can improve soil quality and crop yields over time...
              </p>
              <a
                href="/blog/sustainable-farming"
                className="text-emerald-600 font-semibold hover:text-emerald-700"
              >
                Read More →
              </a>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-gray-300">
              <div className="h-full w-full flex items-center justify-center text-gray-500">
                <span>Cattle Image</span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-emerald-600 text-sm font-semibold">
                March 28, 2025
              </p>
              <h3 className="text-xl font-bold text-gray-800 mt-2 mb-3">
                Cattle Nutrition: Optimizing Feed for Better Production
              </h3>
              <p className="text-gray-600 mb-4">
                Learn about the latest research in cattle nutrition and how
                adjusting feed composition can lead to healthier animals...
              </p>
              <a
                href="/blog/cattle-nutrition"
                className="text-emerald-600 font-semibold hover:text-emerald-700"
              >
                Read More →
              </a>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-gray-300">
              <div className="h-full w-full flex items-center justify-center text-gray-500">
                <span>Technology Image</span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-emerald-600 text-sm font-semibold">
                March 15, 2025
              </p>
              <h3 className="text-xl font-bold text-gray-800 mt-2 mb-3">
                Smart Farming: How Technology is Transforming Agriculture
              </h3>
              <p className="text-gray-600 mb-4">
                Explore the latest technological advancements helping farmers
                increase efficiency and reduce environmental impact...
              </p>
              <a
                href="/blog/smart-farming"
                className="text-emerald-600 font-semibold hover:text-emerald-700"
              >
                Read More →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Partners & Suppliers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-gray-600 font-semibold text-sm uppercase tracking-wider">
              Trusted By
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              Our Partners & Suppliers
            </h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 max-w-4xl mx-auto">
            {/* Partner logos */}
            <div className="w-32 h-16 bg-white shadow-sm rounded flex items-center justify-center">
              <img
                src="../../src/assets/pic/AWP-Animal-Wellness-Product-Logo.svg"
                alt="Partner 1"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-32 h-16 bg-white shadow-sm rounded flex items-center justify-center">
              <img
                src="../../src/assets/pic/biochem-logo-white.svg"
                alt="Partner 2"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-32 h-16 bg-white shadow-sm rounded flex items-center justify-center">
              <img
                src="../../src/assets/pic/logo (1).png"
                alt="Partner 3"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-32 h-16 bg-white shadow-sm rounded flex items-center justify-center">
              <img
                src="../../src/assets/pic/logo-fatro.png"
                alt="Partner 4"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-32 h-16 bg-white shadow-sm rounded flex items-center justify-center">
              <img
                src="../../src/assets/pic/Sut-Sagim-Makineleri2.png"
                alt="Partner 5"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-32 h-16 bg-white shadow-sm rounded flex items-center justify-center">
              <img
                src="../../src/assets/pic/LOGO_CEVA_SANTE_ANIMALE.webp"
                alt="Partner 6"
                className="w-full h-full object-contain"
              />
            </div>
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
            <a href="/contact">
              {" "}
              <button className="px-8 py-3 bg-white text-green-700 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all cursor-pointer">
                Contact Us
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