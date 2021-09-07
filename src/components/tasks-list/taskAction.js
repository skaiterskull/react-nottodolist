import {
  requestFailed,
  requestPending,
  fetchTaskListSuccess,
  updateTaskSuccess,
} from "./taskSlice";
import { fetchAllTask, postTask, updateTask } from "../../apis/taskApi";

export const loadAllData = () => async (dispatch) => {
  dispatch(requestPending());
  const data = await fetchAllTask();
  data.status === "Success"
    ? dispatch(fetchTaskListSuccess(data))
    : dispatch(requestFailed(data));
};

export const addTask = (newTask) => async (dispatch) => {
  dispatch(requestPending());
  const data = await postTask(newTask);
  if (data.status === "Success") {
    dispatch(updateTaskSuccess(data));
    dispatch(loadAllData());
  } else {
    dispatch(requestFailed(data));
  }
};

export const switchTask = (obj) => async (dispatch) => {
  dispatch(requestPending());
  const data = await updateTask(obj);
  if (data.status === "Success") {
    dispatch(updateTaskSuccess(data));
    dispatch(loadAllData());
  } else {
    dispatch(requestFailed(data));
  }
};
