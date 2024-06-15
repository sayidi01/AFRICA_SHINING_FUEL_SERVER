const express = require("express");
const { getAllPrices,update } = require("../controllers/PriceController");

const PriceRouter = express.Router();


// retrieve all prices 
PriceRouter.get('/', getAllPrices);

// update 

PriceRouter.put("/:id", update)







module.exports = PriceRouter;