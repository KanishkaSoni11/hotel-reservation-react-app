import {createSlice} from "@reduxjs/toolkit";
import {
    getStaffByIdThunk,
    getStaffDetailsFromLocalStorageThunk,
    loginStaffThunk,
    roomsUnassignedThunk
} from "../services/staff-thunk";

const staffSlice = createSlice({
    name: 'staff',
    initialState: {
        currentStaff: '',
        roomsUnassigned : []
    },
    reducers: {},
    extraReducers: {
        [getStaffByIdThunk.fulfilled]: (state, action) => {
            state.currentStaff = action.payload
            state.loading = false
        },
        [loginStaffThunk.fulfilled]: (state, action) => {
            state.currentStaff = action.payload
            // state.currentStaff = {...state.currentStaff, staffId: action.payload}
            console.log("thunk", state.currentStaff)
            state.loading = false
        },
        [roomsUnassignedThunk.fulfilled] : (state, action) => {
            state.roomsUnassigned = action.payload
            state.loading = false;
        },
        [getStaffDetailsFromLocalStorageThunk.fulfilled]: (state, action) => {
            state.currentStaff = action.payload;
            state.loading = false;
        }
    }

})

export default staffSlice.reducer