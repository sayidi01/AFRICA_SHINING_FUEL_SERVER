const { Router } = require("express");

const CandidatureRhRouter = Router();

const rateLimit = require("express-rate-limit");

const upload = require("../upload/storing");

const { verifyToken} = require("../middlewares/authMiddlewares")
const {
  CreateCandiatureRH,getAllFormCandidatureRh, SearchFormCandidatureRh, DeleteCandidatureRh
} = require("../controllers/CandidatureRhControllers");


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
  });


// Create Candidature cv RH

CandidatureRhRouter.post("/", upload.single("cv"),verifyToken, CreateCandiatureRH);

// get all Form candidature Rh (cv)

CandidatureRhRouter.get("/",getAllFormCandidatureRh)

// Search Form candidature  Rh 

CandidatureRhRouter.get("/search",SearchFormCandidatureRh)

// Delete Form candidature Rh (cv)

CandidatureRhRouter.delete("/:id", DeleteCandidatureRh)


module.exports = CandidatureRhRouter;
