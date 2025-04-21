import React, { useState, useEffect } from "react";
import TotalProducts from "../Component/TotalProducts";
import TotalBookings from "../Component/TotalBookings";
import TotalVet from "../Component/Vet";
import AddVeterinarians from './../Dashboard/AddVeterinarians';
const AboutUs = () => {
const [happyClientsCount, setHappyClientsCount] = useState(0);
const [productsCount, setProductsCount] = useState(0);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHappyClients = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/reviews/happy-clients"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHappyClientsCount(data.count);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching happy clients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHappyClients();
  }, []);


    if (loading) return <div>Loading happy clients count...</div>;
    if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-4">
        {/* Main content section with improved layout and spacing */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left content area with improved typography and spacing */}
          <div className="w-full md:w-1/2">
            <h5 className="text-green-600 font-medium mb-2 tracking-wider uppercase text-sm">
              About Our Company
            </h5>
            <h2 className="font-bold text-4xl mb-6 text-gray-800">
              Who We Are
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Welcome to Farm Fusion, your ideal destination in the world of
              agriculture and animal production. We are a specialized and
              passionate team providing innovative and comprehensive solutions
              to support farmers and breeders in achieving the highest
              productivity and quality standards.
            </p>

            {/* Services and Vision with improved grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h5 className="text-green-700 font-semibold mb-4">
                  Our Services
                </h5>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Agricultural Production</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Animal Production</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Agricultural Equipment</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Support and Consulting</span>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-green-700 font-semibold mb-4">
                  Our Vision
                </h5>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Global Reach & Expansion</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Industry Leadership</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Sustainable Innovation</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA button with improved styling */}
          </div>

          {/* Right image area with improved styling */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-200 rounded-lg -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-200 rounded-lg -z-10"></div>
              <img
                src="/src/assets/pic/farmfusion7-scaled.webp"
                alt="Farm Fusion Team"
                className="w-full h-auto rounded-lg shadow-xl object-cover border-4 border-green-100"
              />
            </div>
          </div>
        </div>

        {/* Stats section with improved styling */}
        <div className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105 border-t-4 border-green-500">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-green-100 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                </div>
                <h2 className="font-bold text-3xl mb-1 text-gray-800">
                  {happyClientsCount}
                </h2>{" "}
                <p className="text-gray-500 font-medium">Happy Clients</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105 border-t-4 border-green-500">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-green-100 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                  </svg>
                </div>
                <h2 className="font-bold text-3xl mb-1 text-gray-800">
                  <TotalProducts />
                </h2>
                <p className="text-gray-500 font-medium"> Products</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105 border-t-4 border-green-500">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-green-100 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <h2 className="font-bold text-3xl mb-1 text-gray-800">
                  <TotalBookings />
                </h2>{" "}
                <p className="text-gray-500 font-medium">Bookings</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105 border-t-4 border-green-500">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-green-100 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <h2 className="font-bold text-3xl mb-1 text-gray-800">
                  <TotalVet />
                </h2>{" "}
                <p className="text-gray-500 font-medium">Veterinarians</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
