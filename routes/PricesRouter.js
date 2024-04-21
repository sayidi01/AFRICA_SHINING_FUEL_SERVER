const express = require("express");
const { getAllPrices } = require("../controllers/PriceController");

const PriceRouter = express.Router();



// retrieve all prices 
PriceRouter.get('/', getAllPrices);









module.exports = PriceRouter;