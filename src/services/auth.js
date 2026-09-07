export const authService = {
  getToken() { return localStorage.getItem("farmdirect-token"); },
  setToken(token) { localStorage.setItem("farmdirect-token", token); },
  clearToken() { localStorage.removeItem("farmdirect-token"); },
  isAuthenticated() { return Boolean(localStorage.getItem("farmdirect-token")); }
};
