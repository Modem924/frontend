import axios from "axios";
import axiosInstance, { logout } from "./axiosConfig";

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
  const response = await axiosInstance.get("/edu/edu-list");
  return response.data;
};

export const addService = async (
  eduName,
  eduDay,
  eduStart,
  eduEnd,
  workerId,
  eduTuition
) => {
  const response = await axiosInstance.post("/add_edu", {
    eduName,
    eduDay,
    eduStart,
    eduEnd,
    workerId,
    eduTuition,
  });

  return response.data;
};

export const getServiceMembers = async (eduPK) => {
  try {
    const response = await axiosInstance.get(`/api/edu/${eduPK}/members`);
    return response.data;
  } catch (error) {
    console.error("Error fetching service members:", error);
    throw error;
  }
};

export const deleteService = async (eduPK) => {
  const response = await axiosInstance.post("/del_edu", { eduPK });
  return response.data;
};

export const updateService = async (
  eduPK,
  eduName,
  eduDay,
  eduStart,
  eduEnd
) => {
  const response = await axiosInstance.put("/edit/edu", {
    eduPK,
    eduName,
    eduDay,
    eduStart,
    eduEnd,
  });
  return response.data;
};

export const addMember = async (eduPK, memberId) => {
  const response = await axiosInstance.post("/add_takes", {
    eduPK,
    memberId,
  });
  return response.data;
};

export const deleteMember = async (eduPK, memberId) => {
  try {
    const response = await axiosInstance.post("/del_takes", {
      eduPK,
      memberId,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error in deleteMember API call:",
      error.response || error.message
    );
    throw error;
  }
};

////////전체 worker 리스트
export const getWorkers = async () => {
  console.log("전체 worker 리스트 get 요청");
  try {
    const response = await axiosInstance.get(`/workers/worker-list`);
    return response.data;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};
/////add worker
export const addWorker = async (worker) => {
  try {
    const response = await axiosInstance.post("/add_worker", {
      worker,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error in addWorker API call:",
      error.response || error.message
    );
    throw error;
  }
};

////updateWorker
export const updateWorker = async (data) => {
  try {
    console.log("updateworker : ", data);
    const response = await axiosInstance.put(`/workers/edit`, data);
    return response.data || {};
  } catch (error) {
    console.error("Error updating worker:", error);
    throw error;
  }
};

export const userLogout = () => {
  logout();
};
