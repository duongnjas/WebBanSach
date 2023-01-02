import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import { Stack, Button, Typography, Badge, Box, Modal } from "@mui/material";
import "./Header.scss";

import Login from "../Login";
import SignUp from "../SignUp";
import ForgetPassword from "../ForgetPassword";
import FilterProductSearch from "../../pages/FilterProductSearch";
import { logoutSuccess } from "../../slices/authSlice";

import logo from "../../assets/img/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
const privatePath = ["/customer/", "/admin/", "/payment"];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

  const handleSubmitSearch = () => {
    console.log(`input: ${searchText}`);
    // let obj = searchText.replace(/\s/g, "-");
    // FilterProductSearch(searchText);
    navigate(`search/${searchText}`);
  };

  const onChangeSearch = (event) => {
    setSearchText(event.target.value);
  };
  const [modalLogin, setModalLogin] = useState(false);
  const openModalLogin = () => setModalLogin(true);

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgetPwd, setIsForgetPwd] = useState(false);

  const cart = useSelector((state) => state.cart.items);

  const user = useSelector((state) => state.auth.user); //lấy user từ store

  const handleLogout = () => {
    dispatch(logoutSuccess());
    const isPrivate =
      privatePath.findIndex((e) => location.pathname.includes(e)) >= 0
        ? true
        : false;
    if (isPrivate) {
      navigate("/");
    }
  };

  const closeModalLogin = () => {
    setModalLogin(false);
    setIsLoginForm(true);
    setIsRegister(false);
    setIsForgetPwd(false);
  };

  const closeModalForgetPWD = () => {
    setIsForgetPwd(false);
    setModalLogin(false);
    setIsLoginForm(true);
    setIsRegister(false);
  };

  const handleReturnLogin = useCallback(() => {
    setIsLoginForm(true);
    setIsForgetPwd(false);
    setIsRegister(false);
  }, []);

  const handleOpenSignup = useCallback(() => {
    setIsRegister(true);
    setIsForgetPwd(false);
    setIsLoginForm(false);
  }, []);

  const handleOpenLogin = useCallback(() => {
    setIsLoginForm(true);
    setIsRegister(false);
    setIsForgetPwd(false);
  }, []);

  const handleOpenForgetPwd = useCallback(() => {
    setIsForgetPwd(true);
    setIsRegister(false);
    setIsLoginForm(false);
  }, []);

  return (
    <header className="header">
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          height: "100px",
          width: "100%",
          maxWidth: "1240px",
          margin: "0 auto",
        }}
      >
        <Link className="header__logo" to={"/"}>
          <img alt="" style={{ width: "150px", height: "60px" }} src={logo} />
        </Link>

        <Box sx={{ flex: 1 }} className="header__search">
          <Stack
            direction="row"
            alignItems="center"
            sx={{ padding: "0", height: "40px", flex: 1, position: "relative" }}
          >
            <DebounceInput
              style={{ height: "100%", flex: 1 }}
              id="input-search"
              placeholder="Tìm kiếm sách, ..."
              value={searchText}
              onChange={onChangeSearch}
              debounceTimeout={500}
            />
            <Button
              sx={{
                height: "100%",
                width: "8rem",
                backgroundColor: "ff7337",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
                color: "white",
              }}
              variant="outlined"
              startIcon={<SearchIcon />}
              onClick={() => handleSubmitSearch(searchText)}
            >
              Tìm kiếm
            </Button>
          </Stack>
        </Box>

        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={3}
          py={2}
          className="header__account"
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing="10px"
            sx={{ color: "white", width: "160px", maxWidth: "160px" }}
          >
            {user ? (
              <>
                <img alt="" src={user.img} />

                <Stack>
                  <Typography sx={{ fontSize: "11px" }}>Tài khoản</Typography>

                  <Button
                    sx={{ color: "white", padding: "6px 0" }}
                    endIcon={<ArrowDropDownOutlinedIcon />}
                  >
                    <Typography
                      className="text-overflow-1-lines"
                      sx={{ fontSize: "13px", textAlign: "start" }}
                    >
                      {user.fullName}
                    </Typography>
                  </Button>
                </Stack>

                <Box className="header__dropdown">
                  <Link to={"/customer/account/edit"}>Tài khoản của tôi</Link>
                  <Link to={"/customer/order/history"}>Đơn hàng của tôi</Link>
                  <Link to={"/customer/address"}>Sổ địa chỉ</Link>
                  {/* <Link to={"/customer/wishlist"}>Sản phẩm yêu thích</Link>
                  <Link to={"/customer/notification"}>Thông báo của tôi</Link> */}
                  <Box onClick={handleLogout}>Thoát tài khoản</Box>
                </Box>
              </>
            ) : (
              <>
                <PersonOutlineOutlinedIcon fontSize="large" />

                <Stack>
                  <Typography sx={{ fontSize: "11px" }}>
                    Đăng nhập / Đăng ký
                  </Typography>

                  <Button
                    onClick={openModalLogin}
                    sx={{ color: "white" }}
                    endIcon={<ArrowDropDownOutlinedIcon />}
                  >
                    <Typography sx={{ fontSize: "13px" }}>Tài khoản</Typography>
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </Stack>

        <Stack spacing={1} className="header__cart">
          <Link to="/cart">
            <Stack
              justifyContent="flex-start"
              alignItems="flex-end"
              direction="row"
              spacing={1}
              sx={{ color: "white", width: "110px", maxWidth: "110px" }}
            >
              <Badge color="warning" badgeContent={cart.length} showZero>
                <ShoppingCartOutlinedIcon sx={{ fontSize: "32px" }} />
              </Badge>
              <Typography fontSize="12px">Giỏ hàng</Typography>
            </Stack>
          </Link>
        </Stack>
      </Stack>

      <Modal
        sx={{ overflowY: "scroll" }}
        open={modalLogin}
        onClose={closeModalLogin}
      >
        <Box className="modal-login" sx={{ width: "800px" }}>
          {isLoginForm && (
            <Login
              handleOpenSignup={handleOpenSignup}
              closeModalLogin={closeModalLogin}
              handleOpenForgetPwd={handleOpenForgetPwd}
            />
          )}

          {isRegister && (
            <SignUp
              handleOpenLogin={handleOpenLogin}
              closeModalLogin={closeModalLogin}
            />
          )}

          {isForgetPwd && (
            <ForgetPassword
              closeModalForgetPWD={closeModalForgetPWD}
              handleReturnLogin={handleReturnLogin}
            />
          )}
        </Box>
      </Modal>
    </header>
  );
}

export default Header;
