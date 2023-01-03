import { useEffect, useState } from 'react'
import './ChooseAddress.scss'
import { Button, Modal, Box, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import apiAddress from '../../apis/apiAddress'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../../slices/paymentSlice';

function ChooseAddress(props) { //Chọn address khi mua hàng
    const userId = useSelector((state) => state.auth.user)._id;
    const [addresses, setAddresses] = useState([]);
    const dispatch = useDispatch()
    
    useEffect(() => {
        const getAddresses = () => {
            apiAddress.getUserAddress(userId)
                .then(res => {
                    setAddresses(res)
                })
        }
        getAddresses()
    }, [])

    const chooseAddressShip = (address)=>{
    //props.chooseAddressShip(address)
        props.handleClose()
        dispatch(setAddress(address))
    }

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <Box className='choose-address'>
                <Stack direction='row' className="choose-coupon__heading">
                    <span>Chọn địa chỉ</span>
                    <CloseIcon onClick={props.handleClose} height="24px" />
                </Stack>
                <Stack spacing={5}>{
                    addresses.map((item) => {
                        return (
                            <Stack
                                direction="row"
                                width="100%"
                                className="items"
                                key={item?._id}
                            >
                                <Stack className="info">
                                    <Typography className="name">{item?.name}</Typography>
                                    <Typography className="address">Địa chỉ: {`${item?.details}, ${item?.ward}, ${item?.district}, ${item?.province}`}</Typography>
                                    <Typography className="number">Điện thoại: {item.phone}</Typography>
                                </Stack>

                                <Stack direction="row" className="action">
                                    <Button className="Modify" variant="text">
                                        Chỉnh sửa
                                    </Button>
                                    <Button onClick={()=>chooseAddressShip(item)} className="Delete" variant="text">
                                        Chọn
                                    </Button>
                                </Stack>
                            </Stack>
                        );
                    })
                }</Stack>

            </Box>
        </Modal>
    )
}

ChooseAddress.propsTypes = {
    open: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleClose: PropTypes.func,
    chooseAddressShip: PropTypes.func
}
export default ChooseAddress