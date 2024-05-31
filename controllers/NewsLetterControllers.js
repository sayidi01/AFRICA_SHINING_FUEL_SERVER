const NewsLetter = require("../models/NewsLetter");

const { transporter } = require("../middlewares/sendEmailCustomer");


// Create NewsLetter Email 


const CreateNewsLetter = (req,res) => {
    NewsLetter
    .create({...req.body})
    .then(async(data) => {
        const mailOptionsToCustomer = {
            from: "contact@asf.ma",
            to: req.user.email,
            subject: "Confirmation News Letter",
            html: ` <div style="font-family: Arial, sans-serif; line-height: 1.5;"> 
            <b>Cher(ère)   ${req.body.prenom}</b> <br>

            Nous sommes ravis de vous accueillir dans notre communauté ! <br>
             Nous vous confirmons que vous avez été inscrit(e) avec succès à notre newsletter. <br>

            À partir de maintenant, vous recevrez régulièrement des informations sur nos dernières offres, nos nouveautés produits et nos actualités. <br>

             Nous nous engageons à vous fournir un contenu pertinent et intéressant.<br>

           
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
            subject: "News Letter reçu",
            html: `
             
            Email : ${req.body.email}
            
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
        console.log(data)
        res.status(201).json({message: "Votre NewsLetter envoyé", data})
    })
    .catch((err) => {
        console.log(err)
        res.status(400).send({ status: 400, ...err });
    })
}



// GET all Email News LETTER 

const getallEmailNewsLetter = (req,res) => {
  NewsLetter
  .find()
  .then((data) => {
    console.log(data)
    res.send({data})
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({ message: "vous n'avez pas assez de privilèges News Letter" });
  })
}

// Search Email News LETTER 


const SearchNewsLetter = (req,res) => {
  const textSearchNewsLetter = req.query.query
  if (!textSearchNewsLetter) {
    return res.status(400).json({ error: "Search query is required" });
  }

  NewsLetter
  .find({
    $or: [
      {email: { $regex: textSearchNewsLetter, $options: "i" } },
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


// Delete newsLetter Customer

const deleteNewsLetter = (req,res) => {
  const NewsId = req.params.id
  NewsLetter
  .deleteOne({_id: NewsId})
  .then((data) => {
    console.log(data)
    res.status(200).json({ message: " NewsLetter supprimée avec succès", data });
  })
  .catch((err)=> {
    console.log(err)
    res.status(500).send({ status: 500, ...err });
  })
}












module.exports = {CreateNewsLetter, getallEmailNewsLetter, deleteNewsLetter, SearchNewsLetter}