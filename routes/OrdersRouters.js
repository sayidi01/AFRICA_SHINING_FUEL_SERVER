const express = require("express");

const OrdersRouter = express.Router();

const { verifyToken , verifyTokenBackoffice} = require("../middlewares/authMiddlewares");

const {
  createOrder,
  getAllOrders,
  getOrdersCustomerConnected,
  getOrderByID,
  updateOrder,
  deleteOrder,
  searchOrders
} = require("../controllers/OrdersControllers");

// Create new Order

OrdersRouter.post("/", verifyToken, createOrder);

// get All Orders

OrdersRouter.get("/", verifyTokenBackoffice, getAllOrders);

// get order customer connected

OrdersRouter.get("/bycustomer", verifyToken, getOrdersCustomerConnected);


// Search Orders Customers 

OrdersRouter.get("/search",verifyTokenBackoffice, searchOrders);

// get order by ID

OrdersRouter.get("/:id", verifyTokenBackoffice, getOrderByID);

// update order

OrdersRouter.put("/:id", verifyToken, updateOrder);

// delete order

OrdersRouter.delete("/:id", verifyTokenBackoffice, deleteOrder);


module.exports = OrdersRouter;
