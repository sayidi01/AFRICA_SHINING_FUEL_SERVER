const express = require("express");


const NewsLetterRouter = express.Router()


const {CreateNewsLetter, getallEmailNewsLetter, deleteNewsLetter, SearchNewsLetter} = require("../controllers/NewsLetterControllers");
const { verifyTokenBackoffice } = require("../middlewares/authMiddlewares");


// Create NewsLetter email 


NewsLetterRouter.post("/", CreateNewsLetter);


// get all email NewsLetter 

NewsLetterRouter.get("/",verifyTokenBackoffice, getallEmailNewsLetter)


// Delete NewsLetter email  Customer

NewsLetterRouter.delete("/:id",verifyTokenBackoffice, deleteNewsLetter)


// Search  NewsLetter email  Customer

NewsLetterRouter.get("/search",verifyTokenBackoffice, SearchNewsLetter);





module.exports = NewsLetterRouter;

