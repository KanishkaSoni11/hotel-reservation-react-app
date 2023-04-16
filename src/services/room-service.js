import axios from "axios";
import APP_URL from "../constants";

const api = axios;

const API_BASE = APP_URL.spring_boot_server;

export const getAvailableRooms = async(dateFrom, dateTo, roomType) =>{

    const response = await api.get(`${API_BASE}/api/room/available/${dateFrom}/${dateTo}/${roomType}`)

    return response.data
};