import { Group } from "@mui/icons-material";
import DvrIcon from "@mui/icons-material/Dvr";
import PaidIcon from "@mui/icons-material/Paid";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import apiUser from "../../../apis/apiUser";
import apiProduct from "../../../apis/apiProduct";
import apiCart from "../../../apis/apiCart";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrdrers] = useState([]);
  // const [page, setPage] = useState(1);
  // const [totalPage, setTotalPage] = useState(1);
  // const size = 5

  useEffect(() => {

    const getUsers = async () => {
      const response = await apiUser.getUsers();
      // console.log(response);
      //setTotalPage(Math.ceil(response.length / size));
      setUsers(response);
    };
    getUsers();

    const getProducts = async () => {
      const response = await apiProduct.getAllProducts();
      //console.log(response);
      setProducts(response);
    };
    getProducts();

    const getOrders = async () => {
      const response = await apiCart.getAllOrders();
      //console.log(response);
      setOrdrers(response);
    };
    getOrders();
  }, []);


  const TotalBills = () => {
    let total = 0;
    orders.forEach(function (item) {
      total += item.totalPrice + item.feeShip;
    });
    return total;
  };
  const format = (n) => {
    return "$" + n.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "grid" },
        gridTemplateColumns: "repeat(3,1fr)",
        gridAutoRows: "minmax(100px, auto)",
        gap: 3,
        textAlign: "center",
        flexDirection: "column",
        padding: "15px",
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total Users</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{users.length}</Typography>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total Products</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DevicesOtherIcon
            sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }}
          />
          <Typography variant="h4">{products.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total Orders</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DvrIcon sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{orders.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total Bills</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PaidIcon sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{format(TotalBills())} VND</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: "1/4" }}>
        <Box>
          <Typography>Recently added Users</Typography>
          <List>
            {users.map((user, i) => {
              if (i < 4) {
                return (
                  <Box key={user?._id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt={user?.fullName} src={"https://www.nicepng.com/png/detail/12-120709_png-file-human-icon-png.png"} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={user?.fullName}
                        secondary={`Time Created: ${moment(
                          user?.createdAt
                        ).format("DD-MM-YYYY ss:mm:H")}`}
                      />
                    </ListItem>
                    {i !== 3 && <Divider variant="inset" />}
                  </Box>
                );
              }
            })}
          </List>
          {/* {totalPage > 1 ? (
              <Stack spacing={2} mt="10px">
                <Pagination
                  count={totalPage}
                  page={page}
                  onChange={handleChangePage}
                  color="primary"
                />
              </Stack>
            ) : (
              <></>
            )} */}
        </Box>
        <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
        <Box>
          <Typography>Recently added Products</Typography>
          <List>
            {products.map((item, i) => {
              if (i < 4) {
                return (
                  <Box key={item.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          alt={item?.name}
                          src={item?.images}
                          variant="rounded"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item?.name}
                        secondary={`Price: ${format(item.price)} VND`}
                      />
                    </ListItem>
                    {i !== 3 && <Divider variant="inset" />}
                  </Box>
                );
              }
            })}
          </List>
        </Box>
      </Paper>
      {/* <Paper elevation={3} sx={{p:2, gridColumn: "1/3"}}>
        <Chart/>
      </Paper>   */}
      {/* <Paper elevation={3} sx={{p:2, gridColumn: "1/3"}}>
        <AreaChartAdmin/> 
      </Paper> */}
    </Box>
  );
};

export default Dashboard;
