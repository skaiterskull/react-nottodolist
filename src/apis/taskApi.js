import axios from "axios";

const rootApi = "http://localhost:8000/api/v1/";

// DISPLAY ALL THE DATA-------------------------------------------------------
export const fetchAllTask = async () => {
  try {
    const { data } = await axios.get(rootApi);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// INSERT DATA TO DATABASE----------------------------------------------------
export const postTask = async (newTask) => {
  try {
    const { data } = await axios.post(rootApi, newTask);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
