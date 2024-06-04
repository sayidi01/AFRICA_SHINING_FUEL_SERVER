const {model , Schema} = require('mongoose')

const {v4: uuidv4} = require("uuid")


const ProductsSchema =  new Schema ({
    _id: {
        type: String,
        default: uuidv4
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true
    },

}, { timestamps: true })


const Products = model("products",ProductsSchema )

module.exports = Products;