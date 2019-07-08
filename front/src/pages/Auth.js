import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'store/modules/base'
import { AuthWrapper } from 'components/auth'
import { Route } from 'react-router-dom';
import { Login, Register } from 'containers/auth';

class Auth extends Component {
  /*만약에  페이지에 진입 할 때 헤더 비활성화 하려면 
    componentWillMount() {
        this.props.BaseActions.setHeaderVisibility(false);
    }
    페이지 벗어날 때 다시 활성화 하려면 
    componentWillUnmount() {
        this.props.BaseActions.setHeaderVisibility(true);
    }
  */
  render(){
    return (
      <AuthWrapper>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/register" component={Register} />
      </AuthWrapper>
    )
  }
}

export default connect(
  (state) => ({

  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Auth);