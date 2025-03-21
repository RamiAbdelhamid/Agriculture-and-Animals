const Product = require("../model/productModel");
const multer = require("multer");

// Setup Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); // Generate a unique filename
  },
});

const upload = multer({ storage: storage });

// Add a new product with image upload
exports.addProduct = [
  upload.single("image"), // Middleware to handle the file upload
  async (req, res) => {
    try {
      const { name, description, price, category, details } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null; // Save the path of the image file
      const newProduct = new Product({
        name,
        description,
        price,
        category,
        details,
        image, // Save image path in the product document
      });

      await newProduct.save();
      res.status(201).json({
        message: "Product added successfully",
        product: newProduct,
      });
    } catch (err) {
      res.status(500).json({ message: "Failed to add product", error: err });
    }
  },
];

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err });
  }
};

// Update an existing product with image upload (optional)
exports.updateProduct = [
  upload.single("image"), // Middleware to handle the file upload (optional)
  async (req, res) => {
    try {
      const { id } = req.params; // Get the product id from the URL parameter
      const { name, description, price, category, details } = req.body;

      // Check if a new image is uploaded
      let image = req.file ? `/uploads/${req.file.filename}` : null;

      // Find and update the product
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          name,
          description,
          price,
          category,
          details,
          image: image || undefined, // If no new image, keep the previous one
        },
        { new: true } // Return the updated product
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (err) {
      res.status(500).json({ message: "Failed to update product", error: err });
    }
  },
];

// Soft delete: Mark a product as "deleted"
exports.softDeleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { isDeleted: true }, // Set isDeleted to true
      { new: true } // Return the updated product
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product marked as deleted successfully",
      product,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product", error });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
