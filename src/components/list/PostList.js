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
  card: {
    display: 'flex'
  },
  cardDetails: {
    flex: 1
  }
});

const PostTests = [
  {
    id: 1,
    title: '제목 1',
    body: '내용 1111111',
    date: '2018-02-11'
  },
  {
    id: 2,
    title: '제목 2',
    body: '내용 222222',
    date: '2018-03-18'
  },
  {
    id: 3,
    title: '제목 3',
    body: '내용 222222',
    date: '2018-03-18'
  },
  {
    id: 4,
    title: '제목 4',
    body: '내용 222222',
    date: '2018-03-18'
  },
  {
    id: 5,
    title: '제목 5',
    body: '내용 222222',
    date: '2018-03-18'
  },
  {
    id: 6,
    title: '제목 6',
    body: '내용 222222',
    date: '2018-03-18'
  },
 
];

const PostList = (props) => {
  const { classes } = props;

  return (
    <Grid container spacing={40} className={classes.cardGrid}>
      {PostTests.map(post => (
        <Grid item key={post.id} xs={12} md={12}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  { post.title }
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  { post.date }
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  { post.body }
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  자세히 보기
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

PostList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostList);