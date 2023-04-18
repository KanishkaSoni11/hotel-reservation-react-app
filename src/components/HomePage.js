import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';

const HomePage = () => {
    return (
        <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-4">
                    <Link to="/staff/login"><Button>Staff Login</Button></Link>
                </div>
                <div className="col-4">
                    <Link to="/customer/login"><Button>Guest Login</Button></Link>
                </div>
                <div className="col-4">
                    <Link to="/customer/register"><Button >Guest Registration</Button></Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;