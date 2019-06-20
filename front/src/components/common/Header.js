import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
//Material Styles
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Button from "components/common/Button";

const drawerWidth = 240;
const styles = theme => ({
  appBar: {
    flex: 1,
    marginLeft: drawerWidth,
    marginBottom: theme.spacing.unit * 4,
    [theme.breakpoints.up("sm")]: {
      width: `100%`
    },
    backgroundColor: theme.palette.background.paper,
    color: "black",
    zIndex: "1201"
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  menuIcon: {
    color: "#4a4a4a"
  },
  buttonGroup: {
    marginLeft: "auto"
  }
});

class Header extends React.Component {
  render() {
    const { classes, drawerToggle, postId, onRemove, logged, onLoginClick } = this.props;

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={drawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <Typography href="/" variant="h6" color="inherit">
            <Link color="inherit" href="/">
              David Blog
            </Link>
          </Typography>
          <div className={classes.buttonGroup}>
            {logged && (
              <>
                {postId && [
                  //flex 유지를 위해 배열로
                  <Button
                    key="edit"
                    theme="outline"
                    to={`/editor?id=${postId}`}
                  >
                    수정
                  </Button>,
                  <Button key="remove" theme="outline" onClick={onRemove}>
                    삭제
                  </Button>
                ]}
                <Button to="/editor" theme="outline">
                  새 포스트
                </Button>
              </>
            )}
            <Button onClick={onLoginClick}>
              {logged ? '로그아웃' : '관리자로그인'}
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
