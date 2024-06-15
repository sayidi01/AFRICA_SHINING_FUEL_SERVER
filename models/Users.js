const {Schema , model } = require('mongoose');

const UserSchema = new Schema({
    id: {
        type : String,
        required : true,
        unique : true
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
       
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }

}, { timestamps: true })

const Users = model("users", UserSchema)

module.exports = Users

