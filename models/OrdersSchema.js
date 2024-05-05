const {model , Schema} = require("mongoose");

const OrdersSchema = new Schema({
    customer_id: {
        type: String,
        ref: 'CustomersClientFioul',
        required: true
    },
    Products: {
        type: String,
        ref: 'products',
        required: true
    },
    Quantity: {
        type: Number,
        required: true,
    },
    order_date: {
        type: Date,
        required: true,
        default: new Date().toString(),
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
        enum: ['standard', 'rapide', 'express'],
        required: true
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
    }
}, {timestamps: true})

const Orders = model("Orders", OrdersSchema);
module.exports = Orders