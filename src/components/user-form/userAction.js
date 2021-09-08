import { requestPending, requestFailed, createUserSuccess } from "./userSlice";
import { postUser } from "../../apis/userApi.js";

export const createNewUser = (userObj) => async (dispatch) => {
  dispatch(requestPending());
  const data = await postUser(userObj);
  if (data.status === "Success") {
    dispatch(createUserSuccess(data));
  } else {
    dispatch(requestFailed(data));
  }
};
