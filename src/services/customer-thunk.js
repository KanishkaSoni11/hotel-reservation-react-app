import {createAsyncThunk} from "@reduxjs/toolkit";
import {getCustomerByEmail, loginCustomer} from "./customer-service";

export const getCustomerByEmailThunk = createAsyncThunk(
    'getStaffById',
    async (email) => await getCustomerByEmail(email)
)

export const loginCustomerThunk = createAsyncThunk(
    'loginCustomer',
    async (customer) => await loginCustomer(customer)
)
