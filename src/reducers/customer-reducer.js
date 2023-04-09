import {createSlice} from "@reduxjs/toolkit";
import {
    getCustomerByEmailThunk,
    loginCustomerThunk,
    registerCustomerThunk
} from "../services/customer-thunk";

const customerSlice = createSlice({
   name: 'customer',
   initialState: {
       currentCustomer: {}
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
       }
   }

})

export default customerSlice.reducer