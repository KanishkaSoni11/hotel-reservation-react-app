import {createAsyncThunk} from "@reduxjs/toolkit";
import {getStaffById,loginStaff} from "./staff-service";

export const getStaffByIdThunk = createAsyncThunk(
    'getStaffById',
    async (staffId) => await getStaffById(staffId)
)

export const loginStaffThunk = createAsyncThunk(
    'loginStaff',
    async (staff) => await loginStaff(staff)
)
