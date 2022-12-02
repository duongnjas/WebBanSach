 /* eslint-disable */
import "./Coupon.scss"
import React from "react";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
    Stack,
    Box,
    Button,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    InputBase,
    Modal,
} from "@mui/material"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import apiCoupon from "../../../apis/apiCoupon";
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import { toast } from "react-toastify";

function Coupon() {
    const [modalDelete, setModalDelete] = React.useState(false);
    const closeModalDelete = () => setModalDelete(false);
    const [itemDelete, setItemDelete] = useState("")
    const [status, setStatus] = useState(0)
    const [coupons, setCoupons] = useState([])
    const [listCoupon, setListCoupon] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1)
    const size = 10

    const openModalDelete = (itemDelete) => {
        setItemDelete(itemDelete)
        setModalDelete(true)
    }

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleDelete = () => {
        const newCoupon = coupons.filter(item => {
            return itemDelete.id !== item.id
        })

        apiCoupon.deleteCouponById({ id: itemDelete.id })
            .then(res => {
                console.log(res)
                toast.success("Xóa thành công")
            })
            .catch(error => {
                toast.error("Xóa không thành công!")
            })
        setCoupons(newCoupon)
        closeModalDelete()
    }

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }

    useEffect(() => {
        const getCoupons = async () => {
            let param = {
                _page: page,
                _limit: size,
            };
            const response = await apiCoupon.getCoupons(param)
            if (response) {
                setListCoupon(response.data)
                setTotalPage(Math.ceil(response.pagination._totalRows / size))
            }
        }
        getCoupons()
    }, [page, listCoupon]);


    return (
        <Box mt={2} className="couponAdmin" backgroundColor="white">
            <Box px={4}>
                <Typography component="h2" className="couponAdmin__title">Mã giảm giá</Typography>
                <Typography mt={0.625} pb={2} lineHeight="32px"
                >Vui lòng xem hướng dẫn chi tiết: <span>Cách cài đặt “Mã giảm giá”</span></Typography>
            </Box>
            <Box mt={2} mx={3} py={2} px={3}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontSize="16px" fontWeight={500}>Danh sách mã giảm giá</Typography>
                    <Link to="/admin/coupon/create">
                        <Button variant="contained" startIcon={<AddIcon />}>Tạo mã giảm giá</Button>
                    </Link>
                </Stack>
                <Stack className="couponAdmin__filter" direction="row" spacing={2} mt={4} mb={2}>
                    <Stack width="256px" spacing={0.25}>
                        <label>Mã giảm giá</label>
                        <Box className="couponAdmin__groupinput">
                            <input type="text" placeholder="Nhập mã giảm giá" />
                            <SearchIcon sx={{ color: "#888" }} />
                        </Box>

                    </Stack>
                </Stack>
                <Table mx={3} className="couponTable" sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: "calc(13*100%/101)", backgroundColor: "#e8e8e8" }}>Tên Mã giảm giá</TableCell>
                            <TableCell sx={{ width: "calc(13*100%/101)" }}>Mã giảm giá</TableCell>
                            <TableCell sx={{ width: "calc(13*100%/101)" }}>Tổng số mã</TableCell>
                            <TableCell sx={{ width: "calc(13*100%/101)" }}>Loại giảm giá</TableCell>
                            <TableCell sx={{ width: "calc(18*100%/101)" }}>Giá trị đơn tối thiểu</TableCell>
                            <TableCell sx={{ width: "calc(18*100%/101)" }}>Thời gian áp dụng</TableCell>
                            <TableCell sx={{ width: "calc(13*100%/101)" }}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listCoupon?.map((item) => (
                            <TableRow
                                key={item}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{ width: "calc(13*100%/101)" }}>
                                    <Stack>
                                        <Typography sx={{ color: "#1890ff" }}> {item.name} </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ width: "calc(13*100%/101)" }}>
                                    <Stack>
                                        <Typography sx={{ color: "#1890ff" }}> {item.slug} </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ width: "calc(13*100%/101)" }}>
                                    <Typography>{item.quantity}</Typography>
                                </TableCell>
                                <TableCell sx={{ width: "calc(13*100%/101)" }}>
                                    <Typography>{item.value}  {item.unit}</Typography>
                                </TableCell>
                                <TableCell sx={{ width: "calc(18*100%/101)", padding: "4px" }}>
                                    <Typography>{item.limit} đ</Typography>
                                </TableCell>
                                <TableCell sx={{ width: "calc(18*100%/101)", padding: "8px" }}>
                                    <Typography>Từ: {new Date(item.start).toLocaleString()} </Typography>
                                    <Typography>Đến: {new Date(item.expired).toLocaleString()} </Typography>
                                </TableCell>
                                <TableCell sx={{ width: "calc(13*100%/101)" }}>
                                    <Stack spacing={1}>
                                        <Link to={`edit/${item.id}`} >
                                            <Button sx={{ p: "4px" }} variant="outlined" className="btn__update">Sửa</Button>
                                        </Link>
                                        <Button
                                            onClick={() => openModalDelete(item)}
                                            variant="outlined"
                                            color="error"
                                        >
                                            Xóa
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {totalPage > 1 ?
                    <Stack spacing={2}>
                        <Typography>Page: {page}</Typography>
                        <Pagination count={totalPage} page={page} onChange={handleChange} />
                    </Stack> : <></>}
            </Box>

            <Modal
                sx={{ overflowY: "scroll" }}
                open={modalDelete}
                onClose={closeModalDelete}
            >
                <Stack
                    className="modal-info"
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    width="26rem"
                >
                    <Stack>
                        <InfoOutlinedIcon color="primary" />
                    </Stack>

                    <Stack spacing={3}>
                        <Stack>
                            <Typography sx={{ fontWeight: "bold" }}>
                                Bạn có chắc muốn xoá coupon này ?
                            </Typography>
                        </Stack>

                        <Stack direction="row" justifyContent="flex-end" spacing={1}>
                            <Button onClick={closeModalDelete} variant="outlined">
                                Hủy
                            </Button>
                            <Button variant="contained" color="error" onClick={handleDelete}>Xóa bỏ</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Modal>
        </Box>

    )
}

const listStatus = ["Tất cả", "Đang diễn ra", "Sắp diễn ra", "Đã kết thúc"]
export default Coupon