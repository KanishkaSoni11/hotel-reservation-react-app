import {createSlice} from "@reduxjs/toolkit";
import {getAvailableRoomsThunk} from "../services/room-thunk";

const roomSlice = createSlice({
    name: 'room',
    initialState: {
        roomList: []
    },
    reducers: {},
    extraReducers: {
        [getAvailableRoomsThunk.fulfilled] :(state, action) => {
            state.roomList = action.payload
        }
    }
    }

)

export default roomSlice.reducer