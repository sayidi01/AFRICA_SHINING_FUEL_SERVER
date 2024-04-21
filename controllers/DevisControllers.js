const Devis = require("../models/Devis")

// Create new Devis Customer


const CreateDevis = (req, res) => {
    Devis
    .create({...req.body})
    .then((data) => {
      console.log(data)
      res.status(201).json({ message: "Votre devis a envoyer", data });      
    })
    .catch((err) => {
        console.log("err",err)
        res.status(400).send({ status: 400, ...err });
    })
}







module.exports = {CreateDevis}