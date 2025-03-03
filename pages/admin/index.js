import { useEffect, useState } from "react";
import ProductForm from "@/app/components/ProductForm";

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
      try {
        const res = await fetch("/api/reviews?status=pending");
        const data = await res.json();
        console.log("API Response:", data);
        setReviews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      }
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

  const handleApproveReview = async (id) => {
    try {
      const res = await fetch(`/api/reviews/${id}/approve`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to approve review");
      setReviews((prev) => prev.filter((review) => review.id !== id));
    } catch (error) {
      console.error("Error approving review:", error);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete review");
      setReviews((prev) => prev.filter((review) => review.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    // fetchReviews();
  }, []);
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

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Review Moderation</h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
            >
              <div>
                <h3 className="text-lg font-semibold">{review.user}</h3>
                <p className="text-sm text-gray-600">
                  Rating: {review.rating}/5
                </p>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleApproveReview(review.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
