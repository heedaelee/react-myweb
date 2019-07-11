import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { 
  Homepage, 
  Editorpage, 
  Postpage, 
  Auth,
  Profilepage 
} from "pages";
import NotFoundpage from "components/notFoundPage/NotFoundpage";

import storage from "lib/storage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "store/modules/user";
import Base from "containers/common/Base";


class App extends Component {
  initializeUserInfo = async () => {
    const loggedInfo = storage.get("loggedInfo"); //로그인 정보를 로컬 스토리지에서 가져옵니다.
    if (!loggedInfo) {
      console.log("로그인 정보 없음");
      return;
    } //로그인 정보가 없다면 여기서 멈춤

    const { UserActions } = this.props;
    UserActions.setLoggedInfo(loggedInfo);//store에 login 정보 저장
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
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/page/:page" component={Homepage} />
          <Route exact path="/tag/:tag/:page?" component={Homepage} />
          {/* page default = 1 설정되서 값 없이 걸려도 괜찮음 */}
          <Route path="/post/:id" component={Postpage} />
          <Route path="/editor" component={Editorpage} />
          <Route path="/auth" component={Auth} />
          <Route path="/profile" component={Profilepage} />
          <Route component={NotFoundpage} />
        </Switch>
        <Base />{/* 일단 보류, base로 전역 거는것 */}
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(App);
