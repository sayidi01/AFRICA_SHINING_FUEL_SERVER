const express = require("express");

const DevisRouter = express.Router();

const {CreateDevis, getAllDevis, deleteDevis, SearchDevis} = require("../controllers/DevisControllers");
const { verifyToken } = require("../middlewares/authMiddlewares");

// Create Devis Customer

DevisRouter.post("/",verifyToken,CreateDevis);


// Get All Devis Customer 

DevisRouter.get("/",verifyToken,getAllDevis)


// Search devis customer 

DevisRouter.get("/search",verifyToken,SearchDevis)

// Delete Devis 

DevisRouter.delete("/:id",verifyToken, deleteDevis)









module.exports = DevisRouter