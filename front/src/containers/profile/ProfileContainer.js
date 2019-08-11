/* eslint-disable no-unused-expressions */
/* eslint-disable no-unreachable */
import React, { Component } from "react";
import Profile from "components/profile/Profile";
import * as profileActions from "store/modules/profile";
import * as userActions from "store/modules/user";
import * as baseActions from "store/modules/base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import storage from "lib/storage";

class ProfileContainer extends Component {
  initialize = async () => {
    const loggedInfo = storage.get("loggedInfo");
    console.log("ProfileContainer/initialize method loggedInfo: ", loggedInfo);
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

  /* componentDidUpdate(prevProps) {
    if(!prevProps) props 값 바뀌면 this.initialize
  } */

  //test
  escapeForUrl = text => {
    return text
      .replace(
        /[^0-9a-zA-Zㄱ-힣.\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf -]/g,
        ""
      )
      .replace(/ /g, "-")
      .replace(/--+/g, "-");
  };

  uploadFile = async data => {
    const file = data.get("file");
    console.log(file);
    if (file.size > 1024 * 1024 * 10) return;
    const fileTypeRegex = /^image\/(.*?)/;
    if (!fileTypeRegex.test(file.type)) return;
    if (file.type.indexOf("gif") > 0) return;
    //file.path를 createreadStream 에 던져줘야 하는데
    //아무래도 form 형식이 아니라 input만 만들어 던지니 .path가 제공 안되는 느낌임
    //좀 연구해보고 form 형식으로 던져야 될듯.
    //벨로파트는 아마 fs 객체를 안쓰니 path 자체가 필요 없었을듯 aws s3객체니깐..

    try {
      console.log(`data => ${data}`);
      const { ProfileActions } = this.props;
      await ProfileActions.uploadThumbnail(data);
      console.log(`in 프로필컨테이너 imgName: ${this.props.profile.imgName}`);
      if (!this.props.profile.imgName) return;
      const imgName = this.props.profile.imgName;

      //사진 서버 저장 후 프로필 변경해주기
      await ProfileActions.updateProfile({
        id: this.props.profile.user._id,
        // username: this.props.profile.user.profile.username,
        thumbnail: imgName
      });

      const { loggedInfo } = this.props.user;
      const { UserActions } = this.props;
      await UserActions.checkStatus();
      storage.set("loggedInfo", loggedInfo);
    } catch (e) {
      console.log(e);
    }
  };

  onUploadThumbnail = async () => {
    const upload = document.createElement("input");
    upload.type = "file";
    //파일 선택후 확인 누르면 onChange 적용
    upload.onchange = e => {
      if (!upload.files) return;
      let data = new FormData();
      const files = e.target.files;
      const fileToUpload = files[0];
      data.append("file", fileToUpload); //input 태그 넣음
      this.uploadFile(data);
    };
    //클릭 이벤트 실행=> 파일 선택창 뜸
    upload.click();
  };

  //핸들링 함수 차이 알아보기
  handleRemoveMember = () => {
    console.log("프로필컨테이너 handleRemoveMember");
    const { BaseActions } = this.props;
    BaseActions.showModal("unregister");
  };

  render() {
    const { loading, UserActions } = this.props;
    const { updateProfile } = this.props.ProfileActions;
    if (loading) return null;
    const {
      profile,
      social,
      email,
      password,
      thoughtCount,
      _id: id
    } = this.props.profile.user;
    const { username, thumbnail } = profile;
    console.log("profile : " + JSON.stringify(profile));
    return (
      <Profile
        email={email}
        password={password}
        thoughtCount={thoughtCount}
        username={username}
        thumbnail={thumbnail}
        social={social}
        onUploadThumbnail={this.onUploadThumbnail}
        onRemove={this.handleRemoveMember}
        updateProfile={updateProfile}
        id={id}
        UserActions={UserActions}
      />
    );
  }
}

export default connect(
  state => ({
    //user: state.profile.user, //{profile{},social{}}
    //imgName: state.profile.imgName,
    profile: state.profile,
    //auth: state.user, //이름변경 auth ->user로
    user: state.user,
    loading: state.pender.pending["profile/GET_PROFILE"]
  }),
  dispatch => ({
    ProfileActions: bindActionCreators(profileActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(ProfileContainer);
