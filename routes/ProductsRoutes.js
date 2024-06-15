const express = require("express");

const ProductsRouter = express.Router();

const { verifyTokenBackoffice } = require("../middlewares/authMiddlewares");

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

ProductsRouter.post("/", verifyTokenBackoffice, CreateProduct);


// Search Product ASF 

ProductsRouter.get("/search",verifyTokenBackoffice, SearchProductASF)

// get Product ASF

ProductsRouter.get("/",verifyTokenBackoffice, getProducts);

// get Product ASF by ID

ProductsRouter.get("/:id", verifyTokenBackoffice, getProductsById);


// Delete product  ASF

ProductsRouter.delete("/:id", verifyTokenBackoffice, DeleteProduct)

// Edit Product ASF

ProductsRouter.put("/:id", verifyTokenBackoffice, EditProductASF)




module.exports = ProductsRouter;
