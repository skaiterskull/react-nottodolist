import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskList: [],
  badList: [],
  status: "",
  message: "",
  isLoading: false,
  totalHrs: 0,
  idToDelete: [],
};

const taskSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true;
    },

    updateTaskSuccess: (state, { payload: { status, message } }) => {
      state.isLoading = false;
      state.status = status;
      state.message = message;
    },

    deleteTaskSuccess: (state, { payload: { status, message } }) => {
      state.isLoading = false;
      state.status = status;
      state.message = message;
      state.idToDelete = [];
    },

    fetchTaskListSuccess: (state, { payload }) => {
      const { result } = payload;
      state.isLoading = false;
      state.taskList = result.filter((item) => item.todo);
      state.badList = result.filter((item) => !item.todo);
      state.totalHrs = result
        ? result.reduce((subTtl, item) => subTtl + +item.hr, 0)
        : 0;
    },

    setIdToDelete: (state, { payload: { checked, value } }) => {
      if (checked) {
        state.idToDelete = [...state.idToDelete, value];
      } else {
        const tempAry = state.idToDelete.filter((item) => item !== value);
        state.idToDelete = tempAry;
      }
    },

    requestFailed: (state, { payload }) => {
      const { status, message } = payload;
      state.isLoading = false;
      state.status = status;
      state.message = message;
    },
  },
});

const { reducer, actions } = taskSlice;

export const {
  requestPending,
  fetchTaskListSuccess,
  requestFailed,
  updateTaskSuccess,
  deleteTaskSuccess,
  setIdToDelete,
} = actions;
export default reducer;
