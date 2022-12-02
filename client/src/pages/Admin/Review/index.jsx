 /* eslint-disable */
import "./Review.scss"
import { useState, useEffect } from "react"
import {
    Stack,
    Box,
    Button,
    Table,
    TableHead,
    Checkbox,
    FormControlLabel,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    MenuItem,
    InputBase,
    Rating,
    Select,
    Dialog,
    IconButton,
    DialogTitle,
    DialogActions,
    DialogContent,
} from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import apiReviews from '../../../apis/apiReviews';
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


function Review() {
    const [status, setStatus] = useState(0);
    const [filterRate, setFilterRate] = useState(0)
    const [openBrand, setOpenBrand] = useState()
    const [totalPage, setTotalPage] = useState(10)
    const [page, setPage] = useState(1)
    const [reviews, setReviews] = useState([])
    const [content, setContent] = useState("")
    const [chooseReview, setChooseReview] = useState(null)
    const size = 10
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePage = (event, newValue) => {
        setPage(newValue);
    };

    const handleChangeContent = (event) => {
        setContent(event.target.value)
    };

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }

    const handleClickOpen = (rev) => {
        setChooseReview(rev);
        setOpen(true);
    };

    useEffect(() => {
        const getData = () => {
            let params = {
                _page: page,
                _limit: size
            }
            apiReviews.getMyReviews(params)
                .then(res => {
                    setReviews(res.data)
                    console.log(res.data)
                })
        }
        getData()
    }, [page])

    useEffect(() => {
        const closePopper = (event) => {
            const div = document.getElementById("reviewAdmin__filterBrand")
            if (div) {
                const isClickInsideElement = div.contains(event.target);
                if (!isClickInsideElement) {
                    setOpenBrand(false);
                }
            }
        }
        document.addEventListener("click", closePopper)
        return (() => {
            document.removeEventListener("click", closePopper)
        })
    }, [])

    const submitReply = () => {//hàm thực hiện tạo reply

        const listReply = chooseReview?.reply || []
        let params = {
            reply: [...listReply,
            {
                image: "https://granolaguy.biz/wp-content/uploads/2020/04/3695d553.png",
                name: "TIKI shop",
                content: content
            }
            ]
        }

        apiReviews.updateMyReviews(params, chooseReview.id)
            .then(res => {
                toast.success("Cập nhật thành công")
            })
            .catch(err => {
                toast.error("Cập nhật thất bại!")
            })
    }

    return (
        <Box mt={2} className="reviewAdmin">
            <Box px={4} bgcolor="#fff">
                <Typography component="h2" className="reviewAdmin__title">Quản lý đánh giá</Typography>
                <Stack direction="row">
                    {
                        listRate.map(item =>
                            <Stack key={item.id} onClick={() => setFilterRate(item.id)}
                                alignItems="center" px={2.5} className={`reviewAdmin__rateItem ${filterRate === item.id ? "active" : ""}`}>
                                <Stack direction="row" alignItems={"flex-start"} sx={{ fontSize: "14px", height: "24px" }}>
                                    <span>{item.display}</span>
                                    {item.id === 0 || <StarIcon sx={{ fontSize: "17px", color: "#fadb14" }} />}
                                </Stack>
                                <Typography>(0)</Typography>
                            </Stack>)
                    }

                </Stack>
            </Box>

            <Box mt={2} mx={3} py={2} px={3} bgcolor="#fff">
                <Stack className="reviewAdmin__filter" direction="row" spacing={2} mt={1} mb={2}>
                    {/* <Stack direction="row" width="256px" alignItems='center' >
                        <Select
                            value={status}
                            onChange={onChangeStatus}
                            input={<BootstrapInput sx={{ '& .MuiInputBase-input': { borderRadius: "2px 0 0 2px" } }} />}
                        >{
                                [0, 1, 2, 3].map(item =>
                                    <MenuItem value={item}>{listStatus[item]}</MenuItem>)
                            }
                        </Select>
                        <Box className="reviewAdmin__groupinput">
                            <input type="text" placeholder="Điền tên sản phẩm" />
                            <SearchIcon sx={{ color: "#888" }} />
                        </Box>

                    </Stack> */}
                    <Stack width="256px" spacing={0.25} direction="row">
                        <Select
                            value={status}
                            onChange={onChangeStatus}
                            input={<BootstrapInput />}
                        >{
                                [0, 1, 2, 3].map(item =>
                                    <MenuItem value={item}>{listStatus[item]}</MenuItem>)
                            }
                        </Select>
                        <Box className="reviewAdmin__groupinput">
                            <input type="text" placeholder="Điền tên sản phẩm" />
                            <SearchIcon sx={{ color: "#888" }} />
                        </Box>
                    </Stack>
                    <Box>
                        <ButtonSelect
                            onClick={(e) => { e.stopPropagation(); setOpenBrand(!openBrand) }}
                            variant="contained"
                            endIcon={<KeyboardArrowDownIcon />}
                        >Thương hiệu
                        </ButtonSelect>
                        <Stack id="reviewAdmin__filterBrand"
                            className={`reviewAdmin__filterBrand ${openBrand ? "active" : ""}`}>
                            <Box id="reviewAdmin__BrandInput">
                                <input type="text" placeholder="Nhập thương hiệu" />
                                <SearchIcon sx={{ color: "#888" }} />
                            </Box>
                            <Stack className="reviewAdmin__filterBrand--list">
                                <FormControlLabel control={<Checkbox />} label="X" />
                                <FormControlLabel control={<Checkbox />} label="L" />
                                <FormControlLabel control={<Checkbox />} label="M" />
                            </Stack>
                            <Stack direction="row">
                                <Button variant="text">Bỏ chọn</Button>
                                <Button variant="container">Áp dụng</Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>

                <Stack direction='row' spacing={2}>
                    <Button variant="text" className="reviewAdmin__btnFilter">Có nội dung</Button>
                    <Button variant="text" className="reviewAdmin__btnFilter">Có hình ảnh/video</Button>
                    <Button variant="text" className="reviewAdmin__btnFilter">Chưa trả lời</Button>
                </Stack>
            </Box>
            <Box mt={2} mx={3} py={2} px={3} bgcolor="#FFF">
                <Typography fontSize={"14px"}>Số đánh giá: {reviews.length}</Typography>
                <Table className="reviewTable">
                    <TableHead>
                        <TableRow>
                            <TableCell>Mã đơn hàng</TableCell>
                            <TableCell>Sản phẩm</TableCell>
                            <TableCell>Đánh giá</TableCell>
                            <TableCell>Nội dung</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reviews.map(item => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <Stack>
                                        <Typography color="#1890ff">{item.id}</Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <img width={"80px"} height={"100px"} src={item.productImg} alt="" />
                                        <Stack flex={1}>
                                            <Typography className="text-overflow-2-lines">{item.productName}</Typography>
                                            {/* <Typography color="#888">SKU: 1234567890123</Typography> */}
                                        </Stack>
                                    </Stack>
                                </TableCell>
                                <TableCell spacing={1.25}>
                                    <Stack>
                                        <Rating name="read-only" value={item.rating} readOnly />
                                        <Typography>{item.rating}/5</Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ fontWeight: "bold" }}>{item.satisfy}</Typography>
                                    <Typography>{item.content}</Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    <Stack direction='row' spacing={1.25}>
                                        {/* <Button><Typography color="#1890ff">Báo cáo</Typography></Button> */}
                                        <Button onClick={() => handleClickOpen(item)}><Typography color="#1890ff">Trả lời</Typography></Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Stack
                justifyContent={"flex-end"}
                direction="row"
                sx={{ padding: "12px 48px" }}
            >
                {totalPage > 1 ? <Stack spacing={2}>
                    <Pagination count={totalPage} page={page} color="primary" onChange={handleChangePage} />
                </Stack> : <></>}
            </Stack>
            <Box>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle
                        id="customized-dialog-title"
                        onClose={handleClose}
                    >
                        Phản hồi nhận xét
                    </BootstrapDialogTitle>
                    <DialogContent sx={{ width: "100%" }} dividers>
                        <Stack sx={{}} spacing={3}>
                            <Stack
                                sx={{ width: "35rem", border: "1px solid #c2c2c2" }}
                                direction="row"
                                spacing={3}
                            >
                                <Box
                                    sx={{ height: 100, width: 100 }}
                                    component="img"
                                    alt=""
                                    src={chooseReview?.productImg}
                                />
                                <Stack>
                                    <Stack>
                                        <Typography sx={{ fontWeight: 600 }} variant="subtitle1">
                                            {chooseReview?.userName}
                                        </Typography>
                                    </Stack>
                                    <Stack>
                                        <Typography sx={{ fontWeight: 600 }} variant="subtitle1">
                                            {chooseReview?.content}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack
                                sx={{ height: "9rem", width: "100%" }}
                                alignItems="center"
                                spacing={3}
                            >
                                <TextareaAutosize
                                    onChange={handleChangeContent}
                                    minRows={6}
                                    maxRows={10}
                                    aria-label="maximum height"
                                    placeholder="Nhập phản hồi"
                                    p={'12px'}
                                    style={{
                                        width: "100%",
                                        border: "1px solid #c2c2c2",
                                        fontSize: "20px",
                                    }}
                                />
                            </Stack>
                        </Stack>
                    </DialogContent>

                    <DialogActions>
                        <Button variant="outlined" color="error" onClick={handleClose}>
                            Trở lại
                        </Button>
                        <Button variant="contained" onClick={submitReply}>
                            Phản hồi    
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </Box>
        </Box>

    )
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
        boxSizing: "border-box",
        borderRadius: 2,
        position: 'relative',
        border: '1px solid #888',
        fontSize: 14,
        height: '32px !important',
        padding: '4px 10px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),

        '&:focus': {
            borderRadius: 2,
            borderColor: '#1890ff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

const ButtonSelect = styled(Button)(() => ({
    borderRadius: "2px",
    backgroundColor: "#fff",
    border: "1px solid #888",
    color: "#333",
    height: '32px !important',
    '&:hover': {
        backgroundColor: "#fff",
        border: "1px solid #1890ff",
        color: "#1890ff",
        '& .MuiSvgIcon-root': {
            color: "#1890ff"
        }
    },
    '& .MuiSvgIcon-root': {
        color: "#333"
    }

}))
const listRate = [
    {
        id: 0,
        display: "Tất cả",
        count: 0
    },
    {
        id: 1,
        display: "1",
        count: 0
    },
    {
        id: 2,
        display: "2",
        count: 0
    },
    {
        id: 3,
        display: "3",
        count: 0
    },
    {
        id: 4,
        display: "4",
        count: 0
    },
    {
        id: 5,
        display: "5",
        count: 0
    },
]
const listStatus = ["Tên sản phẩm", "SKU", "Mã đơn hàng", "Mã đánh giá"]

export default Review