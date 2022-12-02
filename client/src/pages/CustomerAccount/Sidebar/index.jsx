import * as React from "react";

import { sidebarTab } from "../../../constraints/Profile";

import { useSelector } from "react-redux";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
} from "@mui/material";

export default function PermanentDrawerLeft(props) {
  const user = useSelector(state => state.auth.user)//lấy user từ store
  return (
    <React.Fragment>
      <List sx={{ maxWidth: 300 }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="hình đại diện" src={user.img} />
          </ListItemAvatar>
          <ListItemText primary="Tài khoản của" secondary="Dong Le" />
        </ListItem>

        {sidebarTab.map((item, index) => {
          if (item.text != "/") {
            return (
              <ListItem
                key={item.id}
                disablePadding
                onClick={() => props.handleClick(item.id)}
                selected={props.selectedTabId === item.id}
              >
                <ListItemButton>
                  <ListItemIcon>{<item.icon />}</ListItemIcon>
                  <ListItemText primary={item.text} className="sidebar-item__text"/>
                  {index === 1 ? (
                    <Badge badgeContent="3" color="error"></Badge>
                  ) : null}
                </ListItemButton>
              </ListItem>
            );
          }
        })}
      </List>
    </React.Fragment>
  );
}
