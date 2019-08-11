import { createAction, handleActions } from "redux-actions";

import * as AuthAPI from "lib/api/auth";
import { pender } from "redux-pender";
import produce from "immer";

const SET_LOGGED_INFO = "user/SET_LOGGED_INFO"; // 로그인 정보 설정
const SET_VALIDATED = "user/SET_VALIDATED"; //validated 값 설정
const LOGOUT = "user/LOGOUT"; //로그아웃
const CHECK_STATUS = "user/CHECK_STATUS"; //현재 로그인 상태 확인

export const setLoggedInfo = createAction(SET_LOGGED_INFO); //loggedInfo
export const setValidated = createAction(SET_VALIDATED); //validated
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const checkStatus = createAction(CHECK_STATUS, AuthAPI.checkStatus);

const initialState = {
  loggedInfo: {
    //현재 로그인중인 유저의 정보
    id: "",
    thumbnail: null,
    username: null
  },
  logged: false, //현재 로그인중인지 알려준다
  validated: false // 이 값은 현재 로그인 중인지 아닌지 한번 서버측에 검증했음을 의미
};

export default handleActions(
  {
    [SET_LOGGED_INFO]: (state, action) =>
      produce(state, draft => {
        draft.loggedInfo = action.payload; //payload:{id:...,thum..: , username: }
        draft.logged = true;
      }),
    [SET_VALIDATED]: (state, action) =>
      produce(state, draft => {
        draft.validated = action.payload;
      }),
    ...pender({
      type: CHECK_STATUS,
      onSuccess: (state, action) =>
        produce(state, draft => {
          /* 서버에서 체크만 하지 꼭 user 데이터를 갖고와 사용할 필요는없음
          localStorage 보고 loggedInfo 를 redux에 set했는데 또 중복 작업 되니까.
          그래서 데이터 처리 로직은 주석 처리 함
          수정 : 자료 덮어 써야 겠음. 서버 수정하면 로컬과 달라질수도..
          db가 아니라 request 에서 가져옴.
          */
          const { _id: id, profile } = action.payload.data.user; //return {user:}
          const { thumbnail, username } = profile;
          draft.loggedInfo = { id, thumbnail, username };
          draft.validated = true;
        }),
      onFailure: (state, action) => initialState
    })
  },
  initialState
);
