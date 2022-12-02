import * as React from "react";
import "./Coupon.scss";
import { useState, useEffect } from "react";
import apiMain from "../../../apis/apiMain";
import PropTypes from "prop-types";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Stack,
  Grid,
  Button,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const theme = createTheme({
  palette: {
    primary: {
      main: "#189eff",
    },
    secondary: {
      main: "#fffff",
    },
  },
});

function Coupon() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [myCoupons, setMyCoupons] = React.useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const size = 8;

  useEffect(() => {
    const getCoupons = async () => {
      let param = {
        _page: page,
        _limit: size,
      };
      const response = await apiMain.getCoupons(param);
      if (response) {
        setMyCoupons(response.data);
        setTotalPage(Math.ceil(response.pagination._totalRows / size));
      }
    };
    getCoupons();
  }, [page]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box className="coupon">
      <Typography variant="h6">Mã giảm giá</Typography>
      <Box sx={{ width: "100%", top: "0" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Stack direction="row" justifyContent="space-between">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab className="coupon__tab" label="Tất Cả" {...a11yProps(0)} />
              <Tab
                className="coupon__tab"
                label="Ưu đãi thanh toán"
                {...a11yProps(1)}
              />
              <Tab
                className="coupon__tab"
                label="Hết Hiệu Lực"
                {...a11yProps(2)}
              />
            </Tabs>
            <Button
              color="primary"
              size="medium"
              startIcon={<LocalActivityIcon />}
              endIcon={<KeyboardArrowRightIcon />}
            >
              Khám Phá Thêm
            </Button>
          </Stack>
        </Box>

        <TabPanel value={value} index={value}>
          <Grid container spacing={1.5}>
            {
              (value === 1 ? myCoupons.filter(item=>
                item.expired - new Date().getTime() > 0) :
                value === 2 ? myCoupons.filter(item=>
                  item.expired - new Date().getTime() < 0)
                  : myCoupons)
            .map((item) => (
              <Grid item xs={6} key={item.id}>
                <Stack
                  sx={{
                    width: "100%",
                    borderRadius: "5px",
                    padding: "0.5rem",
                    height: "132px" 
                  }}
                  className="coupon-container"
                  direction="row"
                  justifyContent="space-between"
                  backgroundColor="#fff"
                >
                  <Stack
                    sx={{ flex: "1"}}
                    direction="row"
                    spacing={1}

                  >
                    <Stack
                      sx={{  width: "116px", height:'116px' }}
                      alignItems="center"
                      justifyContent="center"
                      p = {0.5}
                    >
                      <img
                        alt=""
                        src={item.img}
                        style={{
                          width: "100%",
                          height: "100%",
                          justifyContent: "center",
                          borderRadius: "8px"
                        }}
                      />
                      
                    </Stack>
                    {/* <Divider orientation="vertical" flexItem /> */}
                    <Stack flex="1" p ={1}>
                    <Typography
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                          margin: "0px 0px 0px 0px",
                          color:'#1890ff'
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "17px",
                          fontWeight: "500",
                          lineHeight: "24px",
                          color: "#242424",
                        }}
                        className="text-overflow-2-lines"
                      >
                        {`Giảm ${item.value}${item.unit}`}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#787878",
                          fontSize: "13px",
                          fontWeight: "400",
                        }}
                        className="text-overflow-3-lines"
                      >
                        {item.limit > 0?`Cho đơn hàng từ ${item.limit/1000}K`:'Dành cho tất cả giá trị đơn hàng'}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#787878",
                          fontSize: "13px",
                          fontWeight: "400",
                          marginBottom: "0px",
                          marginTop: "auto",
                        }}
                      >
                        {`HSD:${new Date(item.expired).toLocaleDateString()}`}
                      </Typography>
                    </Stack>
                  </Stack>
                  <InfoOutlinedIcon
                    sx={{ width: "20px", height: "20px" }}
                    color="info"
                  />
                </Stack>
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2} mt="10px">
            <ThemeProvider theme={theme} >
              <Pagination
                count={totalPage}
                page={page}
                onChange={handleChangePage}
                color="primary"
              />
            </ThemeProvider>
          </Stack>
        </TabPanel>
        
      </Box>
      <Stack alignItems="center">
        <Stack
          sx={{
            width: "270px",
            height: "46px",
            backgroundColor: "#ffffff",
            borderRadius: "24px",
          }}
        >
          <Button
            color="primary"
            size="large"
            fontSize="15px"
            startIcon={<LocalActivityIcon />}
            endIcon={<KeyboardArrowRightIcon />}
          >
            Khám Phá Thêm
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Coupon;
