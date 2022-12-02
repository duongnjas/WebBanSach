import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./Search.scss";

import {
  Grid,
  Stack,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HistoryIcon from "@mui/icons-material/History";

import {  removeItem } from "../../slices/searchSlice";

function Search(props) {
  const dispatch = useDispatch();

  const [expandSearch, setExpandSearch] = useState(false);

  const handleRemoveSearch = (data) => {
    dispatch(removeItem(data));
  };

  const handleClickSuggestItem = (data) => {
    props.setSearchText(data.text);

    props.handleSaveSearch(data);

    // navigate(`/product/${data.slug}`);
    // props.handleSubmitSearch(data);
  };

  const SearchedItemsHalf = props.searchedItems
    .slice(0, 5)
    .map((item) => (
      <SearchedItem
        setSearchText={props.setSearchText}
        text={item.text}
        slug={item.slug}
        handleRemoveSearch={handleRemoveSearch}
      />
    ));

  const SearchedItemsFull = props.searchedItems
    .slice(0, 10)
    .map((item) => (
      <SearchedItem
        setSearchText={props.setSearchText}
        text={item.text}
        slug={item.slug}
        handleRemoveSearch={handleRemoveSearch}
      />
    ));

  const SuggestItemsHalf = props.suggestions
    .slice(0, 5)
    .map((item) => (
      <SuggestItem
        handleClickSuggestItem={handleClickSuggestItem}
        setSearchText={props.setSearchText}
        text={item.text}
        slug={item.slug}
      />
    ));

  const SuggestItemsFull = props.suggestions
    .slice(0, 10)
    .map((item) => (
      <SuggestItem
        handleClickSuggestItem={handleClickSuggestItem}
        setSearchText={props.setSearchText}
        text={item.text}
        slug={item.slug}
      />
    ));

  return (
    <Stack
      sx={{ borderTop: "1px solid silver", paddingTop: "0.8rem", px: "1rem" }}
      id="input-search-result"
      className="header-search__result"
    >
      {expandSearch
        ? props.searchText === ""
          ? SearchedItemsFull
          : SuggestItemsFull
        : props.searchText === ""
        ? SearchedItemsHalf
        : SuggestItemsHalf}

      <Button
        onClick={() => setExpandSearch((prev) => !prev)}
        variant="text"
        endIcon={
          expandSearch ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
        }
      >
        {expandSearch ? "Thu gọn" : "Xem thêm"}
      </Button>

      <Box pt={2} pb={1.5}>
        <Stack sx={{ height: "24px" }} direction="row" mb={1}>
          <img
            alt=""
            src="https://salt.tikicdn.com/ts/upload/4f/03/a0/2455cd7c0f3aef0c4fd58aa7ff93545a.png"
            width="24px"
            height="24px"
          ></img>
          <Typography>Tìm kiếm phổ biến</Typography>
        </Stack>

        <Grid container spacing={2}>
          {props.trendingSearch.map((item) => (
            <TrendingItem item={item} />
          ))}
        </Grid>
      </Box>

      <Box pt={2} pb={1.5}>
        <Typography sx={{ height: "24px" }} mb={1}>
          Danh Mục Nổi Bật
        </Typography>

        <Grid container spacing={2}>
          {props.trendingCategory.slice(0, 8).map((item) => (
            <Grid key={item.id} item xs={3}>
              <Stack justifyContent="center" alignItems="center">
                <img
                  alt={item.alt}
                  src={item.image}
                  width="64,5px"
                  height="64,5px"
                ></img>
                <Typography
                  my={0.5}
                  sx={{ textAlign: "center", fontSize: "12px" }}
                >
                  {item.alt}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}

export default Search;

function SearchedItem(props) {
  return (
    <Stack
      className="item-search"
      sx={{ height: "2.5rem" }}
      direction="row"
      spacing={2}
      alignItems="center"
    >
      <HistoryIcon fontSize="medium" sx={{ color: "silver" }} />

      <Link style={{ flex: 1 }} to={`product/${props.slug}`}>
        <Typography
          className="text-overflow-1-lines"
          onClick={() => props.setSearchText(props.text)}
          variant="subtitle2"
          sx={{ fontSize: "0.8rem", fontWeight: 500 }}
        >
          {props.text}
        </Typography>
      </Link>

      <IconButton onClick={() => props.handleRemoveSearch(props.slug)}>
        <ClearIcon sx={{ color: "silver" }}></ClearIcon>
      </IconButton>
    </Stack>
  );
}

function SuggestItem(props) {
  let obj = {
    text: props.text,
    slug: props.slug,
  };
  return (
    <Link to={`/product/${props.slug}`}>
      <Stack
        className="item-search"
        sx={{ height: "2.5rem" }}
        direction="row"
        spacing={2}
        alignItems="center"
        onClick={() => props.handleClickSuggestItem(obj)}
      >
        <SearchIcon fontSize="medium" sx={{ color: "silver" }} />

        <Typography
          className="text-overflow-1-lines"
          variant="subtitle2"
          sx={{ fontSize: "0.8rem", fontWeight: 500, flex: 1 }}
        >
          {props.text}
        </Typography>
      </Stack>
    </Link>
  );
}

function TrendingItem(props) {
  return (
    <Grid key={props.item.id} item xs={4}>
      <Stack direction="row" spacing={1}>
        <img alt="" src={props.item.imgUrl} width="38px" height="38px"></img>

        <Typography my={0.5} sx={{ fontSize: "12px" }}>
          {props.item.name.slice(0, 20) + "..."}
        </Typography>
      </Stack>
    </Grid>
  );
}
