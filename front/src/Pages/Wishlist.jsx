import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart as HeartFilled } from "lucide-react";
import { useWishlist } from "../Component/Shared/WishlistContext";
import { useCart } from "../Component/Shared/CartContext";

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const moveToCart = (product) => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        <span className="text-gray-500">({wishlist.length} items)</span>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <HeartFilled className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">
            Save your favorite items here to view them later
          </p>
          <Link
            to="/Shop"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gray-50 relative">
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                  onClick={() => navigate(`/products/${product._id}`)}
                  style={{ cursor: "pointer" }}
                />
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                >
                  {isInWishlist(product._id) ? (
                    <HeartFilled className="w-5 h-5 text-red-500 fill-red-500" />
                  ) : (
                    <HeartOutline className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
              <div className="p-4">
                <h3
                  className="font-medium mb-1 truncate hover:text-blue-600 cursor-pointer"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  {product.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  {product.price} JD
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => moveToCart(product)}
                    className="flex-1 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
