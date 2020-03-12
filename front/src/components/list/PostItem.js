import { makeStyles } from "@material-ui/styles";
import React from "react";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import removeMd from "remove-markdown";
import PostList from "./PostList";
import avatar from "static/images/avatar/1.jpg";

const useStyles = makeStyles(theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },

  link: {},
  cardMedia: { paddingTop: "56.25%" },
  cardTitle: {},
  cardDate: {},
  cardBodyText: { marginBottom: "0px" },
  profileLine: {
    paddingTop: "0",
    padding: "5%",
    display: "flex",
    alignItems: "center",
  },
  profileId:{
    marginLeft :'4%',
    fontWeight :"bold",
    fontSize : '1.1rem'
  }
}));

const PostItem = ({ id, title, body, tags, publishedDate, card }) => {
  const classes = useStyles();
  /* const tagList = tags.map(tag => {
    return (
      <Link key={tag} href={`/tag/${tag}`} className={classes.link}>
        #{tag}
      </Link>
    );
  }); */
  return (
    <Grid item key={card} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardActionArea
          onClick={() =>
            (window.location.href = `/post/${id}`)
          } /* href={`/post/${id}`} */
        >
          <CardMedia
            className={classes.cardMedia}
            image="https://source.unsplash.com/random"
            title="Image title"
          />
          <CardContent className={classes.cardContent}>
            <Typography
              className={classes.cardTitle}
              component="h2"
              variant="h5"
            >
              {/* {title} */}
              heading
            </Typography>
            <Typography
              className={classes.cardDate}
              variant="subtitle1"
              color="textSecondary"
            >
              {moment(publishedDate).format("ll")}
            </Typography>
            <Typography
              className={classes.cardBodyText}
              variant="subtitle1"
              paragraph
            >
              This is a media card. You can use this section to describe the
              content.
              {/* {removeMd(body)} */}
            </Typography>
            {/* {tagList} */}
          </CardContent>
        </CardActionArea>
        <div className={classes.profileLine}>
          <Avatar alt="Remy Sharp" src={avatar} className={classes.large} />
          <Typography className={classes.profileId} variant="button" >프로필ID</Typography>
        </div>
      </Card>
    </Grid>
  );
};

export default PostItem;
