/* eslint-disable react/no-typos */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  cardGrid:{
    minHeight: '400px',
  },
  card: {
    display: "block",
    width: "100%"
  },
  cardTitle: {
    textAlign: "center",
    padding: theme.spacing.unit * 1
  },
  cardContent: {
    display: "block",
    padding: theme.spacing.unit * 1
  }
});

const TagTests = [
  {
    id: 1,
    tagName: "React"
  },
  {
    id: 2,
    tagName: "React"
  }
];

const Tag = props => {
  const { classes } = props;

  return (
    <Grid container className={classes.cardGrid}>
      <Card className={classes.card}>
        <Typography className={classes.cardTitle} variant="h5" color="primary">
          Tag
        </Typography>
        {TagTests.map(tag => (
          <CardContent key={tag.id} className={classes.cardContent}>
            <Typography align="center" variant="subtitle1" color="primary">
              {tag.tagName}
            </Typography>
          </CardContent>
        ))}
      </Card>
    </Grid>
  );
};

Tag.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Tag);