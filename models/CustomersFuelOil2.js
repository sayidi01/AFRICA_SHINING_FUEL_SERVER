const { model, Schema} = require("mongoose");

const bcrypt = require("bcryptjs");

const CustomerFuelOil2Schema = new Schema(
  {
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
      enum: ["ClientFuelOil2"],
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
    
  },
  { timestamps: true }
);


// Pre-save middleware to hash the password before saving
CustomerFuelOil2Schema.pre("save", async function (next) {
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
CustomerFuelOil2Schema.methods.comparePassword = function (
  candidatePassword
) {
  return bcrypt.compare(candidatePassword, this.password);
};

const CustomerFuelOil2 = model("CustomerFuelOil2",CustomerFuelOil2Schema,);

module.exports = CustomerFuelOil2;
