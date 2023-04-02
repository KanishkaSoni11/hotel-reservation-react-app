import {createSlice} from "@reduxjs/toolkit";
import {getStaffByIdThunk} from "../services/staff-thunk";

const staffSlice = createSlice({
    name: 'staff',
    initialState: {
        staffId: ''
    },
    reducers: {},
    extraReducers: {
        [getStaffByIdThunk.fulfilled] :(state, action)=>{
            state.staffId = action.payload
            state.loading = false
        }
    }
})

export default staffSlice.reducer