const CandidatureRH = require("../models/CandidatureRH");
const { handleUpload } = require("../upload/clouadinary");



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
        .then((resp) => {
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











module.exports ={CreateCandiatureRH}