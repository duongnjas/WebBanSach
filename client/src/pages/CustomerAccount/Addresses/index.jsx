import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import "./Addresses.scss";
import { Typography, Button, Stack, Box, Dialog } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import apiAddress from '../../../apis/apiAddress';
import EmptyNotify from '../../../components/EmptyNotify';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Addresses() {
  const userId = useSelector((state) => state.auth.user)._id;
  const [itemdelete, setItemdelete] = useState(null)
  const [addresses, setAddresses] = useState([]);
  const [dialogDelete, setDialogDelete] = useState(false);

  useEffect(() => {
    const getData = async () => {
      apiAddress.getUserAddress(userId)
        .then(res => {
          setAddresses(res);
          console.log(res)
        })
    };
    getData();
    
  }, []);

  const handleDelete = () => {

    const newaddress = addresses.filter(item => {
      return itemdelete._id !== item._id
    }
    )
    setAddresses(newaddress)
    closeDialogDeleteAll()
    console.log(itemdelete._id)
    apiAddress.deleteAddressById(itemdelete._id)
      .then(res => {
        toast.success("Xóa thành công")
      })
      .catch(error => {
        toast.error("Xóa không thành công!")
      })
  }
  
  const openDialogDeleteAll = (itemdelete) => {
    setItemdelete(itemdelete)
    setDialogDelete(true)
  }
  const closeDialogDeleteAll = () => {
    setDialogDelete(false)
  }

  return (
    <Stack spacing={2} className="addresses">
      <Typography className="heading">Sổ địa chỉ</Typography>
      <Link to="/customer/address/create">
        <Button className="new" variant="outlined" startIcon={<AddIcon />}>
          Thêm địa chỉ mới
        </Button>
      </Link>
      <Stack spacing={5}>{
        addresses.length === 0 ?
          <EmptyNotify title="Bạn chưa có địa chỉ" />
          : addresses.map((item) => {
            return (
              <Stack key={item?._id}
                direction="row"
                width="100%"
                className="items"
              >
                <Stack className="info">
                  <Typography className="name">{item.name}</Typography>
                  <Typography className="address">Địa chỉ: {`${item?.details}, ${item?.ward}, ${item?.district}, ${item?.province}`}</Typography>
                  <Typography className="number">Điện thoại: {item?.phone}</Typography>
                </Stack>

                <Stack direction="row" className="action">
                  <Link to={`edit/${item._id}`}
                    state={{ id: item._id }}>
                    <Button className="Modify" variant="text">
                      Chỉnh sửa
                    </Button></Link>
                  <Button onClick={() => openDialogDeleteAll(item)} className="Delete" variant="text">
                    Xóa
                  </Button>
                </Stack>
                {
                  dialogDelete &&
                  <Dialog onClose={closeDialogDeleteAll} open={dialogDelete}>
                    <Box className="dialog-removecart">
                      <Box className="dialog-removecart__title">
                        <h4>Xoá địa chỉ</h4>
                      </Box>
                      <Box className="dialog-removecart__content">
                        Bạn có muốn xóa địa chỉ
                      </Box>
                      <Box className="dialog-removecart__choose">
                        <Button
                          variant="outlined"
                          onClick={handleDelete}
                          sx={{ width: "120px", height: "36px" }}
                        >
                          Xác nhận
                        </Button>
                        <Button
                          variant="contained"
                          onClick={closeDialogDeleteAll}
                          sx={{ width: "57px", height: "36px" }}
                        >
                          Huỷ
                        </Button>
                      </Box>
                    </Box>
                  </Dialog>
                }
              </Stack>
            )
          })
      }</Stack>
    </Stack>
  );
}

export default Addresses;
