import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  mainGrid: {
    marginTop: theme.spacing.unit * 3
  },
  postInfo: {
    marginBottom: "15px"
  },
  title: {
    fontSize: "2.7em",
    marginTop: "-105px",
    color: "#555555"
  },
  tags: {
    marginTop: "1rem",
    fontSize: "1.25rem",
    fontWeight: "500"
  },
  day: {
    padding: "10px 0px"
  },
  body: {}
});

class Post extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={40} className={classes.mainGrid}>
        <Grid item xs={12} md={12}>
          <div className={classes.postInfo}>
            <h1 className={classes.title}>제목</h1>
            <Divider />
            <div className={classes.tags}>태그</div>
            <Typography
              className={classes.day}
              variant="subtitle1"
              color="textSecondary"
            >
              날짜
            </Typography>
          </div>
          <div className={classes.body}>바디</div>
        </Grid>
      </Grid>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Post);
