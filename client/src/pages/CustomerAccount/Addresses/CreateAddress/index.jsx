 /* eslint-disable */
import React from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  InputBase
} from "@mui/material";
import { useSelector } from "react-redux";
import "./CreateAddress.scss";
import { styled } from '@mui/material/styles';
import { useState } from "react";
import apiAddress from "../../../../apis/apiAddress";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateAddress(props) {

  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [addressDetail, setAddressDetail] = useState("")
  const [addressid, setAddressid] = useState("")
  const [edit, setEdit] = useState(props.edit)
  const [province, setProvince] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [commune, setCommune] = React.useState("");
  const navigate = useNavigate();
  const params = useParams();
  const userId = useSelector((state) => state.auth.user)._id;

  useEffect(() => {

    const loaddata = () => {
      if (edit === true) {
        apiAddress.getUserAddress(userId)
          .then(res => {
            console.log(params);
            const addresses = res;
            if (addresses) {
              const address = addresses.find((item) => item._id === params.id)
              if (address) {
                setFullName(address.name);
                setPhone(address.phone);
                setAddressDetail(address.details);
                setCommune(address.ward);
                setDistrict(address.district);
                setProvince(address.province);
                setAddressid(params.id);
              }
              else {
                navigate("/customer/address/create");
                toast.error("Địa chỉ này không tồn tại!");
              }
            }
            else {
              navigate("/customer/address/create");
              toast.error("Địa chỉ này không tồn tại!");
            }
          })
      }   
    }
    loaddata()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit])
  const handleSave = () => {
    const params = {
      "details": addressDetail,
      "ward": commune,
      "district": district,
      "name": fullName,
      "userId":userId,
      "phone": phone,
      "province": province,
    }
    if(!(addressDetail && commune  && district && fullName && phone && province)) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return
    }
    else{
    apiAddress.saveAddress(params)
      .then(res => {
        toast.success("Thêm địa chỉ thành công")
        setFullName("")
        setPhone("")
        setAddressDetail("")
        setCommune("")
        setDistrict("")
        setProvince("")
      })
      .catch(error => {
        toast.error("Thêm địa chỉ thất bại!")
      })
    }
  }

  const handleUpdate = () => {
    
    const params = {
      "details": addressDetail,
      "ward": commune,
      "district": district,
      "name": fullName,
      "userId":userId,
      "phone": phone,
      "province": province,
    }
    if(!(addressDetail&& commune && district && fullName && phone && province)) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return
    }
    else{
      apiAddress.updateUserAddressById(params, addressid)
      .then(res => {
        toast.success("Cập nhật thành công")
      })
      .catch(error => {
        toast.error("Cập nhật thất bại!")
      })
    }
  }

  return (
    <Box className="create-address" p={2} m={2}>
      <Typography variant="h6">Tạo sổ địa chỉ</Typography>

      <Stack p='2rem' spacing={1.875} width='80%'>
        <Stack direction="row">
          <Typography className="create-address__label">
            Họ và tên:
          </Typography>
          <Stack className="create-address__input">
            <InputCustom value={fullName} onChange={(event) => {
              setFullName(event.target.value)
            }}
              placeholder="Nhập họ và tên"
              size="small"
            ></InputCustom>
          </Stack>
        </Stack>
        <Stack direction="row">
          <Typography className="create-address__label">
            Số điện thoại:
          </Typography>
          <Stack className="create-address__input">
            <InputCustom value={phone} onChange={(event) => {
              setPhone(event.target.value)
            }}
              size="small"
              placeholder="Nhập số điện thoại"
            ></InputCustom>
          </Stack>
        </Stack>

        <Stack direction="row">
          <Typography className="create-address__label">
            Tỉnh/Thành Phố
          </Typography>
          <Stack className="create-address__input">
            <InputCustom value={province} onChange={(event) => {
              setProvince(event.target.value)
            }}
              size="small"
              placeholder="Nhập tỉnh/thành phố"
            ></InputCustom>
          </Stack>
        </Stack>

        <Stack direction="row">
          <Typography className="create-address__label">
            Quận/Huyện
          </Typography>
          <Stack className="create-address__input">
            <InputCustom value={district} onChange={(event) => {
              setDistrict(event.target.value)
            }}
              size="small"
              placeholder="Nhập quận/huyện"
            ></InputCustom>
          </Stack>
        </Stack>

        <Stack direction="row">
          <Typography className="create-address__label">
            Phường/Xã
          </Typography>
          <Stack className="create-address__input">
            <InputCustom value={commune} onChange={(event) => {
              setCommune(event.target.value)
            }}
              size="small"
              placeholder="Nhập phường/xã"
            ></InputCustom>
          </Stack>
        </Stack>
        <Stack direction="row">
          <Typography className="create-address__label">
            Địa chỉ
          </Typography>
          <Stack className="create-address__input">
            <InputCustom value={addressDetail} onChange={(event) => {
              setAddressDetail(event.target.value)
            }}
              multiline
              rows={4}
              placeholder="Nhập địa chỉ"
            ></InputCustom>
          </Stack>
        </Stack>
        <Stack direction="row">
          <Typography className="create-address__label"></Typography>
          <Button
            onClick={
              edit ? handleUpdate
                : handleSave} className="btn__Update" variant="contained">
            Cập nhật
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

const InputCustom = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    boxSizing: "border-box",
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    display: "flex",
    height: "40px !important",
    padding: '0px 26px 0px 12px',
    alignItems: "center",
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#1890ff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

export default CreateAddress;
