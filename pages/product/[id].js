import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const res = await fetch(`/api/products/${id}`);
          const data = await res.json();

          if (res.ok) {
            setProduct(data);
          } else {
            console.error("Product not found");
            router.push("/404");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };

    fetchProduct();
  }, [id, router]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (id) {
        const q = query(
          collection(db, "reviews"),
          where("productId", "==", id),
          where("approved", "==", true)
        );
        const querySnapshot = await getDocs(q);
        const reviewsData = querySnapshot.docs.map((doc) => doc.data());
        setReviews(reviewsData);

        if (reviewsData.length > 0) {
          const totalRating = reviewsData.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          setAverageRating((totalRating / reviewsData.length).toFixed(1));
        }
      }
    };

    fetchReviews();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-96">
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600 text-2xl">₦{product.price}</p>
            <p className="text-gray-500 mt-4">{product.description}</p>

            <button
              className="bg-purple-600 text-white px-6 py-2 rounded-lg text-center hover:bg-purple-500 transition duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

            <div className="mt-9 text-center">
              <h3 className="text-xl font-bold">Customer Reviews</h3>
              <div className="mb-4">
                <span className="text-lg font-semibold">Average Rating:</span>
                <span className="ml-2">{averageRating} / 5</span>
              </div>
            </div>

            {reviews.length === 0 ? (
              <p>No reviews yet. Be the first to leave one!</p>
            ) : (
              reviews.map((review, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold">
                      Rating: {review.rating} Stars
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))
            )}

            {user && (
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
                <ReviewForm productId={id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewForm({ productId }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in to leave a review.");
      return;
    }

    if (rating === 0 || !comment.trim()) {
      alert("Please provide a rating and comment.");
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, "reviews"), {
        productId,
        userId: user.uid,
        rating,
        comment,
        approved: false,
        createdAt: new Date().toISOString(),
      });

      alert("Thank you for your review! It will be visible after approval.");
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-2 border rounded-lg"
          required
        >
          <option value={0}>Select a rating</option>
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded-lg"
          rows="4"
          required
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
