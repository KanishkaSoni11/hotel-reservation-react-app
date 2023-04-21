
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {registerCustomerThunk} from "../../services/customer-thunk";

const CustomerRegistration = () => {

    const [customerId, setCustomerId] = useState(0);
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState(0);
    const [emailId, setEmailId] = useState('');
    const [contactNumber, setContactNumber] = useState(0);
    const [identificationNum, setIdentificationNum] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlerCustomerRegistration = async () => {
        const customer = {
            customerId, password, firstName, lastName, street, state, zipCode,
            emailId, contactNumber, identificationNum
        }
        const registerCustomer = await dispatch(registerCustomerThunk(customer));
        console.log(registerCustomer)
        if (registerCustomer.payload.customerID !== undefined) {
            if (localStorage.getItem("customerDetails")) {
                localStorage.removeItem("customerDetails");
            }
            localStorage.setItem("customerDetails", JSON.stringify(registerCustomer.payload));
            navigate('/customer/home');
        } else {
            alert("Error while registering user");
        }
    }

    const handleFieldOnChange = (fieldName, targetValue) => {
        switch (fieldName) {
            case 'emailId':
                setEmailId(targetValue);
                break;
            case 'password':
                setPassword(targetValue);
                break;
            case 'firstName':
                setFirstName(targetValue);
                break;
            case 'lastName':
                setLastName(targetValue);
                break;
            case 'street':
                setStreet(targetValue)
                break;
            case 'state':
                setState(targetValue);
                break;
            case 'zipCode':
                setZipCode(targetValue);
                break;
            case 'contactNumber':
                setContactNumber(targetValue);
                break;
            default:
                break;
        }
    }
    return (
        <div className="Auth-form-container">

            <div className="Auth-form">
                <div className="Auth-form-content">
                    <div className="mb-3">
                        <h3 className="Auth-form-title">Sign Up</h3>
                        <div className="form-group mt-2">
                            <label>Email address</label>
                            <input
                                className="form-control mt-1"
                                placeholder="Email" onChange={(event) => {
                                handleFieldOnChange('emailId', event.target.value);
                            }}/>
                        </div>
                        <div className="form-group mt-2">
                            <label>Password</label>
                            <input
                                className="form-control mt-1" type="password"
                                placeholder="password" onChange={(event) => {
                                handleFieldOnChange('password', event.target.value);
                            }}/>
                        </div>


                        <div className="form-group mt-2">
                            <label>First Name</label>
                            <input
                                className="form-control mt-1" placeholder="First Name" onChange={(event) => {
                                handleFieldOnChange('firstName', event.target.value);
                            }}/>
                        </div>
                        <div className="form-group mt-2">
                        <label>Last Name</label>
                        <input
                            className="form-control mt-1" placeholder="Last Name" onChange={(event) => {
                            handleFieldOnChange('lastName', event.target.value);
                        }}/>
                        </div>
                        <div className="form-group mt-2">
                        <label>Street</label>
                        <input
                            className="form-control mt-1" placeholder="Street" onChange={(event) => {
                            handleFieldOnChange('street', event.target.value);
                        }}/>
                        </div>
                        <div className="form-group mt-2">
                        <label>State</label>
                        <input
                            className="form-control mt-1" placeholder="State" onChange={(event) => {
                            handleFieldOnChange('state', event.target.value);
                        }}/>
                        </div>
                        <div className="form-group mt-2">
                        <label>ZipCode</label>
                        <input
                            className="form-control mt-1" type="number" placeholder="ZipCode" onChange={(event) => {
                            handleFieldOnChange('zipCode', event.target.value);
                        }}/>
                        </div>
                        <div className="form-group mt-2">
                        <label>Contact Number</label>
                        <input
                            className="form-control mt-1" type="number" placeholder="Contact Number"
                            onChange={(event) => {
                                handleFieldOnChange('contactNumber', event.target.value);
                            }}/>
                        </div>

                        <div className="d-grid gap-2 mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary" onClick={handlerCustomerRegistration}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerRegistration;