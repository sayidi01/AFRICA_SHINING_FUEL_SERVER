const Orders = require("../models/OrdersSchema");
const OrdersRouter = require("../routes/OrdersRouters");


const CLIENT_ID_PREFIX = "ASF_CLT_";

const generateClientID = (clientCount) => {
  return CLIENT_ID_PREFIX + (Number(clientCount) + 1);
};


// Create new Order

const createOrder = async(req, res) => {

  const countClients = await Orders.countDocuments();

  const id = generateClientID(countClients.toString());
  Orders.create({...req.body, customer_id: req.user._id, id})
    .then((data) => {
      console.log(data);
      res.status(201).send({ message: "Commande créée avec succès", data });
    })
    .catch((err) => {
      console.log(err)
      res
        .status(403)
        .send({ error: err, message: err.message || "Failed to create order" });
    });
};

// get all Orders

const getAllOrders = (req, res) => {
  Orders.find()
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
  console.log('req.user', req.user)
  console.log('req.customer', req.customer)
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

  OrdersRouter.deleteOne({ id: orderId })
    .then((data) => {
      console.log(data);
      res.status(200).json({ message: "Commande supprimée avec succès", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: 500, ...err });
    });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersCustomerConnected,
  getOrderByID,
  updateOrder,
  deleteOrder,
};
