import React from 'react'
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  Grid,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextareaAutosize
} from '@mui/material';
import "./CreateProduct.scss"
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ErrorIcon from '@mui/icons-material/Error';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const choose = [
  { label: 'The Shawshank Redemption' },
  { label: 'The Godfather' },
  { label: 'The Godfather: Part II' },
  { label: 'The Dark Knight' },
  { label: '12 Angry Men' },
  { label: "Schindler's List" },
  { label: 'Pulp Fiction' }];
export default function CreateProduct() {
  return (
    <Box px={2} spacing={2}>
      <Stack>
        <Stack sx={{ backgroundColor: "#FFF", height: "80px" }} px={2} direction="row" justifyContent="flex-start" alignItems="center" mb={0.2}>
          <ArrowBackIcon />
          <Typography>Tạo sản phẩm mới</Typography>
        </Stack>
        <Stack>
          <Stack sx={{ backgroundColor: "#FFF", height: "46px" }} px={2} direction="row" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontWeight: 550 }}>1.Thông tin chung</Typography>
            <KeyboardArrowDownIcon />
          </Stack>
          <Stack sx={{ backgroundColor: "#FFF", height: "560px" }} px={2} mt={0.2} alignItems="flex-start">
            <Typography sx={{ fontWeight: 550, fontSize: "18px", color: "#AAAAAA" }} mt={1}> Sản phẩm đã chọn</Typography>
            <Stack spacing={1}>
              <Typography sx={{ fontWeight: 550 }} mt={2}>*Tên sản phẩm</Typography>
              <Autocomplete size="small" disablePortal id="1" options={choose} sx={{ width: "1000px" }} renderInput={(params) => <TextField {...params} />} />
              <Box sx={{ backgroundColor: "#e6fff8" }} height="150px" mt={2} borderColor="#e6f7ff" px={2} >
                <Stack justifyContent="center" mt={2} sx={{ fontSize: "14px" }}>
                  <FormControl >
                    <FormLabel id="Danh-Muc" sx={{ color: "#595959", fontWeight: 550, fontSize: "14px" }}>Danh Mục Được Đề Xuất</FormLabel>
                    <RadioGroup sx={{ fontSize: "14px" }}>
                      <FormControlLabel value="ao-nu-kieu" control={<Radio />} label="Thời trang nữ/Áo nữ/Áo kiểu" />
                      <FormControlLabel value="ao-lien-quan" control={<Radio />} label="Thời trang nữ/Áo liền quần - Bộ trang phục/Áo liền quần" />
                    </RadioGroup>
                  </FormControl>
                </Stack>
              </Box>
              <Typography sx={{ fontWeight: 550 }} mt={2}>* Danh mục</Typography>
              <Autocomplete size="small" disablePortal id="1" options={choose} sx={{ width: "1000px" }} renderInput={(params) => <TextField {...params} />} />
              <Box sx={{ backgroundColor: "#e6fff8" }} height="70px" mt={2} borderColor="#e6f7ff" px={2} >
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} mt={2} >
                  <ErrorIcon sx={{ color: "#1890ff" }} />
                  <Typography>Bạn hãy điền thêm các thuộc tính được đánh dấu bằng KEY (Thông tin sản phẩm chính) để giúp tăng khả năng hiển thị tìm kiếm và chuyển đổi sản phẩm của bạn</Typography>
                </Stack>
              </Box>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                <Grid container spacing={2} columns={16} mt={1} >
                  <Grid item xs={8}>
                    <Stack direction="row" spacing={0.5} >
                      <Typography mb={1} sx={{ fontWeight: 550, fontSize: "14px" }}>* Thương hiệu</Typography>
                      <ErrorOutlineIcon />
                    </Stack>
                    <Autocomplete size="small" disablePortal id="1" options={choose} sx={{ width: 560 }} renderInput={(params) => <TextField {...params} />} />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography mb={1} sx={{ fontWeight: 550, fontSize: "14px" }}>* Xuất xứ</Typography>
                    <Autocomplete size="small" disablePortal id="1" options={choose} sx={{ width: 560 }} renderInput={(params) => <TextField {...params} />} />
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          </Stack>
          <Stack sx={{ backgroundColor: "#FFF" }} direction="row" justifyContent="center" mb={1}>
            <Accordion justifyContent="center">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ color: "#1890ff", fontSize: "14px" }}>Các thông tin khác</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                  <Grid container spacing={2} columns={16} mt={1} >
                    <Grid item xs={8}>
                      <Stack direction="row" spacing={0.5} >
                        <Typography mb={1} sx={{ fontWeight: 550, fontSize: "14px" }}>Xuất xứ thương hiệu</Typography>
                      </Stack>
                      <Autocomplete size="small" disablePortal id="1" options={choose} sx={{ width: 560 }} renderInput={(params) => <TextField {...params} />} />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography mb={1} sx={{ fontWeight: 550, fontSize: "14px" }}>Chất liệu</Typography>
                      <Autocomplete size="small" disablePortal id="1" options={choose} sx={{ width: 560 }} renderInput={(params) => <TextField {...params} />} />
                    </Grid>
                  </Grid>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                  <Grid container spacing={2} columns={16} mt={1} >
                    <Grid item xs={8}>
                      <Stack direction="row" spacing={0.5} >
                        <Typography mb={1} sx={{ fontWeight: 550, fontSize: "14px" }}>Họa tiết</Typography>
                      </Stack>
                      <Autocomplete size="small" disablePortal id="1" options={choose} sx={{ width: 560 }} renderInput={(params) => <TextField {...params} />} />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography mb={1} sx={{ fontWeight: 550, fontSize: "14px" }}>Model</Typography>
                      <Autocomplete size="small" disablePortal id="1" options={choose} sx={{ width: 560 }} renderInput={(params) => <TextField {...params} />} />
                    </Grid>
                  </Grid>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                  <Grid container spacing={2} columns={16} mt={1} >
                    <Grid item xs={8}>
                      <Stack direction="row" spacing={0.5} >
                        <Typography mb={1} sx={{ fontWeight: 550, fontSize: "14px" }}>Sản phẩm này là quà tặng kèm</Typography>
                        <ErrorOutlineIcon />
                      </Stack>
                      <Autocomplete size="small" disablePortal id="1" options={choose} sx={{ width: 560 }} renderInput={(params) => <TextField {...params} />} />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography mb={1} sx={{ fontWeight: 550, fontSize: "14px" }}>Hàng hóa của bạn có thuộc danh mục hàng hóa dưới đây không?</Typography>
                      <Autocomplete size="small" disablePortal id="1" options={choose} sx={{ width: 560 }} renderInput={(params) => <TextField {...params} />} />
                    </Grid>
                  </Grid>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={{ backgroundColor: "#fff" }}>
        <Stack sx={{ backgroundColor: "#FFF", height: "46px" }} px={2} direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: 550 }}>2.Mô Tả Sản Phẩm</Typography>
          <KeyboardArrowDownIcon />
        </Stack>
        <Stack p={2} spacing={2}>
          <Typography sx={{ fontSize: "18px", fontWeigth: "bold", color: "#8c8c8c" }}>Thông tin quan trọng</Typography>
          <Typography sx={{ fontWeight: "bold" }}>Video sản phẩm</Typography>
          <Typography>.mp4, .mkv | Độ dài video tối đa 1,5 phút | Tối đa 15 MB</Typography>
          <Button className="btn__upload" variant="contained" component="label">
            <Stack justifyContent="center" alignItems="center" spacing={2}>
              <PlayCircleOutlineIcon sx={{fontSize:"50px"}} />
              <Typography sx={{ color: "#333" }}>Nhấn hoặc kéo thả tập tin vào để tải lên</Typography>
            </Stack>
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <Stack direction="row">
            <Typography sx={{ fontWeight: "bold" }}>Mô tả chi tiết sản phẩm (Không chèn link/địa chỉ/SĐT/website/logo nhà bán)</Typography>
            <InfoOutlinedIcon />
          </Stack>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            style={{ width: "50%" }}
          />
          <Stack direction="row">
            <Typography sx={{ fontWeight: "bold" }}>Kích thước</Typography>
            <InfoOutlinedIcon />
          </Stack>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            style={{ width: "50%" }}
          />
        </Stack>
      </Stack>
      <Stack sx={{ backgroundColor: "#fff" }} pt={2}>
        <Stack sx={{ backgroundColor: "#FFF", height: "46px" }} px={2} direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: 550 }}>3. Giá Bán Và Mã Sản Phẩm</Typography>
          <KeyboardArrowDownIcon />
        </Stack>
        <Stack direction="row" spacing={20}>
          <Stack px={2}>
            <Typography sx={{ fontWeigth: "bold" }}>Giá bán</Typography>
            <TextField size="small" sx={{ width: "150%" }}></TextField>
          </Stack>
          <Stack px={2}>
            <Typography sx={{ fontWeigth: "bold" }}>Mã sản phẩm</Typography>
            <TextField size="small" sx={{ width: "150%" }}></TextField>
          </Stack>
        </Stack>
        <Stack px={2} py={2}>
          <Button className="btn__add" variant="contained" component="label">
            <AddIcon sx={{color:"#1890ff"}} />
            <Typography sx={{color:"#1890ff"}}>Thêm lựa chọn hàng để giúp khách hàng tìm kiếm sản phẩm và dễ dàng thêm mới lựa chọn</Typography>
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
