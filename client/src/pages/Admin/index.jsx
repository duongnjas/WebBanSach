/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { sidebar } from "../../constraints/Admin";
import { styled } from "@mui/material/styles";
import "./Admin.scss";

import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import "./Admin.scss";
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  Stack,
  ClickAwayListener,
  Button,
  Badge,
  SwipeableDrawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  ListItemButton,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CreateCoupon from "./Coupon/CreateCoupon";
import AdminLogin from "./Login";
import Category from "./Category";
import CreateCategory from "./Category/CruCategory/index";
import CouponAdmin from "./Coupon";
import Dashboard from "./Dashboard";
import Order from "./Order";
import Product from "./Product";
import CreateProduct from "./Product/CreateProduct";
import Review from "./Review";
import User from "./User";
import DetailUser from "./User/DetailUser";
import logo from "../../assets/img/book.png";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useMemo } from "react";
import { ThemeContext } from "@emotion/react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: `calc(100% - calc(${theme.spacing(8)} + 1px))`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Admin() {
  const user = useSelector((state) => state.auth.user);

  const stylesAccount = {
    position: "absolute",
    top: 48,
    right: 0,
    zIndex: 1,
    border: "1px solid #333",
    bgcolor: "background.paper",
    width: "16rem",
    paddingTop: "4px",
  };

  const [selectedTabId, setSelectedTabId] = React.useState(0);

  const [open, setOpen] = React.useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
      <Stack direction="row">
        <CssBaseline />

        <AppBar
          sx={{ backgroundColor: "white", color: "black" }}
          position="fixed"
          open={open}
        >
          <Toolbar>
            <Stack
              width="100%"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpen(!open)}
                edge="start"
                sx={{
                  marginRight: 5,
                  // ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>

              <Stack direction="row" spacing={3} alignItems="center">
                <ClickAwayListener>
                  <Stack
                    sx={{
                      borderRadius: "16px",
                      position: "relative",
                      height: "32px",
                      padding: "4px",
                      cursor: "pointer",
                    }}
                    className="admin__dropdown"
                    direction="row"
                    alignItems="center"
                    spacing={1}
                  >
                    <Box
                      borderRadius="50%"
                      alt=""
                      component="img"
                      src={logo}
                      sx={{ width: "24px", height: "24px" }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: "14px",
                        paddingLeft: "6px",
                        fontWeight: "Light",
                      }}
                    >
                      {user.fullName}
                    </Typography>
                  </Stack>
                </ClickAwayListener>
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <img
                src={logo}
                style={{ width: "39px", height: "39px" }}
                alt=""
              />
            </IconButton>

            <Typography sx={{ ml: "1rem", fontWeight: "bold" }} variant="h6">
              Admin Center
            </Typography>
          </DrawerHeader>

          <Divider />

          <List>
            {sidebar.map((item) => (
              <Link to={item.link}>
                <ListItem
                  key={item.id}
                  disablePadding
                  sx={{ display: "block" }}
                  selected={selectedTabId === item.id}
                  onClick={() => setSelectedTabId(item.id)}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {<item.icon />}
                    </ListItemIcon>

                    <ListItemText
                      primary={item.text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>

        <Box
          component="main"
          flexGrow={1}
          p={0}
          bgcolor="#f5f5fa"
          minHeight="40rem"
        >
          <DrawerHeader />
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="order/*" element={<Order />} />
            <Route
              path="product/*"
              element={
                <Routes>
                  <Route index element={<Product />} />
                  <Route path="create" element={<CreateProduct />} />
                </Routes>
              }
            />

            <Route
              path="category/*"
              element={
                <Routes>
                  <Route index element={<Category />} />
                  <Route path="create" element={<CreateCategory />} />
                  <Route
                    path="edit/:id"
                    element={<CreateCategory edit={true} />}
                  />
                </Routes>
              }
            />

            <Route
              path="user/*"
              element={
                <Routes>
                  <Route index element={<User />} />
                  <Route path="detail/:id" element={<DetailUser />} />
                </Routes>
              }
            />
          </Routes>
        </Box>
      </Stack>
  );
}

export default Admin;
