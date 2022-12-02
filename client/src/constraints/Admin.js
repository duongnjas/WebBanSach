import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LaptopChromebookOutlinedIcon from '@mui/icons-material/LaptopChromebookOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';


export const sidebar = [
    {
        id: 1,
        text: 'Trang chủ',
        icon: LeaderboardOutlinedIcon,
        link: '/admin'
    },
    {
        id: 2,
        text: 'Đơn hàng',
        icon: ShoppingCartOutlinedIcon,
        link: '/admin/order'
    },
    {
        id: 3,
        text: 'Sản phẩm',
        icon: LaptopChromebookOutlinedIcon,
        link: '/admin/product'
    },
    {
        id: 4,
        text: 'Danh mục sản phẩm',
        icon: CategoryOutlinedIcon,
        link: '/admin/category'
    },
    {
        id: 5,
        text: 'Thương hiệu',
        icon: CardTravelOutlinedIcon,
        link: '/admin/brand'
    },
    {
        id: 6,
        text: 'Trung tâm phát triển',
        icon: PieChartOutlinedIcon,
        link: '/admin/develop'
    },
    {
        id: 7,
        text: 'Công cụ khuyến mãi',
        icon: LoyaltyOutlinedIcon,
        link: '/admin/coupon'
    },
    {
        id: 8,
        text: 'Quản lý người dùng',
        icon: GroupOutlinedIcon,
        link: '/admin/user'
    },
    {
        id: 9,
        text: 'Quản lý đánh giá',
        icon: RateReviewOutlinedIcon,
        link: '/admin/review'
    },
    {
        id: 10,
        text: 'Thanh toán',
        icon: CalculateOutlinedIcon,
        link: '/admin'
    },
    {
        id: 11,
        text: 'Kho và hàng tồn',
        icon: WarehouseOutlinedIcon,
        link: '/admin'
    },

]