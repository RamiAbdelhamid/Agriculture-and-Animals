// components/ReviewForm.js
import React, { useState } from "react";
import { Star } from "lucide-react";
import axios from "axios";

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // In ReviewForm.js
const handleSubmit = async (e) => {
  e.preventDefault();

  if (rating === 0) {
    setError("Please select a rating");
    return;
  }

  if (comment.trim().length < 2) {
    setError("Review must be at least 2 characters");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await axios.post(
      `http://localhost:5000/api/reviews/product/${productId}`,
      { rating, comment },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setSuccess(true);
    setComment("");
    setRating(0);

    if (onReviewAdded) {
      // تأكد من أن البيانات المرسلة تحتوي على user._id وليس فقط user
      onReviewAdded({
        ...response.data,
        user: {
          _id: response.data.user, // أو أي طريقة يتم بها تخزين معرف المستخدم في الاستجابة
        },
      });
    }

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  } catch (err) {
    // ... كود معالجة الأخطاء الحالي
  } finally {
    setLoading(false);
  }
};  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      {success && (
        <div className="mb-4 bg-green-100 text-green-700 p-3 rounded">
          Your review has been submitted successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Your Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none"
                onMouseEnter={() => setTempRating(star)}
                onMouseLeave={() => setTempRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`w-6 h-6 ${
                    (tempRating || rating) >= star
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm text-gray-600">
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Your Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Share your experience with this product..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
