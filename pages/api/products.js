import formidable from "formidable";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

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

        const product = await prisma.product.create({
          data: {
            name,
            description,
            price: parseFloat(price),
            category,
            imageUrl,
          },
        });

        res
          .status(201)
          .json({ product, message: "Product added successfully!" });
      });
    } catch (error) {
      console.error("Error adding product:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
