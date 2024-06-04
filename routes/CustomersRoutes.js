const { Router } = require("express");

const CustomersRouter = Router();

const {
  LoginValidator,
  authsignCustomer,
  generatedToken,
  verifyToken,
  checkEmailExists,
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
  updateDataCustomerFuelOil2,
  updateDataBoisChauffage,
  UpdateClientBoisChauffagePassword,
  UpdateClientFuelOil2Password,
  GetAllCustomersGasoil,
  GetAllCustomersFuelOiln2,
  GetAllCustomersBoisChauffage,
  deleteCustomerBoisChauffage,
  deleteCustomerFuelOil2,
  deleteCustomerGasoil,
  SearchCustomerGsoil,
  SearchCustomerFuelOil2,
  SearchCustomerBoisChauffage
} = require("../controllers/CustomersControllers");

// Customer Authentication

CustomersRouter.post(
  "/login",
  checkError,
  authsignCustomer,
  generatedToken,
  CustomerAuthentication
);

//access token validation, authentication, and user data retrieval

CustomersRouter.post(
  "/login/token",
  LoginValidator,
  verifyToken,
  CustomerAuthenticationValidation
);

// Create new CustomerGazoil account

CustomersRouter.post(
  "/",
  createCustomersClientGazoil,
  generatedToken,
  (req, res) => {
    res.status(201).json({ message: "customer create succufully", data: req.user });
  }
);

// Create new Customer Fuel oil n2

CustomersRouter.post(
  "/clientFeulOil2",
  createCustomersClientFuelOil2,
  generatedToken,
  (req, res) => {
    res.status(201).json({ message: "customer create succufully", data: req.user });
  }
);

// Create new Customer Bois Chauffage

CustomersRouter.post(
  "/clientBoisChauffage",
  createCustomersBoisChauffage,
  generatedToken,
  (req, res) => {
    res.status(201).json({ message: "customer create succufully", data: req.user });
  }
);


// modif password  Customer Gazoil

CustomersRouter.put(
  "/ClientGazoil/edit/:id",
  verifyToken,
  UpdateClientGazoilPassword
);

// modif password customer Fuel Oil n2

CustomersRouter.put(
  "/ClientFuelOil2/edit/:id",
  verifyToken,
  UpdateClientFuelOil2Password
);

// modif password Customer Bois chauffage

CustomersRouter.put(
  "/ClientBoisChauffage/edit/:id",
  verifyToken,
  UpdateClientBoisChauffagePassword
);

// Logout Customer

CustomersRouter.delete("/logout", Logout);

// update data customer gasoil

CustomersRouter.put("/ClientGazoil/edit", verifyToken, updateDatacCustomer);

// update data customer Fuel oil n 2

CustomersRouter.put(
  "/ClientFuelOil2/edit",
  verifyToken,
  updateDataCustomerFuelOil2
);

// update data customer Bois chaufage

CustomersRouter.put(
  "/ClientBoisChauffage/edit",
  verifyToken,
  updateDataBoisChauffage
);

// Get All Customers Gasoil

CustomersRouter.get("/ClientGazoil",GetAllCustomersGasoil)

//  Get All Customers Fuel Oil n 2


CustomersRouter.get("/ClientFuelOil2", GetAllCustomersFuelOiln2)


// Get  All Customers Bois chauffage

CustomersRouter.get("/ClientBoisChauffage", GetAllCustomersBoisChauffage)

// Delete Customer Gasoil 

CustomersRouter.delete("/ClientGazoil/:id", deleteCustomerGasoil)

// Delete Customer Fuel Oil n 2

CustomersRouter.delete("/ClientFuelOil2/:id", deleteCustomerFuelOil2)

// Delete Customer Bois Chauffage 

CustomersRouter.delete("/ClientBoisChauffage/:id", deleteCustomerBoisChauffage)

// Search Customer  Gasoil

CustomersRouter.get("/ClientGazoil/search",SearchCustomerGsoil)

// Search Customer Customer Fuel Oil n 2

CustomersRouter.get("/ClientFuelOil2/search",SearchCustomerFuelOil2)

// Search Customer Bois Chauffage 

CustomersRouter.get("/ClientBoisChauffage/search",SearchCustomerBoisChauffage)


module.exports = CustomersRouter;
