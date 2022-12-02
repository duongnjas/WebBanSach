import React from 'react'
import {
    Box,
    Stack,
    Button,
    Typography,
} from '@mui/material'
import {Link} from "react-router-dom"
import "./Error.scss"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined';
import BlenderOutlinedIcon from '@mui/icons-material/BlenderOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';

function Error() {
    return (
        <Box>
            <Stack >
                <Box sx={{ backgroundColor: "#3fc6f5" }} height="230px">
                    <img alt="" src="https://salt.tikicdn.com/desktop/img/404/city-cloud.png" width="100%" />
                </Box>
                <Box sx={{ backgroundColor: "#fdba13" }} height="120px" px={2} position="relative" >
                    <Stack direction="row" alignItems="center" justifyContent="center" pt={2} spacing={3}>
                        <img alt="" src="https://salt.tikicdn.com/assets/img/404/404.png"></img>
                        <Typography sx={{ fontSize: "22px", color: "#FFFFFF", fontWeight: 550 }} width="405.5px">Xin lỗi, trang của bạn đang tìm kiếm không tồn tại!</Typography>
                    </Stack>
                    <img src="https://salt.tikicdn.com/assets/img/404/super.png" alt="" style={{ position: "absolute", bottom: 0, left: "220px" }} />
                </Box>
            </Stack>
            <Stack sx={{ backgroundColor: "#FFFFF", height: "80px" }} px={2} justifyContent="flex-end" alignItems="center" mb={0.2}>
                <Typography sx={{ fontSize: "14px", fontWeight: 550 }}>Bạn có thể thử những liên kết sau</Typography>
            </Stack>
            <Stack sx={{ backgroundColor: "#FFFFF", height: "230px" }} px={2} justifyContent="space-between" alignItems="center" mb={0.2} spacing={4}>
                <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={1}>
                    {errorIcon.map(item =>
                    <Link to={item.link}>
                        <Box className="widthicon" key={item.id}>
                    <Stack className="erroricon" justifyContent="center" alignItems="center">
                        <item.icon sx={{ fontWeight: 550, color: "#FFF" ,width:"36px" ,height:"36px" }} />
                    </Stack>
                    <Typography textAlign="center" className="Text" sx={{fontSize:"11px",fontWeight:550}}>{item.text}</Typography>
                </Box>
                </Link>
                        
                    )}
                </Stack>
                <Stack direction="row" justifyContent="" alignItems="center" mb={4} spacing={4}>
                    <Button variant="outlined"><KeyboardArrowLeftIcon />Quay lại trang trước</Button>
                    <Button variant="outlined">Tiếp tục mua hàng</Button>
                    <Button variant="outlined">Xem thông tin tài khoản<KeyboardArrowRightIcon /></Button>
                </Stack>
            </Stack>
            <Stack px={2} sx={{ backgroundColor: "#f7f7f7", height: "100px" }} direction="row" justifyContent="center" alignItems="center" mb={0.2}>
                <Stack px={2}>
                    <Typography sx={{ fontSize: "16px", color: "#4e5052", fontWeight: 550 }}>Đăng ký nhận bản tin Tiki</Typography>
                    <Typography sx={{ fontSize: "13px", color: "#4e5052", fontWeight: 550 }}>Đừng bỏ lỡ hàng ngàn sản phẩm và chương trình siêu hấp dẫn</Typography>
                </Stack>
                <Stack direction="row" spacing={2} >
                <Box component="form" noValidate autoComplete="off" justifyContent="space-between">
                    <FormControl sx={{width:"345px", height:"34px"}} px={2}>
                        <OutlinedInput size="small"  placeholder="Địa chỉ Email của bạn" />
                    </FormControl>
                </Box>
                <Button variant="contained">Đăng ký</Button>
                </Stack>
            </Stack>
        </Box>
    )
}
const errorIcon = [
    {
        id: 1,
        icon: LibraryBooksOutlinedIcon,
        text: 'Sách',
        link: '/customer/account/edit',
    },
    {
        id: 2,
        icon: AutoFixHighOutlinedIcon,
        text: 'Làm Đẹp-Sức Khỏe',
        link: '/customer/notification'
    },
    {
        id: 3,
        icon: AccessibleForwardOutlinedIcon,
        text: 'Thời Trang',
        link: '/sale/order/history'
    },
    {
        id: 4,
        icon: TableRestaurantOutlinedIcon,
        text: 'Nhà cửa đời sống',
        link: '/customer/address'
    },
    {
        id: 5,
        icon: BlenderOutlinedIcon,
        text: 'Điện gia dụng',
        link: '/customer/paymentcard'
    },
    {
        id: 6,
        icon: HeadsetMicOutlinedIcon,
        text: 'Phụ kiện thiết bị số',
        link: '/nhan-xet-san-pham-ban-da-mua'
    },
    {
        id: 7,
        icon: AddAPhotoOutlinedIcon,
        text: 'Máy ảnh-Quay phim',
        link: '/customer/wishlist'
    },
    {
        id: 8,
        icon: PhoneAndroidOutlinedIcon,
        text: 'Điện thoại-Laptop-Tablet',
        link: '/customer/review'
    },
    {
        id: 9,
        icon: DesktopWindowsOutlinedIcon,
        text: 'Tivi',
        link: '/customer/coupons'
    },
    {
        id: 10,
        icon: SmartToyOutlinedIcon,
        text: 'đồ chơi',
        link: '/customer/coupons'
    },
    {
        id: 11,
        icon: LiquorOutlinedIcon,
        text: 'Mẹ & bé',
        link: '/customer/coupons'
    },
    {
        id: 12,
        icon: DriveFileRenameOutlineOutlinedIcon,
        text: 'văn phòng phẩm',
        link: '/customer/coupons'
    },
    {
        id: 13,
        icon: SportsBasketballOutlinedIcon,
        text: 'Thể thao-dã ngoại',
        link: '/customer/coupons'
    },

]

export default Error