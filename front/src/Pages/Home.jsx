import Navbar from "../Component/Shared/Navbar";
import CategoryCards from "../Component/HomeComponent/Category";
import ThymeCrop from "../Component/HomeComponent/ThymeCrop";
import ChickenSection from "../Component/HomeComponent/ChickenSection";
import Reviews from "../Component/HomeComponent/Reviews";
import Carousel from "../Component/HomeComponent/Carousel";
import Footer from "../Component/Shared/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
  

      {/* Hero Section with Carousel */}
      <section className="relative">
        <Carousel />
      </section>

      {/* Categories Section with improved spacing */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Our Product Categories
          </h2>
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

      {/* Customer Reviews Section with improved background */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mt-2">
              What Our Customers Say
            </h2>
          </div>
          <Reviews />
        </div>
      </section>

      {/* Call to Action Section - New Addition */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Grow with Us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with our experts to find the best agricultural solutions for
            your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-green-700 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all">
              Contact Us
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white rounded-lg font-bold text-lg hover:bg-green-600 transition-all">
              View Products
            </button>
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default Home;
