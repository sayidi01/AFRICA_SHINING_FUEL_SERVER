const express = require("express");

const bodyParser = require("body-parser");

const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");

const session = require("express-session");

const jwt = require("jsonwebtoken");

const cors = require("cors");

const morgan = require("morgan");


const customerRouter = require("./routes/CustomersRoutes");

const OrdersRouter = require("./routes/OrdersRouters");

const ProductsRouter = require("./routes/ProductsRoutes");

const DevisRouter = require("./routes/DevisRoutes");

const PricesRouter = require("./routes/PricesRouter");

const CandiatureRhRouter = require("./routes/CandidatureRhRoutes");

const ContactezNousRouter = require("./routes/ContactezNousRoutes");

const NewsLetterRouter = require("./routes/NewsLetterRoutes");




require("dotenv").config();

const PORT = 3000;

const connecting = require("./config/db.js");

const CustomersClientFioul = require("./models/CustomersClientFioul");
const CustomersClientGranulesBois = require("./models/CustomersGranulesDeBois");
const CustomersClientGazElectrecite = require("./models/CustomersGazElectrecite");

const isProd = process.env.NODE_ENV == "PRODUCTION"
console.log("Environment :", process.env.NODE_ENV)
console.log("usr and pass", process.env.user, process.env.pass)

connecting
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Express Setup

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const origin = isProd ? "https://asf.ma": "http://localhost:5173"
console.log("origin",origin)

app.use(
  cors({
    origin,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // enable credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204,
  })
);

app.use(cookieParser());

app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());

app.use(passport.session());

// LocalStrategy Customer

passport.use(
  "only-customer",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const customerFioul = await CustomersClientFioul.findOne({ email });
        const customerGranulesBois = await CustomersClientGranulesBois.findOne({
          email,
        });
        const customerGazElectrecite =
          await CustomersClientGazElectrecite.findOne({ email });

        const customer =
          customerFioul || customerGranulesBois || customerGazElectrecite;

        if (!customer) {
          return done(null, false, { message: "Not Found", status: 401 });
        }

        if (!bcrypt.compare(password, customer.password)) {
          return done(null, false, { message: "Wrong password", status: 401 });
        }

        // if (!customer.active) {
        //   return done(null, false, { message: "Customer banned", status: 401 });
        // }

        return done(null, customer);
      } catch (err) {
        console.log(err);
        return done(err);
      }
    }
  )
);

passport.serializeUser((Customer, done) => {
  done(null, Customer.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const customer = await CustomersClientFioul.findById(id);
    done(null, customer);
  } catch (err) {
    done(err);
  }
});

app.use((req, res, next) => {
  console.log("Cookies", req.cookies);

  next();
});

// Routes
app.use("/customer",customerRouter);

app.use("/orders",OrdersRouter );

app.use("/products",ProductsRouter);

app.use("/prices",PricesRouter);

app.use("/devis",DevisRouter);

app.use("/candidatureRH",CandiatureRhRouter);

app.use("/contactezNous",ContactezNousRouter);

app.use("/NewsLetter",NewsLetterRouter);




app.use((err, req, res, next) => {
  console.log("something went wrong", err);
  res
    .status(err.status ?? 500)
    .send({ message: err.message ?? "Something went wrong" });
});

app.listen(PORT, () => console.log("listening one the PORT: ", PORT));

module.exports = {
  isProd
}