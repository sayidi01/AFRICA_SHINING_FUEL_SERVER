const express = require("express");

const DevisRouter = express.Router();

const {CreateDevis, getAllDevis, deleteDevis, SearchDevis} = require("../controllers/DevisControllers");
const { verifyToken } = require("../middlewares/authMiddlewares");

// Create Devis Customer

DevisRouter.post("/",verifyToken,CreateDevis);


// Get All Devis Customer 

DevisRouter.get("/",getAllDevis)


// Search devis customer 

DevisRouter.get("/search",SearchDevis)

// Delete Devis 

DevisRouter.delete("/:id", deleteDevis)









module.exports = DevisRouter