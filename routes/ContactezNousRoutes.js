const {Router} = require("express");

const ContactezNousRouter = Router();


const {CreateFormContactezNous,GetAllFormsContactezNous, deleteFormContactezNous, SearchFormContactezNous} = require("../controllers/ContactezNousControllers");
const { verifyTokenBackoffice } = require("../middlewares/authMiddlewares");



// Create From ContactezNous


ContactezNousRouter.post("/", CreateFormContactezNous);


// GET all Forms ContactezNous


ContactezNousRouter.get("/",verifyTokenBackoffice, GetAllFormsContactezNous);


// Delete Form  ContactezNous 

ContactezNousRouter.delete("/:id",verifyTokenBackoffice, deleteFormContactezNous);

// Search Form  ContactezNous

ContactezNousRouter.get("/search",verifyTokenBackoffice, SearchFormContactezNous);






module.exports = ContactezNousRouter;