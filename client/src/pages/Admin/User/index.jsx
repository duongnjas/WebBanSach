import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography, Button } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import apiUser from "../../../apis/apiUser";
import moment from "moment";
import { grey } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [open, setOpen] = useState(false);
  const [deletaId, setDeleteId] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (open === true) {
      apiUser
        .removeUsers(deletaId)
        .then((res) => {
          toast.success("Xóa thành công");
        })
        .catch((error) => {
          toast.error("Xóa thất bại!");
        });
    }
    setOpen(false);
  };

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) =>
      users.find((row) => row._id === id)
    );
    //console.log(selectedRowsData[0]?._id);
    setDeleteId(selectedRowsData[0]?._id);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await apiUser.getUsers();
        //console.log(response);
        setUsers(response);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [users]);

  const columns = useMemo(
    () => [
      {
        field: "photoURL",
        headerName: "Avatar",
        width: 60,
        renderCell: (params) => <Avatar src={"https://www.nicepng.com/png/detail/12-120709_png-file-human-icon-png.png"} />,
        sortable: false,
        filterable: false,
      },
      { field: "fullName", headerName: "Name", width: 170 },
      {
        field: "birth_day",
        headerName: "Date of Birth",
        width: 140,
        renderCell: (params) =>
          moment(params.row.createdAt).format("DD-MM-YYYY"),
      },
      { field: "email", headerName: "Email", width: 200 },
      {
        field: "phone",
        headerName: "Phone",
        width: 130,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format("DD-MM-YYYY HH:MM:SS"),
      },
      { field: "_id", headerName: "Id", width: 220 },
      {
        field: "roleNames",
        headerName: "RoleNames",
        width: 400,
      },
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
    <Box
      sx={{
        height: 470,
        width: "100%",
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Manage Users
      </Typography>
      <DataGrid
        columns={columns}
        rows={users}
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
      {/* <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        Delete
      </Button> */}
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
  );
};

export default Users;
