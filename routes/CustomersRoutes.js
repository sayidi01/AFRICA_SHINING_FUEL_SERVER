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

// Daba had les routes dyal Signup,
// Khass wra ma t creer l customer, khass generer lih tokens o t7athom fl Cookies kayna function generated token

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

module.exports = CustomersRouter;
