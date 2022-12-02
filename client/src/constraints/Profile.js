import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RateReviewIcon from '@mui/icons-material/RateReview';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import DiscountIcon from '@mui/icons-material/Discount';

export const sidebarTab = [
    {
        id: 1,
        icon: PersonIcon,
        text: 'Thông tin tài khoản',
        link: '/customer/account/edit',
    },
    {
        id: 2,
        icon: NotificationsIcon,
        text: 'Thông báo của tôi',
        link: '/customer/notification'
    },
    {
        id: 3,
        icon: ListAltIcon,
        text: 'Quản lý đơn hàng',
        link: '/customer/order/history'
    },
    {
        id: 4,
        icon: LocationOnIcon,
        text: 'Sổ địa chỉ',
        link: '/customer/address'
    },
    {
        id: 5,
        icon: CreditCardIcon,
        text: 'Thông tin thanh toán',
        link: '/customer/paymentcard'
    },
    {
        id: 6,
        icon: RateReviewIcon,
        text: 'Nhận xét sản phẩm đã mua',
        link: '/customer/nhan-xet-san-pham-ban-da-mua'
    },
    {
        id: 7,
        icon: FavoriteIcon,
        text: 'Sản phẩm yêu thích',
        link: '/customer/wishlist'
    },
    {
        id: 8,
        icon: StarHalfIcon,
        text: 'Nhận xét của tôi',
        link: '/customer/review'
    },
    {
        id: 9,
        icon: DiscountIcon,
        text: 'Mã giảm giá',
        link: '/customer/coupons'
    },

]
