import axios from "axios";
import APP_URL from "../constants";

const api = axios;

const API_BASE = APP_URL.spring_boot_server;
const FOOD_API = `${API_BASE}/api/food`


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

export const getAllFoodItems = async () => {
    const response = await api.get(`${FOOD_API}/`);
    console.log(response)
    return response;
}

export const getRoomsForReservation = async (reservationId) => {
    const response = await api.get(`${API_BASE}/api/reservation/room/${reservationId}`);
    console.log(response)
    return response;
}

export const placeFoodOrder = async (orderDetails) => {
    const response = await api.post(`${FOOD_API}/placeOrder`, orderDetails);
    console.log(response);
    return response.data;
}

export const getOrderHistoryForCustomer = async (customerId) => {
    console.log("Fetching order history for Customer ", customerId);
    const response = await api.get(`${FOOD_API}/orderHistory/${customerId}`);
    console.log(response);
    return response.data;
}