const {model, Schema} = require("mongoose")

const CustomersClientBoisChauffageSchema = new Schema({
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
    enum: ["ClientBoisChauffage"],
  },
  
},  { timestamps: true })

const CustomersClientBoisChauffage = model("CustomersClientBoisChauffage",CustomersClientBoisChauffageSchema);

module.exports = CustomersClientBoisChauffage;
