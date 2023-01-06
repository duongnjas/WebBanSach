  import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { loginSuccess } from '../../../slices/authSlice'
import { useDispatch } from 'react-redux';
import moment from 'moment';

import "./Info.scss";

import {
  Typography,
  Stack,
  ListItemText,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  Divider,
} from "@mui/material";

import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LockIcon from "@mui/icons-material/Lock";
import { useSelector } from "react-redux";

import apiProfile from "../../../apis/apiProfile";
import Loading from "../../../components/Loading";



function Info() {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch();
  const [dob, setDob] = useState( moment.utc(user.birth_day).format('DD-MM-YYYY'))
  const [gender, setGender] = useState(user.gender)
  const [fullname, setFullName] = useState(user.fullName)
  const [updating, setUpdating] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [message, setMessage] = useState("");
  const [fcolor, setColor] = useState("#ee0033");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regex.test(event.target.value)) {
      setMessage("");
    } else {
      setMessage("*Email không hợp lệ");
    }
  };

  const onChangeDob = (e)=>{
    setDob(e.target.value);
  }

  const onChangeGender = (event) => {
    setGender(event.target.value);
  }
  const onSaveChange = () => {
    if (!(dob && fullname && gender && email)) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return
    }
    let date1 = dob.split("-");// ["29", "1", "2016"]
    var newDob = new Date(parseInt(date1[2]),parseInt(date1[1])-1,parseInt(date1[0]));
    // Date {Fri Jan 29 2016 00:00:00 GMT+0530(utopia standard time)
    console.log(newDob.toISOString());
    console.log(fullname);
    console.log(gender);
    console.log(email);
    const params = {
      dob: newDob.toISOString(),
      name: fullname,
      gender: gender,
      email: email,
    };
    setUpdating(true)
    apiProfile
      .putChangeInfo(params, user?._id)
      .then((response) => {
        toast.success("Thay đổi thành công");
        getUserProfile();
      })
      .catch((error) => {
        toast.error("Thay đổi không thành công");
        console.log(error)
      })
      .finally(()=>setUpdating(false))
  };
  const getUserProfile = () => {
    apiProfile.getUserProfile(user?._id)
      .then((res) => {
        let newUser = res
        dispatch(loginSuccess({ ...user, ...newUser }))
      })
  }
  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <Stack className="customer-info" spacing={3}>
      <Typography variant="h6">Thông tin tài khoản</Typography>
      <Stack direction="row" spacing={3}>
        <Stack spacing={3}>
          <Typography>Thông tin cá nhân</Typography>
          <Stack direction="row" spacing={4}>
            <Stack spacing={3} justifyContent="space-around">
              <Stack
                direction="row"
                spacing={5}
                alignItems="center"
                justifyContent="space-between"
              >
                <label>Họ & tên</label>
                <input id="input-name" placeholder="Thêm họ tên" type="text"
                  value={fullname}
                  onChange={(event) => {
                    setFullName(event.target.value)}}
                />
              </Stack>
              <Stack
                direction="row"
                spacing={5}
                alignItems="center"
                justifyContent="space-between"
              >
                <label>Email</label>
                <input id="input-name" placeholder="Thêm email" type="text"
                  value={email}
                  onChange={onChangeEmail}
                />
              </Stack>
              <Typography color={fcolor} fontSize="14px" >{message}</Typography>
              <Stack
                direction="row"
                spacing={5}
                alignItems="center"
                justifyContent="space-between"
              >
                <label>Ngày sinh</label>
                <input id="input-name" placeholder="Thêm email" type="text"
                  value={dob}
                  onChange={onChangeDob}
                />
              </Stack>
            </Stack>         
          </Stack>
          <Stack direction="row" spacing={5} alignItems="center">
            <label>Giới tính</label>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={gender}
              onChange={onChangeGender}
            >
              <FormControlLabel value="male" control={<Radio />} label="Nam" />
              <FormControlLabel value="female" control={<Radio />} label="Nữ" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Khác"
              />
            </RadioGroup>
          </Stack>
          <Button variant="contained" sx={{ width: 200, alignSelf: "center" }}
            onClick={onSaveChange}
          >
            {updating&&<Loading color="#fff"/>}Lưu thay đổi
          </Button>
        </Stack>

        <Divider orientation="vertical" flexItem />

        <Stack spacing={4}>
          <Typography>Số điện thoại</Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1}>
              <LocalPhoneOutlinedIcon color="disabled" />
              <ListItemText primary="Số điện thoại" secondary={user.phone} />
            </Stack>
          </Stack>
          <Typography>Bảo mật</Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Stack direction="row" spacing={1}>
              <LockIcon color="disabled" />
              <ListItemText primary="Đổi mật khẩu" />
            </Stack>
            <Link to="/customer/account/edit/pass">
              <Button size="small" variant="outlined">
                Đổi mật khẩu
              </Button>
            </Link>
          </Stack>
          {/* <Typography>Liên kết mạng xã hội</Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1}>
              <FacebookRoundedIcon color="primary" />
              <ListItemText primary="Facebook" />
            </Stack>
            <Button size="small" variant="outlined">
              Liên kết
            </Button>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1}>
              <GoogleIcon color="success" />
              <ListItemText primary="Google" />
            </Stack>
            <Button size="small" variant="outlined">
              Liên kết
            </Button>
          </Stack> */}
        </Stack>
      </Stack>
    </Stack>
  );
}
export default Info;
