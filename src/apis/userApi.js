import axios from "axios";

const rootApi = "http://localhost:8000/api/v1/user";

// INSERT DATA TO DATABASE----------------------------------------------------
export const postUser = async (newUser) => {
  try {
    const { data } = await axios.post(rootApi + "/register", newUser);
    return data;
  } catch (error) {
    return {
      status: "Error",
      message: error.message,
    };
  }
};

//GET USER
export const getUser = async (userName) => {
  try {
    const { data } = await axios.post(rootApi, userName);
    return data;
  } catch (error) {
    return {
      status: "Error",
      message: error.message,
    };
  }
};
