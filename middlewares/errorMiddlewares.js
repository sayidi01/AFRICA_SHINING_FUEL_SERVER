const {validationResult} = require("express-validator")



const checkError = (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        console.log("errors :",error) 
        return res.status(400).json({errors: error.array()})
    } 
    next()
} 

module.exports = checkError;