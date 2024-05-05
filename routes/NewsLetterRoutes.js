const express = require("express");


const NewsLetterRouter = express.Router()


const {CreateNewsLetter} = require("../controllers/NewsLetterControllers")


// Create NewsLetter email 


NewsLetterRouter.post("/", CreateNewsLetter);






module.exports = NewsLetterRouter;

