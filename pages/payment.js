import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutForm = ({ cart, totalPrice, formData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
      setPaymentStatus("failed");
    } else {
      console.log("Payment Method:", paymentMethod);

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: totalPrice,
          cart: cart,
          formData: formData,
        }),
      });

      const paymentResult = await response.json();

      if (paymentResult.success) {
        setPaymentStatus("success");
      } else {
        setPaymentStatus("failed");
      }
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Payment
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center mb-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 rounded-lg"
              />
              <div className="ml-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500">
                  ₦{item.price} x {item.quantity}
                </p>
              </div>
              <p className="font-semibold ml-auto">
                ₦{item.price * item.quantity}
              </p>
            </div>
          ))}
          <div className="border-t pt-4">
            <h3 className="text-xl font-semibold">
              Total: ₦{totalPrice.toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Payment Details</h2>
          <form onSubmit={handleSubmit}>
            <CardElement className="mb-4" />
            <button
              type="submit"
              disabled={!stripe}
              className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg text-center hover:bg-purple-500 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Pay Now
            </button>
          </form>
          {paymentStatus === "success" && (
            <div className="text-green-600 mt-4">Payment successful!</div>
          )}
          {paymentStatus === "failed" && (
            <div className="text-red-600 mt-4">
              Payment failed. Please try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Payment() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (router.query.cart) {
      setCart(JSON.parse(router.query.cart));
      setTotalPrice(Number(router.query.totalPrice));
      setFormData({
        name: router.query.name,
        email: router.query.email,
        address: router.query.address,
        city: router.query.city,
        country: router.query.country,
      });
    }
  }, [router.query]);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm cart={cart} totalPrice={totalPrice} formData={formData} />
    </Elements>
  );
}
