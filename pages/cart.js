import { useCart } from "@/context/CartContext";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center border p-4 rounded-lg"
              >
                <div className="relative w-24 h-24">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="text-gray-600">₦{item.price}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
