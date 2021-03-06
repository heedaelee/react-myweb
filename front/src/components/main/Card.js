/* eslint-disable react/no-typos */
// 캐러셀 달거나 할때, 임시로 놔둠
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  card: {
    display: 'flex'
  },
  cardDetails: {
    flex: 1
  }
});


const PostList = (props) => {
  const { classes } = props;

  return (
    <Grid container  spacing={40} className={classes.cardGrid}>
        <Grid item xs={12} md={12}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography variant="subtitle1" color="primary">
                  캐러셀, 공지사항
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
    </Grid>
  );
};

PostList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostList);