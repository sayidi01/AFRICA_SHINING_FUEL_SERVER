const { Router } = require("express");

const CandidatureRhRouter = Router();

const rateLimit = require("express-rate-limit");

const upload = require("../upload/storing");

const { verifyTokenBackoffice} = require("../middlewares/authMiddlewares")
const {
  CreateCandiatureRH,getAllFormCandidatureRh, SearchFormCandidatureRh, DeleteCandidatureRh
} = require("../controllers/CandidatureRhControllers");


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
  });


// Create Candidature cv RH

CandidatureRhRouter.post("/", upload.single("cv"), CreateCandiatureRH);

// get all Form candidature Rh (cv)

CandidatureRhRouter.get("/",verifyTokenBackoffice,getAllFormCandidatureRh)

// Search Form candidature  Rh 

CandidatureRhRouter.get("/search",verifyTokenBackoffice ,SearchFormCandidatureRh)

// Delete Form candidature Rh (cv)

CandidatureRhRouter.delete("/:id",verifyTokenBackoffice, DeleteCandidatureRh)


module.exports = CandidatureRhRouter;
