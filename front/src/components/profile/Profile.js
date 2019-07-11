import React, { Component } from "react";
import Button from "components/common/Button";
import "./Profile.scss";
import defaultThumbnail from "static/images/default_thumbnail.png";

class Profile extends Component {
  render() {
    const { email, password, thoughtCount, username, thumbnail } = this.props;

    return (
      <div className="wrapper">
        <div className="header">
          <h2 className="title">프로필 관리</h2>
        </div>
        <div className="contents">
          <div className="thumbnail">
            <img
              className="img"
              src={thumbnail || defaultThumbnail}
              alt="thumbnail"
            />
            <strong className="username">{username}</strong>
            <Button theme="outline">프로필 사진 변경</Button>
          </div>
          <div className="infor">
            <table className="table">
              <tr>
                <th>닉네임</th>
                <td>{username}</td>
                <td>변경하기</td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>{email}</td>
                <td />
              </tr>
              <tr>
                <th>SNS 연동</th>
                <td>네이버 연동</td>
                <td>버튼</td>
              </tr>
              <tr>
                <th />
                <td>카카오 연동</td>
                <td>버튼</td>
              </tr>
              <tr>
                <th>비밀번호</th>
                <td>변경하기</td>
              </tr>
            </table>
          </div>
          <Button to="/탈퇴" className="leave">
            서비스 탈퇴하기
          </Button>
        </div>
      </div>
    );
  }
}

export default Profile;
