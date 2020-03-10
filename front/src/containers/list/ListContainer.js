import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as listActions from "store/modules/list";

import { PostList, Pagination } from "components/list";
import axios from "axios";

class ListContainer extends Component {
  getPostList = () => {
    const { ListActions, page, tag } = this.props;
    ListActions.getPostList({ tag, page });
  };

  componentDidMount() {
    this.getPostList();
  }
  componentWillMount() {}

  state = {};

  componentDidUpdate(prevProps, prevState) {
    // 페이지/태그가 바뀔 때 리스트를 다시 불러옵니다.
    if (
      prevProps.page !== this.props.page ||
      prevProps.tag !== this.props.tag
    ) {
      this.getPostList();
      document.documentElement.scrollTop = 0;
    }
  }

  render() {
    console.log(`마운트 된 후 값 : ${JSON.stringify(this.state)}`);
    const { page, tag, lastPage, posts, loading } = this.props;
    if (loading) return null; //로딩중엔 암것도 안보여줌
    return (
      <div>
        <PostList posts={posts} imgUrl={this.state} />
        <Pagination page={page} lastPage={lastPage} tag={tag} />
      </div>
    );
  }
}

export default connect(
  state => ({
    lastPage: state.list.get("lastPage"),
    posts: state.list.get("posts"),
    loading: state.pender.pending["list/GET_POST_LIST"]
  }),
  dispatch => ({
    ListActions: bindActionCreators(listActions, dispatch)
  })
)(ListContainer);

/* connect 내부는 아래처럼 생겼으니,,

  return (
            <WrappedComponent
              {…this.props}
              {…mapStateToProps(getState(), this.props)}
              {…mapDispatchToProps(dispatch, this.props)} />
          );


 =>즉, ListContainers 예를 적용하면, pageComponent에
  
  return(
    <ListContainers
      lastPage, posts, loading, ListActions           
    />
  );

  결국, 요런 꼴로 던지는게 된다!!!
*/
