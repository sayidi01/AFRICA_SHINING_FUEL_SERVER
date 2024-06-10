const express = require("express");

const OrdersRouter = express.Router();

const { verifyToken } = require("../middlewares/authMiddlewares");

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

OrdersRouter.get("/", verifyToken, getAllOrders);

// get order customer connected

OrdersRouter.get("/bycustomer", verifyToken, getOrdersCustomerConnected);


// Search Orders Customers 

OrdersRouter.get("/search",verifyToken, searchOrders);

// get order by ID

OrdersRouter.get("/:id", verifyToken, getOrderByID);

// update order

OrdersRouter.put("/:id", verifyToken, updateOrder);

// delete order

OrdersRouter.delete("/:id", verifyToken, deleteOrder);


module.exports = OrdersRouter;
