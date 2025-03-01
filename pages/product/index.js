import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    fetchProducts();
  }, []);

  const productsByCategory = products.reduce((acc, product) => {
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
      <Footer />
    </div>
  );
}
