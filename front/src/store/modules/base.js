import { createAction, handleActions } from "redux-actions";

import { Map } from "immutable";
import { pender } from "redux-pender";
import produce from "immer";

//action types
const SHOW_MODAL = "base/SHOW_MODAL";
const HIDE_MODAL = "base/HIDE_MODAL";

//action creators
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);

//initial state
const initialState = {
  modal: {
    remove: false,
    login: false,
    unregister: false,
  },
  loginModal: {
    password:"",
    error:false
  },
  logged:false //현재 로그인 상태
};

//reducer
export default handleActions(
  {
    [SHOW_MODAL]: (state, action) => {
      const { payload: modalName } = action;
      return produce(state, draft => {
        draft.modal[modalName] = true
      })
    },
    [HIDE_MODAL]: (state, action) => {
      const { payload: modalName } = action;
      return produce(state, draft => {
        draft.modal[modalName] = false
      })
    },
  },
  initialState
);
