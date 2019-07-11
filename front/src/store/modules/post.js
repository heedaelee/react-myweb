import { createAction, handleActions } from "redux-actions";

import { pender } from "redux-pender";

import * as postApi from "lib/api/post";
import produce from "immer";

//action types
const GET_POST = "post/GET_POST";
const DELETE_POST = "post/DELETE_POST";

//action creators
export const getPost = createAction(GET_POST, postApi.getPost);
export const deletePost = createAction(DELETE_POST, postApi.deletePost);

// initial state
const initialState = {
  post:{}
};

//reducer
export default handleActions(
  {
    ...pender({
      type: GET_POST,
      onSuccess: (state, action) => {
        return produce (state, draft => {
          draft.post = action.payload.data
        })
      }
    })
  },
  initialState
);
