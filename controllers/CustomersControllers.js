const CustomersClientGazoil = require("../models/CustomersClientGazoil");
const CustomersClientFuelOil2 = require("../models/CustomersFuelOil2.js");
const CustomersClientBoisChauffage = require("../models/CustomersBoisChauffage.js.js");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");

const CLIENT_ID_PREFIX = "ASF_CLT_";

const generateClientID = (clientCount) => {
  return CLIENT_ID_PREFIX + (Number(clientCount) + 1);
};

// Customer Authentication

const CustomerAuthentication = (req, res) => {
  const acces = req.accesToken;
  const refresh = req.refreshToken;

  res
    .cookie("accesToken", acces, {
      samehttpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .cookie("refreshToken", refresh, {
      samehttpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .status(200)
    .send(req.user);
};

// Customer Validation

const CustomerAuthenticationValidation = (req, res, next) => {
  const data = { ...req.user?._doc, password: null };
  console.log("req user", req.user);
  console.log("Req customer", req.data);
  console.log("req");

  res.status(200).send({ data });
};

// Create new CustomerClientGazoil

const createCustomersClientGazoil = async (req, res, next) => {
  const secretKey = process.env.secret;

  const countClients = await CustomersClientGazoil.countDocuments();

  const id = generateClientID(countClients.toString());

  CustomersClientGazoil.create({ ...req.body, id })
    .then((data) => {
      console.log(res._id);
      req.user = data;
      // res.status(201).json({ message: "customer create succufully", data });
      next()
      //const emailToken = jwt.sign({_id: data._id}, secretKey, {
      // expiresIn: '5m'
      // })
      //req.accesToken = emailToken
      console.log(data);
      req.user = data;
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).send({ status: 400, ...err });
    });
};

// Create new Customers Fuel Oil n2

const createCustomersClientFuelOil2 = async (req, res, next) => {
  const countClients = await CustomersClientFuelOil2.countDocuments();

  const id = generateClientID(countClients.toString());
  CustomersClientFuelOil2.create({ ...req.body, id })
    .then((data) => {
      console.log(res._id);
      req.user = data;
      next();

      console.log(data);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).send({ status: 400, ...err });
    });
};

// Create new Customers gaz&& Èlectrecitè

const createCustomersBoisChauffage = async (req, res, next) => {
  const countClients = await CustomersClientBoisChauffage.countDocuments();

  const id = generateClientID(countClients.toString());
  CustomersClientBoisChauffage.create({ ...req.body, id })
    .then((data) => {
      console.log(res._id);
      req.user = data;
      next();

      console.log(data);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).send({ status: 400, ...err });
    });
};

// update password customer Gazoil

const UpdateClientGazoilPassword = (req, res) => {
  const customerId = req.params.id;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  if (!customerId || !currentPassword || !newPassword) {
    return res.status(400).send({ message: "invalid request" });
  }

  CustomersClientGazoil.findById(customerId)
    .then(async (customer) => {
      if (!customer) {
        throw new Error("customer not found");
      }

      // Vérifie que le mot de passe actuel est correct
      if (!customer.comparePassword(currentPassword)) {
        throw new Error("invalid current password");
      }

      // Met à jour le mot de passe du client
      customer.password = newPassword;
      await customer.save();
      res.status(200).send({ message: "password updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ message: err.message || "error updating password" });
    });
};



// update password customer Fuel Oil n 2


const UpdateClientFuelOil2Password = (req, res) => {
  const customerId = req.params.id;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  if (!customerId || !currentPassword || !newPassword) {
    return res.status(400).send({ message: "invalid request" });
  }

  CustomersClientFuelOil2.findById(customerId)
    .then(async (customer) => {
      if (!customer) {
        throw new Error("customer not found");
      }

      // Vérifie que le mot de passe actuel est correct
      if (!customer.comparePassword(currentPassword)) {
        throw new Error("invalid current password");
      }

      // Met à jour le mot de passe du client
      customer.password = newPassword;
      await customer.save();
      res.status(200).send({ message: "password updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ message: err.message || "error updating password" });
    });
};


// update password customer Bois Chauffage

const UpdateClientBoisChauffagePassword = (req, res) => {
  const customerId = req.params.id;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  if (!customerId || !currentPassword || !newPassword) {
    return res.status(400).send({ message: "invalid request" });
  }

  CustomersClientBoisChauffage.findById(customerId)
    .then(async (customer) => {
      if (!customer) {
        throw new Error("customer not found");
      }

      // Vérifie que le mot de passe actuel est correct
      if (!customer.comparePassword(currentPassword)) {
        throw new Error("invalid current password");
      }

      // Met à jour le mot de passe du client
      customer.password = newPassword;
      await customer.save();
      res.status(200).send({ message: "password updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ message: err.message || "error updating password" });
    });
};



// Logout Customer

const Logout = (req, res) => {
  try {
    // Clear cookies and send response
    res.clearCookie("accesToken").clearCookie("accessToken").clearCookie("refreshToken");
    res.status(200).json({ message: "Successful disconnection" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Error during logout" });
  }
};

// Update data customer Gasoil

const updateDatacCustomer = (req, res) => {
  const customerId = req.user._id;
  // req.body: {addressLivraison: {tele}}
  CustomersClientGazoil.findOneAndUpdate({ _id: customerId }, req.body, {
    new: true,
  })
    .then((data) => {
      console.log(data);
      res.status(200).send({ message: "data updated successfully", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error update" });
    });
};

// Update data Customer Fuel oil n 2

const updateDataCustomerFuelOil2 = (req, res) => {
  const customerId = req.user._id;
  CustomersClientFuelOil2.findOneAndUpdate({ _id: customerId }, req.body, {
    new: true,
  })
    .then((data) => {
      console.log(data);
      res.status(200).send({ message: "data updated successfully", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error update" });
    });
};

// update data customer bois chauffage

const updateDataBoisChauffage = (req, res) => {
  const customerId = req.user._id;
  CustomersClientBoisChauffage.findOneAndUpdate({ _id: customerId }, req.body, {
    new: true,
  })
    .then((data) => {
      console.log(data);
      res.status(200).send({ message: "data updated successfully", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error update" });
    });
};

module.exports = {
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
  UpdateClientFuelOil2Password
};
