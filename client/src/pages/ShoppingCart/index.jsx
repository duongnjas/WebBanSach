import { useCallback, useEffect, useState } from 'react'
import './ShoppingCart.scss'
import { Grid, Typography, Checkbox, Button, Stack, Box, Dialog } from '@mui/material'
import CartItem from '../../components/CartItem'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import InfoIcon from '@mui/icons-material/Info';
import DiscountIcon from '@mui/icons-material/Discount';
import { numWithCommas } from "../../constraints/Util"
import { useSelector, useDispatch } from 'react-redux'
import { unchooseAll, chooseAll, deleteAll } from '../../slices/cartSlice'
import { useNavigate } from "react-router-dom"
import ChooseAddress from '../../components/ChooseAddress';
import {toast} from 'react-toastify'
import { clearCoupon } from '../../slices/paymentSlice';

function ShoppingCart() { //Cart
  const [open, setOpen] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkAll, setCheckAll] = useState(false)
  const [couponValue, setCouponValue] = useState(0)
  const CartItems = useSelector(state => state.cart.items)
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const coupon = useSelector(state => state.payment.coupon)
  const addressShip = useSelector(state => state.payment.address)

  useEffect(() => {
    const calcPrice = () => {
      const total = CartItems.reduce((t, num) => num.choose ? t + num.price * num.quantity : t, 0)
      setTotalPrice(total)
    }
    const checkChooseAll = () => {
      if (CartItems.every(item => item.choose))
        setCheckAll(true)
      else
        setCheckAll(false)
    }
    calcPrice()
    checkChooseAll()
  }, [CartItems])

  useEffect(()=>{
    const loadTitle = ()=>{
      document.title =  "Giỏ hàng"
    }
    loadTitle()
  },[])
  useEffect(()=>{
    const handle = ()=>{
      if(coupon){
        let value = 0
        if(coupon.unit === 'đ'){
          value = coupon.value / 1000
        }
        else {
          if(totalPrice>0)
            value = (coupon.value * totalPrice / 100)/1000
        }
        setCouponValue(value)
      }
    }
    handle()
  },[coupon,totalPrice])

  const handleChooseAll = () => {
    if (checkAll) {
      setCheckAll(false)
      dispatch(unchooseAll({}))
    }
    else {
      setCheckAll(true)
      dispatch(chooseAll({}))
    }
  }

  const handleDeleteAll = () => {
    dispatch(deleteAll())
    closeDialogDeleteAll()
  }
  const openDialogDeleteAll = () => {
    setDialogDelete(true)
  }
  const closeDialogDeleteAll = () => {
    setDialogDelete(false)
  }
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleOpenAddress = useCallback(() => {
    if(user){
      setOpenAddress(true)
    }
    else{
      toast.warning("Vui lòng đăng nhập để chọn địa chỉ")
    }
  }, [user]);
  const handleCloseAddress = useCallback(() => setOpenAddress(false), []);
  
  const unchooseCoupon = () => {
    dispatch(clearCoupon())
  }
const navigate = useNavigate()
  const handleBuy = ()=>{
    if(CartItems.filter(item=>item.choose).length===0){
      toast.warning("Vui lòng chọn ít nhất một món hàng")
    }
    else{
      navigate('/payment')
    }
  }
  const finalPrice = () => {
    return totalPrice - (coupon?.value || 0)  > 0 ?
    Math.round(totalPrice - (coupon?.value || 0)) : 0
  }
  return (<>
    <Box className="container" >
      <Grid container spacing={2} style={{ marginTop: "24px" }}>
        <Grid item lg={9} md={12} sm={12} xs={12}>
          <Box>
            <Typography className="cart__title" gutterBottom variant="h5" component="div" >
              GIỎ HÀNG
            </Typography>

            <Box className="cart__heading cart">
              <Stack direction="row">
                <Checkbox checked={checkAll} onChange={handleChooseAll} className="cart__checkbox" />
                {`Tất cả (${CartItems.length} sản phẩm)`}
              </Stack>
              <Stack>Đơn giá</Stack>
              <Stack>Số lượng</Stack>
              <Stack>Thành tiền</Stack>
              <Stack>
                <span onClick={openDialogDeleteAll}><DeleteOutlinedIcon /></span>
              </Stack>
            </Box>
            <Stack className="cart__list">
              {
                CartItems.map(item => <CartItem key={item.id} data={item} />)
              }
            </Stack>
          </Box>
        </Grid>
        <Grid item lg={3} md={12} sm={12} xs={12}>
          <Box className='cart__address'>
            <Stack direction="row" mb={1.5} justifyContent="space-between">
              <Typography style={{ fontSize: "16px", fontWeight: 500, color: "#888" }}>Giao tới</Typography>
              <Typography onClick={handleOpenAddress} color="#1890ff" sx={{ cursor: "pointer" }}>Thay đổi</Typography>
            </Stack>
            {user?
              addressShip && <>
                <Typography mb={0.25} fontWeight={500}>{addressShip.name}&nbsp;&nbsp;&nbsp;{addressShip.phone}</Typography>
                <Typography color="#888">{`${addressShip.details}, ${addressShip.ward}, ${addressShip.district}, ${addressShip.province}`}</Typography></>
            :<Typography mb={0.25} fontWeight={500}>Vui lòng đăng nhập để chọn địa chỉ</Typography>
            }
          </Box>
          <Box>
            <Box className="cart-summary">
              <Box className="cart-summary__price">
                <span>
                  Tạm tính
                </span>
                <span>{numWithCommas(totalPrice)} ₫</span>
              </Box>
              <Box className="cart-summary__price">
                <span>
                  Giảm giá
                </span>
                <span>{numWithCommas(coupon?.value||0)} ₫</span>
              </Box>
              <Box className="cart-summary__divider"></Box>
              <Box className="cart-summary__price">
                <span>
                  Tổng tiền
                </span>
                <Box className="cart-summary__valueprice">
                  <span>{numWithCommas(finalPrice())} ₫</span>
                  <span>(Đã bao gồm VAT nếu có)</span>
                </Box>
              </Box>
            </Box>
              <Button variant="contained" onClick={handleBuy}
                sx={{ width: "100%", height: "42px", backgroundColor: "#ff424e", "&:hover": { opacity: 0.8, backgroundColor: "#ff424e" } }}>
                Mua hàng ({CartItems.filter(item=>item.choose).length})
              </Button>

          </Box>
        </Grid>
      </Grid>
    </Box>
    {user&&<ChooseAddress handleOpen={handleOpenAddress} handleClose={handleCloseAddress} open={openAddress} />}
    {dialogDelete &&
      <Dialog onClose={closeDialogDeleteAll} open={dialogDelete}>
        <Box className="dialog-removecart">
          <Box className="dialog-removecart__title">
            <h4>Xoá sản phẩm</h4>
          </Box>
          <Box className="dialog-removecart__content">
            Bạn có muốn xóa tất cả sản phẩm trong giỏ hàng
          </Box>
          <Box className="dialog-removecart__choose">
            <Button
              variant="outlined"
              onClick={handleDeleteAll}
              sx={{ width: "94px", height: "36px" }}
            >
              Xác nhận
            </Button>
            <Button
              variant="contained"
              onClick={closeDialogDeleteAll}
              sx={{ width: "57px", height: "36px" }}
            >
              Huỷ
            </Button>
          </Box>
        </Box>
      </Dialog>}

  </>
  )
}


export default ShoppingCart