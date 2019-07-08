import React, { Component } from "react";
import Header from "components/common/Header";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "store/modules/user";
import storage from "lib/storage";

class HeaderContainer extends Component {
  handleLoginClick = async () => {
    const { UserActions, user } = this.props;
    const { logged, loggedInfo } = user;
    const { thumbnamil, username } = loggedInfo;

    console.log(logged);
    if (logged) { //로그아웃
      try {
        await UserActions.logout();
        storage.remove("loggedInfo");
        window.location.href = "/"; //홈으로
        return;
      } catch (e) {
        console.log(e);
      }
    }
    window.location.href = "/auth/login";
  };
  handleRemove = () => {
    const { BaseActions } = this.props;
    BaseActions.showModal("remove");
  };

  render() {
    const { handleRemove, handleLoginClick } = this;
    const { match, user } = this.props;
    const { id } = match.params;

    return (
      <Header
        postId={id}
        user={user}
        onRemove={handleRemove}
        onLoginClick={handleLoginClick}
      />
    );
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(withRouter(HeaderContainer));
