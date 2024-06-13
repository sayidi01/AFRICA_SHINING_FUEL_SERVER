const Devis = require("../models/Devis");
const { transporter } = require("../middlewares/sendEmailCustomer");
// Create new Devis Customer

const CreateDevis = (req, res) => {
  Devis.create({ ...req.body })
    .then(async (data) => {
      const mailOptionsToCustomer = {
        from: "contact@asf.ma",
        to: req.user.email,
        subject: "Confirmation Devis",
        html: ` <div style="font-family: Arial, sans-serif; line-height: 1.5;"> 
        <b>Cher(ère)   ${req.body.prenom}  ${req.body.nom} </b> <br>
        
        Nous vous remercions d'avoir pris contact avec Africa Shining Fuel et d'avoir rempli notre formulaire de demande de devis.<br>

        Nous avons bien reçu votre demande et nous la traitons avec la plus grande attention.<br> 
        Un membre de notre équipe vous contactera sous peu pour vous fournir une estimation détaillée et répondre à toutes vos questions éventuelles.<br>
       
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
        subject: "Devis reçu",
        html: `
        Type Devis : ${req.body.TypeDevis}<br>

        civilité: ${req.body.civilité}<br>
        
        Nom: ${req.body.nom}<br>

        Prenom: ${req.body.prenom}<br>

        Société: ${req.body.Société}<br>

        Tèlèphone: ${req.body.telephone}<br>

        Volume:  ${req.body.Volume}<br>

        informations Complémentaires:  ${req.body.informations_Complémentaires}<br>

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
      res.status(201).json({ message: "Votre devis  envoyer", data });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).send({ status: 400, ...err });
    });
};

// Get all Devis Customer

const getAllDevis = (req, res) => {
  Devis.find()
    .then((data) => {
      console.log(data);
      res.send({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "vous n'avez pas recuperer les devis" });
    });
};

// Delete Devis 

const deleteDevis = (req,res) => {
  const devisId = req.params.id
  Devis
  .deleteOne({_id: devisId})
  .then((data) => {
    console.log(data)
    res.status(200).json({ message: "Devis supprimée avec succès", data });
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({ status: 500, ...err });
  })
}


// Search Devis Customer 

const SearchDevis = (req,res) => {
  const textSearchDevis = req.query.query;


  if (!textSearchDevis) {
    return res.status(400).json({ error: "Search query is required" });
  }
  Devis
  .find({
    $or : [
      {civilité: { $regex: textSearchDevis, $options: "i" } },
      {nom: { $regex: textSearchDevis, $options: "i" } },
      {prenom: { $regex: textSearchDevis, $options: "i" } },
      { Société: { $regex: textSearchDevis, $options: "i" } },
      { informations_Complémentaires: { $regex: textSearchDevis, $options: "i"}}
    ]
  })
  .then((data) => {
    return res.status(200).json(data);
  })
  .catch((err) => {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  });
}


module.exports = { CreateDevis, getAllDevis , deleteDevis, SearchDevis};
