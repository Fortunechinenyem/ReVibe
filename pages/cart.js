import { useCart } from "@/context/CartContext";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import { useRouter } from "next/router";
import Footer from "@/app/components/Footer";

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity } = useCart();
  const router = useRouter();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center border p-4 rounded-lg"
              >
                <div className="relative w-24 h-24">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="text-gray-600">₦{item.price}</p>

                  <div className="flex items-center mt-2">
                    <button
                      className="bg-gray-300 px-3 py-1 rounded-md hover:bg-gray-400"
                      onClick={() =>
                        updateCartQuantity(
                          item.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                    >
                      -
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      className="bg-gray-300 px-3 py-1 rounded-md hover:bg-gray-400"
                      onClick={() =>
                        updateCartQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 ml-4"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="border-t text-center pt-4 mt-6 mb-5">
              <h2 className="text-2xl font-semibold">
                Total: ₦{totalPrice.toLocaleString()}
              </h2>
              <button
                className="bg-purple-600 text-white px-6 py-2 rounded-lg text-center hover:bg-purple-500 transition duration-300 transform hover:scale-105 shadow-lg mt-4"
                onClick={() => router.push("/checkout")}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
