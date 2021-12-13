import axios, { AxiosInstance } from 'axios';
import { removeLoading, setLoading } from '../helpers';

const axiosClient: AxiosInstance = axios.create({
  baseURL: 'https://61b79fcd64e4a10017d18bf2.mockapi.io',
  headers: {
    'Content-Type': 'application/json'
  },
});

axiosClient.interceptors.request.use(function (config) {
  config.params = {...config.params, sortBy: 'createdAt', orderBy: 'asc'}
  setLoading()
  return config;
}, function (error) {
  removeLoading()
  return Promise.reject(error);
});

axiosClient.interceptors.response.use(function (response) {
  removeLoading()
  return response.data;
}, function (error) {
  removeLoading()
  return Promise.reject(error);
});

export default axiosClient;