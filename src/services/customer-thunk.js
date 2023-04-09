import {createAsyncThunk} from "@reduxjs/toolkit";
import {getCustomerByEmail, loginCustomer, registerCustomer} from "./customer-service";

export const getCustomerByEmailThunk = createAsyncThunk(
    'getStaffById',
    async (email) => await getCustomerByEmail(email)
)

export const loginCustomerThunk = createAsyncThunk(
    'loginCustomer',
    async (customer) => await loginCustomer(customer)
)

export const registerCustomerThunk = createAsyncThunk(
    'registerCustomer',
    async(customer) => await registerCustomer(customer)
)
