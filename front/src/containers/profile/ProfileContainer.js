/* eslint-disable no-unused-expressions */
/* eslint-disable no-unreachable */
import React, { Component } from "react";
import Profile from "components/profile/Profile";
import * as profileActions from "store/modules/profile";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import storage from "lib/storage";

class ProfileContainer extends Component {
  initialize = async () => {
    const loggedInfo = storage.get("loggedInfo");
    console.log("initil", loggedInfo);
    const { ProfileActions } = this.props;

    try {
      await ProfileActions.getProfile(loggedInfo.username);
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.initialize();
  }

  render() {
    const { user, loading } = this.props;

    if (loading) return null;
    console.log(`user:${JSON.stringify(user)}`)
    const { profile, social, email, password, thoughtCount } = user;
    const { username, thumbnail } = profile;
    return (
      <Profile
        email={email}
        password={password}
        thoughtCount={thoughtCount}
        username={username}
        thumbnail={thumbnail}
        social={social}
      />
    );
  }
}

export default connect(
  state => ({
    user: state.profile.user,
    loading: state.pender.pending["profile/GET_PROFILE"]
  }),
  dispatch => ({
    ProfileActions: bindActionCreators(profileActions, dispatch)
  })
)(ProfileContainer);
