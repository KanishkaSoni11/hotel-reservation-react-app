import axios from "axios";
import APP_URL from "../constants";

const api = axios;

const API_BASE = APP_URL.spring_boot_server;

export const getPendingOrders = async () => {
    const response = await api.get(`${API_BASE}/api/food/pendingOrders`);
    console.log(response.data)
    return response.data
}

export const updateCompletedOrders = async (staffId, orderId) => {
    const response = await api.post(`${API_BASE}/api/food/updateCompletedOrders/${staffId}/${orderId}`);
    console.log(response.data)
    return response.data
}