import React, { useState, useEffect } from "react";

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 3;

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((current) => (current === totalSlides ? 1 : current + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (slideId) => {
    setCurrentSlide(slideId);
  };

  // Slide indicator dots
  const renderDots = () => {
    return (
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index + 1)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index + 1 ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Carousel */}
      <div className="carousel w-full">
        {/* Slide 1 */}
        {currentSlide === 1 && (
          <div id="slide1" className="carousel-item relative w-full">
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <img
              src="/src/assets/pic/pexels-munkhbayar-dambajav-176526124-11122221.jpg"
              className="w-full h-[600px] object-cover"
              alt="Agricultural fields"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-20">
              <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg mb-4">
                Quality Agricultural Solutions
              </h1>
              <p className="text-xl max-w-2xl mx-auto mb-6 drop-shadow-lg">
                Providing farmers with the best products for sustainable growth
              </p>
              <button className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300">
                Explore Products
              </button>
            </div>

            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-20">
              <button
                onClick={() => goToSlide(3)}
                className="btn btn-circle bg-black/30 border-0 text-white hover:bg-black/50"
              >
                ❮
              </button>
              <button
                onClick={() => goToSlide(2)}
                className="btn btn-circle bg-black/30 border-0 text-white hover:bg-black/50"
              >
                ❯
              </button>
            </div>
          </div>
        )}

        {/* Slide 2 */}
        {currentSlide === 2 && (
          <div id="slide2" className="carousel-item relative w-full">
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <img
              src="/src/assets/pic/new headsection.jpg"
              className="w-full h-[600px] object-cover"
              alt="Agricultural equipment"
            />
            {/* Text overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-20">
              <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg mb-4">
                From Farm to Future
              </h1>
              <p className="text-xl max-w-2xl mx-auto mb-6 drop-shadow-lg">
                Modern solutions for traditional farming challenges
              </p>
              <button className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300">
                Shop Now
              </button>
            </div>

            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-20">
              <button
                onClick={() => goToSlide(1)}
                className="btn btn-circle bg-black/30 border-0 text-white hover:bg-black/50"
              >
                ❮
              </button>
              <button
                onClick={() => goToSlide(3)}
                className="btn btn-circle bg-black/30 border-0 text-white hover:bg-black/50"
              >
                ❯
              </button>
            </div>
          </div>
        )}

        {/* Slide 3 */}
        {currentSlide === 3 && (
          <div id="slide3" className="carousel-item relative w-full">
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <img
              src="/src/assets/pic/HEADDD.webp"
              className="w-full h-[600px] object-cover"
              alt="Poultry farming"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-20">
              <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg mb-4">
                Complete Poultry Solutions
              </h1>
              <p className="text-xl max-w-2xl mx-auto mb-6 drop-shadow-lg">
                Vaccines, equipment, and expertise for optimal poultry farming
              </p>
              <button className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300">
                View Solutions
              </button>
            </div>

            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-20">
              <button
                onClick={() => goToSlide(2)}
                className="btn btn-circle bg-black/30 border-0 text-white hover:bg-black/50"
              >
                ❮
              </button>
              <button
                onClick={() => goToSlide(1)}
                className="btn btn-circle bg-black/30 border-0 text-white hover:bg-black/50"
              >
                ❯
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Slide indicator dots */}
      {renderDots()}
    </div>
  );
}

export default Carousel;
