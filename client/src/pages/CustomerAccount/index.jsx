import React from "react";

import { Routes, Route, Link, useLocation } from "react-router-dom";

import "./CustomerAccount.scss";

import { sidebarTab } from "../../constraints/Profile";
import avatar from "../../assets/img/avatar.png";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
  Box,
  Typography,
  Breadcrumbs,
} from "@mui/material";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Info from "./Info/index";
import Email from "./Info/Email/index";
import Password from "./Info/Password/index";
import Orders from "./Orders/index";
import Addresses from "./Addresses/index";
import CreateAddress from "./Addresses/CreateAddress/index";
import DetailOrder from "./Orders/DetailOrder";
import { useSelector } from "react-redux";

function CustomerAccount() {
  const location = useLocation();
  const tabId = sidebarTab.find((item) =>
    location.pathname.includes(item.link)
  );
  const userId = useSelector((state) => state.auth.user).id;
  const [selectedTabId, setSelectedTabId] = React.useState(tabId?.id || 0);
  const [badge, setBadge] = React.useState(0);
  const user = useSelector((state) => state.auth.user); //lấy user từ store
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      to="/"
      style={{ fontSize: "14px" }}
    >
      Trang chủ
    </Link>,
    <Typography key="2" color="text.primary" fontSize="14px">
      {sidebarTab.find((item) => item.id === selectedTabId)?.text || ""}
    </Typography>,
  ];

  React.useEffect(() => {
    const handleChangePath = () => {
      const tabId = sidebarTab.find((item) =>
        location.pathname.includes(item.link)
      );
      if (tabId) setSelectedTabId(tabId?.id || 0);
    };
    handleChangePath();
  }, [location.pathname]);

  React.useEffect(() => {
    document.title =
      sidebarTab.find((item) => item.id === selectedTabId)?.text ||
      "Tiki - Mua hàng online, giá tốt, hàng chuẩn, ship nhanh";
  }, [selectedTabId]);

  return (
    <Box className="container">
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        p="16px 16px 8px"
        fontSize="14px"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Box className="customer-account">
        <Box width="16rem">
          <List sx={{ maxWidth: "300px" }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="hình đại diện" src={user?.img || avatar} />
              </ListItemAvatar>
              <ListItemText
                primary="Tài khoản của"
                secondary={user?.fullName}
              />
            </ListItem>

            {sidebarTab.map((item, index) => {
              return (
                <Link key={item.id} to={item.link}>
                  <ListItem
                    disablePadding
                    onClick={() => setSelectedTabId(item.id)}
                    selected={selectedTabId === item.id}
                  >
                    <ListItemButton>
                      <ListItemIcon>{<item.icon />}</ListItemIcon>

                      <ListItemText
                        primary={item.text}
                        sx={{ "&>span": { fontSize: "13px" } }}
                      />
                      {index === 1 ? (
                        badge > 0 ? (
                          <Badge badgeContent={badge} color="error"></Badge>
                        ) : null
                      ) : null}
                    </ListItemButton>
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Box>
        <Box flex={1} mt="16px">
          {/* <Outlet /> */}
          <Routes>
            <Route
              path="account/edit/*"
              element={
                <Routes>
                  <Route index element={<Info />} />
                  <Route path="email" element={<Email />} />
                  <Route path="pass" element={<Password />} />
                </Routes>
              }
            />
            <Route
              path="order/*"
              element={
                <Routes>
                  <Route path="history" element={<Orders />} />
                  <Route path="detail/:id" element={<DetailOrder />} />
                </Routes>
              }
            />

            <Route
              path="address/*"
              element={
                <Routes>
                  <Route index element={<Addresses />} />
                  <Route path="create" element={<CreateAddress />} />
                  <Route
                    path="edit/:id"
                    element={<CreateAddress edit={true} />}
                  ></Route>
                </Routes>
              }
            />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};
export default CustomerAccount;