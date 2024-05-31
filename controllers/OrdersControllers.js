const { transporter } = require("../middlewares/sendEmailCustomer");
const Orders = require("../models/OrdersSchema");
const OrdersRouter = require("../routes/OrdersRouters");

const CLIENT_ID_PREFIX = "ASF_CLT_";

const generateClientID = (clientCount) => {
  return CLIENT_ID_PREFIX + (Number(clientCount) + 1);
};

// Create new Order

const createOrder = async (req, res) => {
  const countClients = await Orders.countDocuments();

  const id = generateClientID(countClients.toString());
  Orders.create({ ...req.body, customer_id: req.user._id, id })
    .then(async (data) => {
      const mailOptionsToCustomer = {
        from: "contact@asf.ma",
        to: req.user.email,
        subject: "Confirmation de commande",
        html: ` <div style="font-family: Arial, sans-serif; line-height: 1.5;"> 
        <b>Cher(ère)   ${req.body.prenom}</b> <br>
        Votre demande concernant la commande [${req.body.Products}]  a bien été prise en compte.  <br>
        Vous trouverez ci-dessous le détail des votre articles que vous souhaitez : <br>
        [${req.body.Quantity} L ${req.body.Products}  de livraison prévue le ${data.order_date} ]<br>
        Total : ${req.body.TotalPrice} DH<br>
        Type Livraison: ${req.body.deliveryType}<br>
        Ville: ${req.body.ville}<br>
        Adresse: ${req.body.adresse}<br>
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
        subject: "Commande reçu",
        html: `
        Prenom: ${req.body.prenom}<br>
        Nom:  ${req.body.nom}<br>
        Produit: ${req.body.Products}<br>
        Type Client : ${req.body.customerType}<br> 
        Quantité: ${req.body.Quantity}<br>
        Ville: ${req.body.ville}<br>
        Adresse: ${req.body.adresse}<br>
        Total: ${req.body.TotalPrice} DH<br>
        Type Livraison : ${req.body.deliveryType}<br>
        Code Postal : ${req.body.codePostal}<br>
        Téléphone: ${req.body.telephone}<br>

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

      res.status(201).send({ message: "Commande créée avec succès", data });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(403)
        .send({ error: err, message: err.message || "Failed to create order" });
    });
};

// get all Orders

const getAllOrders = (req, res) => {
  Orders.find()
    //  .populate("customer_id")
    .then((data) => {
      console.log(data);
      res.send({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "vous n'avez pas assez de privilèges" });
    });
};

// get order customer connected

const getOrdersCustomerConnected = (req, res) => {
  console.log("req.user", req.user);
  console.log("req.customer", req.customer);
  const customerID = req.user._id;

  Orders.find({ customer_id: customerID })
    .sort({ order_date: -1 })
    .then((data) => {
      console.log(data);
      res.send({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

// get order by ID

const getOrderByID = (req, res) => {
  const orderId = req.params.id;

  Orders.findOne({ id: orderId })
    .then((data) => {
      console.log(data);
      if (!data) {
        res.status(404).send({ message: "commande non trouvée" });
      } else {
        res.send({ data });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "error commande", err });
    });
};

// Update order

const updateOrder = (req, res) => {
  const orderId = req.params.id;

  Orders.findByIdAndUpdate({ id: orderId })
    .then((data) => {
      if (data) {
        console.log(data);
        res.status(200).send({
          data,
          message: "l'état de la commande a été mis à jour avec succès",
        });
      } else {
        res
          .status(404)
          .send({ status: 404, message: "identifiant de commande non valide" });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// delete order

const deleteOrder = (req, res) => {
  const orderId = req.params.id;

  Orders.deleteOne({ _id: orderId })
    .then((data) => {
      console.log(data);
      res.status(200).json({ message: "Commande supprimée avec succès", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: 500, ...err });
    });
};

// Serach orders

const searchOrders = (req, res) => {
  console.log("Hello")
  const textSearch = req.query.query;
  const page = Number(req.query.page) ?? 1;

  if (!textSearch) {
    return res.status(400).json({ error: "Search query is required" });
  }
  Orders.find({
    $or: [
      { Products: { $regex: textSearch, $options: "i" } },
      { ville: { $regex: textSearch, $options: "i" } },
      { prenom: { $regex: textSearch, $options: "i" } },
      { nom: { $regex: textSearch, $options: "i" } },
      { adresse: { $regex: textSearch, $options: "i" } },
      { deliveryType: { $regex: textSearch, $options: "i" } },
    ],
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
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersCustomerConnected,
  getOrderByID,
  updateOrder,
  deleteOrder,
  searchOrders,
};
