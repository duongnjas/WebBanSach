import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography, Button, Stack } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import apiProduct from "../../../apis/apiProduct";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { grey } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [open, setOpen] = useState(false);
  const [productId, setProductsId] = useState([]);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    if (open === true) {
      apiProduct
        .removeProduct(productId)
        .then((res) => {
          toast.success("Xóa thành công");
        })
        .catch((error) => {
          toast.error("Xóa thất bại!");
        });
    }
    setOpen(false);
  };
  const handleUpdate = () => {
    navigate(`edit/${productId}`);
  };

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) =>
      products.find((row) => row._id === id)
    );
    //console.log(selectedRowsData[0]?._id);
    setProductsId(selectedRowsData[0]?._id);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await apiProduct.getAllProducts();
        //console.log(response);
        setProducts(response);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [products]);
  const columns = useMemo(
    () => [
      {
        field: "images",
        headerName: "Avatar",
        width: 60,
        renderCell: (params) => (
          <Avatar
            src={
              "https://www.nicepng.com/png/detail/12-120709_png-file-human-icon-png.png"
            }
          />
        ),
        sortable: false,
        filterable: false,
      },
      { field: "name", headerName: "Name", width: 170 },
      { field: "rate", headerName: "Rate", width: 70 },
      { field: "price", headerName: "Price", width: 70 },
      { field: "discount", headerName: "Discount", width: 70 },
      { field: "slug", headerName: "Slug", width: 250 },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format("DD-MM-YYYY HH:MM:SS"),
      },
      { field: "_id", headerName: "Id", width: 220 },
      // {
      //   field: "Delete",
      //   width: 150,
      //   renderCell: (cellValue) => {
      //     return (
      //       <div>
      //     </div>
      //     );
      //   },
      // },
    ],
    []
  );

  return (
    <>
      <Box className="productAdmin">
        <Stack
          direction="row"
          mb={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ backgroundColor: "#FFF", height: "80px" }}
          px={2}
        >
          <Typography>Quản lý sản phẩm</Typography>
          <Link to="/admin/product/create">
            <Button variant="outlined" pr={2}>
              Tạo sản phẩm
            </Button>
          </Link>
        </Stack>
        <Box
          sx={{
            height: 470,
            width: "100%",
          }}
        >
          <DataGrid
            columns={columns}
            rows={products}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[5, 10, 20]}
            pageSize={pageSize}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
            sx={{
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) =>
                  theme.palette.mode === "light" ? grey[200] : grey[900],
              },
            }}
          />
          <Stack direction= "row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={handleClickOpen}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={handleUpdate}
            >
              Sửa
            </Button>
          </Stack>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Bạn có muốn xóa hay không?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Hủy
              </Button>
              <Button onClick={() => handleDelete()}>Xóa</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </>
  );
}

export default Product;
