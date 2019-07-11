import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "store/modules/base";
import * as postActions from "store/modules/post";
import AskRemoveModal from "components/modal/AskRemoveModal";
import { withRouter } from "react-router-dom";

class AskRemoveModalContainer extends Component {
  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal("remove");
  };
  handleConfirm = async () => {
    const { match, PostActions,BaseActions,history } = this.props;
    const { id } = match.params;
    console.log('handleConfirm', id)

    try {
      await PostActions.deletePost(id);
      BaseActions.hideModal("remove");
      history.push(`/`);
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const { visible } = this.props;
    const { handleCancel, handleConfirm } = this;
    return (
      <AskRemoveModal
        visible={visible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    );
  }
}

export default connect(
  state => ({
    visible: state.base.getIn(["modal", "remove"]) //false받아옴 store/module/base에서
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(withRouter(AskRemoveModalContainer)); //라우트 쓴 이유가 history로 이동하려고.
