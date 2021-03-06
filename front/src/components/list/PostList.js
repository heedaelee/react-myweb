/* eslint-disable react/no-typos */
import React, { Component } from "react";
import PropTypes from "prop-types";

import PostItem from "./PostItem";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1)
  }
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const PostList = props => {
  const { classes, posts, imgUrl } = props;
  console.log(`PostList에서 imgUrl : ${imgUrl}`);
  const postList = cards.map(card => {  
    return (
      <PostItem
        card={card}
        // key={_id}
        // title={title}
        // body={body}
        // publishedDate={publishedDate}
        // tags={tags}
        // classes={classes}
        // img={imgUrl[i]}
      />
    );
  });

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {postList}
      </Grid>
    </Container>
  );
};

PostList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostList);
