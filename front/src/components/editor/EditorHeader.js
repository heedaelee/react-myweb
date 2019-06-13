import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
//Material Styles
import { withStyles } from "@material-ui/core/styles";
import { drawerWidth } from "components/common/commonCss";
import Button from "components/common/Button";

const styles = theme => ({
  appBar: {
    flex: 1,
    marginLeft: drawerWidth,
    marginBottom: theme.spacing.unit * 4,
    [theme.breakpoints.up("sm")]: {
      width: `100%`
    },
    backgroundColor: theme.palette.background.paper
  },
  toolBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  menuButton: {
    marginRight: 20
  },
  menuIcon: {
    color: "#4a4a4a"
  },
  buttonGroup: {},
  submit: {
    marginLeft: "auto"
  }
});

class EditorHeader extends React.Component {
  render() {
    const { onGoBack, onSubmit, isEdit, classes, drawerToggle } = this.props;

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={drawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <div className={classes.buttonGroup}>
            <Button className={classes.back} onClick={onGoBack} theme="outline">
              뒤로가기
            </Button>
            <Button
              className={classes.submit}
              onClick={onSubmit}
              theme="outline"
            >
              {isEdit ? "수정" : "작성"}하기
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
EditorHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(EditorHeader);
