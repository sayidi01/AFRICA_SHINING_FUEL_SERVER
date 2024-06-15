const express = require("express");
const { getAllPrices,update } = require("../controllers/PriceController");

const PriceRouter = express.Router();
const { verifyTokenBackoffice} = require("../middlewares/authMiddlewares");


// retrieve all prices 
PriceRouter.get('/',verifyTokenBackoffice, getAllPrices);

// update 

PriceRouter.put("/:id", update)







module.exports = PriceRouter;