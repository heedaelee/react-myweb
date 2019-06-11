import {createAction, handleActions} from 'redux-actions';

import {Map} from 'immutable';
import {pender} from 'redux-pender';

import * as api from "lib/api";

//action types
const GET_POST = 'post/GET_POST';
const DELETE_POST = 'post/`DELETE_POST`';

//action creators
export const getPost = createAction(GET_POST,api.getPost);
export const deletePost = createAction(DELETE_POST,api.deletePost);

// initial state
const initialState= Map({});

//reducer
export default handleActions ({
  ...pender({
    type:GET_POST,
    onSuccess:(state,action)=>{
      const {data:post} = this.action.payload;
      return state.set(post)
    }
  })
}, initialState)
