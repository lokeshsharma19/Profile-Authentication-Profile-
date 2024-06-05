export const checkAuth = () => {
  if ("token" in localStorage) {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token && token.length > 0) {
      return true;
    }
    return false;
  }
};
