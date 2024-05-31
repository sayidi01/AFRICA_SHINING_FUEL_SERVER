const {model, Schema} = require("mongoose");

const ContactezNousSchema = new Schema({
    contactType: {
        type: String,
        required: true,
        enum: ["contact", "investisseurs", "commercial", "rh", "sav"],
      },
      lastName: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
       
      },
      department: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
}, { timestamps: true })

const ContactezNous = model("ContactezNous", ContactezNousSchema)

module.exports = ContactezNous;