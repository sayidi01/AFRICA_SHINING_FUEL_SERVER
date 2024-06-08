const {model , Schema} = require('mongoose')



const ProductsSchema =  new Schema ({
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