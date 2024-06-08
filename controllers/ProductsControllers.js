const Products = require("../models/ProductsSchema");

const mongoose = require('mongoose');


// Create new Product

const CreateProduct = (req, res) => {
  Products.create({ ...req.body })
    .then((data) => {
      console.log(data)
      res.status(201).json({ message: "Produit réalisé avec succès" , data});
    })
    .catch((err) => {
     console.log(err)
      res.status(400).send({ status: 400, ...err });
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

// Search Product ASF 

const SearchProductASF = (req,res) => {
  const TextSearchProducts =  req.query.query ?? ""


  if(!TextSearchProducts) {
    return res.status(400).json({ error: "Search query is required" });
  }

  Products
  .find({
    $or: [
      {name: { $regex: TextSearchProducts, $options: "i" } },
    ]
  })
  .then((data) => {
    return res.status(200).json(data);
  })
  .catch((err) => {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  });

} 

// Edit product ASF

const EditProductASF = (req,res) => {
  const productId = req.params.id.toString(); 

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  Products
  .findOneAndUpdate({_id: productId}, req.body , {new : true})
  .then((data) => {
    console.log(data)
    if(data) {
      res.status(200).send({ data });
    }else{
      res.status(404).json("invalid product id");
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({
      status: 500,
      ...err,
    });
  })
}


module.exports = {
  CreateProduct,
  getProducts,
  getProductsById,
  DeleteProduct,
  SearchProductASF,
  EditProductASF
};
