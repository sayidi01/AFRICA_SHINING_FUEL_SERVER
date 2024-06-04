const CustomersClientGazoil = require("../models/CustomersClientGazoil");
const CustomersClientFuelOil2 = require("../models/CustomersFuelOil2.js");
const CustomersClientBoisChauffage = require("../models/CustomersBoisChauffage.js.js");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");

const CLIENT_ID_PREFIX = "ASF_CLT_";

const generateClientID = (clientCount) => {
  return CLIENT_ID_PREFIX + (Number(clientCount) + 1);
};

// Customer Authentication

const CustomerAuthentication = (req, res) => {
  const acces = req.accesToken;
  const refresh = req.refreshToken;

  res
    .cookie("accesToken", acces, {
      samehttpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .cookie("refreshToken", refresh, {
      samehttpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .status(200)
    .send(req.user);
};

// Customer Validation

const CustomerAuthenticationValidation = (req, res, next) => {
  const data = { ...req.user?._doc, password: null };
  console.log("req user", req.user);
  console.log("Req customer", req.data);
  console.log("req");

  res.status(200).send({ data });
};

// Create new CustomerClientGazoil

const createCustomersClientGazoil = async (req, res, next) => {
  const secretKey = process.env.secret;

  const countClients = await CustomersClientGazoil.countDocuments();

  const id = generateClientID(countClients.toString());

  CustomersClientGazoil.create({ ...req.body, id })
    .then((data) => {
      console.log(res._id);
      req.user = data;
      next()
      console.log(data);
      req.user = data;
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).send({ status: 400, ...err });
    });
};

// Create new Customers Fuel Oil n2

const createCustomersClientFuelOil2 = async (req, res, next) => {
  const countClients = await CustomersClientFuelOil2.countDocuments();

  const id = generateClientID(countClients.toString());
  CustomersClientFuelOil2.create({ ...req.body, id })
    .then((data) => {
      console.log(res._id);
      req.user = data;
      next();

      console.log(data);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).send({ status: 400, ...err });
    });
};

// Create new Customers Bois Chauffage

const createCustomersBoisChauffage = async (req, res, next) => {
  const countClients = await CustomersClientBoisChauffage.countDocuments();

  const id = generateClientID(countClients.toString());
  CustomersClientBoisChauffage.create({ ...req.body, id })
    .then((data) => {
      console.log(res._id);
      req.user = data;
      next();

      console.log(data);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).send({ status: 400, ...err });
    });
};

// update password customer Gazoil

const UpdateClientGazoilPassword = (req, res) => {
  const customerId = req.params.id;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  if (!customerId || !currentPassword || !newPassword) {
    return res.status(400).send({ message: "invalid request" });
  }

  CustomersClientGazoil.findById(customerId)
    .then(async (customer) => {
      if (!customer) {
        throw new Error("customer not found");
      }

      // Vérifie que le mot de passe actuel est correct
      if (!customer.comparePassword(currentPassword)) {
        throw new Error("invalid current password");
      }

      // Met à jour le mot de passe du client
      customer.password = newPassword;
      await customer.save();
      res.status(200).send({ message: "password updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ message: err.message || "error updating password" });
    });
};



// update password customer Fuel Oil n 2


const UpdateClientFuelOil2Password = (req, res) => {
  const customerId = req.params.id;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  if (!customerId || !currentPassword || !newPassword) {
    return res.status(400).send({ message: "invalid request" });
  }

  CustomersClientFuelOil2.findById(customerId)
    .then(async (customer) => {
      if (!customer) {
        throw new Error("customer not found");
      }

      // Vérifie que le mot de passe actuel est correct
      if (!customer.comparePassword(currentPassword)) {
        throw new Error("invalid current password");
      }

      // Met à jour le mot de passe du client
      customer.password = newPassword;
      await customer.save();
      res.status(200).send({ message: "password updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ message: err.message || "error updating password" });
    });
};


// update password customer Bois Chauffage

const UpdateClientBoisChauffagePassword = (req, res) => {
  const customerId = req.params.id;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  if (!customerId || !currentPassword || !newPassword) {
    return res.status(400).send({ message: "invalid request" });
  }

  CustomersClientBoisChauffage.findById(customerId)
    .then(async (customer) => {
      if (!customer) {
        throw new Error("customer not found");
      }

      // Vérifie que le mot de passe actuel est correct
      if (!customer.comparePassword(currentPassword)) {
        throw new Error("invalid current password");
      }

      // Met à jour le mot de passe du client
      customer.password = newPassword;
      await customer.save();
      res.status(200).send({ message: "password updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ message: err.message || "error updating password" });
    });
};



// Logout Customer

const Logout = (req, res) => {
  try {
    // Clear cookies and send response
    res.clearCookie("accesToken").clearCookie("accessToken").clearCookie("refreshToken");
    res.status(200).json({ message: "Successful disconnection" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Error during logout" });
  }
};

// Update data customer Gasoil

const updateDatacCustomer = (req, res) => {
  const customerId = req.user._id;
  // req.body: {addressLivraison: {tele}}
  CustomersClientGazoil.findOneAndUpdate({ _id: customerId }, req.body, {
    new: true,
  })
    .then((data) => {
      console.log(data);
      res.status(200).send({ message: "data updated successfully", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error update" });
    });
};

// Update data Customer Fuel oil n 2

const updateDataCustomerFuelOil2 = (req, res) => {
  const customerId = req.user._id;
  CustomersClientFuelOil2.findOneAndUpdate({ _id: customerId }, req.body, {
    new: true,
  })
    .then((data) => {
      console.log(data);
      res.status(200).send({ message: "data updated successfully", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error update" });
    });
};

// update data customer bois chauffage

const updateDataBoisChauffage = (req, res) => {
  const customerId = req.user._id;
  CustomersClientBoisChauffage.findOneAndUpdate({ _id: customerId }, req.body, {
    new: true,
  })
    .then((data) => {
      console.log(data);
      res.status(200).send({ message: "data updated successfully", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error update" });
    });
};


// Get all customers Gasoil

const GetAllCustomersGasoil = (req,res) => {
  CustomersClientGazoil
  .find()
  .then((data) => {
    console.log(data)
    res.send({ data });
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({ message: "vous n'avez pas recuperer les clients Gasoil" });
  })
}

// Get all Customers Fuel oil n 2

const GetAllCustomersFuelOiln2 = (req,res) => {
  CustomersClientFuelOil2
  .find()
  .then((data) => {
    console.log(data)
    res.send({ data });
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({ message: "vous n'avez pas recuperer les clients Fuel Oil n 2" });
  })
}

// Get ALL Customers Bois Chauffage

const GetAllCustomersBoisChauffage = (req,res) => {
  CustomersClientBoisChauffage
  .find()
  .then((data) => {
    console.log(data)
    res.send({ data });
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({ message: "vous n'avez pas recuperer les clients Bois Chauffage" });
  })

}


// delete Customer Gasoil

const deleteCustomerGasoil = (req,res) => {
  const gazoilId = req.params.id
  CustomersClientGazoil
  .deleteOne({_id: gazoilId})
  .then((data) => {
    console.log(data)
    res.status(200).json({ message: " Client Gasoil supprimée avec succès", data });
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({ status: 500, ...err });
  })
}

// delete Customer Fuel oil n 2

const deleteCustomerFuelOil2 = (req,res) => {
  const fuelId = req.params.id
  CustomersClientFuelOil2
  .deleteOne({_id: fuelId})
  .then((data) => {
    console.log(data)
    res.status(200).json({ message: " Client Fuel Oil n 2 supprimée avec succès", data });
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({ status: 500, ...err });
  })

}

// delete Customer Bois Chauffage 

const deleteCustomerBoisChauffage = (req,res) => {
  const boisChauffageId = req.params.id
  CustomersClientBoisChauffage
  .deleteOne({_id: boisChauffageId})
  .then((data) => {
    console.log(data)
    res.status(200).json({ message: " Client Bois Chauffage supprimée avec succès", data });
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send({ status: 500, ...err });
  })
}

// Search Customer Gasoil 

const SearchCustomerGsoil = (req,res) => {
  const textSearchGasoil = req.query.query ?? ""
  const page = req.query.page || 1;
  if (!textSearchGasoil) {
    return res.status(400).json({ error: "Search query is required" });
  }
  CustomersClientGazoil
  .find({
    $or: [
      {first_name: { $regex: textSearchGasoil, $options: "i" } },
      {last_name: { $regex: textSearchGasoil, $options: "i" } },
      {email: { $regex: textSearchGasoil, $options: "i" } },
      {"addresseLivraison.first_name":{ $regex: textSearchGasoil, $options: "i" } },
      {"addresseLivraison.last_name":{ $regex: textSearchGasoil, $options: "i" } },
      {"addresseLivraison.adresse":{ $regex: textSearchGasoil, $options: "i" } },
      {"addresseLivraison.ville":{ $regex: textSearchGasoil, $options: "i" } },
      {"addresseFacturation.first_name":{ $regex: textSearchGasoil, $options: "i" } },
      {"addresseFacturation.last_name":{ $regex: textSearchGasoil, $options: "i" } },
      {"addresseFacturation.adresse":{ $regex: textSearchGasoil, $options: "i" } },
      {"addresseFacturation.ville":{ $regex: textSearchGasoil, $options: "i" } },
    ]
  })
  .skip((page - 1) * 10)
  .limit(10)
  .then((data) => {
    return res.status(200).json(data);
  })
  .catch((err) => {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  });
}

// search Customer Fuel Oil n 2

const SearchCustomerFuelOil2 = (req,res) => {
  const textSearchFuelOil2 = req.query.query ?? ""
  const page = req.query.page || 1;

  if (!textSearchFuelOil2) {
    return res.status(400).json({ error: "Search query is required" });
  }
  CustomersClientFuelOil2
  .find({
    $or: [
      {first_name: { $regex: textSearchFuelOil2, $options: "i" } },
      {last_name: { $regex: textSearchFuelOil2, $options: "i" } },
      {email: { $regex: textSearchFuelOil2, $options: "i" } },
      {"addresseLivraison.first_name":{ $regex: textSearchFuelOil2, $options: "i" } },
      {"addresseLivraison.last_name":{ $regex: textSearchFuelOil2, $options: "i" } },
      {"addresseLivraison.adresse":{ $regex: textSearchFuelOil2, $options: "i" } },
      {"addresseLivraison.ville":{ $regex: textSearchFuelOil2, $options: "i" } },
      {"addresseFacturation.first_name":{ $regex: textSearchFuelOil2, $options: "i" } },
      {"addresseFacturation.last_name":{ $regex: textSearchFuelOil2, $options: "i" } },
      {"addresseFacturation.adresse":{ $regex: textSearchFuelOil2, $options: "i" } },
      {"addresseFacturation.ville":{ $regex: textSearchFuelOil2, $options: "i" } },
    ]
  })
  .skip((page - 1) * 10)
    .limit(10)
  .then((data) => {
    return res.status(200).json(data);
  })
  .catch((err) => {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  });
}

// Search Customer Bois Chauffage

const SearchCustomerBoisChauffage = (req,res) => {
  const textSearchBoisChauufage = req.query.query ?? ""
  const page = req.query.page || 1;


  if (!textSearchBoisChauufage) {
    return res.status(400).json({ error: "Search query is required" });
  }

  CustomersClientBoisChauffage
  .find({
    $or: [
      {first_name: { $regex: textSearchBoisChauufage, $options: "i" } },
      {last_name: { $regex: textSearchBoisChauufage, $options: "i" } },
      {email: { $regex: textSearchBoisChauufage, $options: "i" } },
      {"addresseLivraison.first_name":{ $regex: textSearchBoisChauufage, $options: "i" } },
      {"addresseLivraison.last_name":{ $regex: textSearchBoisChauufage, $options: "i" } },
      {"addresseLivraison.adresse":{ $regex: textSearchBoisChauufage, $options: "i" } },
      {"addresseLivraison.ville":{ $regex: textSearchBoisChauufage, $options: "i" } },
      {"addresseFacturation.first_name":{ $regex: textSearchBoisChauufage, $options: "i" } },
      {"addresseFacturation.last_name":{ $regex: textSearchBoisChauufage, $options: "i" } },
      {"addresseFacturation.adresse":{ $regex: textSearchBoisChauufage, $options: "i" } },
      {"addresseFacturation.ville":{ $regex: textSearchBoisChauufage, $options: "i" } },
    ]
  })
  .skip((page - 1) * 10)
    .limit(10)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    });

}






module.exports = {
  CustomerAuthentication,
  createCustomersClientGazoil,
  createCustomersClientFuelOil2,
  createCustomersBoisChauffage,
  CustomerAuthenticationValidation,
  Logout,
  UpdateClientGazoilPassword,
  updateDatacCustomer,
  updateDataCustomerFuelOil2,
  updateDataBoisChauffage,
  UpdateClientBoisChauffagePassword,
  UpdateClientFuelOil2Password,
  GetAllCustomersGasoil,
  GetAllCustomersFuelOiln2,
  GetAllCustomersBoisChauffage,
  deleteCustomerBoisChauffage,
  deleteCustomerFuelOil2,
  deleteCustomerGasoil,
  SearchCustomerGsoil,
  SearchCustomerFuelOil2,
  SearchCustomerBoisChauffage
};
