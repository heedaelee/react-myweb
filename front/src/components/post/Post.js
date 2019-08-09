import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import moment from "moment";
import MarkdownRender from "components/common/MarkdownRender";

const styles = theme => ({
  mainGrid: {
    marginTop: theme.spacing.unit * 3
  },
  appBarSpacer: theme.mixins.toolbar,
  postInfo: {
    marginBottom: "15px"
  },
  title: {
    fontSize: "2.7em",
    marginTop: "-105px",
    color: "#555555"
  },
  subText: {
    display: "flex",
    alignItems: "center",
    padding: "10px 0px"
  },
  tags: {
    fontSize: "1rem",
    fontWeight: "500",
    marginRight: "15px",
    color: "#74b9ff",
    "&:hover": {
      color: "#0984e3",
      cursor: "pointer",
      textDecoration: "underline"
    }
  },
  day: {
    color: "grey",
    fontSize: "1rem"
  },
});

class Post extends Component {
  render() {
    const { classes, title, body, tags, publishedDate } = this.props;

    //tags=[태그1,태그2,태그3]

    return (
      <Grid container spacing={40} className={classes.mainGrid}>
        <Grid item xs={12} md={12}>
          <div className={classes.appBarSpacer} />
          <div className={classes.postInfo}>
            <h1 className={classes.title}>{title}</h1>
            <Divider />
            <div className={classes.subText}>
              <div className={classes.tags}>
                {tags &&
                  tags.map(tag => (
                    <Link
                      key={tag}
                      to={`/tags/${tag}`}
                      className={classes.tags}
                    >
                      #{tag}
                    </Link>
                  ))}
              </div>
              <div className={classes.day}>
                {moment(publishedDate).format("ll")}
              </div>
            </div>
          </div>
          <div className={classes.body}>
            <MarkdownRender markdown={body} />
          </div>
        </Grid>
      </Grid>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Post);
