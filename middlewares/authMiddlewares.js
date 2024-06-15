const { body } = require("express-validator");
const passport = require("passport");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const CustomersClientGazoil = require("../models/CustomersClientGazoil");

const CustomersClientFuelOil2 = require("../models/CustomersFuelOil2");

const CustomersClientBoisChauffage = require("../models/CustomersBoisChauffage.js");

const Users = require("../models/Users.js")

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


const authSignUser = (req, res, next) => {
  passport.authenticate("admins-only", (err, user, info) => {
    if (err) {
      return next(err);
    }

    // Succ
    if (user) {
      req.data = user;
      req.backofficeUser = user;
      return next();
    } else {
      // Info
      next(info);
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

    res.cookie("accessToken", accesToken, {
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


// Generated Token User ASF 

const generatedTokenUserBackoffice = (req, res, next) => {
  if (req.backofficeUser) {
    console.log("token data user", req.backofficeUser);
    const accessTokenBackoffice = jwt.sign(
      { _id: req.backofficeUser._doc._id,  },
      process.env.secret,
      {
        expiresIn: "1d",
      }
    );

    const refreshTokenBackoffice = jwt.sign({ _id: req.backofficeUser._doc._id, }, secretKeyRf, {
      expiresIn: "1d",
    });

    req.accessTokenBackoffice = accessTokenBackoffice;
    req.refreshTokenBackoffice = refreshTokenBackoffice;

    res.cookie("accessTokenBackoffice", accessTokenBackoffice, {
      samehttponly: true,
      sameSite: "None",
      secure: true,
    });

    res.cookie("refreshTokenBackoffice", refreshTokenBackoffice, {
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

  if (decoded.type == "ClientGazoil") {
    customer = await CustomersClientGazoil.findById(decoded._id);
  } else if (decoded.type == "ClientFuelOil2") {
    customer = await CustomersClientFuelOil2.findById(decoded._id);
  } else if (decoded.type == "ClientBoisChauffage") {
    customer = await CustomersClientBoisChauffage.findById(decoded._id);
  } else {
    console.log("Decoded", decoded);
    throw new Error("Unknown type of user");
  }

  const newAccessToken = jwt.sign({ _id: customer._id, type: customer.customerType }, secret);
  console.log("newAccessToken", newAccessToken);
  res.cookie("accessToken", newAccessToken, {
    samehttponly: true,
    sameSite: "None",
    secure: true,
  });
  req.user = customer;
  req.customer = customer;
};

const refreshTokenBackOffice = async (req, res) => {
  const token = req.cookies.accessTokenBackoffice;
  if (!token)
    throw new Error("Session expired, login again (token not found)!");

  const secret = process.env.secret;
  if (!secret) throw new Error("Server error, failed to load token config");

  const decoded = jwt.verify(token, secretKeyRf);
  let user = Users.findById(decoded._id);

  const newAccessToken = jwt.sign({ _id: user._id }, secret);
  console.log("newAccessToken", newAccessToken);
  res.cookie("accessTokenBackoffice", newAccessToken, {
    samehttponly: true,
    sameSite: "None",
    secure: true,
  });
  req.user = user;
  req.backofficeUser = user;
  req.customer = customer;
};


// Verify Token Customer 
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
      if (decoded.type == "ClientGazoil") {
        customer = await CustomersClientGazoil.findById(decoded._id);
      } else if (decoded.type == "ClientFuelOil2") {
        customer = await CustomersClientFuelOil2.findById(decoded._id);
      } else if (decoded.type == "ClientBoisChauffage") {
        customer = await CustomersClientBoisChauffage.findById(decoded._id);
      } else {
        throw new Error("Unknown type of user");
      }
      console.log("customer", customer);
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


// Verify Toekn User ASF backoffice
const verifyTokenBackoffice = async (req, res, next) => {
  const token = req.cookies.accessTokenBackoffice;
  console.log("req.cookies", req.cookies);

  if (!token) {
    return res.status(401).json({ message: "No token user provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.secret);
    console.log("Decoded --", decoded);

    let user;

    try {
      console.log("Finding user with _id:", decoded._id);
      user = await Users.findById(decoded._id);
      console.log("user", user);

      if (!user) {
        console.log("User not found for _id:", decoded._id);
        return res.status(401).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error finding user:", error);
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;
    req.backofficeUser = user;
    req.customer = user;

    next();
  } catch (error) {
    console.log("my error", error);
    try {
      await refreshTokenBackOffice(req, res);
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
  verifyToken,
  authSignUser,
  generatedTokenUserBackoffice,
  verifyTokenBackoffice
};
