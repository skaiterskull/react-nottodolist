import {
  requestPending,
  requestFailed,
  createUserSuccess,
  loginUserSuccess,
  userLogout,
} from "./userSlice";
import { postUser, getUser } from "../../apis/userApi.js";

export const createNewUser = (userObj) => async (dispatch) => {
  dispatch(requestPending());
  const data = await postUser(userObj);
  if (data.status === "Success") {
    dispatch(createUserSuccess(data));
  } else {
    dispatch(requestFailed(data));
  }
};

export const loginUser = (userObj) => async (dispatch) => {
  dispatch(requestPending());
  const data = await getUser(userObj);

  if (data?.result) {
    const { _id, userName } = data.result;
    window.localStorage.setItem("_id", _id);
    window.localStorage.setItem("userName", userName);
    dispatch(loginUserSuccess());
    return;
  } else {
    dispatch(requestFailed(data));
  }
};

export const logOut = () => (dispatch) => {
  window.localStorage.removeItem("_id");
  window.localStorage.removeItem("userName");
  dispatch(userLogout());
};
