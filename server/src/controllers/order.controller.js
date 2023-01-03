const OrderModel = require("../models/order.model");
const axios = require("axios");

require("dotenv").config();

async function createOrder (req, res) {
    const newOrder = {
      idUser : req.body.idUser,
      feeShip : req.body.feeShip,
      totalPrice : req.body.totalPrice,
      type : req.body.type,
      payment : req.body.payment,
      shipping : req.body.shipping,
      address:{
        id : req.body.address.id,
        name : req.body.address.name,
        userId : req.body.address.userId,
        phone : req.body.address.phone,
        province : req.body.address.province,
        updatedAt : req.body.address.updatedAt,
        ward : req.body.address.ward,
        createdAt : req.body.address.createdAt,
        details : req.body.address.details,
        district : req.body.address.district
      },
      products: req.body.products
    };
    const createOrder = await OrderModel.create(newOrder);
    if(createOrder) {
      return res.status(201).json(createOrder);
  }
  return res.status(501).json({ error: "Invalid data!" });
}

async function UpdateOrderType (req, res) {
  const orderId = req.params.id;
  const oldOrder = await OrderModel.findOne( { _id: orderId }) 
  if(!oldOrder) {
      return res.status(404).json({ error: "Order not found!"});
  }

  const newOrder = {
      type: req.body.type,
  }

  const result = await OrderModel.updateOne({ _id: orderId }, newOrder);
  if(result) {
      return res.status(200).json(result);
  }
  return res.status(501).json({ error: "Failed to update!" });
}


async function clientCancelOrder (req, res){
  const updateOrder = await OrderModel.findById({_id: req.params.id})

   if(updateOrder){
    updateOrder.cancelOrder = true
    await updateOrder.save()
   }
   res.send(updateOrder)
}

async function updateOrder (req, res) {
  let updateOrder = await OrderModel.findById({ _id: req.params.id });

  if (updateOrder) {
    let items = [];
    updateOrder.orderItems.map((x) => {
      let item = {};
      item.name = x.name;
      item.quantity = parseInt(x.qty);
      item.price = x.salePrice;

      items.push(item);
    });
    const orderGhn = {
      payment_type_id: 2,

      to_name: updateOrder.name,
      to_phone: updateOrder.shippingAddress.phone,
      to_address: `${updateOrder.shippingAddress.province}, ${updateOrder.shippingAddress.district}, ${updateOrder.shippingAddress.ward}, ${updateOrder.shippingAddress.detail}`,
      to_ward_code: updateOrder.to_ward_code,
      to_district_id: updateOrder.to_district_id,

      weight: 200,
      length: 1,
      width: 19,
      height: 10,

      service_id: 0,
      service_type_id: 2,

      note: "",
      required_note: "KHONGCHOXEMHANG",

      cod_amount: updateOrder.paymentMethod === "payOnline" ? 0 : updateOrder.totalPrice,
      items,
    };
    updateOrder.order_code = req.params.id;
    await updateOrder.save();
    res.send(updateOrder);

    // try {
    //   const { data } = await axios.post(
    //     "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
    //     orderGhn,
    //     {
    //       headers: {
    //         shop_id: process.env.SHOP_ID,
    //         Token: process.env.TOKEN_GHN,
    //       },
    //     }
    //   );

    //   const order_code = data.data.order_code;

    //   updateOrder.order_code = order_code;
    //   await updateOrder.save();
    //   res.send(updateOrder);
    // } catch (error) {
    // }
  } else {
    res.send({ msg: "product not found" });
  }
}
async function PrintOrderGhn (req, res) {
  const Order = await OrderModel.findById({ _id: req.params.id });
  if (Order) {
    let token;
    try {
      const { data } = await axios.get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/a5/gen-token",
        {
          headers: {
            Token: process.env.TOKEN_GHN,
          },
          params: {
            order_codes: Order.order_code,
          },
        }
      );

      token = data.data.token;
      Order.token = token;
      await Order.save();

      const result = await axios.get(
        `https://dev-online-gateway.ghn.vn/a5/public-api/printA5?token=${token}`,
        {
          headers: {
            Token: process.env.TOKEN_GHN,
          },
        }
      );
      res.send(result.config.url);
    } catch (error) {
    }
    
  } else {
    res.send({message: 'order not found'})
  }
}

async function GetAllOrder (req, res) {
  //await OrderModel.remove()
  const Order = await OrderModel.find({}).sort({ createdAt: -1 });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
}

async function GetAllOrderPaypal (req, res) {
  const Order = await OrderModel.find({ paymentMethod: "payOnline" }).sort({
    createdAt: -1,
  });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
}

async function GetAllOrderPendding (req, res) {
  const Order = await OrderModel.find({
    $or: [{ status: "pendding" }, { paymentMethod: "payOnline" }],
  }).sort({
    createdAt: -1,
  });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
}

async function GetAllOrderShipping (req, res) {
  const Order = await OrderModel.find({ status: "shipping" }).sort({
    createdAt: -1,
  });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
}

async function GetAllOrderPaid (req, res) {
  const Order = await OrderModel.find({ status: "paid" }).sort({
    createdAt: -1,
  });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
}

async function DeleteOrder (req, res) {
  const deleteOrder = await OrderModel.findById({_id: req.params.id});
  if (deleteOrder) {
    await deleteOrder.remove();
    res.send({ message: "product deleted" });
  } else {
    res.send("error in delete order");
  }
}

async function ShippingProduct (req, res) {
  const status = "shipping";
  const Order = await OrderModel.findById({ _id: req.params.id });
  if (Order) {
    Order.status = status;
    await Order.save();
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
}

async function PaidProduct (req, res) {
  const status = "paid";
  const Order = await OrderModel.findByIdAndUpdate(
    { _id: req.params.id },
    { status: status }
  );
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
}

// --------------------    user

async function GetOrderByUser (req, res) {
  const Order = await OrderModel.find({ idUser: req.params.id }).sort({
    createdAt: -1,
  });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order by user" });
  }
}

async function GetOrderPaypalByUser (req, res) {
  const Order = await OrderModel.find({
    user: req.params.id,
    paymentMethod: "payOnline",
  }).sort({ createdAt: -1 });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order by user" });
  }
}

async function GetOrderPenddingByUser (req, res) {
  const Order = await OrderModel.find({
    user: req.params.id,
    status: "pendding",
  }).sort({ createdAt: -1 });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order by user" });
  }
}

async function GetOrderShippingByUser (req, res) {
  const Order = await OrderModel.find({
    user: req.params.id,
    status: "shipping",
  }).sort({ createdAt: -1 });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order by user" });
  }
}

async function GetOrderPaidByUser (req, res) {
  const Order = await OrderModel.find({
    user: req.params.id,
    status: "paid",
  }).sort({ createdAt: -1 });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order by user" });
  }
}

async function GetAllOrderInAMonth (req, res) {
  const Order = await OrderModel.find({
    createdAt: {
      $gte: new Date(2021, 7, 11),
      $lt: new Date(2021, 7, 16),
    },
  });

  if (Order) {
    res.send(Order);
  } else {
    res.status(400).send({ message: "no product in a month" });
  }
}
module.exports = {
    createOrder,
    clientCancelOrder,
    updateOrder,
    PrintOrderGhn,
    GetAllOrder,
    GetAllOrderPaypal,
    GetAllOrderPendding,
    GetAllOrderShipping,
    GetAllOrderPaid,
    DeleteOrder,
    ShippingProduct,
    PaidProduct,
    GetOrderByUser,
    GetOrderPaypalByUser,
    GetOrderPenddingByUser,
    GetOrderShippingByUser,
    GetOrderPaidByUser,
    GetAllOrderInAMonth,
    UpdateOrderType
}
