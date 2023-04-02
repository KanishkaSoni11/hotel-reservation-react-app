import {Button, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {getStaffByIdThunk} from "../../services/staff-thunk";

const StaffLogin = () => {

    const [staffId,setStaffId] = useState('');
    const dispatch= useDispatch();


    const handleLogin = async() =>{
        const loginRes = await dispatch(getStaffByIdThunk(staffId));

    }

    return (
        <div className="container">
            <TextField id="outlined-basic"
                       label="Username"
                       variant="outlined"
                       onChange={(e) =>setStaffId(e.target.value)}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" />
            <Link to="/staff/home"><Button
                variant="contained"
                onClick={handleLogin}
            >Login</Button></Link>
        </div>
    );
}

export default StaffLogin;