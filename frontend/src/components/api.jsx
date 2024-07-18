import axios from 'axios';
import axiosInstance, { logout } from './axiosConfig';

export const login = async (username, password) => {
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

export const getService = async () => {
  const response = await axiosInstance.get('/edu/edu-list');
  return response.data;
};

export const addService = async (eduName, eduDay, eduStart, eduEnd, workerId, eduTuition) => {
  const response = await axiosInstance.post('/edu/add_edu', {
    eduName, eduDay, eduStart, eduEnd, workerId, eduTuition
  });

  return response.data;
};

export const getServiceMembers = async (eduPK) => {
  try {
    const response = await axiosInstance.get(`/api/edu/${eduPK}/members`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service members:', error);
    throw error;
  }
};

export const userLogout = () => {
  logout();
};
