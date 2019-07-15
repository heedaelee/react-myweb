import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "store/modules/base";
import * as profileActions from "store/modules/profile";

import AskRemoveModal from "components/modal/AskRemoveModal";
import { withRouter } from "react-router-dom";
import storage from 'lib/storage'

class unregisterModalContainer extends Component {
  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal("unregister");
  };
  handleConfirm = async () => {
    const { user, ProfileActions, BaseActions, history } = this.props;
    const { username } = user.loggedInfo;
    console.log("unregisterContainer username : ", username);
    try {
      await ProfileActions.unregister(username);
      BaseActions.hideModal("unregister");
      storage.clear();
      window.location.href = '/';
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const { type } = this.props;
    console.log(`타임 : ${type}`);

    const { handleCancel, handleConfirm } = this;
    return (
      <AskRemoveModal
        type={type}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    );
  }
}

export default connect(
  state => ({
    type: state.base.modal, //false받아옴 store/module/base에서
    user: state.user
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ProfileActions: bindActionCreators(profileActions, dispatch)
  })
)(withRouter(unregisterModalContainer)); //라우트 쓴 이유가 history로 이동하려고.
