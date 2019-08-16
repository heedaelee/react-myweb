import { createAction, handleActions } from "redux-actions";

import * as ProfileAPI from "lib/api/profile";
import { pender } from "redux-pender";
import produce from "immer";

const GET_PROFILE = "profile/GET_PROFILE"; //프로필 조회
const INITIALIZE = "profile/INITIALIZE"; //초기화

const UNREGISTER = "profile/UNREGISTER"; // 탈퇴
const UPLOAD_THUMBNAIL = "profile/UPLOAD_THUMBNAIL"; //사진 업로드
const UPDATE_PROFILE = "profile/UPDATE_PROFILE"; //프로필 업데이트

export const getProfile = createAction(GET_PROFILE, ProfileAPI.getProfile); // params : id
export const initialize = createAction(INITIALIZE);
export const unregister = createAction(UNREGISTER, ProfileAPI.unregister); //param: username
export const uploadThumbnail = createAction(
  UPLOAD_THUMBNAIL,
  ProfileAPI.uploadThumbnail
); // params : filename
export const updateProfile = createAction(
  UPDATE_PROFILE,
  ProfileAPI.updateProfile
); // params: {id,username, thumbnail}

const initialState = {
  user: {
    profile: {},
    social: {}
  },
  posts: {},
  imgName: "",
  usernameExist: false
};

//reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    ...pender({
      type: GET_PROFILE,
      onSuccess: (state, action) => {
        return produce(state, draft => {
          console.log(`오는 데이터 : ${JSON.stringify(action.payload)}`);
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
          draft.user = action.payload.data; //params : user 안의 data
        });
      }
    })
  },
  initialState
);
