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

export default async function handler(req, res) {
  const { id } = req.query;
  const fileData = fs.readFileSync(productsFilePath);
  const products = JSON.parse(fileData);

  const product = products.find((p) => p.id === parseInt(id));

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }

  if (req.method === "DELETE") {
    try {
      const products = readProducts();

      const productIndex = products.findIndex(
        (product) => product.id === parseInt(id)
      );

      if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
      }

      products.splice(productIndex, 1);

      writeProducts(products);

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
