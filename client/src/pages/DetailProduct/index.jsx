import React, { useState, useRef, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import imgDefault from "../../assets/img/img_default.jpg";
import ReviewProduct from "./ReviewProduct";

import {
  Rating,
  Button,
  Grid,
  Box,
  Stack,
  Typography,
  Modal,
  FormControlLabel,
  IconButton,
  Tooltip,
  Skeleton,
} from "@mui/material";

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
import apiAddress from "../../apis/apiAddress";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { numWithCommas, roundPrice } from "../../constraints/Util";
import SelectBoxAddress from "../../components/SelectBoxAddress";

import { toast } from "react-toastify";

import SliderImage from "./SliderImage";

// import apiAccount from "../../apis/apiAccount";

function DetailProduct() {
  const user = useSelector((state) => state.auth.user);

  const [product, setProduct] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const response = await apiProduct.getProductsBySlug(slug);
      if (response) {
        if (response.length !== 0) setProduct((prev) => (prev = response[0]));
      }
    };
    getProduct();
  }, [slug]);

  const [isFavorite, setIsFavorite] = useState(false);

  console.log(slug);

  // useEffect(() => {
  //   const checkFavorite = async () => {
  //     let param = {
  //       userId: user.id,
  //       productSlug: slug,
  //     };
  //     await apiAccount.checkWishItem(param).then((res) => {
  //       console.log(res);
  //       if (res.length > 0) {
  //         setIsFavorite(true);
  //       }
  //     }).catch(err => console.log(err));
  //   };
  //   checkFavorite();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const handleClickFavorite = async () => {
  //   if (user === null) {
  //     toast.warning("Vui lòng đăng nhập để thực hiện chức năng này");
  //   } else {
  //     let param = {
  //       userId: user.id,
  //       productId: product.id,
  //       productImg: product.image,
  //       productName: product.name,
  //       productPrice: product.price,
  //       productDiscount: product.discount,
  //       productRate: product.rate,
  //       productSold: product.sold,
  //       productSlug: product.slug,
  //     };
  //     setIsFavorite((prev) => !prev);

  //     if (isFavorite === false) {
  //       await apiAccount
  //         .postWishItem(param)
  //         .then(toast.success("Đã thêm vào danh sách yêu thích"))
  //         .catch((err) => toast.error(err));
  //     } else {
  //       var itemId;

  //       await apiAccount.checkWishItem(param).then((res) => {
  //         itemId = res[0].id;
  //       });

  //       await apiAccount
  //         .deleteWishItem(itemId)
  //         .then(toast.info("Đã xóa khỏi danh sách yêu thích"))
  //         .catch((err) => toast.error(err));
  //     }
  //   }
  // };

  const [expandContent, setExpandContent] = useState(false);
  const [productSimilars, setProductSimilars] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [listAddress, setListAddress] = useState([
    { id: 0, text: "Chọn địa chỉ khác" },
  ]);
  const [addressCustom, setAddressCustom] = useState("");

  const descriptionRef = useRef(null);

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [commune, setCommune] = useState("");

  const [value, setValue] = React.useState("0");
  const [modalSlider, setModelSlider] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [choose, setChoose] = useState({});
  const [indexImg, setIndexImg] = useState(0);
  const dispatch = useDispatch();

  const openModalSlider = () => setModelSlider(true);

  const closeModalSlider = () => {
    setModelSlider(false);
  };

  const handleChangeAddress = (event) => {
    setValue(event.target.value);
  };

  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    const onChangeValue = () => {
      if (value === "0") {
        setAddress(addressCustom);
      } else {
        let addressSelect = listAddress.find((item) => item.id === value);
        if (addressSelect) {
          setAddress(
            `${addressSelect.commune.name}, ${addressSelect.district.name}, ${addressSelect.province.name}`
          );
        }
      }
    };
    onChangeValue();
  }, [value, addressCustom, listAddress]);

  useEffect(() => {
    const getListAddress = async () => {
      if (user)
        apiAddress
          .getUserAddress()
          .then((response) => {
            setListAddress((pre) => [...response.data.addressList, ...pre]);
          })
          .catch((err) => {
            setListAddress((pre) => [...pre]);
          });
      else setListAddress((pre) => [...pre]);
    };
    getListAddress();
  }, [user]);

  const setAddressDetails = useCallback((newAddress) => {
    setAddressCustom(newAddress);
  }, []);

  const handleChangeProvince = useCallback((value) => {
    setProvince(value);
  }, []);

  const handleChangeDistrict = useCallback((value) => {
    setDistrict(value);
  }, []);

  const handleChangeCommune = useCallback((value) => {
    setCommune(value);
  }, []);

  useEffect(() => {
    const getData = async () => {
      let param = {
        _page: 1,
        _limit: 6,
      };
      const response = await apiMain.getProducts(param);
      if (response) {
        setProductSimilars((pre) => [...pre, ...response.data]);
      }
    };
    getData();
  }, []);

  const handleClickBuy = () => {
    dispatch(
      addItem({
        choose: false,
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: product.image,
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

  const onChangeOption = (optionId, itemId) => {
    let optionSelect = product.details.options.find(
      (item) => item.id === optionId
    );
    let newChoose = { ...choose };
    newChoose[optionSelect.name] = itemId;
    setChoose(newChoose);
  };

  const onChangeimg = (index) => {
    setIndexImg(index);
  };

  useEffect(() => {
    //xử lý hiển thị nội dung mô tả sản phẩm
    descriptionRef.current.innerHTML = product?.details?.description || "";
    document.title = product?.name || "Web bán sách";
    if (product) {
      let newChoose = {};
      product.details.options.forEach((item) => {
        newChoose[item.name] = item.values[0].id;
      });
      setChoose(newChoose);
    }
  }, [product]);

  // const color = [
  //   { name: "đỏ", value: "#FF0000" },
  //   { name: "cam", value: "#FFA500" },
  //   { name: "vàng", value: "#FFFF00" },
  //   { name: "xanh lá", value: "#00FF00" },
  //   { name: "xanh dương", value: "#00FFFF" },
  //   { name: "trắng", value: "#FFFFFF" },
  //   { name: "đen", value: "#000000" },
  // ];

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
            {product?.details.options.map((itemOpt) => {
              let select = itemOpt.values.find(
                (item) => choose[itemOpt.name] === item.id
              );
              return (
                <Box className="product-option">
                  <Box className="product-option__title">
                    {itemOpt.name} : <span>{select && select.name}</span>
                  </Box>
                  <Box className="product-option__list">
                    {itemOpt.values.map((item) => {
                      let selected = choose[itemOpt.name] === item.id;
                      return (
                        <Box
                          key={item.id}
                          onClick={() => onChangeOption(itemOpt.id, item.id)}
                          className={`product-option__item ${
                            itemOpt.name === "Màu sắc"
                              ? "product-option__item--color"
                              : "product-option__item--size"
                          } ${selected ? "selected" : ""}`}
                        >
                          {/* {itemOpt.name === "colors" && (
                            <img src={item.imgUrl} alt="" />
                          )} */}
                          {item.value}
                          <span>
                            <CheckIcon
                              sx={{ fontSize: "12px", color: "#fff" }}
                            />
                          </span>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              );
            })}
            <Box className="product-coupon">
              <Box className="product-coupon__title">8 Mã giảm giá</Box>
              <Box className="product-coupon__list">
                <Box className="product-coupon__item">Giảm 80k</Box>
                <Box className="product-coupon__item">Giảm 20k</Box>
                <ArrowForwardIosIcon sx={{ color: "#1890ff" }} />
              </Box>
            </Box>

            <Box className="detailProduct__address">
              <span>Giao đến </span>
              <span>
                {address ? address : "TP. Nha Trang, P. Vĩnh Trường, Khánh Hòa"}
              </span>
              <span> - </span>
              <span onClick={openModal} style={{ cursor: "pointer" }}>
                Đổi địa chỉ
              </span>
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
          className="productSpecification"
          bgcolor="white"
          p={2}
          borderRadius="4px"
          mb={1}
        >
          <Box className="productSpecification__title">Thông Tin Chi Tiết</Box>
          <Box className="productSpecification__table">
            <table>
              <tbody>
                {product?.details.specifications.map((spec) => (
                  <tr>
                    <td>{spec.name}</td>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
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

      <Modal sx={{ overflowY: "scroll" }} open={modal} onClose={closeModal}>
        <Box className="modal-login" width="800px">
          <Stack spacing="16px">
            <Typography style={{ fontSize: "24px" }}>
              {" "}
              Địa chỉ giao hàng
            </Typography>
            <Typography>
              {" "}
              Hãy chọn địa chỉ nhận hàng để được dự báo thời gian giao hàng cùng
              phí đóng gói, vận chuyển một cách chính xác nhất.
            </Typography>

            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="radio-buttons-group"
              value={value}
              onChange={handleChangeAddress}
            >
              {listAddress.map((addr) => (
                <FormControlLabel
                  value={addr.id}
                  control={<Radio />}
                  label={
                    addr.id === 0
                      ? addr.text
                      : `${addr.commune.name}, ${addr.district.name}, ${addr.province.name}`
                  }
                />
              ))}
            </RadioGroup>
            <Stack
              sx={{ display: `${value === "0" ? "flex" : "none"}` }}
              spacing={2}
            >
              <SelectBoxAddress
                province={province}
                district={district}
                commune={commune}
                onChangeProvince={handleChangeProvince}
                onChangeDistrict={handleChangeDistrict}
                onChangeCommune={handleChangeCommune}
                setAddressDetails={setAddressDetails}
              />
            </Stack>
          </Stack>
        </Box>
      </Modal>

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
