const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");


// Route to add a new product
router.post("/products", productController.addProduct);



// Route to get all products
router.get("/products", productController.getProducts);



// توجيه لتحديث منتج معين باستخدام المعرّف
router.patch("/products/:id", productController.updateProduct);

// Route to get a single product by ID
router.get("/products/:id", productController.getProductById);



// Soft delete product by id
router.patch("/products/:id/soft-delete", productController.softDeleteProduct); // استخدم PATCH بدلاً من DELETE لعمل soft delete

module.exports = router;
