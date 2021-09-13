import axios from "axios";

const rootApi = "http://localhost:8000/api/v1/task";

// DISPLAY ALL THE DATA-------------------------------------------------------
export const fetchAllTask = async () => {
  try {
    const { data } = await axios.get(rootApi, {
      headers: {
        Authorization: window.localStorage.getItem("_id"),
      },
    });

    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// INSERT DATA TO DATABASE----------------------------------------------------
export const postTask = async (task) => {
  try {
    const { data } = await axios.post(rootApi, task, {
      headers: {
        Authorization: window.localStorage.getItem("_id"),
      },
    });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// DELETE DATA FROM DATABASE -------------------------------------------------
export const deleteTask = async (task) => {
  try {
    const { data } = await axios.delete(rootApi, {
      headers: { Authorization: window.localStorage.getItem("_id") },
      data: task,
    });
    console.log(data);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// UPDATE DATA FROM DATABASE
export const updateTask = async (obj) => {
  try {
    const { data } = await axios.patch(rootApi, obj, {
      headers: {
        Authorization: window.localStorage.getItem("_id"),
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
