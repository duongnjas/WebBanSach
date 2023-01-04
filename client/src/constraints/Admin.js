import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CategorySharpIcon from "@mui/icons-material/CategorySharp";
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import {Dashboard,} from "@mui/icons-material";


export const sidebar = [
    {
        id: 1,
        text: 'Trang chủ',
        icon: Dashboard,
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
        icon: DevicesOtherIcon,
        link: '/admin/product'
    },
    {
        id: 4,
        text: 'Danh mục',
        icon: CategorySharpIcon,
        link: '/admin/category'
    },
    {
        id: 5,
        text: 'Người dùng',
        icon: GroupOutlinedIcon,
        link: '/admin/user'
    },
]