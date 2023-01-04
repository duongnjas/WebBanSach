import AutoModeIcon from '@mui/icons-material/AutoMode';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CancelIcon from '@mui/icons-material/Cancel';



export const orderTabs = [
    {
        id: 0,
        type: "Tất cả",
        icon:""
    },
    {
        id: 1,
        type: "Đang xử lý",
        icon: AutoModeIcon
    },
    {
        id: 2,
        type: "Đã xử lý",
        icon: CancelIcon
    },
    {
        id: 3,
        type: "Đã hủy",
        icon: RocketLaunchIcon
    },
    // {
    //     id: 4,
    //     type: "Đã giao",
    //     icon: LocalShippingIcon
    // },

]