import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';

const HomePage = () => {
    const navigate = useNavigate();
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