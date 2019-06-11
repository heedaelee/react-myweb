import React, { Component } from "react";
import EditorHeader from "components/editor/EditorHeader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import * as editorActions from "store/modules/editor";

class EditorHeaderContainer extends Component {
  componentDidMount() {
    const { EditorActions, location } = this.props;
    //초기화
    EditorActions.initialize();
    const id = queryString.parse(location.search);

    //id가 존재하는 경우 getPost
    if (id) {
      EditorActions.getPost(id);
      return;
    }
  }

  handleGoBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  //handelSubmit  중요, 복습 철저
  handleSubmit = async () => {
    const {
      title,
      markdown,
      tags,
      EditorActions,
      history,
      location
    } = this.props;

    const post = {
      title,
      body: markdown,
      tags:
        tags === "" ? [] : [...new Set(tags.split(",").map(tag => tag.trim()))]
    }; //태그 텍스트를 ,로 분리

    //view -> model sending
    try {
      const { id } = queryString.parse(location.search);
      //수정작업
      if (id) {
        EditorActions.editPost({ id, ...post });
        history.push(`/post/${id}`);
        return;
      }
      EditorActions.writePost(post);
      //postId는 상단에 레퍼런스 두지말고,
      //지금 받아야 write 직후 id 레퍼런스 제대로 받아옴
      history.push(`/post/${this.props.postId}`);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { handleGoBack, handleSubmit } = this;
    const { id } = queryString.parse(this.props.location.search);
    return (
      <EditorHeader
        onGoBack={handleGoBack}
        onSubmit={handleSubmit}
        isEdit={id ? true : false}
      />
    );
  }
}

export default connect(
  state => ({
    title: state.editor.get("title"),
    markdown: state.editor.get("markdown"),
    tags: state.editor.get("tags"),
    postId: state.editor.get("postId")
  }),
  dispatch => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
  })
)(withRouter(EditorHeaderContainer));
