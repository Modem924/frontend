//모든 요청에 대해 공통적인 설정! 
import axios from 'axios';

const API_URL = 'http://13.125.77.44:8080';

const axiosInstance = axios.create(
  
  {
  
  baseURL: API_URL,
  withCredentials: true,// CORS 설정 추가 (CSRF 토큰 전송을 위해 필요한 옵션)
});

axiosInstance.interceptors.request.use(
 
  (config) => {
    if (config.url !== '/auth/sign-in')//login
      {
      const token = localStorage.getItem('token');
      if (token) {
        //console.log('헤더에 토큰 심기')
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const logout = () => {
  localStorage.removeItem('token');
};

export default axiosInstance;
