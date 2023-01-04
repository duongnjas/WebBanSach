import React, { useEffect, useState } from "react";
import "./DetailOrder.scss";
import { Box, Stack, Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import apiCart from "../../../../apis/apiCart";
import { toast } from "react-toastify";
import { numWithCommas } from "../../../../constraints/Util";
import { orderTabs } from "../../../../constraints/OrderItem";

function DetailOrder() {
  const id = useParams().id;
  console.log(id);
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const getData = () => {
      apiCart
        .getOrderById(id)
        .then((res) => {
          setOrder(res);
        })
        .catch((error) => {
          setOrder(null);
          toast.warning("Không tìm thấy đơn hàng");
        });
    };
    getData();
  }, [id]);

  const handleComfirm = () => {
    let params = {
      type: "Đã xác nhận"
    };
    apiCart
      .changeTypeOrder(params, id)
      .then((res) => {
        toast.success("Xác nhận thành công");
      })
      .catch((error) => {
        toast.error("Xác nhận không thành công");
      });
  };
  const handleCancel = () => {
    let params = {
      type: "Đã hủy",
    };
    apiCart
      .changeTypeOrder(params, id)
      .then((res) => {
        toast.success("Hủy thành công");    
      })
      .catch((error) => {
        toast.error("Hủy không thành công");
      });
  };

  return (
    <Box>
      <Stack bgcolor="white" p={2}>
        <Typography mt={2.5} mx={2} fontSize="22px" fontWeight={300}>
          Chi tiết đơn hàng # {order?._id}
        </Typography>
        <Typography sx={{ fontSize: "13px", textAlign: "end" }}>
          Ngày đặt hàng: {order?.createdAt}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        mt={1.25}
        mb={2.5}
        className="detailOrder"
        jutifyContent="space-between"
        mx={2}
      >
        <Stack className="detailOrder__boxInfo">
          <Typography>ĐỊA CHỈ NHẬN HÀNG</Typography>
          <Box p={1.25} className="detailOrder__content">
            <Typography style={{ color: "#000", fontWeight: 500 }}>
              {order?.address?.name}
            </Typography>
            <Typography>
              Địa chỉ:{" "}
              {`${order?.address?.details}, ${order?.address?.ward},
                                  ${order?.address?.district},
                                  ${order?.address?.province}`}
            </Typography>
            <Typography>Điện thoại: {order?.address?.phone}</Typography>
          </Box>
        </Stack>

        <Stack className="detailOrder__boxInfo">
          <Typography>HÌNH THỨC GIAO HÀNG</Typography>
          <Box p={1.25} className="detailOrder__content">
            <Typography>
              <img
                width="56px"
                height="16px"
                src="https://salt.tikicdn.com/ts/upload/2a/47/46/0e038f5927f3af308b4500e5b243bcf6.png"
                alt=""
              />
              {order?.shipping}
            </Typography>
            <Typography>Phí vận chuyển: {order?.feeShip}đ</Typography>
          </Box>
        </Stack>
        <Stack className="detailOrder__boxInfo">
          <Typography>HÌNH THỨC THANH TOÁN</Typography>
          <Box p={1.25} className="detailOrder__content">
            <Typography>{order?.payment}</Typography>
            <Typography style={{ color: "#fda223" }}>
              Thanh toán thất bại. Vui lòng thanh toán lại hoặc chọn phương thức
              thanh toán khác
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Stack bgcolor="#fff" mx={2}>
        <Stack direction="row" className="detailOrder-Table__heading">
          <Box>Sản phẩm</Box>
          <Box>Giá</Box>
          <Box>Số lượng</Box>
          <Box>Giảm giá</Box>
          <Box>Tạm tính</Box>
        </Stack>
        {order?.products?.map((item) => (
          <Stack key={item} direction="row" className="detailOrder-Table__row">
            <Stack direction="row" className="orderDetail__item">
              <Box mr={1.875}>
                <img height="60px" width="60px" src={item?.images} alt="" />
              </Box>
              <Stack spacing={1.5}>
                <Link to={"/"}>
                  <Typography fontSize="14px">{item?.name}</Typography>
                </Link>
                <Stack direction="row" spacing={1}>
                </Stack>
              </Stack>
            </Stack>
            <Box>{numWithCommas(item.price || 0)}₫</Box>
            <Box>{numWithCommas(item.quantity || 0)}</Box>
            <Box>
              {numWithCommas(item.price * item.quantity || 0)} ₫
            </Box>
          </Stack>
        ))}
      </Stack>
      {order && (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-end"
          mt={3.5}
        >
          <Stack py={0.625} direction="row">
            <Typography className="detailOrder__summary-label">
              Tạm tính
            </Typography>
            <Typography className="detailOrder__summary-value">
              {numWithCommas(order?.totalPrice || 0)} ₫
            </Typography>
          </Stack>
          <Stack py={0.625} direction="row">
            <Typography className="detailOrder__summary-label">
              Phí vận chuyển
            </Typography>
            <Typography className="detailOrder__summary-value">
              {numWithCommas(order?.feeShip || 0)} ₫
            </Typography>
          </Stack>
          <Stack py={0.625} direction="row">
            <Typography className="detailOrder__summary-label">
              Phí tổng cộng
            </Typography>
            <Typography className="detailOrder__summary-value detailOrder__summary-value--final">
              {numWithCommas(
                order.totalPrice + order.feeShip || 0
              )}{" "}
              ₫
            </Typography>
          </Stack>
        </Stack>
      )}
      <Stack direction="row" spacing="16px" justifyContent="flex-end" p={2}>
        {order?.type === "Đang xử lý" && (
          <>
            <Button variant="contained" onClick={handleComfirm}>
              Xác nhận
            </Button>
            <Button variant="contained" color="error" onClick={handleCancel}>
              Hủy bỏ
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
}

export default DetailOrder;
