import './App.css';
import {BrowserRouter,Routes, Route}from "react-router-dom";

import HomePage from "./components/HomePage";
import CustomerLogin from "./components/customer/CustomerLogin";
import CustomerRegistration from "./components/customer/CustomerRegistration";
import CustomerHome from "./components/customer/CustomerHome";
import StaffLogin from "./components/staff/StaffLogin";
import StaffHome from "./components/staff/StaffHome";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import staffReducer from "./reducers/staff-reducer";
import StaffFood from "./components/staff/StaffFood";
import StaffRoom from "./components/staff/StaffRoom";
import roomReducer from "./reducers/room-reducer";


const store = configureStore({
    reducer: {
        staffData: staffReducer
    }
});

function App() {
    return (
        <div className="container">
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={< HomePage/>}/>
                        <Route path="/customer/login" element={< CustomerLogin/>}/>
                        <Route path="/customer/register" element={< CustomerRegistration/>}/>
                        <Route path="/customer/home" element={< CustomerHome/>}/>
                        <Route path="/staff/login" element={< StaffLogin/>}/>
                        <Route path="/staff/home" element={< StaffHome/>}/>
                        <Route path="/staff/food" element={< StaffFood/>}/>
                        <Route path="/staff/room" element={< StaffRoom/>}/>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
