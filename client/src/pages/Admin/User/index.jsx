import { Link } from "react-router-dom";
import apiProfile from "../../../apis/apiProfile";
import React, { useState,  useEffect } from 'react'
import {
  Stack,
  Button,
  Typography,
  Modal,
  TextField,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { toast } from "react-toastify";

import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";


function User() {
  const [modalDelete, setModalDelete] = React.useState(false);
  const closeModalDelete = () => setModalDelete(false);

  const [users, setUsers] = useState([])

  useEffect(() => {
    const getData = async () => {
      
      apiProfile.getAllUser()
        .then(res => {
          setUsers(res.data.listUser)
        })
        .catch(error=>{
          toast.error("không có user")
          // setUsers(data)
        })
    };
    getData();
  }, []);

  return (
    <Stack direction="row" sx={{ backgroundColor: "#fff" }} p={3}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Danh sách người dùng</Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-end"></Stack>

        <Stack direction="row" sx={{ width: "100%", position: "relative" }}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <span className="brand__iconSearch">
            <SearchIcon sx={{ fontSize: "28px" }} />
          </span>
        </Stack>

        <Table
          className="tableBrand"
          sx={{ minWidth: "50rem" }}
          stickyHeader
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                ID
              </TableCell>
              <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                Tên khách hàng
              </TableCell>
              <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                Ngày đăng ký
              </TableCell>
              <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                Số điện thoại
              </TableCell>
              <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{item.id}</TableCell>

                <TableCell align="center">{item.fullName}</TableCell>

                <TableCell align="center">{item.registerDate}</TableCell>

                <TableCell align="center">
                  <Typography>{item.phone}</Typography>
                </TableCell>

                <TableCell align="center" >
                  <Stack spacing={1} justifyContent="center" py={1}>
                    <Link to={`/admin/user/detail/${item.id}`}>
                      <Button variant="contained">Xem</Button>
                    </Link>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>

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
                Bạn có chắc muốn xoá ảnh đại diện ?
              </Typography>
              <Typography>
                Hình ảnh đại diện sẽ quay về mặc định của Tiki
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button onClick={closeModalDelete} variant="outlined">
                Hủy
              </Button>
              <Button variant="contained">Xóa bỏ</Button>
            </Stack>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
}

export default User;
