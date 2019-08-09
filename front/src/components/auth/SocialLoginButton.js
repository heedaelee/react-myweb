import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { shadow } from "styles/styleUtils";

const Wrapper = styled.div`
  margin-top: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;

  background: ${oc.white};
  color: #000;

  text-align: center;
  font-size: 1rem;
  border: 1px solid #ccc;

  cursor: pointer;
  user-select: none;
  transition: 0.2s all;

  &:hover {
    background: ${oc.white[5]};
    ${shadow(0)}
  }

  &:active {
    background: ${oc.white[6]};
  }
`;
/* TODO naver,kakao 클릭 구현해야함 */
const AuthButton = ({ onSocialLogin }) => (
  <div>
    <Wrapper type="naver" onClick={onSocialLogin}>네이버로 로그인</Wrapper>
    <Wrapper type="facebook" onClick={onSocialLogin}>페이스북으로 로그인</Wrapper>
  </div>
);

export default AuthButton;
