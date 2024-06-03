const CandidatureRH = require("../models/CandidatureRH");
const { handleUpload } = require("../upload/clouadinary");

const { transporter } = require("../middlewares/sendEmailCustomer");

// Create Candidature Upload cv 

const CreateCandiatureRH = async (req, res) => {

    try{
        console.log(req.file)
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cloudRES = await handleUpload(dataURI);
        // cloudRES: { name: ..., url: ..., date: ..., ........... }
        console.log(cloudRES);
        const fileURL = cloudRES.url;


        CandidatureRH
        .create({...req.body, cv: fileURL})
        .then(async(resp) => {
            const mailOptionsToCustomer = {
                from: "contact@asf.ma",
                to: req.user.email,
                subject: "Confirmation de réception de votre candidature",
                html: ` <div style="font-family: Arial, sans-serif; line-height: 1.5;"> 
                <b>Cher(ère)   ${req.body.prenom}</b> <br>

                Nous vous remercions d'avoir soumis votre candidature pour un poste au sein de notre entreprise. Nous avons bien reçu votre CV et votre lettre de motivation, et nous vous en remercions. <br>

                Votre candidature sera examinée avec attention par notre équipe de recrutement. Si votre profil correspond à nos besoins actuels, nous vous contacterons pour discuter des prochaines étapes du processus de recrutement.<br>

                 En attendant, nous vous invitons à visiter notre site web pour en apprendre davantage sur notre entreprise et nos opportunités de carrière.<br>

                 Nous vous remercions encore une fois pour votre intérêt à rejoindre notre équipe et nous vous souhaitons bonne chance pour la suite de votre candidature.<br>
               
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
                subject: " Formulaire Candidature RH",
                html: `
               
                Prenom: ${req.body.prenom} <br>

                Nom: ${req.body.nom} <br>

                Email : ${req.body.email} <br>

                Lettre Motivation : ${req.body.lettreMotivation} <br>

                Cv :  ${req.body.cv} <br>
        
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
            console.log(resp)
            res.json(resp)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "Une erreur s'est produite lors de la création de la candidature." });
        })

    } catch (error) {
        console.log(error);
        res.send({
          message: error.message,
        });
      }
   


}


// Get all form candidature Rh (cv)

const getAllFormCandidatureRh =  (req,res) => {
  CandidatureRH
  .find()
  .then((data) => {
    console.log(data)
    res.send({ data });
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({ message: "vous n'avez pas recuperer les Forms Candidatures" });
  })
}

// Serach Form form candidature Customer Rh (cv)

const SearchFormCandidatureRh = (req,res) => {
  const textSearchCandidatureRH = req.query.query;

  if (!textSearchCandidatureRH) {
    return res.status(400).json({ error: "Search query is required" });
  }

  CandidatureRH
  .find({
    $or: [
      {prenom: { $regex: textSearchCandidatureRH, $options: "i" } },
      {nom: { $regex:textSearchCandidatureRH, $options: "i" } },
      {email: { $regex: textSearchCandidatureRH, $options: "i" } },
      {lettreMotivation:  { $regex: textSearchCandidatureRH, $options: "i" } }
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


// Delete Form Candiature RH 

const DeleteCandidatureRh = (req,res) => {
  const candidatureId = req.params.id

  CandidatureRH
  .deleteOne({_id: candidatureId})
  .then((data) => {
    console.log(data)
    res.status(200).json({ message: " Form Candidature supprimée avec succès", data });
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({ status: 500, ...err });
  })
}















module.exports ={CreateCandiatureRH, getAllFormCandidatureRh, SearchFormCandidatureRh, DeleteCandidatureRh}