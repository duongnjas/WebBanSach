import { useState, useEffect } from "react";
import apiNotify from "../../../apis/apiNotify";
import { useSelector } from "react-redux";
import "./Notify.scss";
import PropTypes from "prop-types";
import {
  Stack,
  Tabs,
  Tab,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Button,
  Pagination,
} from "@mui/material";

import EmptyNotify from "../../../components/EmptyNotify";
import HomeIcon from "@mui/icons-material/Home";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import UpdateIcon from "@mui/icons-material/Update";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ITEM_HEIGHT = 48;

function Notify(props) {
  const userId = useSelector((state) => state.auth.user).id;
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [notification, setNotification] = useState([[], [], [], []]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [badgeHome, setBadgeHome] = useState("");
  const [badgeDiscount, setBadgeDiscount] = useState("");
  const [badgeOrder, setBadgeOrder] = useState("");
  const [badgeSystem, setBadgeSystem] = useState("");
  const size = 6;

  const checkPropOfFilter = (a) => {
    if (a > 0) {
      return "dot";
    } else if (a <= 0) {
      return "none";
    }
  };

  const getData = async () => {
    let countAll = 0,
      countDiscount = 0,
      countOrder = 0,
      countSystem = 0;

    let param = {
      _page: page,
      _limit: size,
      _sort: "createdAt",
      _order: "desc",
      userId: userId,
    };

    const response = await apiNotify.getNotification(param);

    setTotalPage(Math.ceil(response.pagination._totalRows / size));

    if (response) {
      let data = response.data.map((item) => {
        return { ...item, icon: getIconByType(item.type) };
      });

      const ty = [
        data,
        data.filter((item) => item.type === "discount"),
        data.filter((item) => item.type === "order"),
        data.filter((item) => item.type === "system"),
      ];
      setNotification(ty);

      ty[0].forEach((item) => {
        if (item.seen === false) {
          countAll++;
        }
      });
      setBadgeHome(checkPropOfFilter(countAll));

      ty[1].forEach((item) => {
        if (item.seen === false) {
          countDiscount++;
        }
      });
      setBadgeDiscount(checkPropOfFilter(countDiscount));

      ty[2].forEach((item) => {
        if (item.seen === false) {
          countOrder++;
        }
      });
      setBadgeOrder(checkPropOfFilter(countOrder));

      ty[3].forEach((item) => {
        if (item.seen === false) {
          countSystem++;
        }
      });
      setBadgeSystem(checkPropOfFilter(countSystem));
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDate = (timestamp) => {
    let date = new Intl.DateTimeFormat("en-GB").format(timestamp);
    return date;
  };
  const handleChangePage = (event, newValue) => {
    setPage(newValue);
  };
  const handleSeenProp = (e) => {
    let params = {
      seen: true,
    };
    apiNotify
      .changeSeenProp(params, e.target.id)
      .then((res) => {
        getData();
        props.getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteNotify = (e) => {
    apiNotify
      .deleteNotifyById({ id: e.target.id })
      .then((res) => {
        getData();
        props.getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeSeenPropAll = async () => {
    let params = {
      userId: userId,
    };
    const response = await apiNotify.getNotification(params);
    response.forEach((item) => {
      let param = {
        seen: true,
      };
      apiNotify
        .changeSeenProp(param, item.id)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    });
    props.getData();
  };

  const handleDeleteNotifyAll = async () => {
    let params = {
      userId: userId,
    };
    const response = await apiNotify.getNotification(params);
    response.forEach((item) => {
      apiNotify
        .deleteNotifyById({ id: item.id })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    });
    props.getData();
  };

  return (
    <Box sx={{ width: "100%", top: "0" }}>
      <Typography variant="h6">Thông báo của tôi</Typography>

      <Box sx={{ width: "100%", mt: "1rem", backgroundColor: "#fff" }}>
        <Stack
          position="static"
          color="default"
          direction="row"
          alignItems="center"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon tabs example"
            bgcolor="#ffffff"
          >
            <Tab
              icon={
                <Badge variant={badgeHome} color="error">
                  <HomeIcon color="action" />
                </Badge>
              }
              aria-label="Home"
              sx={{ coler: "#666666" }}
              {...a11yProps(0)}
            />
            <Tab
              icon={
                <Badge variant={badgeDiscount} color="error">
                  <CardGiftcardIcon color="action" />
                </Badge>
              }
              aria-label="Gift Card"
              {...a11yProps(1)}
            />
            <Tab
              icon={
                <Badge variant={badgeOrder} color="error">
                  <ReceiptIcon />
                </Badge>
              }
              aria-label="Receipt"
              {...a11yProps(2)}
            />
            <Tab
              icon={
                <Badge variant={badgeSystem} color="error">
                  <UpdateIcon />
                </Badge>
              }
              aria-label="Update"
              {...a11yProps(3)}
            />
          </Tabs>
          <Box marginRight="0px" marginLeft="auto">
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "25ch",
                },
              }}
            >
              <MenuItem onClick={handleChangeSeenPropAll}>
                Đánh dấu đọc tất cả
              </MenuItem>
              <MenuItem onClick={handleDeleteNotifyAll}>
                Xóa tất cả thông báo
              </MenuItem>
            </Menu>
          </Box>
        </Stack>

        <TabPanel value={value} index={value}>
          <Stack sx={{ minHeight: "400px" }}>
            {notification[value].length === 0 ? (
              <EmptyNotify />
            ) : (
              notification[value].map((item) => (
                <Stack
                  key={item.id}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                  padding={3}
                >
                  <Typography variant="body2">
                    {handleDate(item.date)}
                  </Typography>

                  <Box className="icon">
                    <Box className={`icon__img icon__img--${item.type}`}>
                      {item.icon && <item.icon />}
                    </Box>
                  </Box>

                  <Box style={{ flex: 1 }}>
                    <Typography
                      variant="body2"
                      className="text-overflow-2-lines"
                    >
                      {item.text}
                    </Typography>
                    <a
                      style={{ fontSize: "13px", color: "#0b74e5" }}
                      target="_blank"
                      href={item.link}
                      rel="noreferrer"
                    >
                      Chi tiết
                    </a>
                  </Box>
                  {!item.seen && (
                    <Button id={item.id} onClick={handleSeenProp}>
                      Đánh dấu đã đọc
                    </Button>
                  )}

                  <Button
                    id={item.id}
                    color="warning"
                    onClick={handleDeleteNotify}
                  >
                    Xóa
                  </Button>
                </Stack>
              ))
            )}
            {totalPage > 1 ? (
              <Stack spacing={2} mt="10px">
                <Pagination
                  count={totalPage}
                  page={page}
                  onChange={handleChangePage}
                  color="primary"
                />
              </Stack>
            ) : (
              <></>
            )}
          </Stack>
        </TabPanel>
      </Box>
    </Box>
  );
}
const listType = [
  {
    name: "discount",
    icon: CardGiftcardIcon,
  },
  {
    name: "order",
    icon: ReceiptIcon,
  },
  {
    name: "system",
    icon: UpdateIcon,
  },
];
const getIconByType = (type) => {
  const list = listType.find((item) => item.name === type);
  if (list) {
    return list.icon;
  }
  return null;
};

export default Notify;
