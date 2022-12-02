 /* eslint-disable */
import { useState,  useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Pagination,
  Grid,
} from "@mui/material";

import CardProduct from "../../../components/CardProduct";
import apiAccount from "../../../apis/apiAccount";
import { useSelector } from "react-redux";

function FavoriteProduct() {
  const user = useSelector((state) => state.auth.user);

  console.log(user);

  const [myFavorites, setMyFavorites] = useState([]);
  const [totalPage, setTotalPage] = useState(10);
  const [page, setPage] = useState(1);
  const size = 10;

  useEffect(() => {
    const getMyFavorites = async () => {
      let params = {
        _page: page,
        _limit: size,
      };
      await apiAccount.getWishListByUser(user.id,params).then((res) => {
    
        if (res.length !== 0) {
          setMyFavorites(res);
        }
      });
    };

    getMyFavorites();
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <Typography variant="h6">Danh sách yêu thích</Typography>

      <Grid container sx={{ backgroundColor: "white", padding: "1rem" }}>
        {myFavorites.map((item) => {
          let data = {
            id: item.productId,
            image: item.productImg,
            name: item.productName,
            rate: item.productRate,
            sold: item.productSold,
            discount: item.productDiscount,
            price: item.productPrice,
            slug: item.productSlug,
          };
          return (
            <Grid key={item.id} item lg={2} md={4} sm={4} xs={4}>
              <CardProduct data={data} />
            </Grid>
          );
        })}
      </Grid>

      {myFavorites.length !== 0 ? (
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
export default FavoriteProduct;
