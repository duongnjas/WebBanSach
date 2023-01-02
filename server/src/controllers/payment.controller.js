const OrderModel = require("../models/order.model");

const querystring = require("qs");
const sha256 = require("sha256");
const dateFormat = require("date-and-time");

const tmnCode = process.env.VNP_TMN_CODE;
const secretKey = process.env.VNP_HASH_SECRET;
const url = process.env.VNP_URL;
const returnUrl = process.env.VNP_RETURN_URL;

require("dotenv").config();

async function createPayment (req, res) {
  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const order = new OrderModel({
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
  });

  order.save();

  let vnpUrl = url;
  const date = new Date();

  const createDate = dateFormat(date, "yyyymmddHHmmss");
  const orderId = order._id.toString();

  var locale = "vn";
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;

  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Nap tien cho thue bao 0123456789";
  vnp_Params["vnp_OrderType"] = "billpayment";
  vnp_Params["vnp_Amount"] = 10000000;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  vnp_Params["vnp_BankCode"] = "NCB";

  vnp_Params = sortObject(vnp_Params);

  var signData =
    secretKey + querystring.stringify(vnp_Params, { encode: false });

  var secureHash = sha256(signData);

  vnp_Params["vnp_SecureHashType"] = "SHA256";
  vnp_Params["vnp_SecureHash"] = secureHash;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: true });

  res.status(200).json({ code: "00", data: vnpUrl });
}

async function returnPayment (req, res) {
  try {
    let vnp_Params = req.query;
    const secureHash = vnp_Params.vnp_SecureHash;

    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    vnp_Params = sortObject(vnp_Params);
    const signData =
      secretKey + querystring.stringify(vnp_Params, { encode: false });

    const checkSum = sha256(signData);

    const id = vnp_Params.vnp_TxnRef;

    if (secureHash === checkSum) {
      if (vnp_Params.vnp_ResponseCode == "00") {
        res.status(200).json({ code: vnp_Params.vnp_ResponseCode });
      } else {
        const DeleteOrder = await OrderModel.findById({ _id: id });
        await DeleteOrder.remove();
        res.status(200).json({ code: vnp_Params.vnp_ResponseCode });
      }
    } else {
      res.status(200).json({ code: "97" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function inpPayment (req, res) {
  let vnp_Params = req.query;
  const secureHash = vnp_Params.vnp_SecureHash;

  delete vnp_Params.vnp_SecureHash;
  delete vnp_Params.vnp_SecureHashType;

  vnp_Params = sortObject(vnp_Params);

  const signData =
    secretKey + querystring.stringify(vnp_Params, { encode: false });

  const checkSum = sha256(signData);

  const id = vnp_Params.vnp_TxnRef;
  
  if (secureHash === checkSum) {
    var orderId = vnp_Params["vnp_TxnRef"];
    var rspCode = vnp_Params["vnp_ResponseCode"];
    res.status(200).json({ RspCode: "00", Message: "success" });
  } else {
    res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
  }
};

function sortObject(o) {
  var sorted = {},
    key,
    a = [];

  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
}

module.exports = {
    createPayment,
    returnPayment,
    inpPayment
}