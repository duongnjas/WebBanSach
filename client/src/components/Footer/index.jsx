import React from "react";
import "./Footer.scss";
import { Stack, Typography, Box } from "@mui/material";


function Footer() {
  return (
    <Box className="Footer">
      <Stack className="block" direction="row">
        <Stack>
          <Typography component="h4" className="block__title">
            About
          </Typography>
          <Typography component="h4" className="hotline">
            Abookish được sinh ra với mong muốn mang cung cấp cho những độc giả
            những cuốn sách với một phương thức thanh toán đơn giản nhất, 
            giá tốt nhất cùng với đó là dịch vụ chăm sóc khách hàng tuyệt vời
          </Typography>
        </Stack>

        <Stack>
          <Typography component="h4" className="block__title">
            Information
          </Typography>
          <Typography component="h4" className="hotline">
            Nguyễn Duy Dương - 19110342
          </Typography>
          <Typography component="h4" className="hotline">
            Nguyễn Minh Nhật - 19110417
          </Typography>
        </Stack>

        <Stack>
          <Box>
            <Typography component="h4" className="block__title">
              Contact
            </Typography>
            <Typography component="h4" className="hotline">
              Email: abookish.shop.vn@gmail.com
            </Typography>
            <Typography component="h4" className="hotline">
              Phone: +84123456789
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;
