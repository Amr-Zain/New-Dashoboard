import axiosInstance from "./instance";

export const loginUser = (data:any) => {
    return axiosInstance.post("login", data);
};
