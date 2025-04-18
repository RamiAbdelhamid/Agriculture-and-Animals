import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Star,
  Heart,
  Share2,
  ArrowRight,
  Facebook,
  Instagram,
  MessageSquare,
} from "lucide-react";
import axios from "axios";
import { Heart as HeartOutline, Heart as HeartFilled } from "lucide-react";
import { useWishlist } from "../Component/Shared/WishlistContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [showShareOptions, setShowShareOptions] = useState(false);

  const [cart, setCart] = useState(() => {
    // Initialize cart with localStorage value if exists
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  // إنشاء رابط المشاركة
  const productUrl = `${window.location.origin}/products/${id}`;
  const shareMessage = `Check out this product: ${product?.name} - ${productUrl}`;

  // وظائف المشاركة على المنصات المختلفة
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        productUrl
      )}`,
      "_blank"
    );
    setShowShareOptions(false);
  };

  const shareOnWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
      "_blank"
    );
    setShowShareOptions(false);
  };

  const shareOnInstagram = () => {
    // Instagram doesn't have a direct sharing API for web, so we'll open the app or website
    window.open(
      `https://www.instagram.com/?url=${encodeURIComponent(productUrl)}`,
      "_blank"
    );
    setShowShareOptions(false);
  };

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(response.data);

        // Fetch related products from the same category
        if (response.data.category) {
          const relatedResponse = await axios.get(
            `http://localhost:5000/api/products?category=${response.data.category}&limit=4`
          );
          // Filter out the current product
          setRelatedProducts(
            relatedResponse.data.filter((item) => item.id !== response.data.id)
          );
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    fetchProductDetails();
  }, [id]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Check if product is already in cart
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // Update quantity if already in cart
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // Add new item to cart
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity,
        },
      ]);
    }

    // Open cart drawer
    setCartOpen(true);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setCart(
      cart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate total price
  const cartTotal = cart
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 p-6 bg-red-50 text-red-500 rounded-lg">
        <p className="text-lg font-semibold">Error loading product</p>
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-10 text-red-500">Product not found!</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Products
      </button>

      {/* Product Details Section */}
      <div className="bg-white rounded-xl overflow-hidden shadow-md mb-8">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Product Image */}
          <div className="lg:w-1/2 bg-gray-50">
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              className="w-full h-full object-contain max-h-96 lg:max-h-full"
            />
          </div>

          {/* Right Side - Product Information */}
          <div className="lg:w-1/2 p-6 flex flex-col">
            <div>
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                <div className="flex gap-2">
                  {/* زر القلب */}
                  <div>
                    {/* زر القلب */}
                    <button
                      className="p-2 rounded-full hover:bg-gray-100"
                      onClick={() => toggleWishlist(product)}
                    >
                      {isInWishlist(product._id) ? (
                        <HeartFilled className="w-5 h-5 text-red-500 fill-red-500" />
                      ) : (
                        <HeartOutline className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <button
                      className="p-2 rounded-full hover:bg-gray-100"
                      onClick={() => setShowShareOptions(!showShareOptions)}
                    >
                      <Share2 className="w-5 h-5 text-gray-500" />
                    </button>

                    {showShareOptions && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                        <button
                          onClick={shareOnFacebook}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                          Share on Facebook
                        </button>
                        <button
                          onClick={shareOnWhatsApp}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <MessageSquare className="w-4 h-4 mr-2 text-green-500" />
                          Share on WhatsApp
                        </button>
                        <button
                          onClick={shareOnInstagram}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <Instagram className="w-4 h-4 mr-2 text-pink-500" />
                          Share on Instagram
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            

              {/* Price */}
              <div className="mb-6">
                <p className="text-3xl font-bold text-green-600">
                  {product.price} JD
                </p>
                {product.oldPrice && (
                  <p className="text-sm text-gray-500 line-through">
                    {product.oldPrice} JD
                  </p>
                )}
              </div>

              {/* Quick Details */}
              <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="font-medium">{product.category}</p>
                </div>
                <div>
                  <p className="text-gray-500">Availability</p>
                  <p className="font-medium text-green-500">In Stock</p>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-gray-700 mb-6">{product.description}</p>
            </div>

            {/* Add to Cart Section */}
            <div className="mt-auto">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {/* Add to Cart Button */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-white rounded-xl shadow-md mb-8 overflow-hidden">
        <div className="border-b">
          <div className="flex">
            {["description", "details", "reviews"].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-4 font-medium capitalize ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "description" && (
            <div>
              <p className="text-gray-700">{product.description}</p>
            </div>
          )}

          {activeTab === "details" && (
            <div>
              <p className="text-gray-700">
                {product.details ||
                  "No detailed specifications available for this product."}
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <p className="text-gray-700">Customer reviews coming soon.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Related Products</h3>
            <button className="text-blue-600 flex items-center gap-1 hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.slice(0, 4).map((related) => (
              <div
                key={related.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-40 bg-gray-50">
                  <img
                    src={`http://localhost:5000${related.image}`}
                    alt={related.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-medium mb-1 truncate">{related.name}</h4>
                  <p className="text-blue-600 font-semibold">
                    {related.price} JD
                  </p>
                  <button
                    onClick={() => navigate(`/products/${related.id}`)}
                    className="mt-2 w-full py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-bold">Your Cart ({cart.length})</h3>
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <div className="w-20 h-20 bg-gray-50 rounded">
                      <img
                        src={`http://localhost:5000${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-blue-600">{item.price} JD</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() =>
                            updateCartItemQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateCartItemQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal:</span>
                <span className="font-bold">{cartTotal} JD</span>
              </div>
              <button
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
              <button
                className="w-full mt-2 bg-gray-100 py-3 rounded-md hover:bg-gray-200 transition-colors font-medium"
                onClick={() => setCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cart Toggle Button */}

      {/* Background Overlay for Cart */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setCartOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ProductDetails;
