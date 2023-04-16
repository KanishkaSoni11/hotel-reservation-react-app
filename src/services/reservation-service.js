import axios from "axios";
import APP_URL from "../constants";
import {responsiveFontSizes} from "@mui/material";

const api = axios;

const API_BASE = APP_URL.spring_boot_server;

export const assignRoom = async(res) => {
    console.log("res", res);
    const response = await api.post(`${API_BASE}/api/reservation/assignroom`, res);
    return response.data
}