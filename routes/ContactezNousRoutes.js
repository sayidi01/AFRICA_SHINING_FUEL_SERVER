const {Router} = require("express");

const ContactezNousRouter = Router();


const {CreateFormContactezNous,GetAllFormsContactezNous, deleteFormContactezNous, SearchFormContactezNous} = require("../controllers/ContactezNousControllers");
const { verifyToken } = require("../middlewares/authMiddlewares");



// Create From ContactezNous


ContactezNousRouter.post("/",verifyToken, CreateFormContactezNous);


// GET all Forms ContactezNous


ContactezNousRouter.get("/", GetAllFormsContactezNous);


// Delete Form  ContactezNous 

ContactezNousRouter.delete("/:id", deleteFormContactezNous);

// Search Form  ContactezNous

ContactezNousRouter.get("/search", SearchFormContactezNous);






module.exports = ContactezNousRouter;