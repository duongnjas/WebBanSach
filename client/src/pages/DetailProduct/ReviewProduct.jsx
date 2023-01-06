 // eslint-disable-next-line react-hooks/exhaustive-deps
 /* eslint-disable */
import { useState, useEffect, useCallback } from "react";
import "./ReviewProduct.scss";
import React from "react";

import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Stack,
  Rating,
  Avatar,
  Button,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Pagination from "@mui/material/Pagination";
import StoreIcon from "@mui/icons-material/Store";
import Loading from "../../components/Loading";

function ReviewProduct(props) {
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState([1]);

  const [updateCmt, setUpdateCmt] = useState(1);

  const [selected, setSelected] = useState(0);

  const count = reviews.length;
  let avgRating = 0;
  if (count !== 0)
    avgRating = (
      reviews.reduce((total, currentValue) => total + currentValue.rating, 0) /
      count
    ).toFixed(1);

  const user = useSelector((state) => state.auth.user);

  const items = [
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" },
  ];
  const handleClickTab = (i) => {
    if (i !== selected) setSelected(i);
  };

  const size = 5;

  const getMyReviews = useCallback(async () => {
    if (!props.product) return;
    let param = {
      _page: page,
      _limit: size,
      rating_gte: selected,
      productId: props.product?.id,
    };
    const response = await apiReviews.getMyReviews(param);
    if (response) {
      console.log("res data after click", response);
      setReviews(response.data);
    }
  }, []);

  const handleChangePage = (event, newValue) => {
    setPage(newValue);
  };

 

  const handleChange = (event) => {
    setContent(event.target.value);
  }


  return (
    <Box className="container">
      <Box bgcolor={"#fff"}>
        <Typography sx={{ fontSize: "20px" }} py={1} px={2}>
          Đánh Giá - Nhận Xét Từ Khách Hàng
        </Typography>
        <Stack
          direction="row"
          sx={{ padding: "0px 48px 24px", borderBottom: "1px solid #BFBFBf" }}
        >
          <Box sx={{ width: "335px" }}>
            <Stack direction="row" spacing={2} mb={1}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ fontSize: "32px", fontWeight: 600 }}
              >
                {avgRating}
              </Stack>
              <Stack direction="column">
                <Rating
                  name="simple-controlled"
                  precision={0.5}
                  value={avgRating}
                  readOnly
                />
                <Typography
                  sx={{ fontSize: "13px", color: "rgb(128, 128, 137)" }}
                >
                  {count} Nhận xét
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="column">
              {[5, 4, 3, 2, 1].map((item) => {
                let countRate = reviews.filter(
                  (rev) => rev.rating === item
                ).length;
                return (
                  <Stack
                    key={item}
                    direction="row"
                    alignItems="center"
                    spacing={1}
                  >
                    <Rating
                      name="simple-controlled"
                      value={item}
                      readOnly
                      sx={{ fontSize: "16px" }}
                    />
                    <div className="SliderReview">
                      <div
                        style={{ width: `${(countRate * 100) / count}%` }}
                      ></div>
                    </div>
                    <Typography
                      sx={{
                        width: "30px",
                        fontSize: "11px",
                        color: "rgb(128, 128, 137)",
                      }}
                    >
                      {countRate}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" alignItems={"center"} spacing={2} mt={4}>
              <Typography sx={{ fontSize: "15px" }}>Lọc xem theo: </Typography>

              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                className="ReviewProduct__Filter"
              >
                {items?.map((item, i) => (
                  <Stack
                    onClick={() => {
                      handleClickTab(item.id);
                    }}
                    key={item.id || i}
                    alignItems="center"
                    justifyContent="center"
                    className={` reviewTab__item ${
                      item.id === selected ? "selected" : ""
                    }`}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={0.5}
                    >
                      <Typography>{item.label}</Typography>
                      <StarBorderIcon sx={{ color: "gold" }} />
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Box>
        </Stack>

        {/* Đánh giá của người mua */}
        {reviews.map((item) => (

          <ReplyReviews
            reviewId={item.id}
            user={user}
            item={item}
            getMyReviews={getMyReviews}
            reviews={reviews}
            setReviews={setReviews}
            handleChang={handleChange}
          />
        ))}

        <Stack
          justifyContent={"flex-end"}
          direction="row"
          sx={{ padding: "12px 48px" }}
        >
          {totalPage > 1 ? (
            <Stack spacing={2}>
              <Pagination
                count={totalPage}
                page={page}
                color="primary"
                onChange={handleChangePage}
              />
            </Stack>
          ) : (
            <></>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

function ReplyReviews(props) {
  const [content, setContent] = useState([]);
  const [openCmt, setOpenCmt] = useState(false);
  const [chooseReview, setChooseReview] = useState(null);

  const user = useSelector(state => state.auth.user)
  const [uploading, setUploading] = useState(false);

  const handleClickOpen = (rev) => {
    if(user){
      setChooseReview(rev);
      setOpenCmt(prev => !prev)
    }
    else{
      toast.warning("Vui lòng đăng nhập để bình luận")
    }  

  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const submitReply = () => {
    //hàm thực hiện tạo reply
    const listReply = chooseReview?.reply || [];

    if (!content) {
      toast.warning("Vui lòng nhập nội dung");
      return;
    }

    if (uploading) {
      toast.warning(
        "Thao tác đang thực hiện. Vui lòng không thao tác quá nhanh"
      );
      return;
    }

    let params = {
      reply: [
        {
          image: props.user.img,
          name: props.user.fullName,
          content: content,
        },
        ...listReply,
      ],
    };

    setUploading(true);
    
    apiReviews
      .updateMyReviews(params, props.reviewId)
      .then((res) => {
        toast.success("Cập nhật thành công");
        setContent("");

        if (props.getMyReviews) {
          props.getMyReviews();

          let newReviews = [...props.reviews];

          for (let i = 0; i < newReviews.length; i++) {
            if (newReviews[i].id === props.reviewId) {
              newReviews[i].reply.unshift({
                image: props.user.img,
                name: props.user.fullName,
                content: content,
              });
            }
          }
      }
    })
      .catch((err) => {
        toast.error("Cập nhật thất bại!");
      })
      .finally(() => setUploading(false));
  };

  return (
    <Stack direction="row" sx={{ padding: "32px 48px 24px" }}>
      <Box sx={{ width: "335px" }}>
        <Stack direction="row" spacing={2}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ fontSize: "32px", fontWeight: 600 }}
          >
            <div className="BackgroundAvatar">
              <Avatar src={props.item.userAvatar} />
            </div>
          </Stack>
          <Stack direction="column">
            <Typography
              sx={{
                fontSize: "15px",
                color: "rgb(36, 36, 36)",
                fontWeight: "600",
              }}
            >
              {props.item.userName}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="column">
          <Stack direction="row" mt={2}>
            <div className="IconWritten">
              <img
                src="https://salt.tikicdn.com/ts/upload/c6/67/f1/444fc9e1869b5d4398cdec3682af7f14.png"
                alt=""
              />
            </div>
            <Typography sx={{ fontSize: "13px", color: "#888" }}>
              Đã viết:{" "}
            </Typography>
            <Typography ml={1} sx={{ fontSize: "13px", color: "#333" }}>
              1 đánh giá
            </Typography>
          </Stack>
          <Stack direction="row" mt={1}>
            <div className="IconWritten">
              <img
                src="https://salt.tikicdn.com/ts/upload/cc/86/cd/1d5ac6d4e00abbf6aa4e4636489c9d80.png"
                alt=""
              />
            </div>
            <Typography sx={{ fontSize: "13px", color: "#888" }}>
              Đã nhận:{" "}
            </Typography>
            <Typography sx={{ fontSize: "13px", color: "#333" }} ml={1}>
              0 Lượt cám ơn
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Stack direction="row" spacing={2} bgcolor="#ffff" p={2}>
          <Stack spacing={1} minWidth="240px" minHeight="16px">
            <Stack
              className="myreview__avt"
              sx={{
                backgroundImage: `url(${props.item.productImg})`,
              }}
            ></Stack>

            <Stack>
              <Typography sx={{ fontSize: "14px", marginBottom: "6px" }}>
                {props.item.name}
              </Typography>
              <Stack direction="row" spacing={1}>
                <StoreIcon sx={{ fontSize: "17px", color: "#808089" }} />
                <Typography sx={{ fontSize: "13px", color: "#808089" }}>
                  {props.item.storeName}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} jutifyContent="center">
              <Rating readOnly value={props.item.rating} />
            </Stack>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "400",
                lineHeight: "20px",
              }}
            >
              {props.item.content}
            </Typography>
            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="flex-start"
              gap={"10px"}
            >
              {props.item.imgRate?.map((item) => (
                <Stack
                  className="myreview__picture"
                  sx={{
                    backgroundImage: `url(${item})`,
                  }}
                ></Stack>
              ))}
            </Stack>
            <Typography sx={{ fontSize: "13px", color: "#808089" }}>
              {props.item.option}
            </Typography>
          </Stack>
        </Stack>

        <Stack>
          <Stack direction="row" spacing={3}>
            <div className="Feedback Selected">
              <ThumbUpOffAltIcon
                sx={{ color: "rgb(26, 148, 255)", fontSize: "16px" }}
                mr={3}
              />
              Hữu ích
            </div>
            <Typography
              className="Feedback"
              onClick={() => handleClickOpen(props.item)}
            >
              Bình luận
            </Typography>
            <Typography className="Feedback">Chia sẻ</Typography>
          </Stack>

          {openCmt ? (
            <Stack p={2} spacing={2}>
              <TextField
                id="outlined-multiline-flexible"
                label="Nhập phản hồi"
                multiline
                maxRows={4}
                value={content}
                onChange={handleChange}
              />
              <Button onClick={submitReply}>
                {uploading && <Loading />}Đăng
              </Button>
            </Stack>
          ) : (
            <></>
          )}
        </Stack>

      
          
          {props.item?.reply?.map((itemReply, i) => (
            <Stack
              spacing={3}
              px={5}
              my={3}
              direction="row"
              borderBottom="1px solid #dfdfdf"
              pb={1}
            >
              <img src={itemReply.image} height="40px" />
              <Stack spacing={1}>
                <Typography>{itemReply.name}</Typography>
                <Typography marginLeft="16px" fontSize="14px">
                  {itemReply.content}
                </Typography>
              </Stack>
            </Stack>
          ))}
      </Box>
    </Stack>
  );
}

export default ReviewProduct;
