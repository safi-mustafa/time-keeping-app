import axios from 'react-native-axios';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSmFtZXMiLCJGdWxsTmFtZSI6IkphbWVzIFNtaXRoIiwianRpIjoiZWFmY2NjMGQtMzA3YS00YjM2LTkxNDYtZmI0ZmIzODA3MjZiIiwiZXhwIjoxNjYzMjY4NDAzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjY0OTgiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAifQ.ItqidXeyRrTFLrdWEYJlvUYrvuwnE9M_AIfoyJBjXx8';
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // const token = store.getState().setting.user.token;
    config.headers.Authorization =  `Bearer ${token}`;
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
