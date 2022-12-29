import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

import { Grid, Stack, Button, Box } from "@mui/material";
import CardProduct from "../../components/CardProduct";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import apiHome from "../../apis/apiHome";
import Loading from "../../components/Loading";

function Home() {
  const [products, setProducts] = useState([]);

  const [Suggestions, setSuggestions] = useState([]);
  const [loadingShowmore, setLoadingShowmore] = useState(false);
  const [chooseSuggestion, setChooseSuggestion] = useState(0);

  const [page, setPage] = useState(1);
  const size = 30;

  useEffect(() => {
    const getData = async () => {
      setLoadingShowmore(true);
      // let param = {
      //   _page: page,
      //   _limit: size,
      // };
      try {
        const response = await apiHome.getProducts();
        console.log(response);
        setProducts(response);
        setLoadingShowmore(false);
      } catch (err) {
        console.log(err);
        setLoadingShowmore(false);
      }
    };
    getData();
    console.log(products);
  }, []);
  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <>
      <Stack spacing={2} className="container home">
        <Box id="section8">
          <Box className="banner__wrap2">
            <img
              src="https://canhcoupon.com/images/khuyen-mai/2017/02/thang-3-sach-tre-giam-gia-den-49-tiki-banner.jpg"
              alt=""
            />
            <img
              src="https://canhcoupon.com/images/khuyen-mai/2017/04/hoi-sach-gia-bia-mua-1-tang-1-tiki-banner.jpg"
              alt=""
            />
            <img
              src="https://canhcoupon.com/images/khuyen-mai/2017/02/dai-tiec-sach-hay-giam-gia-den-50-tiki-banner.jpg"
              alt=""
            />
          </Box>
        </Box>

        <Box id="section9">
          <Box className="suggestion">
            <Box className="section__heading">
              <Box className="section__title">Gợi Ý Hôm Nay</Box>
            </Box>
          </Box>
          <Grid container>
            {products?.map((item) => (
              <Grid key={item?._id} item lg={2} md={4} sm={6} xs={6}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid>
          <Stack direction="row" justifyContent="center" mt={2}>
            <Button
              width="15rem"
              height="2rem"
              color="primary"
              variant="outlined"
              onClick={handleLoadMore}
            >
              {loadingShowmore && <Loading />}
              Xem thêm
            </Button>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
export default Home;
