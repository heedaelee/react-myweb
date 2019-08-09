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
  componentWillMount() {
    console.log(`마운트전 : ${this.getImageUrl()}`);
  }

  //unplash 랜덤 이미지 가져오기
  getImageUrl = () => {
    axios
      .get(
        `https://api.unsplash.com/photos/random?client_id=6cc4985ca5efc8f8712fe98bc39d5209aa4c89c1387732976d1c8dbcd7297130&count=10`
      )
      .then(response => {
        //console.log("배열체크 : " + response.data);
        let imgArray = response.data.map(x => x.urls.small);
        this.setState(imgArray);
      });
  };

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
