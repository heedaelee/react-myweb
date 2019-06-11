import React from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

import { withStyles } from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";

import { menuList } from "./menuList";
import { Header } from "components/common";
import {drawerWidth, RsideWidth} from "components/common/commonCss";

const styles = theme => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    },
  },
  rSidebar: {
    [theme.breakpoints.up("md")]: {
      width: RsideWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing.unit * 1,
    },
    flexGrow: 1,
    padding: theme.spacing.unit * 5,
    height: "100vh",
    overflow: "auto",
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    background: 'white',
    
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
        <Header 
          drawerToggle={this.handleDrawerToggle} 
        />
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {this.props.children}
        </main>
        <Hidden xsDown >
          <div className={classes.rSidebar} style={{background:'white'}}  />
        </Hidden>
      </div>
    );
  }
}

PageTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PageTemplate);
