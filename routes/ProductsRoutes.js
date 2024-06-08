const express = require("express");

const ProductsRouter = express.Router();

const { verifyToken } = require("../middlewares/authMiddlewares");

const {
  CreateProduct,
  getProducts,
  getProductsById,
  updateProducts,
  DeleteProduct,
  SearchProductASF,
  EditProductASF
} = require("../controllers/ProductsControllers");

// Create new Product

ProductsRouter.post("/", verifyToken, CreateProduct);


// Search Product ASF 

ProductsRouter.get("/search", SearchProductASF)

// get Product ASF

ProductsRouter.get("/", verifyToken, getProducts);

// get Product ASF by ID

ProductsRouter.get("/:id", verifyToken, getProductsById);


// Delete product  ASF

ProductsRouter.delete("/:id", verifyToken, DeleteProduct)

// Edit Product ASF

ProductsRouter.put("/:id", verifyToken, EditProductASF)




module.exports = ProductsRouter;
