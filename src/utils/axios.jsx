import axios from 'axios';
// config
import { BASE_URI } from './apiConfig';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: `${BASE_URI}/api` });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
);

export default axiosInstance;
