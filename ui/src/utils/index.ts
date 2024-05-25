export const isAuthenticated = () => {
  return localStorage.getItem('accessToken') !== null;
};

export const logout = () => {
  localStorage.removeItem('accessToken');
};
