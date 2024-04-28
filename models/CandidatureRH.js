const {model,Schema} = require("mongoose");

const CandidatureRHSchema = new Schema({
    prenom: {
        type: String,
        required: true
      },
      nom: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      lettreMotivation: {
        type: String,
        required: true
      },
      cv: {
        type: String, 
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
}, { timestamps: true }) 

const CandidatureRH = model("Candidature",CandidatureRHSchema);

module.exports = CandidatureRH;