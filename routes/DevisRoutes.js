const express = require("express");

const DevisRouter = express.Router();

const {CreateDevis, getAllDevis} = require("../controllers/DevisControllers")

// Create Devis Customer

DevisRouter.post("/",CreateDevis);


// Get All Devis Customer 

DevisRouter.get("/",getAllDevis)









module.exports = DevisRouter