const {Schema , model } = require('mongoose');
const bcrypt = require('bcrypt'); 

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


UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

const Users = model("users", UserSchema)

module.exports = Users

