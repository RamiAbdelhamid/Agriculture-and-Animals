import React from "react";

const ThymeCrop = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 px-4 lg:px-8 py-12">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-full h-full bg-green-200 rounded-xl z-0"></div>
          <img
            src="/src/assets/pic/زعتر.jpg"
            alt="Thyme Crop"
            className="rounded-xl shadow-lg w-full max-w-lg object-cover z-10 relative"
          />
          <div className="absolute -bottom-6 -right-6 bg-green-700 text-white p-4 rounded-lg shadow-lg z-20">
            <span className="block text-xl font-bold">100% Organic</span>
            <span className="text-sm">Grown Naturally</span>
          </div>
        </div>
      </div>

      {/* Text and Content */}
      <div className="w-full lg:w-1/2 order-1 lg:order-2">
        <div className="flex items-center space-x-2 mb-2">
          <div className="h-1 w-16 bg-green-600"></div>
          <span className="text-green-600 font-medium">Featured Product</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-500 mb-6">
          Our Premium Thyme Crop
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Discover the goodness and creativity of nature with our harvest of
          authentic local thyme carefully grown in an ideal natural environment.
          Our thyme is distinguished by its fragrant aroma and strong flavor
          that adds an exceptional touch to your recipes.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          It is grown using sustainable agricultural methods that ensure high
          quality and complete purity, making it the perfect choice for cooking,
          herbal tea, or traditional medicinal uses.
        </p>

        {/* Benefits */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-start space-x-2">
            <div className="mt-1 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">100% Organic</h4>
              <p className="text-sm text-gray-600">
                No chemicals or pesticides
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="mt-1 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Rich Flavor</h4>
              <p className="text-sm text-gray-600">Aromatic and potent</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="mt-1 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Health Benefits</h4>
              <p className="text-sm text-gray-600">Rich in essential oils</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="mt-1 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Sustainable</h4>
              <p className="text-sm text-gray-600">Eco-friendly farming</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4">
          <a href="/Shop?category=Vitamins" className="w-full lg:w-auto">
            <button className="px-6 py-3 text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 font-medium cursor-pointer">
              Explore Our Organic Products
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThymeCrop;
