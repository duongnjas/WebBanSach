import { useEffect, useState } from 'react'
import './ChooseCoupon.scss'
import { Button, Modal, Box, Stack, Typography } from '@mui/material'
// import { CartItems } from "../../constraints/Cart"
import InfoIcon from '@mui/icons-material/Info';
import DiscountIcon from '@mui/icons-material/Discount'
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import apiMain from '../../apis/apiMain';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setCoupon } from '../../slices/paymentSlice';

function ChooseCoupon(props) {
    const [coupons, setCoupons] = useState([]);
    const dispatch = useDispatch()
    useEffect(() => {
        const getCoupons = () => {
            let params = {
                _page: 1,
                _limit: 10
            }
            apiMain.getCoupons(params)
                .then(res => {
                    setCoupons(res.data)
                })
        }
        getCoupons()
    }, [])

    const handleChooseCoupon = (item) => {
        dispatch(setCoupon(item))
        props.handleClose()
    }
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <Box className='choose-coupon'>
                <Stack direction='row' className="choose-coupon__heading">
                    <span>Tiki Khuyến mãi</span>
                    <CloseIcon onClick={props.handleClose} height="24px" />
                </Stack>
                <Box className="choose-coupon__search">
                    <Box className="choose-coupon__groupinput">
                        <input type="text" placeholder='Nhập mã giảm giá' />
                        <span className="choose-coupon__icon">
                            <DiscountIcon sx={{ height: "18px", color: "#888" }} />
                        </span>
                        <span className="choose-coupon__iconclear">
                            <CancelIcon sx={{ height: "18px", color: "#888" }} />
                        </span>
                    </Box>

                    <Button variant="contained" className="choose-coupon__btn-apply"
                    >Áp dụng</Button>
                </Box>
                <Box className="choose-coupon__content">
                    <Stack direction='row' className="choose-coupon__content-heading">
                        <span>Mã giảm giá</span>
                        <span>Áp dụng tối đa: 1</span>
                    </Stack>
                    <Stack className="choose-coupon__list">
                        {
                            coupons.map(item =>
                                <Box key={item.id} className="coupon-item">
                                    <Box className="coupon-item__img">
                                        <img src={item.img} alt="" />
                                    </Box>
                                    <Box className="coupon-item__content">
                                        <Box className="coupon-item__title">
                                            <Typography
                                                style={{
                                                    fontSize: "14px",
                                                    margin: "0",
                                                    color: '#1890ff'
                                                }}
                                            >
                                                {item.name}
                                            </Typography>
                                            <InfoIcon color="#017fff" height="20px" />
                                        </Box>
                                        <Box className="coupon-item__description">
                                            <Typography
                                                sx={{
                                                    fontSize: "17px",
                                                    fontWeight: "500",
                                                    lineHeight: "24px",
                                                    color: "#242424",
                                                }}
                                                className="text-overflow-2-lines"
                                            >
                                                {`Giảm ${item.value}${item.unit}`}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "#787878",
                                                    fontSize: "13px",
                                                    fontWeight: "400",
                                                }}
                                                className="text-overflow-3-lines"
                                            >
                                                {item.limit > 0 ? `Cho đơn hàng từ ${item.limit / 1000}K` : 'Dành cho tất cả giá trị đơn hàng'}
                                            </Typography>
                                        </Box>
                                        <Box className="coupon-item__apply">
                                            <Typography
                                                sx={{
                                                    color: "#787878",
                                                    fontSize: "13px",
                                                    fontWeight: "400",
                                                    marginBottom: "0px",
                                                    marginTop: "auto",
                                                }}
                                            >
                                                {`HSD:${new Date(item.expired).toLocaleDateString()}`}
                                            </Typography>
                                            <Button onClick={() => handleChooseCoupon(item)}
                                                variant="contained" className="coupon-item__btn-apply"
                                            >Áp dụng</Button>
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        }
                    </Stack>
                </Box>

            </Box>
        </Modal>
    )
}

ChooseCoupon.propsTypes = {
    open: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleClose: PropTypes.func,
    chooseCoupon: PropTypes.func
}

export default ChooseCoupon