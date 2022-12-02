import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  Box,
  Stack,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Rating,
  Pagination,
  Grid
} from "@mui/material";
import { orderTabs } from "../../../constraints/OrderItem";

import CloseIcon from "@mui/icons-material/Close";

import apiCart from "../../../apis/apiCart";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./ReviewPurchased.scss";
import apiReviews from "../../../apis/apiReviews";
import EmptyNotify from "../../../components/EmptyNotify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function ReviewPurchased() {
  const [open, setOpen] = useState(false);
  // const [productName, setProductName] = useState("");
  // const [productImg, setProductImg] = useState("");
  // const [imgRate, setImgRate] = useState();
  // const [storeName, setStoreName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };
  const [chosenProduct, setChosenProduct] = useState();

  const [myRevPurchaseds, setMyRevPurchaseds] = useState([]);
  const [totalPage, setTotalPage] = useState(10);
  const [page, setPage] = useState(1);
  const size = 8;
  const user = useSelector((state) => state.auth.user); //lấy user từ store
  useEffect(() => {
    const getMyRevPurchaseds = async () => {
      let param = {
        idUser: user.id,
        "type.id": orderTabs[4].id
      }
      const responseOrder = await apiCart.getOrders(param);

      if (responseOrder) {
        let listProduct = []
        responseOrder.forEach(item =>
          listProduct.push(...item.products.map(product => {
            return {
              ...product,
              orderId: item.id,
              updatedAt: item.updatedAt
            }
          }))
        )

        listProduct.forEach(async (item, i) => {
          let params = {
            productId: item.id,
            orderId: item.orderId
          }
          try {
            const responseReview = await apiReviews.getMyReviews(params);
            if (responseReview) {
              let review = responseReview.length > 0 ? responseReview[0] : null
              if (review)
                listProduct[i] = {
                  ...item,
                  isReviewed: true
                }
              else
                listProduct[i] = {
                  ...item,
                  isReviewed: false
                }

            }
          }
          catch (error) {
            listProduct[i] = {
              ...item,
              isReviewed: false
            }
          }
          if (i === listProduct.length - 1) {
            listProduct.sort((a, b) => b.updatedAt - a.updatedAt)
            setMyRevPurchaseds(listProduct)
            setTotalPage(Math.ceil(listProduct.length / size))
          }
        })

      }
    }
    getMyRevPurchaseds()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const handleChange = (event, value) => {
    setPage(value);
  }
  const handleChangeContent = (event) => {
    setContent(event.target.value)
  }
  const handleChangeRating = (event, value) => {
    setRating(value);
  };
  const handleClickOpen = (product) => {
    setChosenProduct(product);
    setOpen(true);
  };


  const handleSaveCmt = () => {
    if (!(rating > 0 || content)) {
      toast.warning("Vui lòng đánh giá sản phẩm !!");
      return
    }
    const params = {
      orderId: chosenProduct?.orderId,
      imgRate: [],
      productName: chosenProduct?.name || "",
      rating: rating,
      content: content,
      productImg: chosenProduct?.image || "",
      userId: user.id,
      productId: chosenProduct?.id,
      userName: user.fullName,
      userAvatar: user.img,
      likedList: [],
      reply: []
    };
    apiReviews
      .postMyReviews(params)
      .then((res) => {
        toast.success("Đã đánh giá");
        let index = myRevPurchaseds.findIndex(item=>item.id === chosenProduct.id && item.orderId === chosenProduct.orderId
          )
        if(index >=0){
          let newMyRev = [...myRevPurchaseds]
          newMyRev[index].isReviewed = true
          setMyRevPurchaseds(newMyRev)
        }
        handleClose();
      })
      .catch((error) => {
        toast.error("Đánh giá thất bại!");
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "50rem",
      }}
    >
      <Typography gutterBottom variant="h6">
        Nhận xét sản phẩm đã mua
      </Typography>
      <Stack sx={{ padding: "1rem", backgroundColor: "#fff" }} direction="row" spacing={2} >
        <Grid container rowSpacing={1} columns={{ xs: 8, md: 12 }}>
          {/* <Stack sx={{ padding: "1rem", backgroundColor: "white" }} direction="row" spacing={2} > */}
          {myRevPurchaseds.length === 0 ?
            <EmptyNotify title="Bạn chưa mua sản phẩm" /> :
            myRevPurchaseds.slice((page - 1) * size, page * size).map((item, i) =>
              <Grid key={i} item xs={3}>
                <Card sx={{ border: "0px solid black", maxWidth: "13rem" }}>
                  <CardMedia component="img" image={item.image} height="200" />
                  <CardContent sx={{ padding: "5px 0 0 0" }}>
                    <Link to={`/product/${item.slug}`}>
                      <Typography className="reviewpurchased__name" variant="caption" color="text.secondary">
                        {item.name}
                      </Typography>
                    </Link>
                  </CardContent>
                  <CardActions>
                    <Button
                      sx={{ width: "100%" }}
                      variant="contained"
                      size="small"
                      color={item.isReviewed ? "warning" : "primary"}
                      onClick={item.isReviewed ? null :
                        (() => handleClickOpen(item))}
                    >
                      {item.isReviewed ? "Đã nhận xét" : "Viết nhận xét"}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )}
          {/* </Stack> */}
        </Grid>
      </Stack>

      <Box>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Đánh giá sản phẩm
          </BootstrapDialogTitle>
          <DialogContent sx={{ width: "100%" }} dividers>
            <Stack sx={{}} spacing={3}>
              <Stack
                sx={{ width: "35rem", border: "1px solid #c2c2c2" }}
                direction="row"
                spacing={3}
              >
                <Box
                  sx={{ height: 100, width: 100 }}
                  component="img"
                  alt=""
                  src={chosenProduct?.image}
                />

                <Stack>
                  <Typography sx={{ fontWeight: 600 }} variant="subtitle1">
                    {chosenProduct?.name}
                  </Typography>
                  {/* <Typography variant="subtitle2">Phân loại</Typography> */}
                </Stack>
              </Stack>
              <Stack
                sx={{ height: "9rem", width: "100%" }}
                alignItems="center"
                spacing={3}
              >
                <Rating onChange={handleChangeRating}
                  sx={{}}
                  name="size-large"
                  defaultValue={5}
                  value={rating}
                  size="large"
                />

                <TextareaAutosize
                  onChange={handleChangeContent}
                  minRows={6}
                  maxRows={10}
                  aria-label="maximum height"
                  placeholder="Nhập bình luận"
                 
                  style={{
                    width: "100%",
                    border: "1px solid #c2c2c2",
                    fontSize: "20px",
                    padding:'12px'
                  }}
                />
              </Stack>
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Trở lại
            </Button>

            <Button variant="contained" onClick={handleSaveCmt}>
              Hoàn thành
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </Box>

      {totalPage > 1 ? (
        <Stack spacing={2}>
          <Typography>Page: {page}</Typography>
          <Pagination count={totalPage} page={page} onChange={handleChange} />
        </Stack>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default ReviewPurchased;
