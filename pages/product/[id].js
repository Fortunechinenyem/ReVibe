import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const res = await fetch(`/api/products/${id}`);
          const data = await res.json();

          if (res.ok) {
            setProduct(data);
          } else {
            console.error("Product not found");
            router.push("/404");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };

    fetchProduct();
  }, [id, router]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-96">
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600 text-2xl">₦{product.price}</p>
            <p className="text-gray-500 mt-4">{product.description}</p>
            <button
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
