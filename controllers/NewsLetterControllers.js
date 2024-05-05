const NewsLetter = require("../models/NewsLetter");



// Create NewsLetter Email 


const CreateNewsLetter = (req,res) => {
    NewsLetter
    .create({...req.body})
    .then((data) => {
        console.log(data)
        res.status(201).json({message: "Votre NewsLetter envoyé", data})
    })
    .catch((err) => {
        console.log(err)
        res.status(400).send({ status: 400, ...err });
    })
}











module.exports = {CreateNewsLetter}