const ContactezNous = require("../models/ContactezNous");
const { transporter } = require("../middlewares/sendEmailCustomer");

// cretae Form contaztez-nous

const CreateFormContactezNous = (req, res) => {
  ContactezNous.create(req.body)
    .then(async (data) => {
      const mailOptionsToCustomer = {
        from: "contact@asf.ma",
        to: req.body.email,
        subject: "Confirmation Formulaire Contactez-Nous",
        html: ` <div style="font-family: Arial, sans-serif; line-height: 1.5;"> 
        <b>Cher(ère)   ${req.body.firstName}</b> <br>

        Nous vous remercions d'avoir pris contact avec Africa Shining Fuel.<br>
         Nous avons bien reçu votre message et nous vous en remercions.<br>

        Un membre de notre équipe traitera votre demande dans les plus brefs délais.<br>

       
        Bien sincèrement,<br>

        Votre équipe Africa Shining Fuel<br>

         Pour toute information complémentaire, vous pouvez nous contacter en utilisant la rubrique « Contact » de notre site ou par téléphone du lundi au vendredi, de 7 h à 20 h, et le<br>
         samedi de 9 h à 17 h au numéro suivant : 0700 738 084 <br>

          Cordialement<br>

          J.M. Senhaji<br>
          ASF [Africa Shining Fuel]<br>
          sales@asf.ma<br>
         CFC Anfa<br>
        0 700 738 084<br>
        <img src="https://asf.ma/Logo.png" alt="Logo" width="200" style="display: block; margin-top: 20px;" />       <div/> `,
      };
      const mailOptionsToBoard = {
        from: "contact@asf.ma",
        to: "contact@asf.ma",
        subject: "Formulaire Contactez-Nous",
        html: `
         
       Contact Type : ${req.body.contactType}<br>
       
       Nom: ${req.body.lastName} <br>

       Prenom :  ${req.body.firstName} <br>

       Téléphone : ${req.body.phone} <br>

       Email:  ${req.body.email} <br>

       Departement : ${req.body.department} <br>

       Subject: ${req.body.subject} <br>

       Message : ${req.body.message} <br>
        
        <img src="https://asf.ma/Logo.png" alt="Logo" width="200" style="display: block; margin-top: 20px;" />
        `,
      };

      transporter.sendMail(mailOptionsToCustomer, (err, info) => {
        if (err) {
          console.log(err);
        }

        console.log(info);
      });

      transporter.sendMail(mailOptionsToBoard, (err, info) => {
        if (err) {
          console.log(err);
        }

        console.log(info);
      });
      console.log(data);
      res.status(201).json({ message: "Votre Formulaire a envoyer", data });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).send({ status: 400, ...err });
    });
};

// Get all Forms contaztez-nous

const GetAllFormsContactezNous = (req, res) => {
  ContactezNous.find()
    .then((data) => {
      console.log(data);
      res.send({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "vous n'avez pas assez de privilèges contactez-nous",
      });
    });
};

// DELETE Form contaztez-nous

const deleteFormContactezNous = (req, res) => {
  const contactId = req.params.id;

  ContactezNous.deleteOne({ _id: contactId })
    .then((data) => {
      console.log(data);
      res
        .status(200)
        .json({ message: " Form contactez-nous supprimée avec succès", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: 500, ...err });
    });
};

// Serach Form  contaztez-nous

const SearchFormContactezNous = (req, res) => {
  const textSearchForm = req.query.query;

  if (!textSearchForm) {
    return res.status(400).json({ error: "Search query is required" });
  }
  ContactezNous.find({
    $or: [
      { contactType: { $regex: textSearchForm, $options: "i" } },
      { lastName: { $regex: textSearchForm, $options: "i" } },
      { firstName: { $regex: textSearchForm, $options: "i" } },
      { email: { $regex: textSearchForm, $options: "i" } },
      { department: { $regex: textSearchForm, $options: "i" } },
      { subject: { $regex: textSearchForm, $options: "i" } },
      { message: { $regex: textSearchForm, $options: "i" } },
    ],
  })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = {
  CreateFormContactezNous,
  GetAllFormsContactezNous,
  deleteFormContactezNous,
  SearchFormContactezNous,
};
