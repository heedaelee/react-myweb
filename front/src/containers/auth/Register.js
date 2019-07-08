import React, { Component } from "react";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
  AuthError
} from "components/auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "store/modules/auth";
import { isEmail, isLength, isAlphanumeric } from "validator";
import debounce from "lodash/debounce";
import * as userActions from 'store/modules/user'
import storage from 'lib/storage'

class Register extends Component {
  setError = message => {
    const { AuthActions } = this.props;
    AuthActions.setError({
      form: "register",
      message
    });
  };

  validate = {
    email: value => {
      if (!isEmail(value)) {
        this.setError("잘못된 이메일 형식입니다.");
        return false;
      }
      return true;
    },
    username: value => {
      if (!isAlphanumeric(value) || !isLength(value, { min: 4, max: 15 })) {
        this.setError(
          "아이디는 4~15자 사이의 알파벳 혹은 숫자로 이루어져야 합니다."
        );
        return false;
      }
      return true;
    },
    password: value => {
      if (!isLength(value, { min: 6 })) {
        this.setError("비밀번호는 최소 6자 이상 이어야 합니다.");
        return false;
      }
      this.setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다.
      return true;
    },
    passwordConfirm: value => {
      if (this.props.form.password !== value) {
        this.setError("비밀번호가 일치하지 않습니다.");
        return false;
      }
      this.setError(null);
      return true;
    }
  };

  checkEmailExists = debounce(async email => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkEmailExists(email);
      console.log(this.props.exists.email);
      this.props.exists.email
        ? this.setError("이미 존재하는 아이디입니다.")
        : this.setError(null);
    } catch (e) {
      console.log(e);
    }
  }, 300);

  checkUsernameExists = debounce(async username => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkUsernameExists(username);

      this.props.exists.username
        ? this.setError("이미 존재하는 아이디입니다.")
        : this.setError(null);
    } catch (e) {
      console.log(e);
    }
  }, 300);

  handleChange = e => {
    const { AuthActions } = this.props;
    const { name, value } = e.target;

    AuthActions.changeInput({
      form: "register",
      name,
      value
    });

    //검증작업 진행
    const validation = this.validate[name](value);
    if (name.indexOf("password") > -1 || !validation) return; //비밀번호 검증이거나 검증실패시 return,여기서 마침

    // TO DO 이메일, 아이디 중복 확인
    const check =
      name === "email" ? this.checkEmailExists : this.checkUsernameExists; //name에 따라 email or id 체크
    check(value);
  };

  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm("register");
  }

  handleLocalRegister = async () => {
    const { form, AuthActions, UserActions, error, history } = this.props;
    const { email, username, password, passwordConfirm } = form;

    const { validate } = this;

    if (error) return; //현재 에러가 있는 상태라면 진행하지 않음
    if (
      !validate["email"](email) ||
      !validate["username"](username) ||
      !validate["password"](password) ||
      !validate["passwordConfirm"](passwordConfirm)
    ) {
      //하나라도 실패하면 진행하지 않음
      return;
    }

    try {
      await AuthActions.localRegister({
        email,
        username,
        password
      });
      const loggedInfo = this.props.result;
      
      console.log('로컬에 set',loggedInfo);
      // TODO : 로그인 정보 저장 (로컬스토리지/스토어)
      storage.set('loggedInfo', loggedInfo) //1.로컬스토리지 save
      UserActions.setLoggedInfo(loggedInfo) //2.내부 스토어 state 저장
      UserActions.setValidated(true)

      history.push("/"); //회원가입 성공시 홈페이지로 이동
    } catch (e) {
      //에러 처리하기
      if (e.response.status === 409) {
        const { key } = e.response.data;
        const message =
          key === "email"
            ? "이미 존재하는 이메일입니다."
            : "이미 존재하는 아이디입니다.";
        return this.setError(message);
      }
      this.setError("알 수 없는 에러가 발생했습니다.");
    }
  };

  render() {
    const { email, username, password, passwordConfirm } = this.props.form;
    const { error } = this.props;
    const { handleChange, handleLocalRegister } = this;

    return (
      <AuthContent title="회원가입">
        <InputWithLabel
          label="이메일"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={handleChange}
        />
        <InputWithLabel
          label="아이디"
          name="username"
          placeholder="아이디"
          value={username}
          onChange={handleChange}
        />
        <InputWithLabel
          label="비밀번호"
          name="password"
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={handleChange}
        />
        <InputWithLabel
          label="비밀번호확인"
          name="passwordConfirm"
          placeholder="비밀번호확인"
          type="password"
          value={passwordConfirm}
          onChange={handleChange}
        />
        {error && <AuthError>{error}</AuthError>}
        <AuthButton onClick={handleLocalRegister}>회원가입</AuthButton>
        <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
      </AuthContent>
    );
  }
}

export default connect(
  state => ({
    form: state.auth.register.form,
    error: state.auth.register.error,
    exists: state.auth.register.exists,
    result: state.auth
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(Register);
