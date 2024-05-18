const Price = require("../models/PricesSchema");
const PricePerCity = require('../models/PricesSchema');

const getAllPrices = async (req, res) => {
  try {// dta l
    const data = await PricePerCity.find();
    
    console.log(data);
    res.send({ data });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    res.status(500).send({ message: "Une erreur s'est produite lors de la récupération des prix par ville." });
  }
};



const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const price = await Price.findOneAndUpdate({ id }, updatedData, { new: true });

    if (!price) {
      return res.status(404).json({ message: "Prix non trouvé" });
    }

    res.status(200).json({ message: "Prix mis à jour avec succès", data: price });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};



module.exports = { getAllPrices , update};