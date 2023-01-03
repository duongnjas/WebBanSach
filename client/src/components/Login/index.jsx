import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorInput, ErrorAfterSubmit } from "../ErrorHelper";
import { loginSuccess} from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import apiAuth from "../../apis/apiAuth";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";

import {
  Stack,
  IconButton,
  Button,
  TextField,
  Input,
  Typography,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "../Loading";
import { toast } from "react-toastify";

function Login(props) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isShowPass, setIsShowPass] = React.useState(false);

  const [isNoAccount, setIsNoAccount] = useState(false);

  const [wrongPass, setWrongPass] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    if (loading) {
      toast.warning(
        "Thao tác đang thực hiện. Vui lòng không thao tác quá nhanh"
      );
      return;
    }
    setLoading(true);
    let params = {
      password: data.pass,
      phone: data.phoneNumber,
    };

    apiAuth
      .postLogin(params)
      .then((res) => {
        let { accessToken, refreshToken, user } = res.data;
        dispatch(loginSuccess({ accessToken, refreshToken, ...user }));
        toast.success(`Xin chào ${user.fullName || ""}, mời bạn tiếp tục mua sắm`)
        props.closeModalLogin();
      })
      .catch((error) => {
        console.log(error.response.data.message);
        if (error.response.data.message === "No account found") {
          setIsNoAccount(true);
          setWrongPass(false);
        } else {
          setIsNoAccount(false);
          setWrongPass(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };



  return (
    <Stack direction="row">
      <Stack direction="column" sx={{ flex: 5 }} spacing={2}>
        <Typography variant="h5" sx={{ fontSize: "24px", textAlign: "center",}}>ĐĂNG NHẬP</Typography>
        <p style={{ fontSize: "15px" }}>Đăng nhập bằng số điện thoại</p>

        <form>
          <Stack spacing={2}>
            <Stack>
              <TextField
                {...register("phoneNumber", {
                  required: "Hãy nhập số điện thoại",
                  pattern: {
                    value: /\d+/,
                    message: "Số điện thoại không hợp lệ",
                  },
                  minLength: {
                    value: 10,
                    message: "Số điện thoại phải có ít nhất 10 chữ số",
                  },
                })}
                label="Số Điện Thoại"
                variant="standard"
              />
              {errors.phoneNumber && (
                <ErrorInput message={errors.phoneNumber.message} />
              )}
            </Stack>

            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel>Mật khẩu</InputLabel>

              <Input
                {...register("pass", {
                  required: "Hãy nhập mật khẩu",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải có ít nhất 8 ký tự",
                  },
                })}
                variant="standard"
                type={isShowPass ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsShowPass(!isShowPass)}
                      edge="end"
                    >
                      {isShowPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.pass && <ErrorInput message={errors.pass.message} />}
            </FormControl>

            {isNoAccount && (
              <ErrorAfterSubmit message="Số điện thoại chưa được đăng ký" />
            )}

            {wrongPass && (
              <ErrorAfterSubmit message="Mật khẩu đăng nhập không chính xác" />
            )}

            <Button
              variant="contained"
              color="error"
              onClick={handleSubmit(onSubmit)}
            >
              {loading && <Loading color="#fff" />}
              Đăng nhập
            </Button>
          </Stack>
        </form>
        <Stack alignItems="center">
          <span
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={props.handleOpenForgetPwd}
          >
            {" "}
            Quên mật khẩu
          </span>
        </Stack>
        <p style={{ textAlign: "center" }}>
          Nếu bạn chưa có tài khoản?
          <span
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={props.handleOpenSignup}
          >
            {" "}
            Đăng ký
          </span>
        </p>
      </Stack>
      <span style={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton onClick={props.closeModalLogin}>
          <CloseIcon />
        </IconButton>
      </span>
    </Stack>
  );
}

export default Login;
