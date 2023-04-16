import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';

const HomePage = () => {
    return (
        <div className="container d-grid gap-2 align-content-center">
            <Link to="/staff/login"><Button>Staff Login</Button></Link>
            <Link to="/customer/login"><Button>Guest Login</Button></Link>
            <Link to="/customer/register"><Button >Guest Registration</Button></Link>
        </div>
    );
}

export default HomePage;