import {Button, TextField} from "@mui/material";
import {Link} from "react-router-dom";

const CustomerLogin = () => {
    return (
        <div className="container d-block">
            <TextField id="outlined-basic" label="Username" variant="outlined" />
            <TextField id="outlined-basic" label="Password" variant="outlined" />
            <Link to="/customer/home"><Button variant="contained">Login</Button></Link>
        </div>
    );
}

export default CustomerLogin;