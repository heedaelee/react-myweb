import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Button from "components/common/Button";
import React, { Component } from "react";
import { AuthError } from "components/auth";
import defaultThumbnail from "static/images/default_thumbnail.png";
import "./Profile.scss";
import storage from "lib/storage";

class Profile extends Component {
  //switch 버튼 social 값에 의해 변경 state
  state = {
    checkedA: false,
    checkedB: false,
    editing: false,
    username: ""
  };

  //componentDidUpdate와 setState 같이 쓰면, 업데이트 되고 setState땜에 리랜더링 되고
  //다시 값변하여 업데이트 인식되어 componentDidupdate 실행되고 또 setState 땜에 리랜더링..
  //이렇게 무한루프 됨
  componentDidMount() {
    console.log("componentDidMount 탄다", this.props.social);
    this.setState({ username: this.props.username });
    if (this.props.social) {
      if (this.props.social.facebook) {
        this.setState({ checkedA: true });
      }
      if (this.props.social.naver) {
        this.setState({ checkedB: true });
      }
    }
  }

  //생각해보니 thumbnail은 필요 없지. prevProps.thumbnail !==...
  //upload 로직에서 변경값 storage.set해주니까.
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.username !== this.props.username) {
      const { UserActions, id, username, thumbnail } = this.props; //user 리덕스에 변경값 덮어쓰기
      const loggedInfo = { id, username, thumbnail };
      try {
        UserActions.checkStatus();
        storage.set("loggedInfo", loggedInfo);
      } catch (e) {
        console.log(e);
      }
    }
  }

  onToggleEdit = e => {
    e.preventDefault();
    // console.log(`onToggleEdit탐`);
    const { error, setError,username } = this.props;
    if (error) setError(null);
    this.setState({
      editing: !this.state.editing,
      username:username
    });
  };

  //닉네임 변경, redux 없이 바로 비동기 서버 통신 axios 통해
  //리덕스 사용 안하니, update 이후 componentDidUpdate서
  //손수 state값 변경해줘야 함, 변경된 props값 가지고
  onSubmit = async () => {
    const { updateProfile, id } = this.props;
    console.log(`onSubmit의 username 값: ${this.state.username}`);
    const { username } = this.state;

    //같은 값으로 변경 클릭하면 수정 끝내기
    if (this.props.username === username) {
      this.setState({
        editing: false
      });
      return;
    }
    try {
      await updateProfile({
        id: id,
        username: username
      });
      this.setState({
        editing: false
      });
    } catch (e) {
      if (e.response.status === 409) {
        console.log(`e.response : ${JSON.stringify(e.response)}`);
        const { key } = e.response.data;
        const message = key === "username" ? "이미 존재하는 닉네임입니다" : "";
        return this.props.setError(message);
      }
    }
  };

  //리덕스 사용x, 현재 state 값 변경
  handleChange = e => {
    const { name, value } = e.target;
    console.log(`handlechange에서 name:${name} value: ${value}`);
    const { error, setError } = this.props;
    if (error) setError(null);
    this.setState({
      [name]: value
    });
  };

  render() {
    const {
      email,
      password,
      thoughtCount,
      thumbnail,
      onUploadThumbnail,
      onRemove,
      social,
      error
    } = this.props;
    console.log(`social : ${JSON.stringify(social)}`);

    const { editing, username } = this.state;
    console.log(`render()의 username : ${username}`);
    console.log(`render()의 error : ${error}`);
    console.log(`render()의 editing : ${editing}`);

    return (
      <div className="wrapper">
        <div className="header">
          <h2 className="title">프로필 관리</h2>
        </div>
        <div className="contents">
          <div className="thumbnail">
            <img
              className="img"
              src={
                thumbnail
                  ? thumbnail.includes("://")
                    ? thumbnail
                    : `${process.env.PUBLIC_URL}/tempfile/${thumbnail}`
                  : defaultThumbnail
              }
              /* src={ thumbnail
                ? `${process.env.PUBLIC_URL}/tempfile/${thumbnail}`
                : defaultThumbnail } 
              static asset 연결하기가 어려워 /public에 업로드 파일 위치시킴
              정적자원은 위처럼 env 사용하고 주소 걸어주면 됨
              */
              alt="thumbnail"
            />
            <Button onClick={onUploadThumbnail} theme="default">
              프로필 사진 변경
            </Button>
          </div>
          <div className="infor">
            <table className="table">
              <tbody>
                <tr>
                  <th>닉네임</th>
                  {editing ? (
                    <>
                      <td>
                        <TextField
                          onChange={this.handleChange}
                          name="username"
                          value={username}
                        />
                      </td>
                      <td className="right">
                        <Button onClick={this.onSubmit}>저장</Button>
                        <Button cancel onClick={this.onToggleEdit}>
                          취소
                        </Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td><strong>{username}</strong></td>
                      <td className="right">
                        <Button onClick={this.onToggleEdit}>닉네임 변경</Button>
                      </td>
                    </>
                  )}
                </tr>
                {/* 에러 표시 코드 */}
                {editing &&
                  (error && (
                    <tr>
                      <th />
                      <td colSpan="2">
                        {
                          <AuthError>
                            <div className="left">{error}</div>
                          </AuthError>
                        }
                      </td>
                    </tr>
                  ))}
                <tr>
                  <th>이메일</th>
                  <td>{email}</td>
                  <td />
                </tr>
                <tr>
                  <th>SNS 연동</th>
                  <td>페이스북 연동</td>
                  <td className="right">
                    <Switch
                      checked={this.state.checkedA}
                      value="checkedA"
                      color="primary"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </td>
                </tr>
                <tr>
                  <th />
                  <td>네이버 연동</td>
                  <td className="right">
                    <Switch
                      checked={this.state.checkedB}
                      value="checkedB"
                      color="primary"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>비밀번호</th>
                  <td>변경하기</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="leave">
            <Button onClick={onRemove}>서비스 탈퇴하기</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
