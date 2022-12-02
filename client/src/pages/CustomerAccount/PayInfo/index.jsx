import { Typography, Stack } from "@mui/material";
import EmptyNotify from "../../../components/EmptyNotify";
function PayInfo() {
  return <Stack>
    <Typography>Thông tin thanh toán</Typography>
    <EmptyNotify title="Bạn chưa có thông tin thanh toán" />
    </Stack>;
}

export default PayInfo;
