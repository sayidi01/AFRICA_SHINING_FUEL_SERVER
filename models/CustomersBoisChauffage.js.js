const {model, Schema} = require("mongoose")
const bcrypt = require("bcryptjs");

const CustomersClientBoisChauffageSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
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


// Pre-save middleware to hash the password before saving
CustomersClientBoisChauffageSchema.pre("save", async function (next) {
  // Hash the password if it's modified or new
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

// Method to compare passwords
CustomersClientBoisChauffageSchema.methods.comparePassword = function (
  candidatePassword
) {
  return bcrypt.compare(candidatePassword, this.password);
};


const CustomersClientBoisChauffage = model("CustomersClientBoisChauffage",CustomersClientBoisChauffageSchema);

module.exports = CustomersClientBoisChauffage;
