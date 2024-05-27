const { model, Schema} = require("mongoose");

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

const CustomerFuelOil2 = model("CustomerFuelOil2",CustomerFuelOil2Schema,);

module.exports = CustomerFuelOil2;
