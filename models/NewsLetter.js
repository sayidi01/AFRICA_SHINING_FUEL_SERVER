const {model, Schema} = require("mongoose")


const NewsLetterSchema = new Schema({
    email : {
        type: String,
        required: true
    }
}, { timestamps: true })


const NewsLetter = model("NewsLetter", NewsLetterSchema)

module.exports = NewsLetter;


