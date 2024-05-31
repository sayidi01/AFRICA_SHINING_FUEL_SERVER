const { Router } = require("express");

const CandidatureRhRouter = Router();

const rateLimit = require("express-rate-limit");

const upload = require("../upload/storing");

const { verifyRecaptcha, verifyToken} = require("../middlewares/authMiddlewares")
const {
  CreateCandiatureRH,
} = require("../controllers/CandidatureRhControllers");


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
  });


// Create Candidature cv RH

CandidatureRhRouter.post("/", upload.single("cv"),verifyToken, CreateCandiatureRH);

module.exports = CandidatureRhRouter;
