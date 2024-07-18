import axios from 'axios';
import axiosInstance, {logout} from './axiosConfig';
import axiosInstance, { logout } from "./axiosConfig";

export const login = async (username, password) => {
  //console.log('axios login 함수 호출')
  const response = await axiosInstance.post("/auth/sign-in", {
    username,
    password,
  });
  return response.data;
};

export const signup = async (
  username,
  password,
  userNickname,
  userAddress,
  userPhoneNumber,
  profileImg,
  userRole,
  placeName,
  placeType
) => {
  console.log("axios signup 함수 호출");
  const response = await axiosInstance.post("/auth/sign-up", {
    username,
    password,
    userNickname,
    userAddress,
    userPhoneNumber,
    profileImg,
    userRole,
    placeName,
    placeType,
  });
  return response.data;
};

export const getService = async (eduPK, eduDay, eduStart, eduEnd, eduName, eduPlacePK, eduWorkerPK) => {
  const response = await axiosInstance.get('/edu/edu-list', {
    params: { eduPK, eduDay, eduStart, eduEnd, eduName, eduPlacePK, eduWorkerPK },
  });
  return response.data;
};

export const addService = async (eduName, eduDay, eduStart, eduEnd, workerId) => {
  const response = await axiosInstancel.post('/add_edu', {
    eduName, eduDay, eduStart, eduEnd, workerId
  });
  return response.data;
}

//앞으로 해야할 작업
// export const fetchData = async () => {
//   const response = await axiosInstance.get('/data');
//   return response.data;
// };

export const userLogout = () => {
  logout();
};
