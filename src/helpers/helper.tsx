export const getUser = () => {
  return localStorage.getItem("user");
};

export const setUser = (data: any) => {
  localStorage.setItem("user", data);
};
