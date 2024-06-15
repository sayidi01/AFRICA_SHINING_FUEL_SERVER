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

const UsersRouter = require("./routes/UsersRoutes");

require("dotenv").config();

// PORT
const PORT = 3000;

// Connecting Data Base

const connecting = require("./config/db.js");

const CustomersClientGazoil = require("./models/CustomersClientGazoil");
const CustomersClientFuelOil2 = require("./models/CustomersFuelOil2");
const CustomersClientBoisChauffage = require("./models/CustomersBoisChauffage.js");
const Users = require("./models/Users");

const isProd = process.env.NODE_ENV.toUpperCase() == "PRODUCTION";
console.log("Environment :", process.env.NODE_ENV);
console.log("usr and pass", process.env.user, process.env.pass);

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

const origin = isProd
  ? ["https://asf.ma", "https://backoffice.asf.ma"]
  : ["http://localhost:5173", "http://localhost:5174"];
console.log("origin", origin);

app.use(
  cors({
    origin: origin,
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
        const customerGazoil = await CustomersClientGazoil.findOne({ email });
        const customerFuelOil2 = await CustomersClientFuelOil2.findOne({
          email,
        });
        const customerBoisChauffage =
          await CustomersClientBoisChauffage.findOne({ email });

        const customer =
          customerGazoil || customerFuelOil2 || customerBoisChauffage;

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

// Local strategy Users

passport.use(
  "admins-only",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await Users.findOne({ email });
        console.log("finding user - ", user);
        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }
        const isValid = password === user.password;
        if (!isValid) {
          return done(null, false, { message: "Invalid email or password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((Customer, done) => {
  done(null, Customer);
});

passport.deserializeUser(async (customer, done) => {
  console.log("Customer", customer)
  try {
    // customerType:
    // ClientGazoil, ClientFuelOil2, ClientBoisChauffage, undefined
    const customerType = customer.customerType;
    if (!customer.customerType) {
      // he's an user (admin, manager)
      const user = Users.findById(customer._id);
      done(null, user);
      return;
    }

    switch (customerType) {
      case "ClientGazoil":
        const customerClientGazoil = await CustomersClientGazoil.findById(customer._id);
        done(null, customerClientGazoil);
        break;
        
      case "ClientGazoil":
        const customerClientFuel = await CustomersClientFuelOil2.findById(customer._id);
        done(null, customerClientFuel);
        break;
        
      case "ClientBoisChauffage":
        const customerClientBoisChauffage = await CustomersClientBoisChauffage.findById(customer._id);
        done(null, customerClientBoisChauffage);
        break;
    
      default:
        done(null, false);
        break;

      }
      return;

  } catch (err) {
    done(err);
  }
});

app.use((req, res, next) => {
  console.log("Cookies", req.cookies);

  next();
});

// Routes
app.use("/customer", customerRouter);

app.use("/orders", OrdersRouter);

app.use("/products", ProductsRouter);

app.use("/prices", PricesRouter);

app.use("/devis", DevisRouter);

app.use("/candidatureRH", CandiatureRhRouter);

app.use("/contactezNous", ContactezNousRouter);

app.use("/NewsLetter", NewsLetterRouter);

app.use("/users", UsersRouter);

app.use((err, req, res, next) => {
  console.log("something went wrong", err);
  res
    .status(err.status ?? 500)
    .send({ message: err.message ?? "Something went wrong" });
});

app.listen(PORT, () => console.log("listening one the PORT: ", PORT));

module.exports = {
  isProd,
};
