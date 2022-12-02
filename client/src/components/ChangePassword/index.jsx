 /* eslint-disable */
import React from "react";
import { useForm } from "react-hook-form";

import { ErrorInput, ErrorAfterSubmit } from "../ErrorHelper";
import { toast } from 'react-toastify';
import { Stack, IconButton, Button, Input, Typography} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useLocation } from "react-router-dom";
import apiAuth from "../../apis/apiAuth";

function ChangePassword(props) {
  const [showPass, setShowPass] = React.useState(false);
  const [showPassConf, setShowPassConf] = React.useState(false);

  const [isDiffPass, setIsDiffPass] = React.useState(false);
  const [password,setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const location = useLocation()
  
  const getUrlParameter = (name)=> {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const token = getUrlParameter('token')


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  

  const handleCheckPass = () => {
    if (watch("pass") !== watch("passConf")) {
      setIsDiffPass(true);
      return false
    } else {
      setIsDiffPass(false);
      return true;
    }
  };

  const onSubmit = async () => {
    if(!handleCheckPass())
      return
    if(token === ''){
      toast.warning("Không có token đặt lại mật khẩu")
      return
    }
    const params = {
      confirmPassword,
      newPassword:password
    }
    apiAuth.resetPassword(params,token)
    .then(res=>{
      toast.success("Đổi mật khẩu thành công")
    })
    .catch(err=>{
      toast.success("Đổi mật khẩu thất bại. Vui lòng kiểm tra lại")
    })
  };

  return (
    <Stack sx={{alignItems: "center", padding: "1rem"}}>
      <Stack direction="row" sx={{width:"50%"}}>
        <Stack direction="column" sx={{ flex: 5, backgroundColor:"#fff", padding: "1rem", borderTopLeftRadius:"20px", borderBottomLeftRadius:"20px"}} spacing={3}>
          <Typography variant="h5">Tạo mật khẩu mới</Typography>
          <Typography sx={{ fontSize: "15px" }}>
            Mật khẩu dài từ 8 đến 32 kí tự, bao gồm số và chữ
          </Typography>
          <Stack spacing={2}>
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="outlined-adornment-password">
                Mật khẩu mới
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
                value={password}
                onChange = {e=>setPassword(e.target.value)}
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
                Nhắc lại mật khẩu
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
                value={confirmPassword}
                onChange = {e=>setConfirmPassword(e.target.value)}
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
              {isDiffPass ? (
                <ErrorAfterSubmit message="Nhập mật khẩu trùng nhau dùm cái" />
              ) : null}
            </Stack>

            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="error"
            >
              Đặt mật khẩu
            </Button>
          </Stack>
        </Stack>
        <Stack sx={{ flex: 3, borderTopRightRadius:"20px", borderBottomRightRadius:"20px", backgroundColor:"#dbeeff"}}
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <img
            alt=""
            src="https://salt.tikicdn.com/ts/upload/8d/b1/93/c3c4a1d3e2060d2fc87b9a294ff60fd5.png"
            width="203"
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ChangePassword;
