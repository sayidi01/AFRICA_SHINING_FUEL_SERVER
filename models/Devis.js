const { model, Schema, Types } = require("mongoose");

const DevisSchema = new Schema({
  civilité: {
    type: String,
    enum: ["Mme", "Mr"],
    required: true,
  },
  TypeDevis: {
    type: String,
    enum: ["Devis Gasoil ", "Devis Fuel oil n° 2", "Devis Lubrifiants", "Devis Hydrogène vert", "Devis Citerne", "Devis Borne De Recharge", "Devis Produits De Nettoyage", "Devis Bois Chauffage", "Devis Bitume"],
    required: true,
    
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  Société: {
    type: String,
    required: true,
  },
  telephone: {
    type: Number,
    required: true,
  },
  Volume: {
    type: Number,
    required: true,
  },
  informations_Complémentaires: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
 
},
{ timestamps: true });

const Devis = model("Devis", DevisSchema);

module.exports = Devis;
