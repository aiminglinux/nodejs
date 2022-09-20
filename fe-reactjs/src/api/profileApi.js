import axiosClient from './axiosClient';

const profileApi = {
  create(data) {
    const url = '/profile';
    return axiosClient.post(url, data);
  },
  get() {
    const url = '/profile/me';
    return axiosClient.get(url);
  },
  addEducation(data) {
    const url = '/profile/education';
    return axiosClient.put(url, data);
  },
  deleteEducation(id) {
    const url = `/profile/education/${id}`;
    return axiosClient.delete(url, id);
  },
  addExperience(data) {
    const url = '/profile/experience';
    return axiosClient.put(url, data);
  },
  deleteExperience(id) {
    const url = `/profile/experience/${id}`;
    return axiosClient.delete(url, id);
  },
  //   get(id) {},
  //   add(data) {},
  //   update(data) {},
  //   remove(id) {},
};

export default profileApi;
