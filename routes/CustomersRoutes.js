const { Router } = require("express");

const CustomersRouter = Router();

const {
  LoginValidator,
  authsignCustomer,
  generatedToken,
  verifyToken,
  checkEmailExists
} = require("../middlewares/authMiddlewares");


const checkError = require("../middlewares/errorMiddlewares");




const {
  CustomerAuthentication,
  createCustomersClientGazoil,
  createCustomersClientFuelOil2,
  createCustomersBoisChauffage,
  CustomerAuthenticationValidation,
  Logout,
  UpdateClientGazoilPassword,
  updateDatacCustomer,
  
} = require("../controllers/CustomersControllers");


// Customer Authentication

CustomersRouter.post(
  "/login",
  checkError,
  authsignCustomer,
  generatedToken,
  CustomerAuthentication,
);

//access token validation, authentication, and user data retrieval

CustomersRouter.post("/login/token",LoginValidator, verifyToken, CustomerAuthenticationValidation);

// Create new CustomerGazoil account

CustomersRouter.post("/",createCustomersClientGazoil);

// Create new Customer Fuel oil n2 

CustomersRouter.post("/clientFeulOil2",createCustomersClientFuelOil2);

// Create new Customer Bois Chauffage

CustomersRouter.post("/clientBoisChauffage", createCustomersBoisChauffage);

// Update Customer Gazoil

CustomersRouter.put("/clientGazoil/edit/:id", UpdateClientGazoilPassword);


// Logout Customer

CustomersRouter.delete("/logout",Logout);


// update data customer 

CustomersRouter.put("/gazoil/edit",verifyToken, updateDatacCustomer);




module.exports = CustomersRouter;
