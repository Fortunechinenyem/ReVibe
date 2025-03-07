import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-gray-600">₦{product.price}</p>
          <p className="text-sm text-gray-500">{product.description}</p>
          <p className="text-gray-500 mb-2">{product.category}</p>
        </div>
        <div className="flex items-center mb-4">
          <span className="text-yellow-500">★</span>
          <span className="ml-1">{product.rating}</span>
        </div>
        <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          View
        </button>
      </Link>
    </div>
  );
}
