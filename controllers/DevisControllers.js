const Devis = require("../models/Devis")

// Create new Devis Customer


const CreateDevis = (req, res) => {
    Devis
    .create({...req.body})
    .then((data) => {
      console.log(data)
      res.status(201).json({ message: "Votre devis  envoyer", data });      
    })
    .catch((err) => {
        console.log("err",err)
        res.status(400).send({ status: 400, ...err });
    })
}

// Get all Devis Customer

const getAllDevis = (req, res) => {
  Devis
  .find()
  .then((data) => {
    console.log(data)
    res.send({ data });
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({ message: "vous n'avez pas recuperer les devis" });
  })
}







module.exports = {CreateDevis, getAllDevis}