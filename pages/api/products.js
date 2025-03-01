import formidable from "formidable";
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

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const form = new formidable.IncomingForm();
      form.uploadDir = "./public/uploads";
      form.keepExtensions = true;

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form:", err);
          return res.status(500).json({ message: "Error parsing form data" });
        }

        const { name, description, price, category } = fields;

        if (!files.image) {
          return res.status(400).json({ message: "Image file is missing" });
        }

        const filePath = files.image.filepath;
        const fileName = path.basename(filePath);
        const imageUrl = `/uploads/${fileName}`;

        const products = readProducts();

        const newProduct = {
          id: products.length + 1,
          name,
          description,
          price: parseFloat(price),
          category,
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

      if (category) {
        const filteredProducts = products.filter(
          (product) =>
            typeof product.category === "string" &&
            product.category.toLowerCase() === category.toLowerCase()
        );
        return res.status(200).json(filteredProducts);
      }

      res.status(200).json(products);
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
