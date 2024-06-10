const {Router} = require("express");

const ContactezNousRouter = Router();


const {CreateFormContactezNous,GetAllFormsContactezNous, deleteFormContactezNous, SearchFormContactezNous} = require("../controllers/ContactezNousControllers");
const { verifyToken } = require("../middlewares/authMiddlewares");



// Create From ContactezNous


ContactezNousRouter.post("/",verifyToken, CreateFormContactezNous);


// GET all Forms ContactezNous


ContactezNousRouter.get("/",verifyToken, GetAllFormsContactezNous);


// Delete Form  ContactezNous 

ContactezNousRouter.delete("/:id",verifyToken, deleteFormContactezNous);

// Search Form  ContactezNous

ContactezNousRouter.get("/search",verifyToken, SearchFormContactezNous);






module.exports = ContactezNousRouter;