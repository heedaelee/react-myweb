import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import * as AuthApi from "lib/api/auth";

import produce from "immer";

const CHANGE_INPUT = "auth/CHANGE_INPUT"; //input 값 변경
const INITIALIZE_FORM = "auth/INITIALIZE_FORM"; // form 초기화

const CHECK_EMAIL_EXISTS = "auth/CHECK_EMAIL_EXISTS"; //이메일 중복확인
const CHECK_USERNAME_EXISTS = "auth/CHECK_USERNAME_EXISTS"; //아이디 중복 확인

const LOCAL_REGISTER = "auth/LOCAL_REGISTER" //이메일 가입
const LOCAL_LOGIN = "auth/LOCAL_LOGIN" //이메일 로그인

const LOGOUT = 'auth/LOGOUT' //로그아웃

const SET_ERROR = 'auth/SET_ERROR' //에러 메시지 설정

export const changeInput = createAction(CHANGE_INPUT); // param : {form, name, value}
export const initializeForm = createAction(INITIALIZE_FORM); // param : form

export const checkEmailExists = createAction(CHECK_EMAIL_EXISTS, AuthApi.checkEmailExists);
export const checkUsernameExists = createAction(CHECK_USERNAME_EXISTS, AuthApi.checkUsernameExists);

export const localRegister = createAction(LOCAL_REGISTER, AuthApi.localRegister) // param : {email, username, password}
export const localLogin = createAction(LOCAL_LOGIN, AuthApi.localLogin) // param : {username, password}

export const logout = createAction(LOGOUT, AuthApi.logout) //no param

export const setError = createAction(SET_ERROR) // param : {form, error}

const initialState = {
  register: {
    form: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: ""
    },
    exists: {
      email: false,
      username: false
    },
    error:null
  },
  login: {
    form: {
      email: "",
      password: ""
    },
    error:null
  },
  result:{}
};

export default handleActions({
    [CHANGE_INPUT]: (state, action) => { //CHANGE_INPUT 하나로 6개의 input이 처리 가능
      const { form, name, value } = action.payload; //form이 'login' or 'register' 일듯
      console.log("스토어", action.payload);

      return produce(state, draft => {
        draft[form]["form"][name] = value; //Trouble:중간에 'form'을 빠뜨렸군 ㅠㅠ
        console.log(draft);
      });
    },
    [INITIALIZE_FORM]: (state, action) => {
      const initialForm = initialState[action.payload];
      return produce(state, draft => {
        draft[action.payload] = initialForm;
      });
    },
    [SET_ERROR]: (state, action) => {
      const {form, message} = action.payload
      return produce(state, draft => {
        draft[form].error = message
      })
    },
    ...pender({
      type : CHECK_EMAIL_EXISTS,
      onSuccess : (state, action) => produce( state, draft => {
        draft.register.exists.email = action.payload.data.exists //받는 값 data = {exists: boolean} 
      }),
    }),
    ...pender({
      type : CHECK_USERNAME_EXISTS,
      onSuccess : (state, action) => produce ( state, draft => {
        draft.register.exists.username = action.payload.data.exists
      })
    }),
    ...pender({
      type : LOCAL_REGISTER,
      onSuccess : (state, action) => produce ( state, draft => {
        draft.result = action.payload.data
      })
    }),
    ...pender({
      type: LOCAL_LOGIN,
      onSuccess: (state, action) => produce (state, draft => {
        draft.result = action.payload.data
      })
    }),
  },initialState);
