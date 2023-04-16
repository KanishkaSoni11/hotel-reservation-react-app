import {useState} from "react";
import {loginCustomerThunk} from "../../services/customer-thunk";
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
        <div className="container d-block">
            <Form.Control type="email" placeholder="Email" onChange={(event) => {
                handleTextFieldChange('emailId', event.target.value);
            }}/>
            <Form.Control type="password" placeholder="Password" onChange={(event) => {
                handleTextFieldChange('password', event.target.value);
            }}/>
            <Button variant="primary" onClick={handleCustomerLogin}>Login</Button>
        </div>
    );
}

export default CustomerLogin;