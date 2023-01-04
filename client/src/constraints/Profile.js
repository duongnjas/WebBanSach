import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const sidebarTab = [
    {
        id: 1,
        icon: PersonIcon,
        text: 'Thông tin tài khoản',
        link: '/customer/account/edit',
    },
    {
        id: 2,
        icon: ListAltIcon,
        text: 'Quản lý đơn hàng',
        link: '/customer/order/history'
    },
    {
        id: 3,
        icon: LocationOnIcon,
        text: 'Sổ địa chỉ',
        link: '/customer/address'
    },
]
