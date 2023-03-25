import {Button, TextField} from "@mui/material";
import {Link} from "react-router-dom";

const CustomerRegistration = () => {
    return (
        <div className="container">
            <TextField id="outlined-basic" label="Username" variant="outlined" />
            <TextField id="outlined-basic" label="Password" variant="outlined" />
            <Link to="/customer/home"><Button variant="contained">Register</Button></Link>
        </div>
    );
}

export default CustomerRegistration;