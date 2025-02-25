import { motion } from "framer-motion";

export default function Categories() {
  const categories = [
    { name: "Clothing", icon: "👕" },
    { name: "Electronics", icon: "📱" },
    { name: "Furniture", icon: "🪑" },
    { name: "Books", icon: "📚" },
    { name: "Accessories", icon: "🕶️" },
  ];

  return (
    <div className="container mx-auto py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300 cursor-pointer border border-white/40"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-5xl mb-4">{category.icon}</div>
            <h3 className="text-lg font-semibold">{category.name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
