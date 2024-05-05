const CustomersClientFioul = require("../models/CustomersClientFioul.js");
const CustomersGrnulesBois = require("../models/CustomersGranulesDeBois.js");
const CustomersGazElectrecite = require("../models/CustomersGazElectrecite.js");
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
  const data = { ...req.data?._doc, password: null };

  console.log("Req customer", req.data);

  res.status(200).send({ data });
};

// Create new CustomerClientFioul

const createCustomersClientFioul = async (req, res, next) => {
  const secretKey = process.env.secret;

  const countClients = await CustomersClientFioul.countDocuments();

  const id = generateClientID(countClients.toString());

  CustomersClientFioul.create({ ...req.body, id })
    .then((data) => {
      console.log(res._id);
      res.status(201).json({ message: "customer create succufully" });
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

// Create new Customers granulés Du Bois

const createCustomersGranulesDeBois = async (req, res, next) => {
  const countClients = await CustomersGrnulesBois.countDocuments();

  const id = generateClientID(countClients.toString());
  CustomersGrnulesBois.create({ ...req.body, id })
    .then((data) => {
      console.log(res._id);
      res
        .status(201)
        .json({ message: "customer Granulés de Bois create succufully" });

      console.log(data);
      req.user = data;
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).send({ status: 400, ...err });
    });
};

// Create new Customers gaz&& Èlectrecitè

const createCustomersGazElectrecite = async (req, res, next) => {
  const countClients = await CustomersClientFioul.countDocuments();

  const id = generateClientID(countClients.toString());
  CustomersGazElectrecite.create({ ...req.body, id })
    .then((data) => {
      console.log(res._id);
      res
        .status(201)
        .json({ message: "customer Gaz&Electrecite create succufully" });

      console.log(data);
      req.user = data;
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).send({ status: 400, ...err });
    });
};

// update password customer Fioul

const UpdateClientFioulPassword = (req, res) => {
  const customerId = req.params.id;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  if (!customerId || !currentPassword || !newPassword) {
    return res.status(400).send({ message: "invalid request" });
  }

  CustomersClientFioul.findById(customerId)
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

const Logout = async (req, res) => {
  try {
    await CustomersClientFioul.deleteOne({ _id: req.user._id });
    await CustomersGrnulesBois.deleteOne({ _id: req.user._id });
    await CustomersGazElectrecite.deleteOne({ _id: req.user._id });

    // Clear cookies and send response
    res.clearCookie("accesToken").clearCookie("refreshToken");
    res.status(200).json({ message: "Successful disconnection" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update data customer

const updateDatacCustomer = (req, res) => {
  const customerId = req.user._id;
  CustomersClientFioul.updateOne({ _id: customerId }, req.body)
    .then((data) => {
      console.log(data);
      res.status(200).send({ message: "data updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error update" });
    });
};

module.exports = {
  CustomerAuthentication,
  createCustomersClientFioul,
  createCustomersGranulesDeBois,
  createCustomersGazElectrecite,
  CustomerAuthenticationValidation,
  Logout,
  UpdateClientFioulPassword,
  updateDatacCustomer,
};
