const express = require("express");


const NewsLetterRouter = express.Router()


const {CreateNewsLetter, getallEmailNewsLetter, deleteNewsLetter, SearchNewsLetter} = require("../controllers/NewsLetterControllers");
const { verifyToken } = require("../middlewares/authMiddlewares");


// Create NewsLetter email 


NewsLetterRouter.post("/", CreateNewsLetter);


// get all email NewsLetter 

NewsLetterRouter.get("/",verifyToken, getallEmailNewsLetter)


// Delete NewsLetter email  Customer

NewsLetterRouter.delete("/:id",verifyToken, deleteNewsLetter)


// Search  NewsLetter email  Customer

NewsLetterRouter.get("/search",verifyToken, SearchNewsLetter);





module.exports = NewsLetterRouter;

