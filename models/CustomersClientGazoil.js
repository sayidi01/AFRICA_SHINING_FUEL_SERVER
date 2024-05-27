const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const CustomersClientGazoilSchema = new Schema(
  {
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
      enum: ["ClientGazoil"],
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
      first_name: {
        type: String,
      },
      last_name: {
        type: String,
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
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password before saving
CustomersClientGazoilSchema.pre("save", async function (next) {
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
CustomersClientGazoilSchema.methods.comparePassword = function (
  candidatePassword
) {
  return bcrypt.compare(candidatePassword, this.password);
};

const CustomersClientGazoil = model(
  "CustomersClientGazoil",
  CustomersClientGazoilSchema
);

module.exports = CustomersClientGazoil;
