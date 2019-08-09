import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "store/modules/base";
import * as userActions from "store/modules/user";
import storage from "lib/storage";

class Base extends Component {
  initializeUserInfo = async () => {
    const loggedInfo = storage.get("loggedInfo"); //로그인 정보를 로컬 스토리지에서 가져옵니다.
    if (!loggedInfo) {
      console.log("로그인 정보 없음");
      return;
    } //로그인 정보가 없다면 여기서 멈춤

    const { UserActions } = this.props;
    UserActions.setLoggedInfo(loggedInfo); //store에 login 정보 저장
    try {
      await UserActions.checkStatus();
    } catch (e) {
      storage.remove("loggedInfo");
      window.location.href = "/auth/login?expired";
    }
  };

  componentDidMount() {
    this.initializeUserInfo();
  }
  render() {
    return <div />;
  }
}

export default connect(
  state => ({
    user: state.loggedInfo
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(Base);
