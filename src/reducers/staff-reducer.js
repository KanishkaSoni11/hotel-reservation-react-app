import {createSlice} from "@reduxjs/toolkit";
import {getStaffByIdThunk, loginStaffThunk} from "../services/staff-thunk";

const staffSlice = createSlice({
    name: 'staff',
    initialState: {
        currentStaff: ''
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
        }
    }

})

export default staffSlice.reducer