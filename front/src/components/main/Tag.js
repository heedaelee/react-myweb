/* eslint-disable react/no-typos */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "@material-ui/core/Link";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

//테스트
const styles = theme => ({
  cardGrid: {
    minHeight: "400px",
    textAlign: "center"
  },
  card: {
    display: "block",
    width: "100%"
  },
  cardTitle: {
    padding: theme.spacing(1),
    marginBottom: "1rem",
    color: theme.palette.primary.main
  },
  cardContent: {
    display: "block",
    padding: theme.spacing(1)
  },
  link: {
    color: "#2196f3",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    },
    textAlign: "center"
  }
});

class Tag extends Component {
  //태그 axios 통해 바로 비동기로 갖고옴
  getTags = () => axios.get(`/api/posts/tags`);
  componentDidMount() {
    console.log("마운트된 후 Tag.js 탐");
    this.getTags().then(response => {
      let TagTest = response.data.map((x, i) => ({
        id: i,
        tagName: x
      }));
      //console.log(`태테 : ${JSON.stringify(TagTest)}`);
      this.setState({ TagTest: TagTest });
    });
  }
  state = { TagTest: [] };

  render() {
    //console.log(`this.state : ${JSON.stringify(this.state)}`);

    const { classes } = this.props;
    const { TagTest } = this.state;

    return (
      <Grid container className={classes.cardGrid}>
        <Card className={classes.card}>
          <Typography className={classes.cardTitle} variant="h5">
            Tag
          </Typography>
          {TagTest.map(tag => (
            <CardContent key={tag.id} className={classes.cardContent}>
              <Link
                key={tag.id}
                href={`/tag/${tag.tagName}`}
                className={classes.link}
              >
                #{tag.tagName}
              </Link>
            </CardContent>
          ))}
        </Card>
      </Grid>
    );
  }
}

Tag.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Tag);
