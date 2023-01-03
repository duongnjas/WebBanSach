import { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Button,
  Typography,
  FormGroup,
  Grid,
  Rating,
  Tab,
  Tabs,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CardProduct from "../../components/CardProduct";
import apiProduct from "../../apis/apiProduct";
import { useParams} from "react-router-dom";// de lay slug

function FilterProductSearch(props) {

  const slug = useParams().slug;
  const [value, setValue] = useState(0);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [isApplyPrice, setIsApplyPrice] = useState(false);


  const [filteredProducts, setFilteredProducts] = useState([]);

  const [rating, setRating] = useState(0);


  useEffect(() => {
    var querySearch = "";
    console.log(`props: ${props}`);
    console.log(`Và ///// ${querySearch}`);
    const getData = async () => {
      // if (rating === 0) {
      //   if (!isApplyPrice) {
      //     querySearch = `?q=${slug}`;
      //   } else {
      //     querySearch = `?q=${slug}&price_gte=${minPrice}&price_lte=${maxPrice}`;
      //   }
      // } else {
      //   if (minPrice === 0 && maxPrice === 0) {
      //     querySearch = `?q=${slug}&rate=${rating}`;
      //   } else {
      //     querySearch = `?q=${slug}&rate=${rating}&price_gte=${minPrice}&price_lte=${maxPrice}`;
      //   }
      // }

      apiProduct
        .getProductsBySearch(props)
        .then((res) => {
          console.log("search product ", res);
          setFilteredProducts(res);
        })
        .catch((error) => {
          setFilteredProducts(null);
          console.log(error);
        });
    };
    getData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, rating, isApplyPrice]);


  const onChangeMinPrice = (e) => {
    setMinPrice(e.target.value);
  };

  const onChangeMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  };


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Stack className="filterProduct container" direction="row" spacing={1}>
      <Stack className="filterProduct__sidebar" direction="column">
        <Box className="filterProduct__form">
          <Typography className="filterProduct__title">Đánh giá</Typography>

          <FormGroup>
            {[5, 4, 3].map((item) => (
              <Box
                key={item}
                onClick={() => setRating(item)}
                className="filterProduct__rating"
              >
                <Rating
                  name="hover-feedback"
                  value={item}
                  readOnly
                  icon={<StarIcon sx={{ fontSize: 16 }} />}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} sx={{ fontSize: 16 }} />
                  }
                />
                <Box fontSize="13px">{`từ ${item} sao`}</Box>
              </Box>
            ))}
          </FormGroup>
        </Box>

        <Box className="filterProduct__form">
          <Typography className="filterProduct__title">Giá</Typography>

          <Typography sx={{ fontSize: "13px", fontWeight: 400, color: "#888" }}>
            Chọn khoảng giá
          </Typography>
          <Box className="filterPrice__groupInput">
            <input
              type="text"
              value={minPrice}
              onChange={onChangeMinPrice}
            ></input>
            <span>-</span>
            <input
              type="text"
              value={maxPrice}
              onChange={onChangeMaxPrice}
            ></input>
          </Box>

          <Button
            //onClick={handleApplyPrice}
            variant="outlined"
            sx={{ width: "100px", height: "26px", fontWeight: 400 }}
          >
            {isApplyPrice ? "Huỷ" : "Áp dụng"}
          </Button>
        </Box>
      </Stack>

      <Box sx={{ flex: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="basic tabs example"
          >
            {tabs.map((item) => (
              <Tab
                key={item.id}
                label={item.name}
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "500",
                }}
              />
            ))}
          </Tabs>
        </Box>

        <Box>
          <Grid container spacing={2}>
            {filteredProducts.map((item) => (
              <Grid key={item.id} item xs={3}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
}

const tabs = [
  {
    id: 1,
    name: "Phổ biến",
  },
  {
    id: 2,
    name: "Bán chạy",
  },
  {
    id: 3,
    name: "Hàng mới",
  },
  {
    id: 4,
    name: "Giá thấp",
  },
  {
    id: 5,
    name: "Giá cao",
  },
];

export default FilterProductSearch;
