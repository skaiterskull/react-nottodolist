import {
  requestFailed,
  requestPending,
  fetchTaskListSuccess,
} from "./taskSlice";
import { fetchAllTask } from "../../apis/taskApi";

export const loadAllData = () => async (dispatch) => {
  dispatch(requestPending());
  const data = await fetchAllTask();
  dispatch(fetchTaskListSuccess(data));
};
