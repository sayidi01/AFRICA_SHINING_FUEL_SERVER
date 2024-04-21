const Products = require("../models/ProductsSchema");

const ProductsRouter = require("../routes/ProductsRoutes");

const { v4 } = require("uuid");

// Create new Product

const CreateProduct = (req, res) => {
  Products.create({ ...req.body, id: v4() })
    .then((res) => {
      res.status(201).send({ message: "Produit réalisé avec succès" });
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
};

// get Products

const getProducts = (req, res) => {
  Products.find()
    .then((data) => {
      console.log(data);
      res.status(201).send({ message: "les produits sont récupérer ", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "erreur recuperation produit" });
    });
};

// get Products By ID

const getProductsById = (req, res) => {
  const productId = req.params.id;
  Products.findById(productId)
    .then((data) => {
      console.log(data);
      if (data) {
        res.send(data);
      } else {
        res.status(404).json({ error: "Produit non trouvé" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Erreur interne du serveur" });
    });
};

// Update Product

const updateProducts = (req, res) => {
  const productId = req.params.id;

  Products.updateOne({ _id: productId })
    .then((data) => {
      if (data) {
        res.status(200).send({ data });
      } else {
        res.status(404).json("Identifiant de produit non valide");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ ...err });
    });
};

// Delete Poduct

const DeleteProduct = (req, res) => {
  const productId = req.params.id;

  Products.deleteOne({ _id: productId })
    .then((data) => {
      console.log(data);
      res.status(200).json({ message: "Produit supprimé avec succès" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: 500, ...err });
    });
};

module.exports = {
  CreateProduct,
  getProducts,
  getProductsById,
  updateProducts,
  DeleteProduct
};
