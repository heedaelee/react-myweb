import React from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

import { withStyles } from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";
import { menuList } from "./menuList";
import HeaderContainer from "containers/common/HeaderContainer";
import { drawerWidth } from "components/common/commonCss";
import "styles/utils.scss";

const styles = theme => ({
  root: {
    display: "flex",
    fontFamily: "NanumBarunGothic, sans-serif"
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1)
    },
    flexGrow: 1,
    padding: theme.spacing(5),
    height: "100vh",
    overflow: "auto",
    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
    background: "white",
    zIndex: "1200"
  }
});

class PageTemplate extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        {menuList}
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseLine />
        <HeaderContainer drawerToggle={this.handleDrawerToggle} />
        <nav className={classes.drawer}>
          <Hidden mdUp implementation="css">
            {/* side바 mdUp일때 temporary 켜짐 */}
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{ paper: classes.drawerPaper }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent">
            {drawer}
          </Drawer>
        </nav>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

PageTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PageTemplate);
