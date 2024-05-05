const {Router} = require("express");

const ContactezNousRouter = Router();


const {CreateFormContactezNous} = require("../controllers/ContactezNousControllers");



// Create From ContactezNous


ContactezNousRouter.post("/", CreateFormContactezNous);






module.exports = ContactezNousRouter;