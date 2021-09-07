import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskList: [],
  badList: [],
  status: "",
  message: "",
  isLoading: false,
  totalHrs: 0,
};

const taskSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true;
    },

    fetchTaskListSuccess: (state, { payload }) => {
      const { status, message, result } = payload;
      state.isLoading = false;
      state.status = status;
      state.message = message;

      state.taskList = result.filter((item) => item.todo);
      state.badList = result.filter((item) => !item.todo);
      //   console.log(result, "from aaa");
      state.totalHrs = result
        ? result.reduce((subTtl, item) => subTtl + +item.hr, 0)
        : 0;
    },

    requestFailed: (state) => {
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = taskSlice;

export const { requestPending, fetchTaskListSuccess, requestFailed } = actions;
export default reducer;
