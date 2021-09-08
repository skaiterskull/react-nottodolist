import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./components/tasks-list/taskSlice";
import userReducer from "./components/user-form/userSlice";

const store = configureStore({
  reducer: {
    task: taskReducer,
    user: userReducer,
  },
});

export default store;
