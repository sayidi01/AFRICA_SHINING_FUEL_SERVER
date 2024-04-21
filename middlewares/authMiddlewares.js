const {body} = require("express-validator");
const passport = require("passport");
require('dotenv').config()
const jwt = require("jsonwebtoken")

const CustomersClientFioul = require('../models/CustomersClientFioul')

const CustomersClientGranulesDeBois = require("../models/CustomersGranulesDeBois")

const CustomersClientGazElectrecité = require("../models/CustomersGazElectrecite");
const CustomersClientGazElectrecite = require("../models/CustomersGazElectrecite");


const LoginValidator = [
    
    body("email")
    .isEmail()
    .withMessage("please enter a valid e-mail")
    .normalizeEmail()
    .trim()
    .escape(),
    body("password")
    .isLength({min: 8})
    .withMessage("password not strong  enough")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .withMessage("The password must contain at least one uppercase letter, one lowercase letter, one number and one special character.")
   

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

const generatedToken = (req,res,next) => {
    const secretKeyRf = 'smkmo99yamudiwehgdbi';

    if(req.user) {
        console.log('token data', req.user)
        const accesToken = jwt.sign({_id: req.user._doc._id}, process.env.secret,
            {
                expiresIn: '1d'
            });
    
            const refreshToken = jwt.sign({_id: req.user._doc._id}, secretKeyRf,{expiresIn: '1d'})
    
            req.accesToken = accesToken;
            req.refreshToken = refreshToken;
    
            res.cookie("accesToken", accesToken, {
                samehttponly : true,
                sameSite: 'None',
                secure: true
            });
    
            res.cookie("refreshToken", refreshToken, {
                sameSite: true,
                sameSite: 'None',
                secure: true
            })
    
            next()
    }else{
        next({message: "Something went wrong while generating tokens"})
    }

};

const isCustomer = (req,res,next) => {
    const role = req?.data?.role

    if(!role) {
        return next()
    }

    res.status(403).json({message: "you don't have enough privilege"})
}

const verifyToken = async (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Decoded -- {_id: ""}
        console.log("Decoded --", decoded);
        //const user = await Users.findById(decoded._id);
        //console.log("user", user);

        let customer;

        try {
            customer = await Promise.any([
                CustomersClientFioul.findById(decoded._id),
                CustomersClientGranulesDeBois.findById(decoded._id),
                CustomersClientGazElectrecite.findById(decoded._id),
            ]);
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Invalid token' });
        }

        console.log("customer", customer);

        req.user = user;
        req.customer = customer;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};




module.exports = {LoginValidator, authsignCustomer, generatedToken, isCustomer, verifyToken}