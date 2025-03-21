import React from "react";

const Reviews = () => {
  // Sample data for reviews to make component more dynamic
  const reviewsData = [
    {
      id: 1,
      name: "Marnus Stephen",
      role: "Poultry Farmer",
      image: "/src/assets/pic/User-Icon.jpg",
      text: "We had a great experience collaborating with this team. Their agricultural products significantly improved our farm's productivity. I highly recommend their services!",
      rating: 5,
    },
    {
      id: 2,
      name: "Andrew Jettpace",
      role: "Crop Farmer",
      image: "/src/assets/pic/User-Icon.jpg",
      text: "The team drastically improved our crop yield & increased our business outreach. Their advice on fertilizers and seeds was invaluable for our seasonal planning.",
      rating: 5,
    },
    {
      id: 3,
      name: "Stacy Stone",
      role: "Agricultural Consultant",
      image: "/src/assets/pic/User-Icon.jpg",
      text: "I absolutely loved working with this team. Complete experts at what they do! Their knowledge of modern farming techniques is unmatched in the industry.",
      rating: 4,
    },
  ];

  // Generate star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left side - Text content */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className="flex items-center space-x-2 mb-3">
            <div className="h-1 w-16 bg-blue-600"></div>
            <span className="text-blue-600 font-medium">Customer Feedback</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
            Read what our customers love about us
          </h2>

          <p className="text-gray-600 mb-4">
            Over 200 companies from diverse agricultural sectors consult us to
            enhance their farming practices and boost their productivity.
          </p>

          <p className="text-gray-600 mb-6">
            We have helped farms increase their yield and generate multifold
            revenue with our premium products and expert advice.
          </p>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <div className="text-xl font-bold text-gray-800 mr-2">4.8</div>
              <div className="flex">{renderStars(5)}</div>
              <div className="ml-2 text-sm text-gray-500">
                from 120+ reviews
              </div>
            </div>
          </div>

          <a href="/testimonials" className="inline-block">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-lg">
              Read our success stories
            </button>
          </a>
        </div>

        {/* Right side - Review cards */}
        <div className="lg:col-span-3 space-y-6">
          {reviewsData.map((review, index) => (
            <div
              key={review.id}
              className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${
                index % 3 === 0
                  ? "border-blue-500"
                  : index % 3 === 1
                  ? "border-green-500"
                  : "border-orange-500"
              } hover:shadow-xl transition-all`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">
                        {review.name}
                      </h4>
                      <p className="text-sm text-gray-500">{review.role}</p>
                    </div>
                    <div className="text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mb-3">{renderStars(review.rating)}</div>
                  <p className="text-gray-700">"{review.text}"</p>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-8">
            <button className="px-5 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all">
              View More Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
