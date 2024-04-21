const {model , Schema} = require("mongoose");

const OrdersSchema = new Schema({
    Products: {
        type: String,
        ref: 'Products',
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
    }

}, {timestamps: true})

const Orders = model("Orders", OrdersSchema);
module.exports = Orders