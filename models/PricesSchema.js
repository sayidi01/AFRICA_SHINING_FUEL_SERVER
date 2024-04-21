const { model, Schema } = require("mongoose");

const PricePerCitySchema = new Schema({
    city_name: {
        type: String,
        required: true
    },
    code_postal: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const PricePerCity = model('PricePerCity', PricePerCitySchema, 'pricePerCity');

module.exports = PricePerCity;
