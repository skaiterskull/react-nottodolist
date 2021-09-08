import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  message: "",
  isLoading: false,
  // userId: "",
  // userName: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "taskList",
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

    requestFailed: (state, { payload }) => {
      const { status, message } = payload;
      state.isLoading = false;
      state.status = status;
      state.message = message;
    },
  },
});

const { reducer, actions } = userSlice;

export const { requestPending, requestFailed, createUserSuccess } = actions;
export default reducer;
