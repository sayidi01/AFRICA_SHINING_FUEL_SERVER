const {model, Schema} = require("mongoose")

const CustomersClientGazElectreciteSchema = new Schema({
    referenceClient: {
        type: String,
        required: true
      },
      numeroPCEouPDL: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      customerType: {
        type: String,
        required: true,
        enum: ["ClientGaz&Èlectrecité"],
      },
    
},  { timestamps: true })

const CustomersClientGazElectrecite = model("CustomersClientGazElectrecite", CustomersClientGazElectreciteSchema);

module.exports = CustomersClientGazElectrecite;
