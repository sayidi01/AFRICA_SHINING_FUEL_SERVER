const {model, Schema} = require("mongoose")

const CustomersClientBoisChauffageSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
    unique: true,
  },
  last_name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  customerType: {
    type: String,
    required: true,
    enum: ["ClientBoisChauffage"],
  },
  telephone: {
    type: Number,
  },
  adresse: {
    type: String,
  },
  ville: {
    type: String,
  },
  codePostal: {
    type: Number,
  },
  addresseLivraison: {
    telephone: {
      type: Number,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    adresse: {
      type: String,
    },
    ville: {
      type: String,
    },
    codePostal: {
      type: Number,
    },
  },
  addresseFacturation: {
    telephone: {
      type: Number,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    adresse: {
      type: String,
    },
    ville: {
      type: String,
    },
    codePostal: {
      type: Number,
    },
  },
  
  
},  { timestamps: true })

const CustomersClientBoisChauffage = model("CustomersClientBoisChauffage",CustomersClientBoisChauffageSchema);

module.exports = CustomersClientBoisChauffage;
