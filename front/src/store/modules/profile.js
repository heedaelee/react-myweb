import { createAction, handleActions } from "redux-actions";

import * as UserAPI from "lib/api/user";
import { pender } from "redux-pender";
import produce from "immer";

const GET_PROFILE = "profile/GET_PROFILE"; //프로필 조회
const INITIALIZE = "profile/INITIALIZE"; //초기화

const UNREGISTER = "profile/UNREGISTER"; // 탈퇴
// const CHANGE_INPUT = "profile/CHANGE_INPUT";
const UPLOAD_THUMBNAIL = "profile/UPLOAD_THUMBNAIL"; //사진 업로드
const UPDATE_PROFILE = "profile/UPDATE_PROFILE"; //프로필 업데이트

export const getProfile = createAction(GET_PROFILE, UserAPI.getProfile); // params : username
export const initialize = createAction(INITIALIZE);

export const unregister = createAction(UNREGISTER, UserAPI.unregister);
// export const changeInput = createAction(CHANGE_INPUT);
export const uploadThumbnail = createAction(
  UPLOAD_THUMBNAIL,
  UserAPI.uploadThumbnail
); // params : filename
export const updateProfile = createAction(
  UPDATE_PROFILE,
  UserAPI.updateProfile
); // params: {username, thumbnail}

const initialState = {
  user: {
    profile: {},
    social: {}
  },
  posts: {},
  imgName: ""
};

//reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    /* [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return produce(state, draft => {
        draft.user[name] = value;
      });
    }, */
    ...pender({
      type: GET_PROFILE,
      onSuccess: (state, action) => {
        return produce(state, draft => {
          draft.user = action.payload.data;
        });
      }
    }),
    ...pender({
      type: UPLOAD_THUMBNAIL,
      onSuccess: (state, action) => {
        return produce(state, draft => {
          draft.imgName = action.payload.data.imgName; //param: {imgName: }
        });
      }
    }),
    ...pender({
      type: UPDATE_PROFILE,
      onSuccess: (state, action) => {
        return produce(state, draft => {
          draft.user = action.payload.data; //params : {user: }
        });
      }
    })
  },
  initialState
);
