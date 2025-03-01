import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (category) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`/api/products?category=${category}`);
          const data = await response.json();
          console.log("API Response:", data);

          setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Error fetching products:", error);
          setProducts([]);
        }
      };

      fetchProducts();
    }
  }, [category]);

  return (
    <div className="">
      <Navbar />
      <div className="container mx-auto p-6 py-20">
        <h1 className="text-3xl font-bold mb-8 capitalize">
          {category?.replace(/-/g, " ")}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
