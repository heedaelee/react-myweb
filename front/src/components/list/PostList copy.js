/* eslint-disable react/no-typos */
import React, { Component } from "react";
import PropTypes from "prop-types";

import PostItem from "./PostItem";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
});

const PostList = props => {
  const { classes, posts, imgUrl } = props;
  console.log(`PostList에서 imgUrl : ${imgUrl}`);
  const postList = posts.map((post, i) => {
    const { _id, title, body, publishedDate, tags } = post.toJS();
    return (
      <PostItem
        id={_id}
        key={_id}
        title={title}
        body={body}
        publishedDate={publishedDate}
        tags={tags}
        classes={classes}
        img={imgUrl[i]}
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
