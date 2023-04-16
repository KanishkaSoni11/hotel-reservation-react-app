import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAvailableRooms} from "./room-service";

export const getAvailableRoomsThunk = createAsyncThunk (
    'getAvailableRooms',
    async (dateFrom, dateTo, typeOfRoom) => await getAvailableRooms(dateFrom, dateTo, typeOfRoom)
);

