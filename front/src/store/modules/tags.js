import { createAction, handleActions} from "redux-actions"
import produce from "immer";

//action types
const GET_TAGS = "tags/GET_TAGS"

//action creators
export const getTags = createAction(GET_TAGS, )


