import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import imgDefault from "../../assets/img/img_default.jpg";
import {
  Rating,
  Button,
  Grid,
  Box,
  Stack,
  Modal,
  IconButton,
  Tooltip,
  Skeleton,
}from "@mui/material";
import "./DetailProduct.scss";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardProduct from "../../components/CardProduct";
import apiProduct from "../../apis/apiProduct";
import { addItem } from "../../slices/cartSlice";
import apiMain from "../../apis/apiMain";
import { numWithCommas, roundPrice } from "../../constraints/Util";
import { toast } from "react-toastify";
import SliderImage from "./SliderImage";
import ReviewProduct from "./ReviewProduct";

function DetailProduct() {
  // const user = useSelector((state) => state.auth.user);
  const [product, setProduct] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const response = await apiProduct.getProductsBySlug(slug);
      console.log(response);
      if (response) {
        if (response.length !== 0) setProduct(response);
      }
    };
    getProduct();
    console.log(`Product: ${product}`);
  }, [slug]);

  const [isFavorite, setIsFavorite] = useState(false);
  const [expandContent, setExpandContent] = useState(false);
  const [productSimilars, setProductSimilars] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const descriptionRef = useRef(null);
  const [modalSlider, setModelSlider] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [indexImg, setIndexImg] = useState(0);
  const dispatch = useDispatch();

  const openModalSlider = () => setModelSlider(true);

  const closeModalSlider = () => {
    setModelSlider(false);
  };

  useEffect(() => {
    const getData = async () => {
      // let param = {
      //   _page: 1,
      //   _limit: 6,
      // };
      const response = await apiMain.getProducts();
      if (response) {
        setProductSimilars(response);
      }
    };
    getData();
  }, []);

  const handleClickBuy = () => {
    dispatch(
      addItem({
        choose: false,
        id: product._id,
        name: product.name,
        slug: product.slug,
        images: product.images,
        price: product.price,
        quantity,
      })
    );
    toast.success("Đã thêm vào giỏ hàng");
  };

  const onChangeQuantity = (e) => {
    setQuantity(e.target.value);
    if (e.target.value === "") return;
    let quantity = Number(e.target.value);
    if (Number.isInteger(quantity)) {
      setQuantity(quantity);
    } else {
      setQuantity(1);
    }
  };

  const handleExpandContent = () => {
    setExpandContent((pre) => !pre);
  };

  const onChangeimg = (index) => {
    setIndexImg(index);
  };

  useEffect(() => {
    //xử lý hiển thị nội dung mô tả sản phẩm
    descriptionRef.current.innerHTML = product?.details?.description || "";
    document.title = product?.name || "Web bán sách";
  }, [product]);

  return (
    <>
      <Box className="container">
        <Box className="detailProduct">
          <Box className="detailProduct__img">
            <Box
              className="detailProduct__primary-img"
              onClick={openModalSlider}
            >
              {loading && (
                <Skeleton variant="rectangular" width="100%" height="100%" />
              )}
              <img
                onLoad={() => setLoading(false)}
                src={product?.details.images[indexImg]}
                alt=""
                onError={(err) => (err.target.src = imgDefault)}
              />
            </Box>{" "}
            <Stack
              direction="row"
              justifyContent="flex-start"
              mt={3}
              spacing={1}
            >
              {product?.details?.images ? (
                <>
                  {product.details.images.slice(0, 6).map((imgs, index) => (
                    <>
                      {index < 5 ? (
                        <Box
                          onClick={() => onChangeimg(index)}
                          className={`detailProduct__item-img ${
                            indexImg === index ? "selected" : ""
                          }`}
                        >
                          <img
                            src={imgs}
                            alt=""
                            onError={(err) => (err.target.src = imgDefault)}
                          />
                        </Box>
                      ) : (
                        <Box
                          className={`detailProduct__item-img ${
                            indexImg === index ? "selected" : ""
                          }`}
                        >
                          {product.details.images.length > 6 && (
                            <Box
                              onClick={openModalSlider}
                              className="lastimage"
                            >
                              +{product.details.images.length - 6}
                            </Box>
                          )}

                          <img src={imgs} alt="" />
                        </Box>
                      )}
                    </>
                  ))}
                </>
              ) : (
                <>
                  <Skeleton animation="wave" width="100%" />
                </>
              )}{" "}
            </Stack>
          </Box>

          <Box flex={1}>
            <Box className="detailProduct__title">
              {product?.name ? (
                <h2>{product.name}</h2>
              ) : (
                <>
                  <Skeleton animation="wave" height={40} />
                  <Skeleton animation="wave" height={40} />
                </>
              )}
            </Box>
            <Box className="detailProduct__rating">
              {product?.sold ? (
                <>
                  <Rating
                    name="simple-controlled"
                    value={product.rate || 0}
                    readOnly
                    sx={{ fontSize: "18px" }}
                  />
                  <span>Xem 19 đánh giá | Đã bán {product?.sold} </span>
                </>
              ) : (
                <Skeleton animation="wave" height={40} width="100%" />
              )}
            </Box>

            <Box className="detailProduct__price">
              {product?.price ? (
                <>
                  <span>
                    {numWithCommas(
                      roundPrice(
                        product?.price * (1 - product?.discount / 100) || 0
                      )
                    )}
                    ₫
                  </span>
                  <span>{numWithCommas(product?.price || 0)} ₫</span>
                  <span className="detailProduct__discount">
                    {product?.discount}%
                  </span>
                </>
              ) : (
                <Skeleton animation="wave" height={40} width="100%" />
              )}
            </Box>
            <Box className="product-option">
              <Box className="product-option__title" >
                {product?.details?.options?.name}
              </Box>
              <Box className="product-option__list">
                <Box className="product-option__item">
                  {product?.details?.options?.values}
                  <span>
                    <CheckIcon sx={{ fontSize: "12px", color: "#fff" }} />
                  </span>
                </Box>
              </Box>
            </Box>
            <Box className="product-coupon">
              <Box className="product-coupon__title">8 Mã giảm giá</Box>
              <Box className="product-coupon__list">
                <Box className="product-coupon__item">Giảm 80k</Box>
                <Box className="product-coupon__item">Giảm 20k</Box>
                <ArrowForwardIosIcon sx={{ color: "#1890ff" }} />
              </Box>
            </Box>

            <Box className="product-quanlity">
              <Box className="product-quanlity__title">Số lượng</Box>
              <Box className="product-quanlity__groupInput">
                <button
                  onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}
                >
                  <RemoveIcon />
                </button>
                <input
                  onChange={onChangeQuantity}
                  type="text"
                  value={quantity}
                />
                <button onClick={() => setQuantity(quantity + 1)}>
                  <AddIcon />
                </button>
              </Box>
            </Box>

            <Stack
              sx={{ marginTop: "2rem" }}
              direction="row"
              alignItems="center"
              spacing={3}
            >
              <Box>
                <Button
                  variant="contained"
                  onClick={handleClickBuy}
                  sx={{
                    width: "400px",
                    height: "48px",
                    backgroundColor: "#ff3945",
                    "&:hover": { opacity: 0.8, backgroundColor: "#ff3945" },
                  }}
                >
                  Chọn mua
                </Button>
              </Box>

              <IconButton
                sx={{ border: "1px solid silver" }}
                color="error"
                size="large"
                //onClick={handleClickFavorite}
              >
                {isFavorite ? (
                  <Tooltip title="Xóa khỏi danh sách yêu thích">
                    <FavoriteIcon />
                  </Tooltip>
                ) : (
                  <Tooltip title="Thêm vào danh sách yêu thích">
                    <FavoriteBorderIcon />
                  </Tooltip>
                )}
              </IconButton>
            </Stack>
          </Box>
        </Box>

        <Box className="productSimilar">
          <Box className="productSimilar__title">Sản Phẩm Tương Tự</Box>
          <Grid mb={1} container>
            {productSimilars.slice(0, 6).map((item) => (
              <Grid item key={item.id} xs={2}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          className="descriptionProduct"
          bgcolor="white"
          p={2}
          borderRadius="4px"
        >
          <Box className="productSpecification__title">Mô Tả Sản phẩm</Box>
          <Box
            className={`descriptionProduct__content ${
              expandContent ? "" : "collapse"
            }`}
          >
            <Box p={2} ref={descriptionRef} width="100%"></Box>
            {expandContent ? "" : <Box className="bg-gradient"></Box>}
          </Box>
          <Box className="descriptionProduct__showmore">
            <Button onClick={handleExpandContent} variant="outlined">
              {expandContent ? "Thu gọn nội dung" : "Xem thêm"}
            </Button>
          </Box>
        </Box>
      </Box>
      <Modal open={modalSlider} onClose={closeModalSlider}>
        <Box className="modal-images" sx={{ width: "100%" }}>
          <SliderImage
            images={product?.details.images}
            onClose={closeModalSlider}
          ></SliderImage>
        </Box>
      </Modal>

      <ReviewProduct product={product} />
    </>
  );
}

export default DetailProduct;
