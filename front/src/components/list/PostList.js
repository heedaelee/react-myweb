/* eslint-disable react/no-typos */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "@material-ui/core/Link";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

import moment from "moment";
import removeMd from "remove-markdown";

const styles = theme => ({
  card: {
    display: "flex",
    height: "170px",
    [theme.breakpoints.down("sm")]: {
      height: "170px",
      alignItems: "center",
      padding: theme.spacing.unit * 1
    }
  },
  cardDetails: {
    flex: 1
  },
  link: {
    color: "#2196f3",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    },
    marginRight: '7px',
  },
  cardMedia: {
    width: "160px",
    [theme.breakpoints.down("sm")]: {
      width: "120px",
      height: "120px"
    }
  },
  cardTitle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
      fontWeight: 700,
      wordBreak: "breakword",
      overFlowWrap: "breakword"
    }
  },
  cardDate: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem"
    }
  },
  cardContents: {
    [theme.breakpoints.down("sm")]: {}
  }
});

const PostItem = ({ id, title, body, tags, publishedDate, classes }) => {
  const tagList = tags.map(tag => {
    return (
      <Link key={tag} href={`/tag/${tag}`} className={classes.link}>
        #{tag}
      </Link>
    
    );
  });

  return (
    <Grid item key={id} xs={12} md={12}>
      <CardActionArea  href={`/post/${id}`}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image="https://source.unsplash.com/random"
            title="Image title"
          />
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography
                className={classes.cardTitle}
                component="h2"
                variant="h5"
              >
                {title}
              </Typography>
              <Typography
                className={classes.cardDate}
                variant="subtitle1"
                color="textSecondary"
              >
                {moment(publishedDate).format("ll")}
              </Typography>
              <Typography
                className={classes.cardContents}
                variant="subtitle1"
                paragraph
              >
                {removeMd(body)}
              </Typography>
              {tagList}
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

const PostList = props => {
  const { classes, posts } = props;
  const postList = posts.map(post => {
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
      />
    );
  });

  return (
    <Grid container spacing={40} className={classes.cardGrid}>
      {postList}
    </Grid>
  );
};

PostList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostList);
