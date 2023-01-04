import React from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import apiProduct from "../../../../apis/apiProduct";

import { useEffect, useState } from 'react';
import "./CreateProduct.scss";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const choose = [
  { label: "The Shawshank Redemption" },
  { label: "The Godfather" },
  { label: "The Godfather: Part II" },
  { label: "The Dark Knight" },
  { label: "12 Angry Men" },
  { label: "Schindler's List" },
  { label: "Pulp Fiction" },
];
export default function CreateProduct(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [images, setImages] = useState("");
  const [slug, setSlug] = useState("");
  const [cateId, setCateId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [edit, setEdit] = useState(props.edit);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const loaddata = () => {
        if (edit === true) {
          apiProduct.findCategoryById(params.id)
                .then(res => {
                    const product = res
                    if (product) {
                        setName(product.name)
                        setSlug(product.slug)
                    }
                    else {
                        navigate("/admin/product")
                        toast.error("Sản phẩm này không tồn tại!")
                    }
                }
                )
            setId(params.id)
        }
    }
    loaddata()
}, [edit])
  return (
    <Box px={2} spacing={2}>
      <Stack>
        <Stack
          sx={{ backgroundColor: "#FFF", height: "80px" }}
          px={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          mb={0.2}
        >
          <Typography>Tạo sản phẩm mới</Typography>
        </Stack>
        <Stack>
          <Stack
            sx={{ backgroundColor: "#FFF", height: "560px" }}
            px={2}
            mt={0.2}
            alignItems="flex-start"
          >
            <Stack spacing={1}>
            <Stack direction="row" spacing={20}>
                <Stack >
                  <Typography sx={{ fontWeigth: "bold" }}>Tên</Typography>
                  <TextField onChange={(event) => {setName(event.target.value)}} size="small" sx={{ width: "150%" }}></TextField>
                </Stack>
                <Stack px={2}>
                  <Typography  sx={{ fontWeigth: "bold" }}>Link hình ảnh</Typography>
                  <TextField onChange={(event) => {setImages(event.target.value)}} size="small" sx={{ width: "150%" }}></TextField>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={20}>
                <Stack >
                  <Typography sx={{ fontWeigth: "bold" }}>Giá bán</Typography>
                  <TextField onChange={(event) => {setPrice(event.target.value)}} size="small" sx={{ width: "150%" }}></TextField>
                </Stack>
                <Stack px={2}>
                  <Typography sx={{ fontWeigth: "bold" }}>Giảm giá %</Typography>
                  <TextField onChange={(event) => {setDiscount(event.target.value)}} size="small" sx={{ width: "150%" }}></TextField>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={20}>
                <Stack >
                  <Typography sx={{ fontWeigth: "bold" }}>Slug</Typography>
                  <TextField onChange={(event) => {setSlug(event.target.value)}} size="small" sx={{ width: "150%" }}></TextField>
                </Stack>
                <Stack px={2}>
                  <Typography sx={{ fontWeigth: "bold" }}>Danh mục</Typography>
                  <TextField onChange={(event) => {setCateId(event.target.value)}} size="small" sx={{ width: "150%" }}></TextField>
                </Stack>
              </Stack>
              <Typography sx={{ fontWeight: 550 }} mt={2}>
                Thông tin mô tả
              </Typography>
              <TextField onChange={(event) => {setDescription(event.target.value)}} size="small" sx={{ width: "1000px" }}></TextField>       
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
