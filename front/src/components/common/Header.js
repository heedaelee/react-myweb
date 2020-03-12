import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";

import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Button from "components/common/Button";


const drawerWidth = 240;
const styles = theme => ({
  appBar: {
    flex: 1,
    marginLeft: drawerWidth,
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      width: `100%`
    },
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    zIndex: "1201",
    boxShadow: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
  },
  menuButton: {},
  menuIcon: {
    color: "#4a4a4a"
  },
  buttonGroup: {
    marginLeft: "auto",
    display: "flex"
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: `16px`
    }
  },
});

class Header extends React.Component {
  render() {
    const {
      classes,
      drawerToggle,
      postId,
      onRemove,
      user,
      post,
      onLoginClick
    } = this.props;
    const { logged, loggedInfo } = user;
    const { username, thumbnail } = loggedInfo;
    console.log("로그드 유저네임", username);
    console.log("게시물 유저네임", post.username);
    
    
    console.log(`post.username : ${post.username} 
                  username : ${username} `);

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Hidden mdUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={drawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon className={classes.menuIcon} />
            </IconButton>
          </Hidden>
          <Typography
            href="/"
            variant="h6"
            color="inherit"
            className={classes.title}
          >
            <Link  className={classes.head} color="inherit" href="/">
              블로그 플랫폼
            </Link>
          </Typography>
          <div className={classes.buttonGroup}>
            {logged && (
              <>
                {post.username &&
                  post.username === username && [
                    //flex 유지를 위해 배열로
                    <Button
                      key="edit"
                      theme="default"
                      to={`/editor?id=${postId}`}
                    >
                      수정
                    </Button>,
                    <Button key="remove" theme="default" onClick={onRemove}>
                      삭제
                    </Button>
                  ]}
                <Button to="/editor" theme="default">
                  새 포스트
                </Button>
              </>
            )}
            <Button onClick={onLoginClick}>
              {logged ? "로그아웃" : "로그인/가입"}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Header);
