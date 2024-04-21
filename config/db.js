const mongoose = require("mongoose");

require("dotenv").config()

const url = process.env.DB_URI; 

const connecting = mongoose.connect(url,{dbName: 'AFRICA_SHINING_FUEL'});

module.exports = connecting;

