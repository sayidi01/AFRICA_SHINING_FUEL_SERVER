const { Router } = require("express");

const CustomersRouter = Router();

const {
  LoginValidator,
  authsignCustomer,
  generatedToken,
  verifyToken,
} = require("../middlewares/authMiddlewares");



const {
  CustomerAuthentication,
  createCustomersClientFioul,
  createCustomersGranulesDeBois,
  createCustomersGazElectrecite,
  CustomerAuthenticationValidation,
  Logout,
  UpdateClientFioulPassword,
  updateDatacCustomer
} = require("../controllers/CustomersControllers");

const checkError = require("../middlewares/errorMiddlewares");
const CustomersClientFioul = require("../models/CustomersClientFioul");

// Customer Authentication

CustomersRouter.post(
  "/login",
  LoginValidator,
  checkError,
  authsignCustomer,
  generatedToken,
  CustomerAuthentication,
);

//access token validation, authentication, and user data retrieval

CustomersRouter.post("/login/token",LoginValidator, verifyToken, CustomerAuthenticationValidation);

// Create new CustomerFioul account

CustomersRouter.post("/", LoginValidator,createCustomersClientFioul);

// Create new Customer Granulés De Bois

CustomersRouter.post("/clientgranulesdebois", LoginValidator,createCustomersGranulesDeBois);

// Create new Customer gaz && Électrecité

CustomersRouter.post("/clientgazelectrecite", createCustomersGazElectrecite);

// Update Customer Fioul

CustomersRouter.put("/clientFioul/edit/:id", UpdateClientFioulPassword)


// Logout Customer

CustomersRouter.delete("/logout",Logout)


// update data customer 

CustomersRouter.put("/fioul/edit",verifyToken, updateDatacCustomer)

module.exports = CustomersRouter;
