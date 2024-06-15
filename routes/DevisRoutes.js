const express = require("express");

const DevisRouter = express.Router();

const {CreateDevis, getAllDevis, deleteDevis, SearchDevis} = require("../controllers/DevisControllers");
const { verifyTokenBackoffice } = require("../middlewares/authMiddlewares");

// Create Devis Customer

DevisRouter.post("/",CreateDevis);


// Get All Devis Customer 

DevisRouter.get("/",verifyTokenBackoffice,getAllDevis)


// Search devis customer 

DevisRouter.get("/search",verifyTokenBackoffice,SearchDevis)

// Delete Devis 

DevisRouter.delete("/:id",verifyTokenBackoffice, deleteDevis)









module.exports = DevisRouter