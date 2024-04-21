const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/AFRICA_SHINING_FUEL';

const getAllPrices = async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);

    const db = client.db('AFRICA_SHINING_FUEL');
    const collection = db.collection('pricePerCity');
    const data = await collection.find().toArray();

    console.log(data);
    res.send({ data });

    client.close();
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    res.status(500).send({ message: "Une erreur s'est produite lors de la récupération des prix par ville." });
  }
};

module.exports = { getAllPrices };