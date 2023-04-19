import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getStaffByIdThunk, loginStaffThunk} from "../../services/staff-thunk";
import "./index.css"


const StaffLogin = () => {

    const [staffId, setStaffId] = useState('');
    const [password, setPassword] = useState('');

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
        <div className="Auth-form-container">
            <div className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title ">Staff Login</h3>
                    <div className="form-group mt-3">
                        <label > Username</label>
                    </div>
                    <input className="form-control mt-1"
                          placeholder="Enter username"
                               onChange={(e) => setStaffId(e.target.value)}/>
                    <div className="form-group mt-3">
                        <label> Password</label>
                    </div>
                    <input className="form-control mt-1"
                           placeholder="Enter password"
                               onChange={(e) => setPassword(e.target.value)}/>
                    <div className="d-grid gap-2 mt-3">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default StaffLogin;