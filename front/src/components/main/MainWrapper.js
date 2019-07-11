import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    margin: "30px 0px",
    display: "flex",
    justifyContent: "space-between"
  },
  postList: {
    [theme.breakpoints.down("lg")]: {
      width: "100%"
    },
    [theme.breakpoints.up("lg")]: {
      width: "80%"
    }
  },
  tag: {
    [theme.breakpoints.down("lg")]: {
      display: "none"
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      width: "15%"
    }
  }
});

class MainWrapper extends Component {
  state = {
    mobileOpen: false
  };

  render() {
    const { classes, ListContainer, card, tag } = this.props;
    return (
      <>
        {card}
        <div className={classes.root}>
          <div className={classes.postList}>{ListContainer}</div>
          <div className={classes.tag}>{tag}</div>
        </div>
      </>
    );
  }
}

MainWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MainWrapper);
