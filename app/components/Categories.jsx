import { motion } from "framer-motion";

export default function Categories() {
  const categories = [
    {
      name: "Clothing",
      icon: "👕",
      description: "Trendy and affordable second-hand clothes.",
    },
    {
      name: "Electronics",
      icon: "📱",
      description: "Pre-loved gadgets and devices.",
    },
    {
      name: "Furniture",
      icon: "🪑",
      description: "Quality furniture for your home.",
    },
    {
      name: "Books",
      icon: "📚",
      description: "Gently used books for all ages.",
    },
    {
      name: "Accessories",
      icon: "🕶️",
      description: "Stylish accessories to complete your look.",
    },
    {
      name: "Shoes",
      icon: "👟",
      description: "Comfortable and stylish footwear.",
    },
    {
      name: "Bags",
      icon: "👜",
      description: "Trendy bags for every occasion.",
    },
    {
      name: "Jewelry",
      icon: "💍",
      description: "Elegant and unique jewelry pieces.",
    },
    {
      name: "Home Decor",
      icon: "🖼️",
      description: "Beautiful decor to spruce up your space.",
    },
    { name: "Toys", icon: "🧸", description: "Fun and safe toys for kids." },
    {
      name: "Sports Gear",
      icon: "🏀",
      description: "Equipment for your favorite sports.",
    },
    { name: "Beauty", icon: "💄", description: "Gently used beauty products." },
    { name: "Automotive", icon: "🚗" },
    { name: "Health & Wellness", icon: "💊" },
    { name: "Groceries", icon: "🛒" },
    { name: "Pet Supplies", icon: "🐶" },
    { name: "Music & Instruments", icon: "🎸" },
  ];

  return (
    <div className="container mx-auto py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300 cursor-pointer border border-white/40"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-5xl mb-4">{category.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
            <p className="text-sm text-gray-600">{category.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
