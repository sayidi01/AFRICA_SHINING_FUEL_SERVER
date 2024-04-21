const CustomersClientFioul = require("../models/CustomersClientFioul.js");
const CustomersGrnulesBois = require("../models/CustomersGranulesDeBois.js");
const CustomersGazElectrecite = require("../models/CustomersGazElectrecite.js");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");

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

const createCustomersClientFioul = (req, res, next) => {
  const secretKey = process.env.secret;
  CustomersClientFioul.create({ ...req.body, id: v4() })
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

const createCustomersGranulesDeBois = (req, res, next) => {
    CustomersGrnulesBois.create({ ...req.body, id: v4() })
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

const createCustomersGazElectrecite = (req, res, next) => {
    CustomersGazElectrecite.create({ ...req.body, id: v4() })
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

module.exports = {
  CustomerAuthentication,
  createCustomersClientFioul,
  createCustomersGranulesDeBois,
  createCustomersGazElectrecite,
  CustomerAuthenticationValidation,
};
