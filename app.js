const express = require("express");

const bodyParser = require("body-parser");

const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const csurf = require("csurf");

const cookieParser = require("cookie-parser");

const session = require("express-session");

const jwt = require("jsonwebtoken");

const cors = require("cors");

const morgan = require("morgan");

const rateLimit = require("express-rate-limit");

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

const connecting = require("../server/config/db.js");

const CustomersClientFioul = require("./models/CustomersClientFioul");
const CustomersClientGranulesBois = require("../server/models/CustomersGranulesDeBois");
const CustomersClientGazElectrecite = require("../server/models/CustomersGazElectrecite");

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
// app.use(limiter);

app.use(
  cors({
    origin: "http://localhost:5173",
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

        if (!customer.comparePassword(password)) {
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
app.use("/customer", customerRouter);

app.use("/orders",OrdersRouter );

app.use("/products", ProductsRouter);

app.use("/prices", PricesRouter);

app.use("/devis", DevisRouter);

app.use("/candidatureRH", CandiatureRhRouter);

app.use("/contactezNous", ContactezNousRouter);

app.use("/NewsLetter", NewsLetterRouter);




app.use((err, req, res, next) => {
  console.log("something went wrong", err);
  res
    .status(err.status ?? 500)
    .send({ message: err.message ?? "Something went wrong" });
});

app.listen(PORT, () => console.log("listening one the PORT: ", PORT));
