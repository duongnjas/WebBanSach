import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
  Stack,
  Button
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./TableCustom.scss"
function TableCustom() {

  return (
    <Box p={3}>

      <Table className="couponTable" sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "calc(13*100%/101)", backgroundColor: "#e8e8e8" }}>Mã giảm giá</TableCell>
            <TableCell sx={{ width: "calc(13*100%/101)" }}>Đã sử dụng / Tổng số mã</TableCell>
            <TableCell sx={{ width: "calc(13*100%/101)" }}>Loại giảm giá</TableCell>
            <TableCell sx={{ width: "calc(18*100%/101)" }}>Tiêu chí</TableCell>
            <TableCell sx={{ width: "calc(18*100%/101)" }}>Thời gian áp dụng</TableCell>
            <TableCell sx={{ width: "calc(13*100%/101)" }}>Trạng thái</TableCell>
            <TableCell sx={{ width: "calc(13*100%/101)" }}>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[1,2,3].map(row => (
            <TableRow
              key={row}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ width: "calc(13*100%/101)" }}>
                <Stack>
                  <Typography>Mã giảm giá 1</Typography>
                  <Typography sx={{ color: "#1890ff" }}>GD252537</Typography>
                </Stack>
              </TableCell>
              <TableCell sx={{ width: "calc(13*100%/101)" }}>
                <Typography>0/1</Typography>
              </TableCell>
              <TableCell sx={{ width: "calc(13*100%/101)" }}>
                <Typography>Giảm giá 10%</Typography>
              </TableCell>
              <TableCell sx={{ width: "calc(18*100%/101)", padding: "4px" }}>
                <Typography sx={{ color: "#1890ff" }}>Áp dụng cho tất cả sản phẩm</Typography>
                <Typography>Cho tất cả khách hàng</Typography>
                <Typography>&gt;= 100.000đ giá trị đơn hàng</Typography>
                <Typography>Giới hạn tổng cộng 3 lần sử dụng</Typography>
              </TableCell>
              <TableCell sx={{ width: "calc(18*100%/101)", padding: "8px" }}>
                <Typography>Từ: 10/07/2022 - 10:00:00</Typography>
                <Typography>Đến: 13/07/2022 - 10:00:00</Typography>
              </TableCell>
              <TableCell align='center' sx={{ width: "calc(13*100%/101)", padding: "4px" }}>
                <Button variant="outlined" 
                  sx={{ borderColor: "#00FD47", color: "#00FD47", padding: "4px", "&:hover": { borderColor: "#00FD47" } }}
                >Đang hoạt động</Button>
              </TableCell>
              <TableCell sx={{ width: "calc(13*100%/101)" }}>
                <Stack spacing={1}>
                  <Button variant="outlined" sx={{ padding: "4px" }}>Chỉnh sửa</Button>
                  <Stack className="couponTable__buttonEnd" direction="row" justifyContent="space-between" alignItems="center"  >
                    <div>Kết thúc</div>
                    <span><MoreVertIcon/></span>
                  </Stack>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default TableCustom