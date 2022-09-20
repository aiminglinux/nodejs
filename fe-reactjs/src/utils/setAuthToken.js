import axiosClient from '../api/axiosClient';

const setAuthToken = (token) => {
  if (token) {
    axiosClient.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete axiosClient.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
