import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  ShoppingCart,
  X,
  Plus,
  Eye,
  MapPin,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../Component/ui/hover-card";
import { useNavigate } from "react-router-dom";

const Livevacc = () => {
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const navigate = useNavigate();

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Add to cart with quantity
  const addToCart = (product) => {
    // Check if product already exists in cart
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Update quantity if product exists
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new product with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Filtered products based on search and category
  // Filtered products based on search and category
const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(searchQuery.toLowerCase());
  const matchesCategory =
    selectedCategory === "all" ||
    product.category.toLowerCase() === selectedCategory.toLowerCase();
  return matchesSearch && matchesCategory;
});


  // Calculate total items in cart (counting quantities)
  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  // Calculate total price in cart
  const cartTotal = cartItems
    .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    .toFixed(2);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header with Search and Cart */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search vaccines, medications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>

          <button
            onClick={() => setShowCart(!showCart)}
            className="relative flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <ShoppingCart className="w-5 h-5" />
            Cart
            {totalItemsInCart > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                {totalItemsInCart}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-8 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-4">Animal Categories</h3>
          <div className="flex flex-wrap gap-4">
            {["all", "chicken", "cow", "horse", "sheep", "pets"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    selectedCategory === category
                      ? "bg-green-600 text-white"
                      : "bg-white border hover:bg-gray-50"
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-6 z-50 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button onClick={() => setShowCart(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.price} JD</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, (item.quantity || 1) - 1)
                          }
                          className="w-8 h-8 border rounded-l-lg flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-10 h-8 border-t border-b flex items-center justify-center">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, (item.quantity || 1) + 1)
                          }
                          className="w-8 h-8 border rounded-r-lg flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="self-end mt-2 text-gray-700 font-medium">
                    Subtotal: {((item.quantity || 1) * item.price).toFixed(2)}{" "}
                    JD
                  </p>
                </div>
              ))}
              <div className="pt-4 border-t">
                <p className="font-semibold text-lg">Total: {cartTotal} JD</p>
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <HoverCard key={product.id} openDelay={200} closeDelay={100}>
            <HoverCardTrigger>
              <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <div className="relative">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center mb-3 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {product.location || "Nationwide Delivery"}
                  </div>
                  <p className="text-green-600 font-semibold mb-4">
                    {product.price} JD
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </HoverCardTrigger>
            {/* <HoverCardContent className="w-80 p-4 z-50 absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border shadow-lg rounded-lg transition-all opacity-0 hover:opacity-100">
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">{product.name}</h4>

                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {product.location || "Available in your region"}
                  </span>
                </div>

                <p className="text-sm">
                  {product.details || product.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Dosage:</span>
                    <p>{product.dosage || "See product details"}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Storage:</span>
                    <p>{product.storage || "Room temperature"}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Application:</span>
                    <p>{product.application || "Professional use"}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Stock:</span>
                    <p className="text-green-600">
                      {product.stock || "In stock"}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  {product.tags &&
                    product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            </HoverCardContent> */}
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default Livevacc;
