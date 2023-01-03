import React from "react";
import "./Login.scss";
import {
  Stack,
  IconButton,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../../slices/authSlice";
import { useDispatch } from "react-redux";
import apiAuth from "../../../apis/apiAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { toast } from "react-toastify";
import { useState } from "react";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    phone: "",
    password: "",
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleLogin = (e) => {
    let params = {
      password: values.password,
      phone: values.phone,
    };
    apiAuth
      .postLogin(params)
      .then((res) => {
        let { accessToken, refreshToken, user } = res.data;
        dispatch(loginSuccess({ accessToken, refreshToken, ...user }));
        toast.success(
          `Xin chào ${user.fullName || ""}, bạn đã đăng nhập thành công trang admin`
        );
        navigate("/admin")
      })
      .catch((error) => {
        console.log(error.response.data.message);
      })
  };

  return (
    <Stack className="loginAdmin">
      <Stack className="loginAdmin__wrap" spacing={4}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <AccountCircleIcon sx={{ fontSize: "45px" }} />
          <Typography conponent="h4" fontSize="24px">
            {" "}
            ĐĂNG NHẬP{" "}
          </Typography>
        </Stack>
        <TextField
          id="outlined-basic"
          label="Nhập email hoặc sđt"
          variant="outlined"
          value={values.phone}
          onChange={handleChange("phone")}
        />
        <Stack direction="row" sx={{ width: "100%", position: "relative" }}>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Stack>
        <Button variant="contained" color="warning" onClick={e=>handleLogin()}>
          Đăng nhập
        </Button>
      </Stack>
    </Stack>
  );
}

export default Login;