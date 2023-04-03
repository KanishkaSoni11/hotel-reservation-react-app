import {Button, TextField} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getStaffByIdThunk, loginStaffThunk} from "../../services/staff-thunk";


const StaffLogin = () => {

    const [staffId, setStaffId] = useState('');
    const[password, setPassword ] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const staff = {staffId, password}
        const loginRes = await dispatch(loginStaffThunk(staff));

        if (loginRes.payload.staffId === undefined) {
            // console.log("if",loginRes)
            alert('Invalid username or password!')
        } else {
            // console.log("else" ,loginRes)
            navigate("/staff/home");
        }

    }

    return (
        <div className="container">
            <TextField id="outlined-basic"
                       label="Username"
                       variant="outlined"
                       onChange={(e) => setStaffId(e.target.value)}/>
            <TextField id="outlined-basic"
                       label="Password"
                       variant="outlined"
                       onChange={(e) => setPassword(e.target.value)}/>
            <Button variant="contained"
                    type="submit"
                    className="btn btn-dark"
                    onClick={handleLogin}>
                Login

            </Button>
        </div>
    );
}

export default StaffLogin;