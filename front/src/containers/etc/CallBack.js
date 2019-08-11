import React, { Component } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import storage from "lib/storage";
import * as userActions from "store/modules/user";
import * as authActions from "store/modules/auth";
import BadRequest from "pages/errors/BadRequest";
import { bindActionCreators } from "redux";

class CallBack extends Component {
  state = {
    badRequest: false
  };

  initialize = async () => {
    const query = queryString.parse(this.props.location.search);
    const { type, key, next } = query;
    const { AuthActions, UserActions } = this.props;
    if (!type || !key) {
      // error
      this.setState({
        badRequest: true
      });
      return;
    }
    //api키 =>jwt hash화 토큰 해서 가져오기
    try {
      /*await AuthActions.getProviderToken({
        type,
        key
      });*/

      // register logic
      /* const { token } = this.props.tokenData; */ //해쉬화 된 토큰(sns id)
      // if (!token) return;
      const token = key;
      const socialPayload = {
        accessToken: token,
        provider: type
      };
      await AuthActions.verifySocial(socialPayload);
      if (!this.props.verifySocialResult) {
        throw new Error();
      }

      // login if account already exists
      if (this.props.verifySocialResult.exists) {
        await AuthActions.socialLogin(socialPayload);
        if (!this.props.authResult) return;
        const { loggedInfo } = this.props.authResult;

        console.log("로컬에 소셜 로그인 후 set", loggedInfo);
        storage.set("loggedInfo", loggedInfo); //1. 로컬 스토리지에 save
        UserActions.setLoggedInfo(loggedInfo); //2. 내부 스토어 state 저장
        UserActions.setValidated(true);

        this.props.history.push("/");
        return;
      }

      //id,thumbnail,email,name,exists
      const { id, thumbnail, email, name } = this.props.verifySocialResult;
      const provider = type;
      const username = name;
      await AuthActions.socialRegister({
        id,
        thumbnail,
        email,
        username,
        type,
        token,
        provider
      });
      console.log(
        `[front / src ... callback authResult : ${this.props.authResult}]`
      );
      const { loggedInfo } = this.props.authResult;

      console.log("로컬에 소셜 회원가입 후 set", loggedInfo);
      storage.set("loggedInfo", loggedInfo); //1.로컬스토리지 save
      UserActions.setLoggedInfo(loggedInfo); //2.내부 스토어 state 저장
      UserActions.setValidated(true);

      this.props.history.push("/"); //회원가입 성공시 홈페이지로 이동
    } catch (e) {
      //에러 처리하기
      console.log(`e:${e}`);
      this.setState({
        badRequest: true
      });
    }
  };

  componentDidMount() {
    this.initialize();
  }

  render() {
    if (this.state.badRequest) {
      return <BadRequest />;
    }
    return null;
  }
}

export default connect(
  state => ({
    tokenData: state.auth.tokenData,
    verifySocialResult: state.auth.verifySocialResult,
    /*
      id,thumbnail,email,name,exists
    */
    authResult: state.auth.authResult
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(CallBack);
