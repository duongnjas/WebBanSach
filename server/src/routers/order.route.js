const express = require('express');

const {
  createOrder,
  GetAllOrder,
  DeleteOrder,
  ShippingProduct,
  GetAllOrderPendding,
  GetAllOrderShipping,
  GetAllOrderPaid,
  PaidProduct,
  GetOrderPenddingByUser,
  GetOrderShippingByUser,
  GetOrderPaidByUser,
  GetAllOrderInAMonth,
  GetAllOrderPaypal,
  GetOrderPaypalByUser,
  updateOrder,
  PrintOrderGhn,
  clientCancelOrder,
} = require("../controllers/order.controller");

const orderRouter = express.Router();


orderRouter.post("/create", createOrder);
// orderRouter.post("/update/:id", updateOrder);
// orderRouter.post("/cancel/:id", clientCancelOrder);
// orderRouter.get("/print/:id", PrintOrderGhn);
// orderRouter.put("/shipping/:id", ShippingProduct);
// orderRouter.put("/paid/:id", PaidProduct);
orderRouter.delete('/delete/:id', DeleteOrder);

// orderRouter.get("/", GetAllOrder);
// orderRouter.get("/orderPaypal", GetAllOrderPaypal);
// orderRouter.get("/orderPendding", GetAllOrderPendding);
// orderRouter.get("/orderShipping", GetAllOrderShipping);
// orderRouter.get("/orderPaid", GetAllOrderPaid);

// orderRouter.get("/allOrderInAMonth", GetAllOrderInAMonth);

// // --- user
// orderRouter.get("/:id", GetAllOrder);
// orderRouter.get("/orderPaypal/:id", GetOrderPaypalByUser);
// orderRouter.get("/orderPendding/:id", GetOrderPenddingByUser);
// orderRouter.get("/orderShipping/:id", GetOrderShippingByUser);
// orderRouter.get("/orderpaid/:id", GetOrderPaidByUser);



module.exports = orderRouter;