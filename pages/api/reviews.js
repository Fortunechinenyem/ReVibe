import fs from "fs";
import path from "path";

const productsFilePath = path.join(process.cwd(), "data", "products.json");

const readProducts = () => {
  const fileData = fs.readFileSync(productsFilePath);
  return JSON.parse(fileData);
};

const writeProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { productId, rating, comment, user } = req.body;
      if (!productId || !rating || !comment || !user) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const products = readProducts();
      const product = products.find((p) => p.id === parseInt(productId));
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const newReview = {
        id: product.reviews ? product.reviews.length + 1 : 1,
        user,
        rating: parseInt(rating),
        comment,
        approved: false,
      };

      product.reviews = product.reviews
        ? [...product.reviews, newReview]
        : [newReview];
      writeProducts(products);

      return res
        .status(201)
        .json({ message: "Review submitted, awaiting approval" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const { productId } = req.query;
      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }
      const products = readProducts();
      const product = products.find((p) => p.id === parseInt(productId));
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const approvedReviews = product.reviews
        ? product.reviews.filter((r) => r.approved)
        : [];
      return res.status(200).json(approvedReviews);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id, productId } = req.query;
      if (!id || !productId) {
        return res
          .status(400)
          .json({ message: "Review ID and Product ID are required" });
      }
      const products = readProducts();
      const product = products.find((p) => p.id === parseInt(productId));
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      product.reviews = product.reviews.filter((r) => r.id !== parseInt(id));
      writeProducts(products);

      return res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
