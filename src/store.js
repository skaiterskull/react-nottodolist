import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./components/tasks-list/taskSlice.js";

const store = configureStore({
  reducer: {
    task: taskReducer,
  },
});

export default store;
