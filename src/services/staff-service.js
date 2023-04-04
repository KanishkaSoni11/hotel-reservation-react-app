import axios from "axios";
import APP_URL from "../constants";

const api = axios;

const API_BASE = APP_URL.spring_boot_server;

// export const getAllStaff = async () => {
//     const response = await api.get(`${API_BASE}/staff` );
//     return response.data;
// }

export const getStaffById = async (staffId) => {

    const response = await api.get(`${API_BASE}/staff/${staffId}`);
    return response.data;
}

export const loginStaff = async (staff) =>{
    const response = await api.post(`${API_BASE}/staff/login`, staff);
    console.log(response.data)
    return response.data
}