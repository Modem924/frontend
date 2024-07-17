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

//앞으로 해야할 작업
// export const fetchData = async () => {
//   const response = await axiosInstance.get('/data');
//   return response.data;
// };

export const userLogout = () => {
  logout();
};
