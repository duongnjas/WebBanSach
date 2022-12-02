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
  const [loadingShowmore, setLoadingShowmore] = useState(false)
  const [chooseSuggestion, setChooseSuggestion] = useState(0)

  const [page, setPage] = useState(1);
  const size = 30;

  useEffect(() => {
    const getData = async () => {
      setLoadingShowmore(true)
      let param = {
        _page: page,
        _limit: size,
      };
      apiHome.getProducts(param)
        .then(res => {
          console.log(res.data)
          setProducts((pre) => [...pre, ...res.data]);
        })
        .finally(() => setLoadingShowmore(false))
    };
    getData();
  }, [page]);


  useEffect(() => {
    const getDataSuggestion = async () => {
      let param = {};
      const response = await apiHome.getSuggestions(param);
      if (response) {
        setSuggestions(response);
      }
    };
    getDataSuggestion();
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
              src=""
              alt=""
            />
            <img
              src=""
              alt=""
            />
            <img
              src=""
              alt=""
            />
          </Box>
        </Box>

        <Box id="section9">
          <Box className="suggestion">
            <Box className="section__heading">
              <Box className="section__title">Gợi Ý Hôm Nay</Box>
            </Box>
            <Box className="suggestion__wrap">
              {Suggestions.map((item, index) => (
                <Link key={item.id} to={item.link}>
                  <Box
                    onClick={() => setChooseSuggestion(index)}
                    className={`suggestion__item ${index === chooseSuggestion ? "active" : ""
                      }`}
                  >
                    <img
                      style={{ width: "48px" }}
                      src={item.image}
                      alt={item.alt}
                    />
                    <span>{item.alt}</span>
                  </Box>
                </Link>
              ))}
            </Box>
          </Box>
          <Grid container>
            {products.map((item) => (
              <Grid key={`product-${item.id}`} item lg={2} md={4} sm={6} xs={6}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid>
          <Stack direction='row' justifyContent="center" mt={2}>
            <Button
              width="15rem"
              height="2rem"
              color="primary"
              variant="outlined"
              onClick={handleLoadMore}
            >{loadingShowmore && <Loading />}
              Xem thêm
            </Button>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
export default Home;
