import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
        const customer = {customerId, password, firstName, lastName, street, state, zipCode,
            emailId, contactNumber, identificationNum}
        const registerCustomer = await dispatch(registerCustomerThunk(customer));
        console.log(registerCustomer)
        if (registerCustomer.payload.customerID !== undefined) {
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
        <div className="container">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={(event) => {
                        handleFieldOnChange('emailId', event.target.value);
                    }}/>

                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(event) => {
                        handleFieldOnChange('password', event.target.value);
                    }}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" onChange={(event) => {
                        handleFieldOnChange('firstName', event.target.value);
                    }}/>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" onChange={(event) => {
                        handleFieldOnChange('lastName', event.target.value);
                    }}/>
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text" placeholder="Street" onChange={(event) => {
                        handleFieldOnChange('street', event.target.value);
                    }}/>
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="State" onChange={(event) => {
                        handleFieldOnChange('state', event.target.value);
                    }}/>
                    <Form.Label>ZipCode</Form.Label>
                    <Form.Control type="number" placeholder="ZipCode" onChange={(event) => {
                        handleFieldOnChange('zipCode', event.target.value);
                    }}/>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="number" placeholder="Contact Number" onChange={(event) => {
                        handleFieldOnChange('contactNumber', event.target.value);
                    }}/>
                </Form.Group>

                <Button variant="primary" onClick={handlerCustomerRegistration}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default CustomerRegistration;