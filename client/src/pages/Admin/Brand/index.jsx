 /* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import "./Brand.scss";
import { useState, useEffect } from "react";
import { Stack, Button, Typography, Modal, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import apiBrand from "../../../apis/apiBrand";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { toast } from "react-toastify";

function Brand() {
  const [modalDelete, setModalDelete] = React.useState(false);
  const closeModalDelete = () => setModalDelete(false);
  const [itemdelete, setItemdelete] = useState("")
  const [brand, setBrand] = useState([])
  const [country, setCountry] = useState("")
  const [province, setProvince] = useState("")
  const [district, setDistrict] = useState("")
  const [commune, setCommune] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [phone, setPhone] = useState("")
  const [addressDetail, setAddressDetail] = useState("")
  const openModalDelete = (itemdelete) => {
    setItemdelete(itemdelete)
    setModalDelete(true)
  }
  useEffect(() => {
    const getData = async () => {
      apiBrand.getAllBrand()
        .then(res => {
          setBrand(res.data.listBrand);
        })
    };
    getData();
  }, []);
  const handleDelete = () => {
    const newbrand = brand.filter(item => {
      return itemdelete.id !== item.id
    }
    )
    apiBrand.deleteBrandById({id:itemdelete.id})
    .then(res=>{
      toast.success("Xóa thành công")
    })
    .catch(error=>{
      toast.error("Xóa không thành công!")
    })
    setBrand(newbrand)
    console.log(newbrand)
    closeModalDelete()
  }
  const handleUpdate = () => {
    const params = {
      "addressDetail": addressDetail,
      "country": country,
      "commune": commune,
      "description": description,
      "district": district,
      "name": name,
      "phone": phone,
      "province": province

    }
    if (!(addressDetail && country && commune && description && district && name && phone && province)) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return
    }
    else {
      apiBrand.updateBrand(params)
        .then(res => {
          toast.success("Sửa thương hiệu thành công")
          setCountry("")
          setDescription("")
          setPhone("")
          setName("")
          setAddressDetail("")
          setCommune("")
          setDistrict("")
          setProvince("")
        })
        .catch(error => {
          toast.error("Sửa thương hiệu thất bại!")
        })
    }
  }
  return (
    <Stack direction="row" sx={{ backgroundColor: "#fff" }} p={3}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Danh sách thương hiệu</Typography>

          <Link to="/admin/brand/create">
            <Button variant="contained">Thêm thương hiệu</Button>
          </Link>
        </Stack>

        <Stack direction="row" sx={{ width: "100%", position: "relative" }}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            size="medium"
            width="100%"
          />
          <span className="brand__iconSearch">
            <SearchIcon sx={{ fontSize: "28px" }} />
          </span>
        </Stack>

        <Table
          className="tableBrand"
          minWidth="650px"
          stickyHeader
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "15%", top: "64px" }}>
                Tên nhãn hiệu
              </TableCell>
              <TableCell sx={{ width: "15%", top: "64px" }}>Mô tả</TableCell>
              <TableCell align="center" sx={{ width: "30%", top: "64px" }}>
                Địa chỉ&nbsp;
              </TableCell>
              <TableCell sx={{ width: "20%", top: "64px" }}>
                Thông tin liên lạc&nbsp;
              </TableCell>
              <TableCell align="center" sx={{ width: "10%", top: "64px" }}>
                Ảnh&nbsp;
              </TableCell>
              <TableCell align="center" sx={{ width: "10%", top: "64px" }}>
                Thao tác&nbsp;
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brand.map((item, id) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="left">{item.description}</TableCell>
                <TableCell align="left">{`${item.addressDetails}, ${item.brandCommune.name}, ${item.brandDistrict.name},${item.brandProvince.name}`}</TableCell>
                <TableCell align="left">
                  <Typography>{item.phone}</Typography>
                </TableCell>
                <TableCell align="center">
                  <img alt="" width="80px" height="80px" src={item.img} />
                </TableCell>
                <TableCell>
                  <Stack spacing={1} justifyContent="center" py={1}>
                  <Link to={`edit/${item.id}`} style={{flex:1}}>
                    <Button variant="contained" sx={{width:"100%"}}>Sửa</Button> </Link>
                    <Button
                      onClick={()=>openModalDelete(item)}
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
                Bạn có chắc muốn xoá thương hiệu này ?
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button onClick={closeModalDelete} variant="outlined">
                Hủy
              </Button>
              <Button variant="contained" onClick={handleDelete}>Xóa bỏ</Button>
            </Stack>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
}

export default Brand;
