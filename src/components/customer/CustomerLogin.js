import {useState} from "react";
import {
    getOrderHistoryFromCustomerIdThunk,
    getReservationFromCustomerIdThunk,
    loginCustomerThunk
} from "../../services/customer-thunk";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

const CustomerLogin = () => {

    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCustomerLogin = async () => {
        const customerDetails = {emailId, password}
        console.log(customerDetails);
        const loginCustomer = await dispatch(loginCustomerThunk(customerDetails));
        console.log(loginCustomer)
        if (loginCustomer.payload.customerID !== undefined) {
            const customerReservations = await dispatch(getReservationFromCustomerIdThunk(loginCustomer.payload.customerID));
            localStorage.setItem("customerDetails" , JSON.stringify(loginCustomer.payload));
            const customerOrders = await dispatch(getOrderHistoryFromCustomerIdThunk(loginCustomer.payload.customerID));
            navigate('/customer/home');
        } else {
            alert("Invalid email or password. Please retry");
        }
    }

    const handleTextFieldChange = (fieldName, targetValue) => {
        switch (fieldName) {
            case 'emailId':
                setEmailId(targetValue);
                break;
            case 'password':
                setPassword(targetValue);
                break;
            default:
                break;
        }
    }

    return (
        <div className="Auth-form-container">
            <div className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title ">Guest Login</h3>
                    <div className="form-group mt-3">
                        <label> Email Id</label>
                    </div>
                    <input className="form-control mt-1"
                           placeholder="Enter username" onChange={(event) => {
                        handleTextFieldChange('emailId', event.target.value);
                    }}/>
                    <div className="form-group mt-3">
                        <label> Password</label>
                    </div>
                    <input className="form-control mt-1" type="password"
                           placeholder="Enter password" onChange={(event) => {
                        handleTextFieldChange('password', event.target.value);
                    }}/>
                    <div className="d-grid gap-2 mt-3">
                        <button
                            type="submit"
                            className="btn btn-primary" onClick={handleCustomerLogin}>Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerLogin;