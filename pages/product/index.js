import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  FaTshirt,
  FaMobileAlt,
  FaCouch,
  FaBook,
  FaGlasses,
  FaShoePrints,
  FaRing,
  FaPaintRoller,
  FaBabyCarriage,
  FaBasketballBall,
  FaSmile,
  FaCar,
  FaHeartbeat,
  FaShoppingCart,
  FaPaw,
  FaMusic,
} from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import Navbar from "@/app/components/Navbar";
import ProductCard from "@/app/components/ProductCard";
import Footer from "@/app/components/Footer";
import { db } from "@/lib/firebase";

const categories = [
  { name: "Clothing", icon: <FaTshirt /> },
  { name: "Electronics", icon: <FaMobileAlt /> },
  { name: "Furniture", icon: <FaCouch /> },
  { name: "Books", icon: <FaBook /> },
  { name: "Accessories", icon: <FaGlasses /> },
  { name: "Shoes", icon: <FaShoePrints /> },
  { name: "Bags", icon: <FaBagShopping /> },
  { name: "Jewelry", icon: <FaRing /> },
  { name: "Home Decor", icon: <FaPaintRoller /> },
  { name: "Toys", icon: <FaBabyCarriage /> },
  { name: "Sports Gear", icon: <FaBasketballBall /> },
  { name: "Beauty", icon: <FaSmile /> },
  { name: "Automotive", icon: <FaCar /> },
  { name: "Health & Wellness", icon: <FaHeartbeat /> },
  { name: "Groceries", icon: <FaShoppingCart /> },
  { name: "Pet Supplies", icon: <FaPaw /> },
  { name: "Music & Instruments", icon: <FaMusic /> },
];

export default function ProductsPage({ productId }) {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
  });
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    if (!productId) return;
    const fetchReviews = async () => {
      const q = query(
        collection(db, "reviews"),
        where("productId", "==", productId),
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
    };

    fetchReviews();
  }, [productId]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.category) {
      result = result.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.minPrice || filters.maxPrice) {
      result = result.filter((product) => {
        const price = parseFloat(product.price);
        const min = filters.minPrice ? parseFloat(filters.minPrice) : 0;
        const max = filters.maxPrice ? parseFloat(filters.maxPrice) : Infinity;
        return price >= min && price <= max;
      });
    }

    if (filters.rating) {
      result = result.filter(
        (product) => product.rating >= parseFloat(filters.rating)
      );
    }

    if (sortOption) {
      switch (sortOption) {
        case "price-low-to-high":
          result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case "price-high-to-low":
          result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        case "rating":
          result.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        default:
          break;
      }
    }

    setFilteredProducts(result);
  }, [searchQuery, filters, sortOption, products]);

  const productsByCategory = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-20 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🛍️ Explore Our Products 🛍️
        </motion.h1>
        <motion.p
          className="text-lg mt-4 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Find the best deals on high-quality second-hand items. Shop smart,
          save big!
        </motion.p>

        <div className="mt-6 max-w-4xl mx-auto px-4">
          <input
            type="text"
            placeholder="Search by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="w-full text-gray-500 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className="flex space-x-2 w-full">
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
                className="w-1/2  text-gray-500 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
                className="w-1/2 px-4 text-gray-500 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
              />
            </div>

            <select
              value={filters.rating}
              onChange={(e) =>
                setFilters({ ...filters, rating: e.target.value })
              }
              className="w-full text-gray-500 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
            >
              <option value="">All Ratings</option>
              <option value="4">4 Stars & Up</option>
              <option value="3">3 Stars & Up</option>
              <option value="2">2 Stars & Up</option>
              <option value="1">1 Star & Up</option>
            </select>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full px-4 text-gray-500 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
            >
              <option value="">Sort By</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="price-high-to-low">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 py-12">
        {categories.map((category) => {
          const productsInCategory = productsByCategory[category.name] || [];
          return (
            <div key={category.name} className="mb-12">
              <motion.h2
                className="text-2xl font-bold mb-4 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  href={`/categories/${category.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="flex items-center text-indigo-600 hover:underline"
                >
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500 text-white mr-2">
                    {category.icon}
                  </span>
                  {category.name}
                </Link>
              </motion.h2>

              {productsInCategory.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  {productsInCategory.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <p className="text-gray-500">No products in this category.</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
        <div className="mb-4">
          <span className="text-lg font-semibold">Average Rating:</span>
          <span className="ml-2">{averageRating} / 5</span>
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
      </div>

      <Footer />
    </div>
  );
}
