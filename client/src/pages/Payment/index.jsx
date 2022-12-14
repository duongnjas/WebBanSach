import { useCallback, useEffect, useState } from "react";
import "./Payment.scss";
import {
  Grid,
  Typography,
  Box,
  Button,
  Stack,
  Radio,
  RadioGroup,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { numWithCommas } from "../../constraints/Util";
import { useDispatch, useSelector } from "react-redux";
import ChooseAddress from "../../components/ChooseAddress";
import { deleteItemsPayment } from "../../slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import apiCart from "../../apis/apiCart";
import { toast } from "react-toastify";
import apiAddress from "../../apis/apiAddress";
import Loading from "../../components/Loading";

function Payment() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [openAddress, setOpenAddress] = useState(false);
  const [ship, setShip] = useState("shipping1");
  const [payment, setPayment] = useState("1");
  const [expandDetail, setExpandDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const CartItems = useSelector((state) => state.cart.items);
  const addressShip = useSelector((state) => state.payment.address);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feeShip = ship === "shipping1" ? 30000 : 23000;
  const discountFeeShip = 0;

  useEffect(() => {
    //trang thanh toan
    const calcPrice = () => {
      const total = CartItems.reduce(
        (t, num) => (num.choose ? t + num.price * num.quantity : t),
        0
      );
      setTotalPrice(Math.round(total));
    };
    calcPrice();
  }, [CartItems]);

  useEffect(() => {
    const getAddresses = () => {
      apiAddress.getUserAddress(user._id).catch(() => {
        //navigate("/customer/address/create");
        toast.warning("Vui lòng thêm địa chỉ mới");
      });
    };
    getAddresses(); // eslint-disable-next-line react-hooks/exhaustive-deps

    const calcPrice = () => {
      if (CartItems.filter((item) => item.choose).length === 0) {
        toast.warning("Vui lòng chọn ít nhất một món hàng");
        navigate("/cart");
        return;
      }
    };
    calcPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loadTitle = () => {
      document.title = "Đơn hàng của tôi";
    };
    loadTitle();
  }, []);

  const handleChangeTypeShip = (event) => {
    setShip(event.target.value);
  };

  const handleChangeTypePayment = (event) => {
    setPayment(event.target.value);
  };

  const handleExpand = () => {
    setExpandDetail((pre) => !pre);
  };

  const handleOpenAddress = useCallback(() => setOpenAddress(true), []);
  const handleCloseAddress = useCallback(() => setOpenAddress(false), []);
  const finalPrice = () => {
    return totalPrice + feeShip - discountFeeShip > 0
      ? Math.round(totalPrice + feeShip - discountFeeShip)
      : 0;
  };

  const handleSubmitOrderFake = async () => {
    if (loading) {
      toast.info(
        "Thanh toán đang được thực hiện. Vui lòng không thao tác quá nhanh"
      );
      return;
    }
    if (!addressShip) {
      toast.warning("Vui lòng chọn địa chỉ giao hàng");
      return;
    }
    const payload = {
      idUser: user?._id,
      type: "Đang xử lý",
      feeShip,
      totalPrice,
      address: {
        createdAt: addressShip.createdAt,
        details: addressShip.details,
        district: addressShip.district,
        name: addressShip.name,
        phone: addressShip.phone,
        province: addressShip.province,
        updatedAt: addressShip.updatedAt,
        ward: addressShip.ward,
        id: addressShip._id,
      },
      shipping: shippingMethods.find((item) => item.id === ship).display,
      payment: paymentMethods.find((item) => item.id === payment).display,

      products: CartItems.filter((item) => item.choose).map((item) => {
        return { ...item };
      }),
    };
    setLoading(true);
    console.log(payload);
    try {
      const res = await apiCart.saveOrder(payload);
      console.log(res);
      dispatch(deleteItemsPayment());
      toast.success("Đặt hàng thành công!");
    } catch {
      toast.error("Đặt hàng không thành công. Vui lòng thử lại");
    }
    setLoading(false);
  };
  return (
    <>
      <Box className="container">
        <Grid container spacing={2} mt="24px">
          <Grid item lg={8} md={12} sm={12} xs={12}>
            <Box bgcolor="#fff" p={2}>
              <Box mb={2}>
                <Typography
                  className="payment__title"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Danh sách sản phẩm
                </Typography>
                <Stack className="payment__listItem">
                  {CartItems.filter((item) => item.choose).map((item) => (
                    <Stack
                      key={item?._id}
                      direction="row"
                      className="orderDetail__item"
                      p={1}
                    >
                      <Box mr={1.875}>
                        <img
                          height="60px"
                          width="60px"
                          src={item?.images}
                          alt=""
                        />
                      </Box>
                      <Stack spacing={1.5} width="100%">
                        <Link to={"/"}>
                          <Typography sx={{ fontSize: "14px" }}>
                            {item?.name}
                          </Typography>
                        </Link>
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                        >
                          <Typography fontSize="14px" color="#888">
                            SL:{item.quantity}
                          </Typography>
                          <Typography fontSize="14px" color="#888">
                            {numWithCommas(item.quantity * item.price || 0)} ₫
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Box>
              <Box mb={2}>
                <Typography
                  className="payment__title"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Chọn hình thức giao hàng
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={ship}
                  onChange={handleChangeTypeShip}
                >
                  {shippingMethods.map((item) => (
                    <Stack key={item.id} direction="row" height="48px">
                      <Radio
                        name="shipping"
                        value={item.id}
                        id={item.id}
                        sx={{ padding: 0, marginRight: "8px" }}
                      />
                      <Typography
                        sx={{ margin: "auto 0" }}
                        component="label"
                        htmlFor={item.id}
                      >
                        {item.display}
                      </Typography>
                    </Stack>
                  ))}
                </RadioGroup>
              </Box>
              <Box>
                <Typography
                  className="payment__title"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Chọn hình thức thanh toán
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={payment}
                  onChange={handleChangeTypePayment}
                >
                  {paymentMethods.map((item) => (
                    <Stack
                      key={item.id}
                      direction="row"
                      alignItems="center"
                      sx={{ height: "64px" }}
                    >
                      <Radio
                        name="payment"
                        id={String(item.id)}
                        value={item.value}
                        sx={{ padding: 0, marginRight: "8px" }}
                      />
                      <img
                        alt=""
                        width="32px"
                        height="32px"
                        style={{ marginRight: "12px" }}
                        src={item.image}
                      ></img>
                      <label htmlFor={item.id}>
                        <Typography sx={{ margin: "auto 0" }}>
                          {item.display}
                        </Typography>
                      </label>
                    </Stack>
                  ))}
                </RadioGroup>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Box className="cart__address">
              <Stack direction="row" mb={1.5} justifyContent="space-between">
                <Typography
                  style={{ fontSize: "16px", fontWeight: 500, color: "#888" }}
                >
                  Giao tới
                </Typography>
                <Typography
                  onClick={handleOpenAddress}
                  color="#1890ff"
                  sx={{ cursor: "pointer" }}
                >
                  Thay đổi
                </Typography>
              </Stack>
              {addressShip && (
                <>
                  <Typography mb={0.25} fontWeight={500}>
                    {addressShip?.name}&nbsp;&nbsp;&nbsp;{addressShip?.phone}
                  </Typography>
                  <Typography color="#888">{`${addressShip?.details}, ${addressShip?.ward}, ${addressShip?.district}, ${addressShip?.province}`}</Typography>
                </>
              )}
            </Box>
            <Box>
              <Box className="cart-summary">
                <Box mb={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography style={{ fontWeight: 500, color: "#333" }}>
                      Đơn hàng
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems={"baseline"} spacing={1}>
                    <Typography sx={{ fontSize: "14px", color: "#888" }}>
                      1 sản phẩm
                    </Typography>
                    {expandDetail ? (
                      <span
                        onClick={handleExpand}
                        className="payment__btn-detail"
                      >
                        Thu gọn
                        <KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />{" "}
                      </span>
                    ) : (
                      <span
                        onClick={handleExpand}
                        className="payment__btn-detail"
                      >
                        Xem thông tin
                        <KeyboardArrowUpIcon sx={{ fontSize: "16px" }} />{" "}
                      </span>
                    )}
                  </Stack>
                </Box>
                <Box py={1}>
                  <Box className="cart-summary__price">
                    <span>Tạm tính</span>
                    <span>{numWithCommas(totalPrice)} ₫</span>
                  </Box>
                  <Box className="cart-summary__price">
                    <span>Phí vận chuyển</span>
                    <span>{numWithCommas(feeShip)} ₫</span>
                  </Box>
                  <Box className="cart-summary__price">
                    <span>Khuyến mãi vận chuyển</span>
                    <span style={{ color: "#00AB56" }}>
                      {numWithCommas(-discountFeeShip)} ₫
                    </span>
                  </Box>
                  <Box className="cart-summary__divider"></Box>
                  <Box className="cart-summary__price">
                    <span>Tổng tiền</span>
                    <Box className="cart-summary__valueprice">
                      <span>{numWithCommas(finalPrice())} ₫</span>
                      <span>(Đã bao gồm VAT nếu có)</span>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Button
                variant="contained"
                onClick={handleSubmitOrderFake}
                sx={{
                  width: "100%",
                  height: "42px",
                  backgroundColor: "#ff424e",
                  "&:hover": { opacity: 0.8, backgroundColor: "#ff424e" },
                }}
              >
                {loading && <Loading />} Mua hàng
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ChooseAddress
        handleOpen={handleOpenAddress}
        handleClose={handleCloseAddress}
        open={openAddress}
      />
    </>
  );
}

const shippingMethods = [
  {
    id: "shipping1",
    display: "Giao hàng nhanh",
  },
  {
    id: "shipping2",
    display: "Giao hàng tiêu chuẩn",
  },
];

const paymentMethods = [
  {
    id: "1",
    display: "Thanh toán tiền mặt khi nhận hàng",
    value: "1",
    image:
      "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg",
  },
  {
    id: "2",
    display: "Thanh toán bằng Momo (chưa phát triển)",
    value: "3",
    image:
      "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-momo.svg",
  },
  // {
  //   id: "3",
  //   display: "Thanh toán bằng ZaloPay (chưa phát triển)",
  //   value: "4",
  //   image:
  //     "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-zalo-pay.svg",
  // },
  // {
  //   id: '4',
  //   display: "Thanh toán bằng Viettel Money",
  //   value: '2',
  //   image: "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-viettelmoney.png"
  // },
  // {
  //   id: '5',
  //   display: "Thanh toán bằng VNPay",
  //   value: '5',
  //   image: "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-vnpay.png"
  // },
];

export default Payment;
