const express = require("express");

const DevisRouter = express.Router();

const {CreateDevis} = require("../controllers/DevisControllers")

// Create Devis Customer

DevisRouter.post("/",CreateDevis);












module.exports = DevisRouter