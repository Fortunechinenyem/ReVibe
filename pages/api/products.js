import formidable from "formidable";
import fs from "fs";
import path from "path";

const productsFilePath = path.join(process.cwd(), "data", "products.json");

const readProducts = () => {
  try {
    const fileData = fs.readFileSync(productsFilePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading products file:", error);
    return [];
  }
};

const writeProducts = (products) => {
  try {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error("Error writing products file:", error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const form = new formidable.IncomingForm({
        uploadDir: path.join(process.cwd(), "public/uploads"),
        keepExtensions: true,
      });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form:", err);
          return res.status(500).json({ message: "Error parsing form data" });
        }

        const { name, description, price, category } = fields;

        if (!files.image || !files.image.filepath) {
          return res.status(400).json({ message: "Image file is missing" });
        }

        const filePath = files.image.filepath;
        const fileName = path.basename(filePath);
        const imageUrl = `/uploads/${fileName}`;

        const products = readProducts();

        const newProduct = {
          id: products.length + 1,
          name: name?.toString().trim() || "Untitled",
          description: description?.toString().trim() || "No description",
          price: parseFloat(price) || 0,
          category: category?.toString().trim() || "Uncategorized",
          imageUrl,
        };

        products.push(newProduct);
        writeProducts(products);

        res.status(201).json({
          product: newProduct,
          message: "Product added successfully!",
        });
      });
    } catch (error) {
      console.error("Error adding product:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const { category } = req.query;
      const products = readProducts();

      const filteredProducts = category
        ? products.filter(
            (product) =>
              typeof product.category === "string" &&
              product.category.toLowerCase() === category.toLowerCase()
          )
        : products;

      res.status(200).json(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
