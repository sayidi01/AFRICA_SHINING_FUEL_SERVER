const { model, Schema, Types } = require("mongoose");

const OrdersSchema = new Schema(
  {
    customer_id: {
      type: String,
      ref: function () {
        return this.customerType === "ClientGazoil"
          ? require("../models/CustomersClientGazoil")
          : this.customerType === "ClientFuelOil2"
          ? require("../models/CustomersFuelOil2")
          : this.customerType === "ClientBoisChauffage"
          ? require("../models/CustomersBoisChauffage.js")
          :null
      },

      required: true,
    },
    customerType: {
      type: String,
      enum: ["ClientFuelOil2", "ClientBoisChauffage", "ClientGazoil"],
      required: true
    },
    Products: {
      type: String,

      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    order_date: {
      type: Date,
      required: true,
      default: () => new Date()
    },
    TotalPrice: {
      type: Number,
      required: true,
    },
    ville: {
      type: String,
      required: true,
    },
    deliveryType: {
      type: String,
      enum: ["standard", "rapide", "express"],
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    nom: {
      type: String,
      required: true,
    },
    codePostal: {
      type: Number,
      required: true,
    },
    telephone: {
      type: Number,
      required: true,
    },
    adresse: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Orders = model("Orders", OrdersSchema);
module.exports = Orders;
