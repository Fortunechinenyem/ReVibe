import { useEffect, useState } from "react";
import ProductForm from "@/app/components/ProductForm";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const querySnapshot = await getDocs(collection(db, "reviews"));
      const reviewsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsData);
    };

    fetchReviews();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleApproveReview = async () => {
    try {
      await updateDoc(doc(db, "reviews", reviewId), {
        approved: true,
      });
      alert("Review approved!");
      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId ? { ...review, approved: true } : review
        )
      );
    } catch (error) {
      console.error("Error approving review:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteDoc(doc(db, "reviews", reviewId));
      alert("Review deleted!");
      setReviews((prev) => prev.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <ProductForm onSuccess={fetchProducts} />

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Manage Products</h2>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
            >
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm text-gray-600">N{product.price}</p>
              </div>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Review Moderation</h1>
        {reviews.map((review) => (
          <div key={review.id} className="mb-4 p-4 border rounded-lg">
            <div className="flex items-center mb-2">
              <span className="font-semibold">
                Rating: {review.rating} Stars
              </span>
              {!review.approved && (
                <button
                  onClick={() => handleApproveReview(review.id)}
                  className="ml-4 bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-500"
                >
                  Approve
                </button>
              )}
              <button
                onClick={() => handleDeleteReview(review.id)}
                className="ml-4 bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-500"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
