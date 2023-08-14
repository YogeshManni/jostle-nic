import axios from "axios";

const baseURL = "http://localhost:4000";

export const addEventToDb = async (data: any) => {
  console.log(data);
  return await axios.post(`${baseURL}/event/addEvent`, data).then((res) => {
    return res;
  });
};

export const getEventFromDb = async () => {
  return await axios.get(`${baseURL}/event/`).then((res) => {
    return res.data;
  });
};
