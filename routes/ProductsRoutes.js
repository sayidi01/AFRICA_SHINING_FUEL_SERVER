const express = require("express");

const ProductsRouter = express.Router();

const { verifyToken } = require("../middlewares/authMiddlewares");

const {
  CreateProduct,
  getProducts,
  getProductsById,
  updateProducts,
  DeleteProduct
} = require("../controllers/ProductsControllers");

// Create new Product

ProductsRouter.post("/", verifyToken, CreateProduct);

// get Product

ProductsRouter.get("/", verifyToken, getProducts);

// get Product by ID

ProductsRouter.get("/:id", verifyToken, getProductsById);

// update Product

ProductsRouter.put("/:id", verifyToken, updateProducts);

// Delete product 

ProductsRouter.delete("/:id", verifyToken, DeleteProduct)

module.exports = ProductsRouter;
