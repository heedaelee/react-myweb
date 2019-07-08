import { createAction, handleActions } from "redux-actions";

import { Map, fromJS } from "immutable";
import { pender } from "redux-pender";

import * as postApi from "lib/api/post";

//action types
const GET_POST = "post/GET_POST";
const DELETE_POST = "post/DELETE_POST";

//action creators
export const getPost = createAction(GET_POST, postApi.getPost);
export const deletePost = createAction(DELETE_POST, postApi.deletePost);

// initial state
const initialState = Map({
  post: Map({})
});

//reducer
export default handleActions({
    ...pender({
      type: GET_POST,
      onSuccess: (state, action) => {
        const { data: post } = action.payload;
        return state.set("post", fromJS(post));
      }
    })
  }, initialState);
