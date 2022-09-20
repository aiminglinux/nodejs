import axiosClient from './axiosClient';

console.log(axiosClient.defaults.headers);

const userApi = {
  register(data) {
    const url = '/account/register';
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = '/account/login';
    return axiosClient.post(url, data);
  },
  loadUser() {
    const url = '/account/auth';
    return axiosClient.get(url);
  },
  //   get(id) {},
  //   add(data) {},
  //   update(data) {},
  //   remove(id) {},
};

export default userApi;
