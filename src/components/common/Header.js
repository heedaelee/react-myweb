import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
//Material Styles
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 240;
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
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  menuIcon: {
    color: "#4a4a4a"
  }
});

class Header extends React.Component {
  render() {
    const { classes, drawerToggle } = this.props;

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
          <Typography variant="h6" color="inherit" noWrap>
            {/* David Home */}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Header);
