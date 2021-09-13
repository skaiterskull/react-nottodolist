import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  message: "",
  isLoading: false,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true;
    },

    createUserSuccess: (state, { payload: { status, message } }) => {
      state.isLoading = false;
      state.status = status;
      state.message = message;
    },

    loginUserSuccess: (state) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.status = "";
      state.message = "";
    },

    userLogout: (state) => {
      state.isLoggedIn = false;
    },

    requestFailed: (state, { payload }) => {
      const { status, message } = payload;
      state.isLoading = false;
      state.status = status;
      state.message = message;
    },
  },
});

const { reducer, actions } = userSlice;

export const {
  requestPending,
  requestFailed,
  createUserSuccess,
  loginUserSuccess,
  userLogout,
} = actions;
export default reducer;
