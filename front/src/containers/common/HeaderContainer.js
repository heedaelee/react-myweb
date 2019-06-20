import React, {Component} from 'react';
import Header from 'components/common/Header';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

class HeaderContainer extends Component {
handleLoginClick = async () => {
  const { BaseActions, logged} = this.props;
  if(logged){
    try{
      await BaseActions.logout();
      window.location.reload();//페이지 새로고침
    }catch(e) {
      console.log(e);
    }
    return;
  }
  BaseActions.showModal('login');
  BaseActions.initializeLoginModal();
}
  handleRemove = () => {
    const { BaseActions } = this.props;
    BaseActions.showModal('remove');
  }

  render(){
    const { handleRemove, handleLoginClick } = this;
    const {match, logged} = this.props; //나중에 logged 가져와야 함
    const { id }= match.params;

    return(
      <Header 
        postId={id}
        logged={logged} 
        onRemove={handleRemove}
        onLoginClick={handleLoginClick}
      />
    );
  }
}

export default connect(
  (state) => ({
    logged: state.base.get('logged')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(HeaderContainer))