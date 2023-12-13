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

export const getDiscussionsFromDb = async () => {
  return await axios.get(`${baseURL}/event/discussion`).then((res) => {
    console.log(res.data);
    return res.data;
  });
};

export const addDiscussionsToDb = async (data: any) => {
  return await axios
    .post(`${baseURL}/event/discussion/addDiscussions`, data)
    .then((res) => {
      return res.data;
    });
};

export const addCommentTodb = async (data: any) => {
  return await axios
    .post(`${baseURL}/event/comments/addComments`, data)
    .then((res) => {
      return res.data;
    });
};

export const getCommentFromdb = async (id: any, type: any) => {
  let res = null;
  if (type == "event")
    res = await axios.get(`${baseURL}/event/getEventComments/${id}/${type}`);
  else res = await axios.get(`${baseURL}/event/getComments/${id}/${type}`);
  return res.data;
};

export const updateLikesInDb = async (data: any) => {
  return await axios
    .post(`${baseURL}/event/discussion/updateLikes`, data)
    .then((res) => {
      return res.data;
    });
};

export const updateEventLikesInDb = async (data: any) => {
  return await axios.post(`${baseURL}/event/updateLikes`, data).then((res) => {
    return res.data;
  });
};

export const updateEventViews = async (data: any) => {
  return await axios.post(`${baseURL}/event/updateViews`, data).then((res) => {
    return res.data;
  });
};

export const getUsersFromDb = async () => {
  return await axios.get(`${baseURL}/users/getUsers`).then((res) => {
    return res.data;
  });
};

export const uploadImage = async (obj: any) => {
  return await axios
    .post(`${baseURL}/posts/uploadImage`, obj, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      return res.data;
    });
};
