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
    EditorActions.initialize();//store/modules/editor.js에서 Map({})객체를 state.set해서 초기화
    const {id} = queryString.parse(location.search);
    console.log(id);
    
    //id가 존재하는 경우 getPost
    if (id) {
      EditorActions.getPost(id);
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
        tags === "" ? [] : [...new Set(tags.split(',').map(tag => tag.trim()))]
    }; //태그 텍스트를 ,로 분리 
    // ex) 문자열 :'태그1,태그2,태그3' ->배열: [태그1,태그2,태그3]으로 쪼개는 과정 

    //view -> model sending
    try {
      const { id } = queryString.parse(location.search);
      //수정작업
      if (id) {
        await EditorActions.editPost({ id, ...post });
        history.push(`/post/${id}`);
        return;
      }
      await EditorActions.writePost(post);
      //async 함수는 동기화 시킬때 await 써줘야 함!!
      //postId는 상단에 레퍼런스 두지말고,
      //지금 받아야 write 직후 id 레퍼런스 제대로 받아옴
      history.push(`/post/${this.props.postId}`);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { handleGoBack, handleSubmit } = this;
    const {drawerToggle} = this.props;
    const { id } = queryString.parse(this.props.location.search);
    return (
      <EditorHeader
        onGoBack={handleGoBack}
        onSubmit={handleSubmit}
        drawerToggle={drawerToggle}
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
