import React, { Component } from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

import { withStyles } from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";
import { menuList } from "components/common/menuList";

import "./EditorTemplate.scss";
import { drawerWidth } from "components/common/commonCss";
import { EditorHeader } from "components/editor";

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
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
      padding: theme.spacing.unit * 1
    },
    flexGrow: 1,
    padding: theme.spacing.unit * 5,
    height: "100vh",
    overflow: "auto",
    background: "white"
  }
});

class EditorTemplate extends Component {
  state = {
    leftRatio: 0.5,
    open: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleMouseMove = ev => {
    this.setState({ leftRatio: ev.clientX / window.innerWidth });
  };

  handleMouseUp = ev => {
    document.body.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  };

  handleDivdideMouseDown = ev => {
    document.body.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  };

  render() {
    const { editor, preview, classes, theme } = this.props;
    const { leftRatio } = this.state;
    const { handleDivdideMouseDown } = this;
    const leftLand = { flex: leftRatio };
    const rightLand = { flex: 1 - leftRatio };
    const divideLnd = { left: `${leftRatio * 100}%` };
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        {menuList}
      </div>
    );

    return (
      <div className="editor-template">
        <CssBaseLine />
        <EditorHeader drawerToggle={this.handleDrawerToggle} />
        <nav className={classes.drawer}>
          <Drawer
            container={this.props.container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={this.state.open}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <div className="panes">
          <div className="pane editor" style={leftLand}>
            {editor}
          </div>
          <div className="pane preview" style={rightLand}>
            {preview}
          </div>
          <div
            className="divide"
            style={divideLnd}
            onMouseDown={handleDivdideMouseDown}
          />
        </div>
      </div>
    );
  }
}
EditorTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(EditorTemplate);
