import React from "react";
import { useForm } from "react-hook-form";
import apiAuth from "../../apis/apiAuth";
import { ErrorInput, ErrorAfterSubmit } from "../ErrorHelper";
import {
  Stack,
  IconButton,
  Button,
  TextField,
  Input,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { toast } from "react-toastify";

function SignUp(props) {
  const [showPass, setShowPass] = React.useState(false);
  const [showPassConf, setShowPassConf] = React.useState(false);
  const [invalidPhone, setInvalidPhone] = React.useState(false);
  const [isDiffPass, setIsDiffPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleCheckPass = () => {
    if (watch("pass") !== watch("passConf")) {
      setIsDiffPass(true);
    } else {
      setIsDiffPass(false);
      return true;
    }
  };
  const onSubmit = async () => {
    // if (loading) {
    //   toast.warning(
    //     "Thao tác đang thực hiện. Vui lòng không thao tác quá nhanh"
    //   );
    //   return;
    // }
    setLoading(true);
     if (handleCheckPass()) {
      if (isDiffPass === false) {
        let param = {
          password: watch("pass"),
          phone: watch("phoneNumber"),
          fullName: watch("name"),
        };
        console.log(param);
        apiAuth.postRegister(param)
          .then(()=>{
            setIsSuccess(true);
            toast.success(`Bạn đã đăng ký thành công`);
          })
          .catch(() => toast.warning(`Số diện thoại đã tồn tại`))
      }
    }
  };

  return (
    <Stack direction="row">
      <Stack direction="column" sx={{ flex: 5 }} spacing={3}>
        <Typography variant="h5" sx={{ fontSize: "24px", textAlign: "center" }}>
          ĐĂNG KÝ
        </Typography>
        <form>
          <Stack spacing={2}>
            <Stack width="100%">
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
                label="Số điện thoại"
                variant="standard"
                sx={{ flex: 1 }}
              />

              {errors.phoneNumber && (
                <ErrorInput message={errors.phoneNumber.message} />
              )}
            </Stack>

            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="outlined-adornment-password">
                Họ và tên
              </InputLabel>
              <Input
                {...register("name", {
                  required: "Hãy nhập họ và tên",
                })}
              />
            </FormControl>

            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="outlined-adornment-password">
                Nhập mật khẩu
              </InputLabel>
              <Input
                {...register("pass", {
                  required: "Hãy nhập mật khẩu",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải có ít nhất 8 ký tự",
                  },
                })}
                variant="standard"
                type={showPass ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPass(!showPass)}
                      edge="end"
                    >
                      {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              {errors.pass && <ErrorInput message={errors.pass.message} />}
            </FormControl>

            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="outlined-adornment-password">
                Nhập lại mật khẩu
              </InputLabel>
              <Input
                {...register("passConf", {
                  required: "Hãy nhập lại mật khẩu",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải có ít nhất 8 ký tự",
                  },
                })}
                id="password-config"
                type={showPassConf ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassConf(!showPassConf)}
                      edge="end"
                    >
                      {showPassConf ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              {errors.passConf && (
                <ErrorInput message={errors.passConf.message} />
              )}
            </FormControl>

            <Stack sx={{ marginTop: "5rem" }}>
              {invalidPhone && (
                <ErrorAfterSubmit message="Số điện thoại đã được đăng ký" />
              )}
              {isDiffPass ? (
                <ErrorAfterSubmit message="Nhập mật khẩu trùng nhau" />
              ) : null}
            </Stack>

            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="error"
            >
              Hoàn Tất
            </Button>

            {isSuccess && (
              <SuccessRegister handleOpenLogin={props.handleOpenLogin} />
            )}
          </Stack>
        </form>
      </Stack>
      <span style={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton onClick={props.closeModalLogin}>
          <CloseIcon />
        </IconButton>
      </span>
    </Stack>
  );
}

export default SignUp;

function SuccessRegister(props) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <CheckCircleOutlineIcon color="success" />
      <Typography sx={{ textAlign: "center" }}>Đăng ký thành công</Typography>

      <Button variant="text" onClick={props.handleOpenLogin}>
        Đăng nhập
      </Button>
    </Stack>
  );
}
