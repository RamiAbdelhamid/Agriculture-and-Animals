import React from "react";

const ChickenSection = () => {
  return (
    <div className="py-12 px-4">
      {/* Header Section with Improved Styling */}
      <div className="relative mb-16 rounded-xl overflow-hidden">
        <img
          src="/src/assets/pic/ch.png"
          alt="Broiler Farming"
          className="w-full h-64 lg:h-96 object-cover rounded-xl shadow-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 lg:p-10 text-white max-w-2xl">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">
            Premium Broiler Solutions
          </h2>
          <p className="text-lg text-gray-200">
            Comprehensive care from day one to market-ready birds
          </p>
        </div>
      </div>

      {/* Main Content with New Layout */}
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Text Content */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="h-1 w-16 bg-orange-500"></div>
              <span className="text-orange-500 font-medium">
                Poultry Excellence
              </span>
            </div>

            <p className="text-xl font-semibold text-gray-800 leading-relaxed mb-6">
              We offer you the best{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">
                broiler farming solutions
              </span>{" "}
              that guarantee you high productivity and unmatched quality! We
              take care of every detail to ensure the health of the poultry and
              their rapid growth.
            </p>

            <h3 className="text-2xl font-bold text-orange-600 mb-4">
              Why Choose Our Services?
            </h3>

            {/* Benefits Cards */}
            <div className="space-y-4 mb-8">
              <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500 hover:shadow-md transition-all">
                <div className="flex items-start">
                  <div className="bg-orange-100 p-2 rounded-full text-orange-600 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Integrated Care</h4>
                    <p className="text-gray-600">
                      Balanced feeding & comprehensive vaccination programs
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500 hover:shadow-md transition-all">
                <div className="flex items-start">
                  <div className="bg-orange-100 p-2 rounded-full text-orange-600 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Advanced Vitamins
                    </h4>
                    <p className="text-gray-600">
                      Fortified products ensure rapid growth & excellent
                      performance
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500 hover:shadow-md transition-all">
                <div className="flex items-start">
                  <div className="bg-orange-100 p-2 rounded-full text-orange-600 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      High Productivity
                    </h4>
                    <p className="text-gray-600">
                      Optimal care leads to better meat quality & weight gain
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500 hover:shadow-md transition-all">
                <div className="flex items-start">
                  <div className="bg-orange-100 p-2 rounded-full text-orange-600 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Healthy Environment
                    </h4>
                    <p className="text-gray-600">
                      Clean & well-maintained poultry farming conditions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <a href="/shop">
              <button className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-300 font-medium cursor-pointer">
                Explore Poultry Solutions
              </button>
            </a>
          </div>

          {/* Right Column - Gallery with Improved Layout */}
          <div className="grid grid-cols-12 grid-rows-6 gap-3 h-full">
            <div className="col-span-12 row-span-3 rounded-lg shadow-lg overflow-hidden">
              <img
                src="/src/assets/pic/صيصان.png"
                alt="Chicks"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="col-span-6 row-span-3 rounded-lg shadow-lg overflow-hidden">
              <img
                src="/src/assets/pic/نجارة.jpeg"
                alt="Wood Shavings"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="col-span-6 row-span-3 rounded-lg shadow-lg overflow-hidden">
              <img
                src="/src/assets/pic/جاج 30.jpg"
                alt="Broiler Chicken"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - New Addition */}
      <div className="mt-16 bg-gradient-to-r from-orange-50 to-yellow-50 py-10 px-6 rounded-xl shadow-sm">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-orange-700">
            Our Poultry Success
          </h3>
          <p className="text-gray-600">
            Real results from our integrated approach
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold text-orange-600">98%</div>
            <div className="text-gray-700 font-medium mt-1">Survival Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-600">25%</div>
            <div className="text-gray-700 font-medium mt-1">Faster Growth</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-600">2.5kg</div>
            <div className="text-gray-700 font-medium mt-1">Average Weight</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-600">45+</div>
            <div className="text-gray-700 font-medium mt-1">Happy Farmers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChickenSection;
