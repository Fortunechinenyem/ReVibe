import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { paymentMethodId, amount } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method: paymentMethodId,
        confirm: true,
      });

      if (paymentIntent.status === "succeeded") {
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false, error: "Payment failed" });
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
