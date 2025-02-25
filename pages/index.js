import { useEffect, useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";
import Categories from "@/app/components/Categories";
import FeaturedProducts from "@/app/components/FeaturedProducts";
import Footer from "@/app/components/Footer";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="bg-purple-600 text-white py-20 relative overflow-hidden">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-20">
          <motion.div
            className="text-center lg:text-left max-w-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Revibe
            </h1>

            <p className="text-lg mb-6">
              Discover amazing second-hand items at unbeatable prices. Shop
              sustainably and save big!
            </p>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Link href="/product">
                <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-100 transition duration-300 shadow-lg">
                  Shop Now
                </button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative w-72 md:w-96 lg:w-[500px] mx-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Image
              src="/images/revibe2.png"
              alt="Shopping illustration"
              width={500}
              height={500}
              className="mx-auto"
            />
          </motion.div>
        </div>

        <motion.div
          className="absolute top-10 left-10 w-16 h-16 bg-white/20 rounded-full"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <section>
        {" "}
        <Categories />
      </section>
      <section>
        <FeaturedProducts products={products} />
      </section>

      <div className="bg-gray-100 py-12">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Jane Doe",
                review:
                  "I found the perfect dress at an amazing price. Highly recommend!",
                avatar: "👩",
              },
              {
                name: "John Smith",
                review:
                  "Great quality furniture for my new apartment. Fast delivery too!",
                avatar: "👨",
              },
              {
                name: "Emily Johnson",
                review:
                  "Love the eco-friendly approach. Will definitely shop again!",
                avatar: "👧",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <span className="text-4xl mb-4">{testimonial.avatar}</span>
                <p className="text-gray-600 mb-4">{testimonial.review}</p>
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
