import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {pender} from 'redux-pender';

import * as api from "lib/api";

//action types
const INITIALIZE = 'editor/INITIALIZE';
const CHANGE_INPUT = 'editor/CHANGE_INPUT';
const WIRTE_POST = 'editor/WRITE_POST';
const EDIT_POST = 'editor/EDIT_POST';
const GET_POST = 'editor/GET_POST';

//action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);

export const writePost = createAction(WIRTE_POST, api.writePost);
export const editPost = createAction(EDIT_POST, api.editPost);
export const getPost = createAction(GET_POST, api.getPost);

// initial state
const initialState= Map({
  title:'',
  markdown:'',
  tags:[],
  postId:null,
});

//reducer
export default handleActions ({
  [INITIALIZE]: (state, action) => initialState,
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload;
    return state.set(name, value);
  },//view의 input에서 입력시 여기서 총체적으로 state.set를 해서 받음
  //그럼 state가 갖고 있다, submit호출시 보냄
  ...pender({
    type:WIRTE_POST,
    onSuccess:(state, action) => {
      const {_id} = action.payload.data;
      return state.set('postId', _id);
    }
  }),
  ...pender({
    type:GET_POST,
    onSuccess:(state, action) => {
      const {post} = action.payload.data;
      return state.set('post', post);
    }
  })

}, initialState)
