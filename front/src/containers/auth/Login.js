import React, { Component } from "react";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
  AuthError,
  SocialLoginButton
} from "components/auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "store/modules/auth";
import * as userActions from "store/modules/user";
import storage from 'lib/storage'
import queryString from 'query-string'

class Login extends Component {

  componentDidMount (){
    const { location } = this.props
    const query = queryString.parse(location.search)

    if(query.expired !== undefined) {
      this.setError('세션에 만료되었습니다. 다시 로그인해주세요')
    }
  }

  handleChange = e => {
    const { AuthActions } = this.props;
    const { name, value } = e.target;

    AuthActions.changeInput({
      form:'login',
      name,
      value
    });
  };

  handleKeyDown = (e) => {
    e.key === 'Enter' && this.handleLocalLogin()
  }
  
  componentWillUnmount (){
    const {AuthActions} = this.props
    AuthActions.initializeForm ('login')
  }

  setError = (message) => {
    const { AuthActions } = this.props;
    AuthActions.setError({
      form: 'login',
      message
    })
    return false;
  }

  handleLocalLogin = async () => {
    const { form, AuthActions, UserActions, history } = this.props;
    const { email, password } = form
    try{
      await AuthActions.localLogin({email, password})//1.서버api 통신
      const loggedInfo = this.props.result

      UserActions.setLoggedInfo(loggedInfo)//2.내부 스토어 통신
      history.push('/')//비동기!! so unblocking
      storage.set('loggedInfo', loggedInfo) //3.스토리지 기록

    }catch (e) {
      console.log(e);
      this.setError('잘못된 계정정보입니다.')
    }
  }

  onSocialLogin = async e => {
    
    const provider = e.target.getAttribute('type')
    
    if(provider === 'facebook'){
      console.log(provider) //config 에서 env.js 에서 APIhost 값을 http://localhost:4000 으로 두면 좋은데 웹팩이라 일단 스킵
      const facebookLogin = `http://localhost:4000/api/auth/callback/facebook/login`
      window.location.replace(facebookLogin);
    }
  }

  render() {
    const { handleChange, handleLocalLogin, handleKeyDown, onSocialLogin } = this;
    const { email, password } = this.props.form;
    const { error } = this.props

    return (
      <AuthContent title="로그인">
        <InputWithLabel
          label="이메일"
          name="email"
          value={email}
          placeholder="* 이메일을 입력해주세요"
          onChange={handleChange}
        />
        <InputWithLabel
          label="비밀번호"
          name="password"
          value={password}
          placeholder="* 비밀번호를 입력해주세요"
          onChange={handleChange}
          type="password"
          onKeyDown = {handleKeyDown}
        />
        {
         error && <AuthError>{error}</AuthError> 
        }
        <AuthButton  onClick={handleLocalLogin}>로그인</AuthButton>
        <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
        <SocialLoginButton onSocialLogin={onSocialLogin}/>{/* TODO naver, kakao handleLocal 연결해야함 */}
      </AuthContent>
    );
  }
}

export default connect(
  state => ({
    form: state.auth.login.form,
    error: state.auth.login.error,
    result: state.auth.result
  }),//mapStateToProps
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  }) //mapDispatchToProps
)(Login);
