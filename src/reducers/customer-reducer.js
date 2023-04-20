import {createSlice} from "@reduxjs/toolkit";
import {
    getCustomerByEmailThunk, getReservationFromCustomerIdThunk,
    loginCustomerThunk,
    makeReservationThunk,
    registerCustomerThunk,
    getOrderHistoryFromCustomerIdThunk,
    getCustomerDetailsFromLocalStorageThunk
} from "../services/customer-thunk";

const customerSlice = createSlice({
   name: 'customer',
   initialState: {
       currentCustomer: {},
       reservationDetails: {},
       orderList: []
   },
   reducers: {},
   extraReducers: {
       [getCustomerByEmailThunk.fulfilled]: (state, action) => {
           state.currentCustomer = action.payload
           state.loading = false
       },
       [loginCustomerThunk.fulfilled]: (state, action) => {
           state.currentCustomer = action.payload
           console.log("thunk", state.currentCustomer)
           state.loading = false
       },
       [registerCustomerThunk.fulfilled]: (state, action) => {
           console.log(action);
           state.currentCustomer = action.payload
           console.log(state)
           console.log("thunk", state.currentCustomer)
           state.loading = false
       },
       [makeReservationThunk.fulfilled]: (state, action) => {
           console.log(action);
           state.reservationDetails = action.payload
           console.log(state)
           state.loading = false
       },
       [getReservationFromCustomerIdThunk.fulfilled]: (state, action) => {
           console.log(action);
           state.reservationDetails = action.payload
           console.log(state)
           state.loading = false
       },
       [getOrderHistoryFromCustomerIdThunk.fulfilled]: (state, action) => {
           console.log("Getting order list in thunk");
           console.log(action);
           state.orderList = action.payload
           console.log(state)
           state.loading = false
       },
       [getCustomerDetailsFromLocalStorageThunk.fulfilled]: (state, action) => {
           console.log("Getting customer from local storage");
           state.currentCustomer = action.payload
           console.log(state)
           state.loading = false
       }
   }

})

export default customerSlice.reducer