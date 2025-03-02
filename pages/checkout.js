import { useCart } from "@/context/CartContext";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Footer from "@/app/components/Footer";

export default function Checkout() {
  const { cart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
  });

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    if (
      !form.name ||
      !form.email ||
      !form.address ||
      !form.city ||
      !form.country
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Redirect to the payment page with cart and form data
    router.push({
      pathname: "/payment",
      query: {
        cart: JSON.stringify(cart),
        totalPrice: totalPrice,
        ...form, // Pass form data as query parameters
      },
    });
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Billing & Shipping</h2>

            <form className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={form.address}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              />
            </form>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500">
                      ₦{item.price} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">₦{item.price * item.quantity}</p>
                </div>
              ))}

              <div className="border-t pt-4">
                <h3 className="text-xl font-semibold">
                  Total: ₦{totalPrice.toLocaleString()}
                </h3>
              </div>

              <button
                className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg text-center hover:bg-purple-500 transition duration-300 transform hover:scale-105 shadow-lg mt-4"
                onClick={handleCheckout}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
