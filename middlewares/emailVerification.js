const Customers = require("../models/CustomersClientFioul");

require("dotenv").config()


const getemailValidation = (req, res) => {
    // http......./email/validation?token=é"'é'bjhbrezfdsèd54625rfe
    // 1- Capture the token from req.query
    const tokenEmail = req.query.token;
    // 2- Verify token using JWT
    try {
      const decoded = verify(tokenEmail, process.env.emailSecret);
  
      console.log("Decoded token: ", decoded);
  
      if (!decoded._id) {
        return next({
          message: "Couldn't capture the id from the token",
          status: 422,
        });
      } else {
        customers
          .updateOne({ _id: decoded._id }, { valid_account: true })
          .then((res) => {
            res.status(200).send({ message: "Account got activated" });
          })
          .catch((err) => {
            res.status(500).send({ ...err });
          });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  module.exports = getemailValidation;
  