import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    getStaffById,
    loginStaff,
    getRoomsUnassigned,
    getStaffDetailsFromLocalStorage
} from "./staff-service";

export const getStaffByIdThunk = createAsyncThunk(
    'getStaffById',
    async (staffId) => await getStaffById(staffId)
)

export const loginStaffThunk = createAsyncThunk(
    'loginStaff',
    async (staff) => await loginStaff(staff)
)

export const roomsUnassignedThunk = createAsyncThunk(
    'roomsUnassigned',
    async (staff) => await getRoomsUnassigned()
)

export const getStaffDetailsFromLocalStorageThunk = createAsyncThunk(
    'getStaffDetailsFromLocalStorageThunk',
    async(staff) => await getStaffDetailsFromLocalStorage(staff)
)