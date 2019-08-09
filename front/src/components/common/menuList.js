import React from "react";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

export const menuList = (
  <>
    <Divider />
    <List>
      {["List", "Profile"].map((text, index) => {
        if (text === "List") {
          return (
            <ListItem button key={text} component={Link} to="/">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          );
        }
        if(text === "Profile"){
          return (
            <ListItem button key={text} component={Link} to="/profile">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        }
        else {
          return (
            <ListItem button key={text}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          );
        }
      })}
    </List>
    <Divider />
  </>
);
