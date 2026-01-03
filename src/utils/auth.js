export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setUserName = (userName) => {
  localStorage.setItem("userName", userName);
};

export const getUserName = () => {
  return localStorage.getItem("userName");
};
