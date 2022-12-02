/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
import "./MyReview.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Pagination from '@mui/material/Pagination';
import { useSelector } from "react-redux";
import apiReviews from "../../../apis/apiReviews";
import EmptyNotify from "../../../components/EmptyNotify";
function MyRates() {
  const [myReviews, setMyReviews] = useState([])
  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState(1)
  const size = 5
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const getMyReviews = async () => {
      let param = {
        _page: page,
        _limit: size,
        _sort: 'createdAt',
        _order: 'desc',
        userId: user.id,
        nameUser: user.name,
      }
      const response = await apiReviews.getMyReviews(param)
      if (response) {
        setMyReviews(response.data)
        setTotalPage(Math.ceil(response.pagination._totalRows / size))
      }
    }
    getMyReviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <Box>
      <Typography variant="h6" sx={{ margin: "20px 0px 15px" }}>
        Nhận xét của tôi
      </Typography>
      <Stack flex='1' sx={{ backgroundColor: "#fff", borderRadius: "10px" }} >
        {myReviews.length === 0 ?
          <EmptyNotify title="Viết nhận xét với sản phẩm bạn đã sử dụng để cung cấp thông tin hữu ích cho mọi người" /> :
          myReviews.map((item) => (
            <Stack direction="row" spacing={2} bgcolor="#ffff" p={2}
            >
              <Stack
                spacing={2} mb={1} direction="row"
              >
                <Stack className="myreview__avt"
                  sx={{
                    backgroundImage: `url(${item.productImg})`,
                  }}
                ></Stack>
                <Stack>
                  <Typography sx={{ fontSize: "14px", marginBottom: "6px" }} width="240px">
                    {item.productName}
                  </Typography>
                  {/* <Stack direction="row" spacing={1}>
                    <StoreIcon sx={{ fontSize: "17px", color: "#808089" }} />
                    <Typography sx={{ fontSize: "13px", color: "#808089" }}>
                      {item.storeName}
                    </Typography>
                  </Stack> */}
                </Stack>
              </Stack>
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} jutifyContent="center">
                  <Stack direction="row" spacing={1}>
                    <Rating readOnly value={item.rating} />
                    <Stack jutifyContent="center">
                      <Typography
                        sx={{ fontSize: "13px", fontWeight: "400", lineHeight: "20px" }}
                      >
                        {item.satisfy}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography
                    fontSize="15px" color="#242424" fontWeight="500"
                  >
                    {item.subject}
                  </Typography>
                </Stack>
                <Typography
                  sx={{ fontSize: "13px", fontWeight: "400", lineHeight: "20px" }}
                >
                  {item.content}
                </Typography>
                <Stack direction="row" flexWrap="wrap" justifyContent="flex-start" gap={'10px'}>
                  {item.imgRate?.map((item) => (
                    <Stack className="myreview__picture"
                      sx={{
                        backgroundImage: `url(${item})`,
                      }}
                    ></Stack>
                  ))}
                </Stack>
                <Typography sx={{ fontSize: "13px", color: "#808089" }}>
                  {item.option}
                </Typography>
              </Stack>
            </Stack>
          ))}
      </Stack>

      {totalPage > 1 ?
        <Stack spacing={2}>
          <Typography>Page: {page}</Typography>
          <Pagination count={totalPage} page={page} onChange={handleChange} />
        </Stack> : <></>}
    </Box>
  );
}

export default MyRates;
