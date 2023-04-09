import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CustomerRegistration = () => {
    return (
        <div className="container">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email"/>

                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name"/>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name"/>
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text" placeholder="Street"/>
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="State"/>
                    <Form.Label>ZipCode</Form.Label>
                    <Form.Control type="number" placeholder="ZipCode"/>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="number" placeholder="Contact Number"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default CustomerRegistration;