
const ContactezNous = require("../models/ContactezNous")


// cretae Form contaztez-nous

const CreateFormContactezNous = (req, res) => {
    ContactezNous
    . create({...req.body})
    .then((data) => {
      console.log(data)
      res.status(201).json({ message: "Votre Formulaire a envoyer", data });      
    })
    .catch((err) => {
        console.log("err", err);
        res.status(400).send({ status: 400, ...err })})

}






module.exports = {CreateFormContactezNous}