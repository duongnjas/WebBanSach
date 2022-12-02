/* eslint-disable jsx-a11y/alt-text */
 /* eslint-disable */
import React from "react";
import { useForm } from "react-hook-form";
import { ErrorInput } from "../ErrorHelper";

import apiAuth from "../../apis/apiAuth";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {
  Stack,
  IconButton,
  Button,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";

function ForgetPassword(props) {
const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    apiAuth.forgetPassword(data)
      .then((res) => {
        toast.success("Vui lòng kiểm tra email để lấy đường dẫn reset mật khẩu");
navigate('/')
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra. Vui lòng kiểm tra lại email");
      });
  }


  return (
    <Stack direction="row">
      <Stack sx={{ flex: 5 }} spacing={2}>
        <Box>
          <IconButton onClick={props.handleReturnLogin}>
            <ArrowBackIosIcon />
          </IconButton>
        </Box>
        <h4 style={{ fontSize: "24px" }}>Quên mật khẩu ?</h4>
        <p style={{ fontSize: "15px" }}>
          Vui lòng nhập thông tin tài khoản để lấy lại mật khẩu
        </p>

        <form>
          <Stack spacing={2}>
            <Stack>
              <TextField
                {...register("email", {
                  required: "Hãy nhập địa chỉ email",
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Địa chỉ email không hợp lệ",
                  }
                })}
                label="Email"
                variant="standard"
              />
              {errors.email && (
                <ErrorInput message={errors.email.message} />
              )}
            </Stack>

            <Button
              variant="contained"
              color="error"
              onClick={handleSubmit(onSubmit)}
            >
              Lấy lại mật khẩu
            </Button>
          </Stack>
        </form>
      </Stack>
      <span style={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton onClick={props.closeModalForgetPWD}>
          <CloseIcon />
        </IconButton>
      </span>

    </Stack>
  );
}

export default ForgetPassword;
