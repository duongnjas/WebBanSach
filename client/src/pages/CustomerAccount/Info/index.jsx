  import {useState} from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { loginSuccess } from '../../../slices/authSlice'
import { useDispatch } from 'react-redux';

import "./Info.scss";
import avatar from "../../../assets/img/avatar.png"

import {
  Typography,
  Stack,
  ListItemText,
  Button,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  Divider,
} from "@mui/material";

import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from "@mui/icons-material/Lock";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import { useSelector } from "react-redux";

import apiProfile from "../../../apis/apiProfile";
import Loading from "../../../components/Loading";



function Info() {

  const Month = Array.from({ length: 12 }, (x, i) => 1 + i);
  const Year = Array.from({ length: 65 }, (x, i) => 1950 + i);
  const Country = [{ id: "1", name: "Việt Nam" }, { id: "2", name: "America" }, { id: "3", name: "Úc" }];
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [listday, setListday] = useState(Array.from({ length: 31 }, (x, i) => 1 + i))
  const [day, setDay] = useState(user.birth_day ? user.birth_day[2] : null);
  const [month, setMonth] = useState(user.birth_day ? user.birth_day[1] : null);
  const [year, setYear] = useState(user.birth_day ? user.birth_day[0] : null);
  const [gender, setGender] = useState(user.gender)
  const [fullname, setFullName] = useState(user.fullName)
  const [updating, setUpdating] = useState(false);

  const handleChangeDay = (event) => {
    setDay(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
    let Maxday = maxDayofmonth(event.target.value, year);
    setListday(Array.from({ length: Maxday }, (x, i) => 1 + i))
    if (day > Maxday)
      setDay(1)
  };
  const handleChangeYear = (event) => {
    setYear(event.target.value);
    let Maxday = maxDayofmonth(month, event.target.value);
    setListday(Array.from({ length: Maxday }, (x, i) => 1 + i))
    if (day > Maxday)
      setDay(1)
  };

  const maxDayofmonth = (month, year) => {
    if (month === 2) {
      if ((year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
        return 29;
      }
      else return 28;
    }
    else if ([4, 6, 9, 11].includes(month))
      return 30;
    else return 31;
  }
  const onChangeFullName = (event) => {
    setFullName(event.target.value);
  }
  const onChangeGender = (event) => {
    setGender(event.target.value);
  }
  const onSaveChange = () => {
    if (!(RegExp("\\d+").test(day) && RegExp("\\d+").test(month) && RegExp("\\d+").test(year)
     && fullname && gender)) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return
    }
    let birth_day = `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`
    const params = {
      birthDay: birth_day,
      fullName: fullname,
      gender: gender,
    };
    setUpdating(true)
    apiProfile
      .putChangeInfo(params)
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
    apiProfile.getUserProfile()
      .then((res) => {
        let newUser = res.data.user
        dispatch(loginSuccess({ ...user, ...newUser }))
      })
  }
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
                  onChange={onChangeFullName}
                />
              </Stack>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={9} alignItems="center">
            <label>Ngày sinh</label>
            <Stack direction="row" spacing={2} alignItems="center">
              <Select
                sx={{ maxHeight: 30, minWidth: 100 }}
                value={day}
                onChange={handleChangeDay}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Ngày</em>
                </MenuItem>
                {listday.map(item =>
                  <MenuItem key={item} value={item}>{item}</MenuItem>
                )}
              </Select>

              <Select
                sx={{ maxHeight: 30, minWidth: 100 }}
                value={month}
                onChange={handleChangeMonth}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Tháng</em>
                </MenuItem>
                {Month.map(item =>
                  <MenuItem key={item} value={item}>{item}</MenuItem>
                )}
              </Select>

              <Select
                sx={{ maxHeight: 30, minWidth: 100 }}
                value={year}
                onChange={handleChangeYear}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Năm</em>
                </MenuItem>
                {Year.map(item =>
                  <MenuItem key={item} value={item}>{item}</MenuItem>
                )}

              </Select>
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
              <FormControlLabel value="Male" control={<Radio />} label="Nam" />
              <FormControlLabel value="Female" control={<Radio />} label="Nữ" />
              <FormControlLabel
                value="Other"
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
          <Stack
            direction="row"
            spacing={15}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1}>
              <EmailOutlinedIcon color="disabled" />

              <ListItemText
                primary="Địa chỉ email"
                secondary={user.email}
              />
            </Stack>

            <Link to="/customer/account/edit/email">
              <Button size="small" variant="outlined">
                Cập nhật
              </Button>
            </Link>
          </Stack>

          <Typography>Bảo mật</Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
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
