export const TokenHandler = {
  getToken: () => {
    return localStorage.getItem("token");
  },
  addToken: (token) => {
    localStorage.setItem("token", token);
  },
  clearToken: () => {
    localStorage.removeItem("token");
  },
};
