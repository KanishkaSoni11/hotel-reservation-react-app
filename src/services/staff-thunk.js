import {createAsyncThunk} from "@reduxjs/toolkit";
import {getStaffById} from "./staff-service";

export const getStaffByIdThunk = createAsyncThunk(
    'getStaffById',
    async (staffId) => await getStaffById(staffId)
)
