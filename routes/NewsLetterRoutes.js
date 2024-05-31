const express = require("express");


const NewsLetterRouter = express.Router()


const {CreateNewsLetter, getallEmailNewsLetter, deleteNewsLetter, SearchNewsLetter} = require("../controllers/NewsLetterControllers");
const { verifyToken } = require("../middlewares/authMiddlewares");


// Create NewsLetter email 


NewsLetterRouter.post("/",verifyToken, CreateNewsLetter);


// get all email NewsLetter 

NewsLetterRouter.get("/", getallEmailNewsLetter)


// Delete NewsLetter email  Customer

NewsLetterRouter.delete("/:id", deleteNewsLetter)


// Search  NewsLetter email  Customer

NewsLetterRouter.get("/search", SearchNewsLetter);





module.exports = NewsLetterRouter;

