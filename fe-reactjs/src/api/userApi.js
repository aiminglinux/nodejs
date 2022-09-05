import axiosClient from './axiosClient';

const userApi = {
  register(data) {
    const url = '/account/register';
    return axiosClient.post(url, data);
  },
  //   get(id) {},
  //   add(data) {},
  //   update(data) {},
  //   remove(id) {},
};

export default userApi;
