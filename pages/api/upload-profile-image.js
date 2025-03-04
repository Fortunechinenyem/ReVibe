import formidable from "formidable";
import fs from "fs";
import path from "path";

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

      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error("Error parsing form:", err);
          return res.status(500).json({ message: "Error parsing form data" });
        }

        if (!files.image) {
          return res.status(400).json({ message: "Image file is missing" });
        }

        const filePath = files.image.filepath;
        const fileName = path.basename(filePath);
        const imageUrl = `/uploads/${fileName}`;

        res.status(200).json({ imageUrl });
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
