import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "store/modules/base";

import LoginModal from "components/modal/LoginModal";
import { async } from "rxjs/internal/scheduler/async";

class LoginModalContainer extends Component {
  handleLogin = async () => {
    const { BaseActions, password } = this.props;
    try {
      await BaseActions.login(password);
      BaseActions.hideModal('login');
      localStorage.logged = "true";
    } catch (e) {
      console.log(e);
    }
  };
  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal("login");
  };

  handleChnage = e => {
    const { BaseActions } = this.props;
    const { value } = e.target;
    BaseActions.changePasswordInput(value);
  };

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.handleLogin();
    }
  };

  render() {
    const { handleLogin, handleCancel, handleChnage, handleKeyPress } = this;
    const { visible, password, error } = this.props;

    return (
      <LoginModal
        onLogin={handleLogin}
        onCancel={handleCancel}
        onChange={handleChnage}
        onKeyPress={handleKeyPress}
        visible={visible}
        password={password}
        error={error}
      />
    );
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(["modal", "login"]),
    password: state.base.getIn(["loginModal", "password"]),
    error: state.base.getIn(["loginModal", "error"])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(LoginModalContainer);
