import axios from "axios";
import APP_URL from "../constants";

const api = axios;

const API_BASE = APP_URL.spring_boot_server;
const CUSTOMER_API = `${API_BASE}/api/customer`


export const getCustomerByEmail = async (email) => {

    const response = await api.get(`${CUSTOMER_API}/${email}`);
    return response.data;
}

export const loginCustomer = async (customer) =>{
    const response = await api.post(`${CUSTOMER_API}/login`, customer);
    console.log(response.data)
    return response.data
}

export const registerCustomer = async (customer) => {
    console.log("Sending api regquest")
    const response = await api.post(`${CUSTOMER_API}/register`, customer)
    console.log(response.data);
    return response.data;
}