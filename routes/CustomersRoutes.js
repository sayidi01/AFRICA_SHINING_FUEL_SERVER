const { Router } = require("express");

const CustomersRouter = Router();

const {
  LoginValidator,
  authsignCustomer,
  generatedToken,
  verifyToken,
} = require("../middlewares/authMiddlewares");

const verifEmail = require("../middlewares/emailVerification");

const {
  CustomerAuthentication,
  createCustomersClientFioul,
  createCustomersGranulesDeBois,
  createCustomersGazElectrecite,
  CustomerAuthenticationValidation,
} = require("../controllers/CustomersControllers");

const checkError = require("../middlewares/errorMiddlewares");

// Customer Authentication

CustomersRouter.post(
  "/login",
  LoginValidator,
  checkError,
  authsignCustomer,
  generatedToken,
  CustomerAuthentication
);

//access token validation, authentication, and user data retrieval

CustomersRouter.post("/login/token",LoginValidator, verifyToken, CustomerAuthenticationValidation);

// Create new CustomerFioul account

CustomersRouter.post("/", LoginValidator,createCustomersClientFioul);

// Create new Customer Granulés De Bois

CustomersRouter.post("/clientgranulesdebois", LoginValidator,createCustomersGranulesDeBois);

// Create new Customer gaz && Électrecité

CustomersRouter.post("/clientgazelectrecite", createCustomersGazElectrecite);

module.exports = CustomersRouter;
