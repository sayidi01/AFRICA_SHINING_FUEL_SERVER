const cloudinary = require("cloudinary").v2;

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  // Fetchs the Cloudinary API
  // To upload the file
  // it returns an object containing data related to the file
  // in the cloud (like the URL, its name...)
  return res;
}

async function handleUploadMany(files) {
  // Créer un tableau pour stocker les données des fichiers téléchargés
  const uploadedFilesData = [];

  // Utiliser un bloc try-catch pour gérer les erreurs lors du téléchargement
  try {
    // Télécharger les fichiers sur Cloudinary
    for await (const file of files) {
        const res = await cloudinary.uploader.upload(file, {
          resource_type: "auto",
        });
    
        console.log("File upload:", res);
    
        // Ajouter les données des fichiers téléchargés au tableau
        uploadedFilesData.push(res);

    }

    // Retourner les données des fichiers téléchargés
    return { status: true, files: uploadedFilesData };
  } catch (error) {
    // Gérer l'erreur
    console.error("Erreur lors du téléchargement des fichiers :", error);
    return { status: false, message: error.message ?? "Something went wrong" };
  }
}
module.exports = { handleUpload, handleUploadMany };
