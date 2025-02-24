import { useEffect, useState } from "react";

import Navbar from "@/app/components/Navbar";
import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";

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

      <div className="bg-purple-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Revibe</h1>
          <p className="text-lg mb-8">
            Discover amazing second-hand items at unbeatable prices. Shop
            sustainably and save big!
          </p>
          <Link href="/product">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-100 transition duration-300">
              Shop Now
            </button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[
            { name: "Clothing", icon: "👕" },
            { name: "Electronics", icon: "📱" },
            { name: "Furniture", icon: "🪑" },
            { name: "Books", icon: "📚" },
            { name: "Accessories", icon: "🕶️" },
          ].map((category, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
            >
              <span className="text-4xl mb-4">{category.icon}</span>
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

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

      <div className="bg-purple-600 text-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg mb-8">
            Get the latest updates on new arrivals, exclusive deals, and more!
          </p>
          <form className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-64 px-4 py-2 rounded-l-lg focus:outline-none text-gray-800"
            />
            <button
              type="submit"
              className="bg-white text-purple-600 px-6 py-2 rounded-r-lg font-semibold hover:bg-purple-100 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="hover:text-purple-400">
              About Us
            </a>
            <a href="#" className="hover:text-purple-400">
              Contact
            </a>
            <a href="#" className="hover:text-purple-400">
              Privacy Policy
            </a>
          </div>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-purple-400">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-purple-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-purple-400">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <p className="mt-4 text-sm">
            &copy; {new Date().getFullYear()} Revibe. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
