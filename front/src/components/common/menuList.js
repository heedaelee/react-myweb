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
      {["개발노트", "Thought"].map((text, index) => {
        if (text === "개발노트") {
          return (
            <ListItem button key={text} component={Link} to="/개발">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          );
        } else {
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
