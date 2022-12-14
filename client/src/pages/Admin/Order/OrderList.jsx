 /* eslint-disable */
import React, { useState } from "react";
import { useEffect } from "react";
import { Link,Routes,Route } from "react-router-dom";
import "./Order.scss";
import {
    Stack,
    Button,
    Typography,
    TextField,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    InputBase,
    Pagination,
} from "@mui/material";
import apiCart from "../../../apis/apiCart";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import DetailOrder from "./DetailOrder";

function OrderList() {
    const [selected, setSelected] = React.useState(0)
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    
    const size =6;

    useEffect(() => {
        const getData = async () => {
          apiCart.getAllOrders()
            .then(response=>{
            setOrders(response);       
            })
            .catch(setOrders([]))
        };
        getData();
      }, [page, selected]);

    // const handleDate = (timestamp) => {
    //     let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp)
    //     return date ;
    // }

    const handleClickTab = (i) => {
        if (i !== selected)
            setSelected(i)
    }
    const [status, setStatus] = useState(0);
    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }
    const [orderDate, setOrderDate] = useState(0);
    const onChangeOrderDate = (e) => {
        setOrderDate(e.target.value)
    }
    const handleChangePage = (event, newValue) => {
        setPage(newValue);
      };
    return (<>
    
        <Stack p={3} bgcolor="#fff">
            <Typography fontSize="26px">Danh sách đơn hàng</Typography>
            <Table
                className="tableCategory"
                sx={{ minWidth: "650px" }}
                stickyHeader
                size="small"
            >
                <TableHead>
                    <TableRow>
                        <TableCell><Checkbox /></TableCell>
                        <TableCell sx={{ width: "20%", top: "64px" }}>Mã đơn hàng/Ngày đặt hàng</TableCell>
                        <TableCell sx={{ width: "15%", top: "64px" }}>Trạng thái&nbsp;</TableCell>
                        <TableCell align="center" sx={{ width: "20%", top: "64px" }}>Ngày xác nhận/hạn xác nhận&nbsp;</TableCell>
                        <TableCell align="center" sx={{ width: "20%", top: "64px" }}>Giá trị đơn hàng&nbsp;</TableCell>
                        <TableCell sx={{ width: "15%", top: "64px" }}>Loại ship&nbsp;</TableCell>
                        <TableCell sx={{ width: "10%", top: "64px" }}>Thao tác&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((row) => (
                        <TableRow
                            key={row?._id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell><Checkbox /></TableCell>
                            <TableCell component="th" scope="row">{row?._id} <br/>/ {row?.createdAt}</TableCell>
                            {/* <TableCell component="th" scope="row">{row?._id} <br/>/ {handleDate(row?.createdAt)}</TableCell> */}
                            <TableCell align="left">{row?.type}</TableCell>
                            {/* <TableCell align="center">{handleDate(row?.updatedAt)}</TableCell> */}
                            <TableCell align="center">{row?.updatedAt}</TableCell>
                            <TableCell align="center">{row?.totalPrice + row?.feeShip}đ</TableCell>
                            <TableCell align="left">{row?.shipping}đ</TableCell>
                            <TableCell align="center">
                                <Stack spacing={1} justifyContent="center" py={1}>
                                    <Link to={`detail/${row._id}`}>
                                        <Button sx={{ width: "100px" }} variant="outlined" >Xem chi tiết</Button>
                                    </Link>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {totalPage > 1 ? <Stack spacing={2} mt="10px">
                <Pagination count={totalPage} page={page} onChange={handleChangePage} color="primary"/>
            </Stack > : <></>}
        </Stack>
        <Routes>
            <Route path='detail' element={<DetailOrder />} />
        </Routes>
    </>
    )
}
const BootstrapInput = styled(InputBase)(({ theme }) => ({

    '& .MuiInputBase-input': {
        boxSizing: "border-box",
        borderRadius: 4,
        position: 'relative',
        border: '1px solid #888',
        fontSize: 14,
        display: 'flex',
        alignItems: "center",
        height: '40px !important',
        padding: '4px 10px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),

        '&:focus': {
            borderRadius: 4,
            borderColor: '#1890ff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

export default OrderList