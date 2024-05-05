const { body } = require("express-validator");
const passport = require("passport");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const CustomersClientFioul = require("../models/CustomersClientFioul");

const CustomersClientGranulesDeBois = require("../models/CustomersGranulesDeBois");

const CustomersClientGazElectrecite = require("../models/CustomersGazElectrecite");

const secretKeyRf = "smkmo99yamudiwehgdbi";

const LoginValidator = [
  body("email")
    .isEmail()
    .withMessage("please enter a valid e-mail")
    .normalizeEmail()
    .trim()
    .escape(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password not strong  enough")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .withMessage(
      "The password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
    ),
];

//recaptcha.init(process.env.RECAPTCHA_SITE_KEY, process.env.RECAPTCHA_SECRET_KEY);

// Middleware de vérification ReCaptcha

const authsignCustomer = (req, res, next) => {
  passport.authenticate("only-customer", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (user) {
      console.log("passport Stratey - user : ", user);
      req.user = user;
      return next();
    } else {
      console.log("passport - info", info);
      return res.status(401).json(info);
    }
  })(req, res, next);
};

const generatedToken = (req, res, next) => {
  if (req.user) {
    console.log("token data", req.user);
    const accesToken = jwt.sign(
      { _id: req.user._doc._id, type: req.user._doc.customerType },
      process.env.secret,
      {
        expiresIn: "1d",
      }
    );

    const refreshToken = jwt.sign({ _id: req.user._doc._id, type: req.user._doc.customerType }, secretKeyRf, {
      expiresIn: "1d",
    });

    req.accesToken = accesToken;
    req.refreshToken = refreshToken;

    res.cookie("accesToken", accesToken, {
      samehttponly: true,
      sameSite: "None",
      secure: true,
    });

    res.cookie("refreshToken", refreshToken, {
      sameSite: true,
      sameSite: "None",
      secure: true,
    });

    next();
  } else {
    next({ message: "Something went wrong while generating tokens" });
  }
};

const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token)
    throw new Error("Session expired, login again (token not found)!");

  const secret = process.env.secret;
  if (!secret) throw new Error("Session expired, login again (auth issue)!");

  console.log("Hello");

  const decoded = jwt.verify(token, secretKeyRf);
  let customer;

  if (decoded.type == "ClientFioul") {
    customer = await CustomersClientFioul.findById(decoded._id);
  } else if (decoded.type == "ClientGranulésDeBois") {
    customer = await CustomersClientGranulesDeBois.findById(decoded._id);
  } else if (decoded.type == "ClientGaz&Èlectrecité") {
    customer = await CustomersClientGazElectrecite.findById(decoded._id);
  } else {
    console.log("Decoded", decoded);
    throw new Error("Unknown type of user");
  }

  const newAccessToken = jwt.sign({ _id: customer._id, type: customer.customerType }, secret);
  console.log("newAccessToken", newAccessToken);
  res.cookie("accesToken", newAccessToken, {
    samehttponly: true,
    sameSite: "None",
    secure: true,
  });
  req.user = customer;
  req.customer = customer;
};

const isCustomer = (req, res, next) => {
  const role = req?.data?.role;

  if (!role) {
    return next();
  }

  res.status(403).json({ message: "you don't have enough privilege" });
};

const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log("req.cookies", req.cookies);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.secret);

    // Decoded -- {_id: ""}
    console.log("Decoded --", decoded);

    let customer;

    try {
      if (decoded.type == "ClientFioul") {
        customer = await CustomersClientFioul.findById(decoded._id);
      } else if (decoded.type == "ClientGranulésDeBois") {
        customer = await CustomersClientGranulesDeBois.findById(decoded._id);
      } else if (decoded.type == "ClientGaz&Èlectrecité") {
        customer = await CustomersClientGazElectrecite.findById(decoded._id);
      } else {
        throw new Error("Unknown type of user");
      }
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Invalid token" });
    }

    console.log("customer", customer);

    req.user = customer;
    req.customer = customer;

    next();
  } catch (error) {
    console.log("my error", error);
    try {
      await refreshToken(req, res);
      console.log("Yes");
      next();
    } catch (error) {
      console.log("No", error);
      return res.status(401).json({ message: "Session expired, login again!" });
    }
  }
};

module.exports = {
  LoginValidator,
  authsignCustomer,
  generatedToken,
  isCustomer,
  verifyToken,
};
