import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, Search, Filter, ChevronRight } from "lucide-react";

// Category images (placeholder paths - replace with your actual image paths)
const categoryImages = {
  "Live vaccines": "../../src/assets/pic/cat3.b197b0.webp",
  Vitamins: "../../src/assets/pic/cat4-1.b197b0.webp",
  Disinfectants: "../../src/assets/pic/cat5.b197b0.webp",
  Fertilizers: "../../src/assets/pic/سماد.jpg",
  Seeds: "../../src/assets/pic/بذور زراعية.jpg",
  Equipment: "../../src/assets/pic/معدات زراعية.webp",
};

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryCounts, setCategoryCounts] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");

        // تصفية المنتجات التي لم يتم حذفها
        const activeProducts = response.data.filter(
          (product) => product.isDeleted === false
        );
        setProducts(activeProducts);

        // حساب عدد المنتجات في كل فئة
        const counts = activeProducts.reduce((acc, product) => {
          const category = product.category;
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        // حساب مجموع المنتجات في "Live vaccines" (يشمل "Cow" و "Live vaccines" و "Sheep")
        const liveVaccinesCount =
          (activeProducts.filter(
            (product) => product.category.toLowerCase() === "cow"
          ).length || 0) +
          (activeProducts.filter(
            (product) => product.category.toLowerCase() === "horse"
          ).length || 0) +
          (activeProducts.filter(
            (product) => product.category.toLowerCase() === "sheep"
          ).length || 0) +
          (activeProducts.filter(
            (product) => product.category.toLowerCase() === "pets"
          ).length || 0) +
          (activeProducts.filter(
            (product) => product.category.toLowerCase() === "poultry"
          ).length || 0);

        // تحديث "Live vaccines" ليكون مجموع الفئات الثلاث
        counts["Live vaccines"] = liveVaccinesCount;

        setCategoryCounts(counts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    {
      name: "Live vaccines",
      description: "Essential vaccines for livestock and poultry",
    },
    {
      name: "Vitamins",
      description: "Nutritional supplements for animal health",
    },
    {
      name: "Disinfectants",
      description: "Professional-grade hygiene solutions",
    },
    {
      name: "Fertilizers",
      description: "Organic and synthetic crop nutrition",
    },
    {
      name: "Seeds",
      description: "High-yield crop varieties",
    },
    {
      name: "Equipment",
      description: "Advanced agricultural machinery",
    },
  ].map((category) => ({
    ...category,
    items: categoryCounts[category.name] || 0,
  }));

  // Filter categories based on search term
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-green-50 min-h-screen p-6">
      {/* Search Input */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Link
            key={category.name}
            to={
              category.name === "Live vaccines"
                ? "http://localhost:5173/Livevacc"
                : category.name === "Vitamins"
                ? "http://localhost:5173/VitaminsPage"
                : `/shop/${category.name.toLowerCase().replace(/\s+/g, "-")}`
            }
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
          >
            {/* Category Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={categoryImages[category.name]}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity"></div>
            </div>

            {/* Category Details */}
            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-green-800">
                  {category.name}
                </h2>
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full font-bold">
                  {category.items} Items
                </span>
              </div>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-green-700 font-semibold hover:text-green-900">
                  View Category
                </span>
                <ChevronRight
                  className="text-green-500 group-hover:translate-x-1 transition-transform"
                  size={24}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results Handling */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            No categories found matching your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default Shop;
