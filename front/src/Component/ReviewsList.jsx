// // components/ReviewsList.js
// import React from "react";
// import { Star, Trash2, Edit } from "lucide-react";
// import axios from "axios";

// const ReviewsList = ({ reviews, currentUserId, onReviewDeleted }) => {
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const handleDeleteReview = async (reviewId) => {
//     if (!window.confirm("Are you sure you want to delete this review?")) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       await axios.delete(`/api/reviews/${reviewId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (onReviewDeleted) {
//         onReviewDeleted(reviewId);
//       }
//     } catch (error) {
//       console.error("Error deleting review:", error);
//       alert("Failed to delete review");
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {reviews.map((review) => (
//         <div key={review._id} className="border-b pb-6">
//           <div className="flex items-start justify-between">
//             <div className="flex items-center mb-2">
//               <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
//                 <img
//                   src={review.userAvatar}
//                   alt={review.userName}
//                   className="h-full w-full object-cover"
//                   onError={(e) => {
//                     e.target.src = "/images/default-avatar.png";
//                   }}
//                 />
//               </div>
//               <div>
//                 <h4 className="font-medium">{review.userName}</h4>
//                 <div className="flex items-center">
//                   <div className="flex mr-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Star
//                         key={star}
//                         className={`w-4 h-4 ${
//                           review.rating >= star
//                             ? "text-yellow-400 fill-yellow-400"
//                             : "text-gray-300"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-xs text-gray-500">
//                     {formatDate(review.createdAt)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {currentUserId === review.user && (
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handleDeleteReview(review._id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             )}
//           </div>

//           <p className="text-gray-700 mt-2">{review.comment}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ReviewsList;

// components/ReviewsList.js
import React, { useState } from "react";
import { Star, Trash2, Edit } from "lucide-react";
import axios from "axios";

const ReviewsList = ({ reviews, currentUserId, onReviewDeleted, onReviewUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setSuccess("Review deleted successfully");
      if (onReviewDeleted) {
        onReviewDeleted(reviewId);
      }

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error("Error deleting review:", error);
      let errorMessage = "Failed to delete review";
      if (error.response) {
        errorMessage = error.response.data.message || 
                      error.response.data.error || 
                      `Server responded with ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "No response received from server";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEditReview = (review) => {
    setEditingId(review._id);
    setEditedComment(review.comment);
  };

  const handleUpdateReview = async (reviewId) => {
    if (!editedComment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(
        `http://localhost:5000/api/reviews/${reviewId}`,
        { comment: editedComment },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Review updated successfully");
      setEditingId(null);

      if (onReviewUpdated) {
        // تأكد من تحديث البيانات بشكل صحيح
        onReviewUpdated({
          ...response.data,
          _id: reviewId, // تأكد من وجود المعرف
          user: {
            _id: currentUserId, // أو أي طريقة يتم بها تخزين معرف المستخدم
          },
        });
      }

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      // ... كود معالجة الأخطاء الحالي
    } finally {
      setLoading(false);
    }
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 1: return "Poor";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Very Good";
      case 5: return "Excellent";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">{error}</div>
      )}

      {success && (
        <div className="mb-4 bg-green-100 text-green-700 p-3 rounded">
          {success}
        </div>
      )}

      {reviews.map((review) => (
        <div key={review._id} className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-center mb-2">
              <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                <img
                  src={
                    review.userAvatar
                      ? `http://localhost:5000${review.userAvatar}`
                      : "../assets/pic/User-Icon.jpg"
                  }
                  alt={review.userName}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "/images/default-avatar.png";
                  }}
                />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">{review.userName}</h4>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          review.rating >= star
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    {getRatingText(review.rating)} •{" "}
                    {formatDate(review.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            {console.log(
              "currentUserId:",
              currentUserId,
              "review.user:",
              review.user
            )}

            {currentUserId === review.user._id && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditReview(review)}
                  className="text-blue-500 hover:text-blue-700"
                  disabled={loading}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteReview(review._id)}
                  className="text-red-500 hover:text-red-700"
                  disabled={loading}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {editingId === review._id ? (
            <div className="mt-3">
              <textarea
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => setEditingId(null)}
                  className="px-3 py-1 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateReview(review._id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 mt-3 pl-1">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;