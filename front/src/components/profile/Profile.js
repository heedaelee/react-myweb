import React, { Component } from "react";
import Button from "components/common/Button";
import "./Profile.scss";
import defaultThumbnail from "static/images/default_thumbnail.png";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

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
    console.log("탄다", this.props.social);
    this.setState({ username: this.props.username });
    if (this.props.social.facebook) {
      this.setState({ checkedA: true });
    }
    if (this.props.social.naver) {
      this.setState({ checkedB: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  onToggleEdit = e => {
    e.preventDefault();
    console.log(`onToggleEdit탐`);
    this.setState({
      editing: !this.state.editing
    });
  };

  //닉네임 변경, redux 없이 바로 비동기 서버 통신 axios 통해
  onSubmit = () => {};

  handleChange = e => {
    const {onChange} = this.props
    const {name, value} = e.target
    console.log(`handlechange에서 name:${name} value: ${value}`)
    onChange({name,value})
  };

  render() {
    const {
      email,
      password,
      thoughtCount,
      thumbnail,
      onUploadThumbnail,
      onRemove,
      social
    } = this.props;
    console.log(`social : ${JSON.stringify(social)}`);

    const { editing, username } = this.state;
    console.log(`render()의 username : ${username}`);

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
            <strong className="username">{username}</strong>
            <Button onClick={onUploadThumbnail} theme="default">
              프로필 사진 변경
            </Button>
          </div>
          <div className="infor">
            <table className="table">
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
                    <td>{username}</td>
                    <td className="right">
                      <Button onClick={this.onToggleEdit}>닉네임 변경</Button>
                    </td>
                  </>
                )}
              </tr>
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
            </table>
          </div>
          <Button onClick={onRemove} className="leave">
            서비스 탈퇴하기
          </Button>
        </div>
      </div>
    );
  }
}

export default Profile;
