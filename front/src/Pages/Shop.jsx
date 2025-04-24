// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Search,
//   ShoppingCart,
//   X,
//   Plus,
//   Eye,
//   MapPin,
//   Minus,
//   Trash2,
//   Loader2,
//   Filter,
//   Pill,
//   ArrowRight,
//   Info,
//   Star,
//   Package,
// } from "lucide-react";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "../Component/ui/hover-card";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useCart } from "../Component/Shared/CartContext";
// import { Heart as HeartOutline, Heart as HeartFilled } from "lucide-react";
// import { useWishlist } from "../Component/Shared/WishlistContext";

// const Shop = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchParams, setSearchParams] = useSearchParams();
//   const selectedCategory = searchParams.get("category") || "all";
//   const [products, setProducts] = useState([]);
//   const [categoryCounts, setCategoryCounts] = useState({});
//   const [loading, setLoading] = useState(true);
//   const { isInWishlist, toggleWishlist } = useWishlist();

//   const {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     totalItems,
//     cartTotal,
//     showCart,
//     setShowCart,
//   } = useCart();

//   const navigate = useNavigate();

//   const getCategoryIcon = (category) => {
//     const categoryLC = category.toLowerCase();
//     if (categoryLC.includes("vaccine") || categoryLC.includes("vacc")) {
//       return <Pill className="w-4 h-4" />;
//     } else if (
//       categoryLC.includes("medication") ||
//       categoryLC.includes("med")
//     ) {
//       return <Package className="w-4 h-4" />;
//     } else {
//       return <Info className="w-4 h-4" />;
//     }
//   };

//   const handleCategoryChange = (category) => {
//     if (category === "all") {
//       searchParams.delete("category");
//     } else {
//       searchParams.set("category", category);
//     }
//     setSearchParams(searchParams);
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:5000/api/products");
//         setProducts(response.data);

//         const categories = [
//           ...new Set(response.data.map((product) => product.category)),
//         ];
//         setCategoryCounts(
//           categories.reduce((acc, category) => {
//             acc[category] = response.data.filter(
//               (product) => product.category === category
//             ).length;
//             return acc;
//           }, {})
//         );
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = product.name
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchesCategory =
//       selectedCategory === "all" ||
//       product.category.toLowerCase() === selectedCategory.toLowerCase();
//     const isNotDeleted = product.isDeleted === false;
//     return matchesSearch && matchesCategory && isNotDeleted;
//   });

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto p-6 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 mx-auto animate-spin text-green-600" />
//           <p className="mt-4 text-lg text-gray-600">Loading products...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-4 md:p-6 relative bg-gray-50">
//       <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
//         <div className="relative flex-1 max-w-md">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search vaccines, medications..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//           />
//         </div>

//         <div className="flex gap-4">
//           <button
//             onClick={() => setShowCart(true)}
//             className="relative flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-white bg-white shadow-sm"
//           >
//             <ShoppingCart className="w-5 h-5 text-green-600" />
//             <span className="text-gray-700">Cart</span>
//             {totalItems > 0 && (
//               <span className="absolute -top-2 -right-2 bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
//                 {totalItems}
//               </span>
//             )}
//           </button>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         <div className="w-full md:w-64 flex-shrink-0">
//           <div className="sticky top-6 border rounded-lg bg-white p-4 shadow-sm">
//             <div className="mb-4">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold text-lg text-gray-800">
//                   Pet Categories
//                 </h3>
//                 <Filter className="w-5 h-5 text-green-600" />
//               </div>

//               <div className="border-t pt-4">
//                 <div className="space-y-2">
//                   <button
//                     onClick={() => handleCategoryChange("all")}
//                     className={`w-full text-left px-3 py-2 rounded-lg transition ${
//                       selectedCategory === "all"
//                         ? "bg-green-600 text-white"
//                         : "hover:bg-gray-100"
//                     }`}
//                   >
//                     All Products
//                   </button>

//                   {Object.keys(categoryCounts).map((category) => {
//                     const categoryProducts = products.filter(
//                       (product) =>
//                         product.category.toLowerCase() ===
//                           category.toLowerCase() && product.isDeleted === false
//                     );
//                     return (
//                       <button
//                         key={category}
//                         onClick={() => handleCategoryChange(category)}
//                         className={`w-full text-left px-3 py-2 rounded-lg transition flex justify-between items-center ${
//                           selectedCategory === category
//                             ? "bg-green-600 text-white"
//                             : "hover:bg-gray-100"
//                         }`}
//                       >
//                         <div className="flex items-center gap-2">
//                           {getCategoryIcon(category)}
//                           <span className="capitalize">{category}</span>
//                         </div>
//                         <span
//                           className={`text-xs px-2 py-0.5 rounded-full ${
//                             selectedCategory === category
//                               ? "bg-green-500 text-white"
//                               : "bg-gray-100 text-gray-700"
//                           }`}
//                         >
//                           {categoryProducts.length}
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               <div className="border-t mt-4 pt-4">
//                 <button
//                   onClick={() => {
//                     setSearchQuery("");
//                     handleCategoryChange("all");
//                   }}
//                   className="w-full py-2 text-green-600 hover:text-green-700 font-medium"
//                 >
//                   Reset Filters
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex-1">
//           {filteredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {filteredProducts.map((product) => (
//                 <div
//                   key={product._id}
//                   className="bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-shadow relative"
//                 >
//                   <div className="relative h-40 overflow-hidden">
//                     <img
//                       src={`http://localhost:5000${product.image}`}
//                       alt={product.name}
//                       className="w-70 h-50 object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

//                     <button
//                       className="absolute top-2 left-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleWishlist(product);
//                       }}
//                     >
//                       {isInWishlist(product._id) ? (
//                         <HeartFilled className="w-4 h-4 text-red-500 fill-red-500" />
//                       ) : (
//                         <HeartOutline className="w-4 h-4 text-gray-700" />
//                       )}
//                     </button>

//                     <div className="absolute bottom-2 right-2 bg-green-500 text-white font-bold px-2 py-1 rounded text-sm">
//                       {product.price} JD
//                     </div>
//                   </div>

//                   <div className="p-3">
//                     <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">
//                       {product.name}
//                     </h3>

//                     <p className="text-gray-600 text-sm mb-2 line-clamp-2">
//                       {product.description}
//                     </p>

//                     <div className="flex gap-2 mt-2">
//                       <button
//                         onClick={() => addToCart(product)}
//                         className="flex-1 bg-green-600 text-white py-1.5 rounded-lg hover:bg-green-700 flex items-center justify-center gap-1 text-sm"
//                       >
//                         <Plus className="w-3.5 h-3.5" />
//                         Add to Cart
//                       </button>

//                       <button
//                         onClick={() => navigate(`/product/${product._id}`)}
//                         className="px-2 py-1.5 border rounded-lg hover:bg-gray-50"
//                         title="View Details"
//                       >
//                         <Eye className="w-4 h-4 text-gray-600" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16 bg-white rounded-lg shadow-sm">
//               <div className="mx-auto h-20 w-20 text-gray-400 mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   className="w-full h-full"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-medium text-gray-900">
//                 No items found
//               </h3>
//               <p className="mt-2 text-gray-500">
//                 {searchQuery || selectedCategory !== "all"
//                   ? "No items match your search or filter criteria. Please try different keywords or categories."
//                   : "No items available now. Please check back later."}
//               </p>
//               <div className="mt-6">
//                 <button
//                   onClick={() => {
//                     setSearchQuery("");
//                     handleCategoryChange("all");
//                   }}
//                   className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
//                 >
//                   Reset Filters
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {showCart && (
//         <div className="fixed inset-0 z-50 overflow-hidden">
//           <div
//             className="absolute inset-0 backdrop-blur-sm bg-black/30 transition-opacity"
//             onClick={() => setShowCart(false)}
//           ></div>
//           <div className="absolute inset-y-0 right-0 max-w-full flex">
//             <div className="relative w-screen max-w-md">
//               <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
//                 <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
//                   <div className="flex items-start justify-between">
//                     <h2 className="text-lg font-medium text-gray-900">
//                       Shopping Cart
//                     </h2>
//                     <button
//                       type="button"
//                       className="-mr-2 p-2 text-gray-400 hover:text-gray-500"
//                       onClick={() => setShowCart(false)}
//                     >
//                       <X className="h-6 w-6" aria-hidden="true" />
//                     </button>
//                   </div>

//                   <div className="mt-8">
//                     {cartItems.length === 0 ? (
//                       <div className="text-center py-12">
//                         <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
//                         <h3 className="mt-2 text-lg font-medium text-gray-900">
//                           Your cart is empty
//                         </h3>
//                         <p className="mt-1 text-gray-500">
//                           Start adding some items to your cart
//                         </p>
//                         <div className="mt-6">
//                           <button
//                             onClick={() => setShowCart(false)}
//                             className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
//                           >
//                             Continue Shopping
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="flow-root">
//                         <ul className="-my-6 divide-y divide-gray-200">
//                           {cartItems.map((item) => (
//                             <li key={item._id} className="py-6 flex">
//                               <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
//                                 <img
//                                   src={`http://localhost:5000${item.image}`}
//                                   alt={item.name}
//                                   className="w-full h-full object-cover object-center"
//                                 />
//                               </div>

//                               <div className="ml-4 flex-1 flex flex-col">
//                                 <div>
//                                   <div className="flex justify-between text-base font-medium text-gray-900">
//                                     <h3>{item.name}</h3>
//                                     <p className="ml-4">
//                                       {(item.price * item.quantity).toFixed(2)}{" "}
//                                       JD
//                                     </p>
//                                   </div>
//                                   <p className="mt-1 text-sm text-gray-500">
//                                     {item.category}
//                                   </p>
//                                 </div>
//                                 <div className="flex-1 flex items-end justify-between text-sm">
//                                   <div className="flex items-center border rounded-lg">
//                                     <button
//                                       onClick={() =>
//                                         updateQuantity(
//                                           item._id,
//                                           item.quantity - 1
//                                         )
//                                       }
//                                       className="px-3 py-1 text-gray-600 hover:bg-gray-100"
//                                     >
//                                       <Minus className="w-4 h-4" />
//                                     </button>
//                                     <span className="px-3 py-1">
//                                       {item.quantity}
//                                     </span>
//                                     <button
//                                       onClick={() =>
//                                         updateQuantity(
//                                           item._id,
//                                           item.quantity + 1
//                                         )
//                                       }
//                                       className="px-3 py-1 text-gray-600 hover:bg-gray-100"
//                                     >
//                                       <Plus className="w-4 h-4" />
//                                     </button>
//                                   </div>

//                                   <div className="flex">
//                                     <button
//                                       onClick={() => removeFromCart(item._id)}
//                                       type="button"
//                                       className="font-medium text-red-600 hover:text-red-500 flex items-center"
//                                     >
//                                       <Trash2 className="w-4 h-4 mr-1" />
//                                       Remove
//                                     </button>
//                                   </div>
//                                 </div>
//                               </div>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {cartItems.length > 0 && (
//                   <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
//                     <div className="flex justify-between text-base font-medium text-gray-900">
//                       <p>Subtotal</p>
//                       <p>{cartTotal} JD</p>
//                     </div>
//                     <p className="mt-0.5 text-sm text-gray-500">
//                       Shipping and taxes calculated at checkout.
//                     </p>
//                     <div className="mt-6">
//                       <button
//                         onClick={() => {
//                           setShowCart(false);
//                           navigate("/checkout");
//                         }}
//                         className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
//                       >
//                         Checkout
//                       </button>
//                     </div>
//                     <div className="mt-4 flex justify-center text-sm text-gray-500">
//                       <button
//                         onClick={clearCart}
//                         className="text-red-600 hover:text-red-500 font-medium"
//                       >
//                         Clear Cart
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Shop;


import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  ShoppingCart,
  X,
  Plus,
  Eye,
  MapPin,
  Minus,
  Trash2,
  Loader2,
  Filter,
  Pill,
  ArrowRight,
  Info,
  Star,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../Component/ui/hover-card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../Component/Shared/CartContext";
import { Heart as HeartOutline, Heart as HeartFilled } from "lucide-react";
import { useWishlist } from "../Component/Shared/WishlistContext";

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";
  const [products, setProducts] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9); // Show 9 products per page

  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    cartTotal,
    showCart,
    setShowCart,
  } = useCart();

  const navigate = useNavigate();

  const getCategoryIcon = (category) => {
    const categoryLC = category.toLowerCase();
    if (categoryLC.includes("vaccine") || categoryLC.includes("vacc")) {
      return <Pill className="w-4 h-4" />;
    } else if (
      categoryLC.includes("medication") ||
      categoryLC.includes("med")
    ) {
      return <Package className="w-4 h-4" />;
    } else {
      return <Info className="w-4 h-4" />;
    }
  };

  const handleCategoryChange = (category) => {
    if (category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setCurrentPage(1); // Reset to first page when changing category
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);

        const categories = [
          ...new Set(response.data.map((product) => product.category)),
        ];
        setCategoryCounts(
          categories.reduce((acc, category) => {
            acc[category] = response.data.filter(
              (product) => product.category === category
            ).length;
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    const isNotDeleted = product.isDeleted === false;
    return matchesSearch && matchesCategory && isNotDeleted;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto animate-spin text-green-600" />
          <p className="mt-4 text-lg text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 relative bg-gray-50">
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search vaccines, medications..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowCart(true)}
            className="relative flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-white bg-white shadow-sm"
          >
            <ShoppingCart className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-6 border rounded-lg bg-white p-4 shadow-sm">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  Pet Categories
                </h3>
                <Filter className="w-5 h-5 text-green-600" />
              </div>

              <div className="border-t pt-4">
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange("all")}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      selectedCategory === "all"
                        ? "bg-green-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    All Products
                  </button>

                  {Object.keys(categoryCounts).map((category) => {
                    const categoryProducts = products.filter(
                      (product) =>
                        product.category.toLowerCase() ===
                          category.toLowerCase() && product.isDeleted === false
                    );
                    return (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition flex justify-between items-center ${
                          selectedCategory === category
                            ? "bg-green-600 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(category)}
                          <span className="capitalize">{category}</span>
                        </div>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            selectedCategory === category
                              ? "bg-green-500 text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {categoryProducts.length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t mt-4 pt-4">
                <button
                  onClick={() => {
                    setSearchQuery("");
                    handleCategoryChange("all");
                    setCurrentPage(1); // Reset to first page when resetting filters
                  }}
                  className="w-full py-2 text-green-600 hover:text-green-700 font-medium"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-shadow relative"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={`http://localhost:5000${product.image}`}
                        alt={product.name}
                        className="w-70 h-50 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                      <button
                        className="absolute top-2 left-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                      >
                        {isInWishlist(product._id) ? (
                          <HeartFilled className="w-4 h-4 text-red-500 fill-red-500" />
                        ) : (
                          <HeartOutline className="w-4 h-4 text-gray-700" />
                        )}
                      </button>

                      <div className="absolute bottom-2 right-2 bg-green-500 text-white font-bold px-2 py-1 rounded text-sm">
                        {product.price} JD
                      </div>
                    </div>

                    <div className="p-3">
                      <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => addToCart(product)}
                          className="flex-1 bg-green-600 text-white py-1.5 rounded-lg hover:bg-green-700 flex items-center justify-center gap-1 text-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add to Cart
                        </button>

                        <button
                          onClick={() => navigate(`/product/${product._id}`)}
                          className="px-2 py-1.5 border rounded-lg hover:bg-gray-50"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="flex items-center">
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 mr-2 rounded-lg border ${
                        currentPage === 1
                          ? "text-gray-400 border-gray-200 cursor-not-allowed"
                          : "text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex space-x-1">
                      {Array.from({ length: totalPages }).map((_, index) => {
                        // Always show first page, last page, current page, and pages adjacent to current page
                        const pageNumber = index + 1;
                        const isCurrentPage = pageNumber === currentPage;
                        const isFirstPage = pageNumber === 1;
                        const isLastPage = pageNumber === totalPages;
                        const isAdjacentToCurrent =
                          Math.abs(pageNumber - currentPage) <= 1;

                        // Show ellipsis for gaps
                        if (
                          !isFirstPage &&
                          !isLastPage &&
                          !isAdjacentToCurrent &&
                          (pageNumber === 2 || pageNumber === totalPages - 1)
                        ) {
                          return (
                            <span
                              key={`ellipsis-${pageNumber}`}
                              className="px-3 py-1 text-gray-500"
                            >
                              ...
                            </span>
                          );
                        }

                        // Skip non-significant page numbers
                        if (
                          !isFirstPage &&
                          !isLastPage &&
                          !isAdjacentToCurrent
                        ) {
                          return null;
                        }

                        return (
                          <button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber)}
                            className={`px-3 py-1 rounded-lg ${
                              isCurrentPage
                                ? "bg-green-600 text-white"
                                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 ml-2 rounded-lg border ${
                        currentPage === totalPages
                          ? "text-gray-400 border-gray-200 cursor-not-allowed"
                          : "text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </nav>
                </div>
              )}

              {/* Result summary */}
              <div className="mt-4 text-sm text-gray-600 text-center">
                Showing {indexOfFirstProduct + 1} to{" "}
                {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
                {filteredProducts.length} products
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <div className="mx-auto h-20 w-20 text-gray-400 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-full h-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                No items found
              </h3>
              <p className="mt-2 text-gray-500">
                {searchQuery || selectedCategory !== "all"
                  ? "No items match your search or filter criteria. Please try different keywords or categories."
                  : "No items available now. Please check back later."}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSearchQuery("");
                    handleCategoryChange("all");
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 backdrop-blur-sm bg-black/30 transition-opacity"
            onClick={() => setShowCart(false)}
          ></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Shopping Cart
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => setShowCart(false)}
                    >
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-8">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-12">
                        <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">
                          Your cart is empty
                        </h3>
                        <p className="mt-1 text-gray-500">
                          Start adding some items to your cart
                        </p>
                        <div className="mt-6">
                          <button
                            onClick={() => setShowCart(false)}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                          >
                            Continue Shopping
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">
                          {cartItems.map((item) => (
                            <li key={item._id} className="py-6 flex">
                              <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                <img
                                  src={`http://localhost:5000${item.image}`}
                                  alt={item.name}
                                  className="w-full h-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex-1 flex flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{item.name}</h3>
                                    <p className="ml-4">
                                      {(item.price * item.quantity).toFixed(2)}{" "}
                                      JD
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {item.category}
                                  </p>
                                </div>
                                <div className="flex-1 flex items-end justify-between text-sm">
                                  <div className="flex items-center border rounded-lg">
                                    <button
                                      onClick={() =>
                                        updateQuantity(
                                          item._id,
                                          item.quantity - 1
                                        )
                                      }
                                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-3 py-1">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        updateQuantity(
                                          item._id,
                                          item.quantity + 1
                                        )
                                      }
                                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>

                                  <div className="flex">
                                    <button
                                      onClick={() => removeFromCart(item._id)}
                                      type="button"
                                      className="font-medium text-red-600 hover:text-red-500 flex items-center"
                                    >
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {cartItems.length > 0 && (
                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{cartTotal} JD</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={() => {
                          setShowCart(false);
                          navigate("/checkout");
                        }}
                        className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
                      >
                        Checkout
                      </button>
                    </div>
                    <div className="mt-4 flex justify-center text-sm text-gray-500">
                      <button
                        onClick={clearCart}
                        className="text-red-600 hover:text-red-500 font-medium"
                      >
                        Clear Cart
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;