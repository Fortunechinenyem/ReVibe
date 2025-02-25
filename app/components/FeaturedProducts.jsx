import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

export default function FeaturedProducts({ products = [] }) {
  // ✅ Get only one product per category
  const featuredProducts = Object.values(
    products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = product; // Pick the first product of each category
      }
      return acc;
    }, {})
  );

  return (
    <div className="container mx-auto py-16">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Featured Products
      </motion.h2>

      {featuredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No featured products available.
        </p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
