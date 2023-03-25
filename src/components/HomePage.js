import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <div className="container">
            <Button variant="contained">Staff Login</Button>
            <Link to="/customer/login"><Button variant="contained">Guest Login</Button></Link>
            <Link to="/customer/register"><Button variant="contained">Guest Registration</Button></Link>
        </div>
    );
}

export default HomePage;