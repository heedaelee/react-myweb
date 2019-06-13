import React, { Component } from "react";
import Post from "components/post/Post";
import * as postActions from "store/modules/post";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class PostContainer extends Component {
  initialize = async () => {
    const { PostActions, id } = this.props;
    try {
      await PostActions.getPost(id);
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.initialize();
  }

  render() {
    const { post, loading } = this.props;
    if(loading) return null;//loading 중일땐 안보여주기!
    
    
    const { title,body,tags,publishedDate } = post.toJS();
    
    return (
      <Post 
        title={title}
        body={body} 
        tags={tags}
        publishedDate={publishedDate}
      />
      );
  }
}

export default connect(
  (state) => ({
    post: state.post.get("post"),
    loading: state.pender.pending["post/GET_POST"]
  }),
  (dispatch) => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(PostContainer);
