import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductForm from "@/app/components/ProductForm";
import { FaTrash, FaCheck, FaTimes } from "react-icons/fa"; // Icons for actions
import ConfirmationDialog from "@/app/components/ConfirmationDialog"; // Custom confirmation dialog
import Navbar from "@/app/components/Navbar";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionType, setActionType] = useState(""); // "deleteProduct", "deleteReview", "approveReview"

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "reviews"));
      const reviewsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
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
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleApproveReview = async (reviewId) => {
    try {
      await updateDoc(doc(db, "reviews", reviewId), {
        approved: true,
      });
      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId ? { ...review, approved: true } : review
        )
      );
    } catch (error) {
      console.error("Error approving review:", error);
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteDoc(doc(db, "reviews", reviewId));
      setReviews((prev) => prev.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    } finally {
      setShowConfirmation(false);
    }
  };

  const openConfirmation = (type, id) => {
    setActionType(type);
    setSelectedReview(id);
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setSelectedReview(null);
  };

  const confirmAction = () => {
    if (actionType === "deleteProduct") {
      handleDeleteProduct(selectedReview);
    } else if (actionType === "deleteReview") {
      handleDeleteReview(selectedReview);
    } else if (actionType === "approveReview") {
      handleApproveReview(selectedReview);
    }
  };

  const pendingReviews = reviews.filter((review) => !review.approved);
  const approvedReviews = reviews.filter((review) => review.approved);

  return (
    <>
      <Navbar />
      <div className="p-6 py-20 bg-gray-100 min-h-screen">
        <h1 className="text-2xl text-center font-bold mb-6">Admin Dashboard</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl text-center font-bold mb-4">
            Manage Products
          </h2>
          <ProductForm onSuccess={fetchProducts} />

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="space-y-4 mt-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="text-sm text-gray-600">₦{product.price}</p>
                  </div>
                  <button
                    onClick={() =>
                      openConfirmation("deleteProduct", product.id)
                    }
                    className="text-red-600 hover:text-red-800 transition duration-300"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Review Moderation</h2>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Pending Approval</h3>
            {pendingReviews.length === 0 ? (
              <p className="text-gray-600">No pending reviews.</p>
            ) : (
              pendingReviews.map((review) => (
                <div key={review.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">
                      Rating: {review.rating} Stars
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          openConfirmation("approveReview", review.id)
                        }
                        className="text-green-600 hover:text-green-800 transition duration-300"
                      >
                        <FaCheck className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          openConfirmation("deleteReview", review.id)
                        }
                        className="text-red-600 hover:text-red-800 transition duration-300"
                      >
                        <FaTimes className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Approved Reviews</h3>
            {approvedReviews.length === 0 ? (
              <p className="text-gray-600">No approved reviews.</p>
            ) : (
              approvedReviews.map((review) => (
                <div key={review.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">
                      Rating: {review.rating} Stars
                    </span>
                    <button
                      onClick={() =>
                        openConfirmation("deleteReview", review.id)
                      }
                      className="text-red-600 hover:text-red-800 transition duration-300"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <ConfirmationDialog
          isOpen={showConfirmation}
          onClose={closeConfirmation}
          onConfirm={confirmAction}
          title="Confirm Action"
          message="Are you sure you want to perform this action?"
        />
      </div>
    </>
  );
}
