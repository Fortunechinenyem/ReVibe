import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Store all products in case we need local filtering

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products`);
        const data = await response.json();
        console.log("API Response:", data);

        if (Array.isArray(data)) {
          setAllProducts(data);

          // Filter locally if API doesn’t support category filtering
          const filteredProducts = data.filter(
            (product) =>
              product.category.toLowerCase() === category?.toLowerCase()
          );
          setProducts(filteredProducts);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    if (category) fetchProducts();
  }, [category]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 py-20">
        <h1 className="text-3xl font-bold mb-8 capitalize">
          {category?.replace(/-/g, " ")}
        </h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">
            No products found in this category.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}
