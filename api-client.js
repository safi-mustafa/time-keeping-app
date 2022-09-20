import axios from 'react-native-axios';
import { userData } from './utility/utility';
const token = '';

axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
axios.defaults.timeout = 2500;
// Add a request interceptor
axios.interceptors.request.use(
  async function (config) {
    const user = await userData();
    const token = user?.token;
    // console.log("🚀 ~ file: api-client.js ~ line 11 ~ token", token)
    config.headers.Authorization = `Bearer ${token}`;
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axios;
