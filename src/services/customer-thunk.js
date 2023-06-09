import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    getCustomerByEmail, getCustomerFromLocalStorage,
    getReservationFromCustomerId,
    loginCustomer, logoutResetStates,
    makeReservation,
    registerCustomer
} from "./customer-service";
import {getOrderHistoryForCustomer} from "./food-service";

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

export const makeReservationThunk = createAsyncThunk(
    'makeReservation',
    async(reservationDetails) => await makeReservation(reservationDetails)
)

export const getReservationFromCustomerIdThunk = createAsyncThunk(
    'getReservationFromCustomerId',
    async(customerId) => await getReservationFromCustomerId(customerId)
)

export const getOrderHistoryFromCustomerIdThunk = createAsyncThunk(
    'getOrderHistoryFromCustomerIdThunk',
    async(customerId) => await getOrderHistoryForCustomer(customerId)
)

export const getCustomerDetailsFromLocalStorageThunk = createAsyncThunk(
    'getCustomerDetailsFromLocalStorageThunk',
    async (customerDetails) => await getCustomerFromLocalStorage(customerDetails)
)

export const logoutResetStateThunk = createAsyncThunk(
    'logoutResetStateThunk',
    async () => await logoutResetStates()
)
