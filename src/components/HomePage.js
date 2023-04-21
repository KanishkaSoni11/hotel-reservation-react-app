import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getCustomerDetailsFromLocalStorageThunk} from "../services/customer-thunk";


const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchDataFromLocalStorage = async () => {
            console.log(JSON.parse(localStorage.getItem("customerDetails")));
            if (localStorage.getItem("staffDetails")) {
                console.log("Staff is already logged in")
                console.log(localStorage.getItem("staffDetails"));
                const res = await dispatch(getCustomerDetailsFromLocalStorageThunk(
                    JSON.parse(localStorage.getItem("customerDetails"))));
                navigate("/staff/home");
            }
            if (localStorage.getItem("customerDetails")) {
                console.log("Guest is already logged in")
                console.log(localStorage.getItem("customerDetails"));
                const res = await dispatch(getCustomerDetailsFromLocalStorageThunk(
                    JSON.parse(localStorage.getItem("customerDetails"))));
                navigate("/customer/home");
            }
        }
        fetchDataFromLocalStorage();
    })

    return (
        <div className="Auth-form-container">
            <div className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Welcome to Hotel Management System</h3>
                    <div className="d-grid gap-2 mt-4 ">


                            <button className="btn btn-primary"
                                    onClick={() => {navigate("/staff/login")}}
                                    type="submit">Staff Login</button>


                    </div>

                    <div className="d-grid gap-2 mt-4">

                            <button className="btn btn-primary"
                                    onClick={() => {navigate("/customer/login")}}type="submit">Guest Login</button>

                    </div>
                    <div className="d-grid gap-2 mt-4">

                            <button className="btn btn-primary"
                                    onClick={() => {navigate("/customer/register")}}
                                    type="submit">
                                Guest Registration
                            </button>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default HomePage;