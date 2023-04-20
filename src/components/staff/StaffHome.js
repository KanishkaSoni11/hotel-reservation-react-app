import StaffLogin from "./StaffLogin";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import ActiveReservations from "./ActiveReservations";
import {useEffect} from "react";
import {getStaffDetailsFromLocalStorageThunk} from "../../services/staff-thunk";

const StaffHome = () =>{

    const {currentStaff} = useSelector(state => state.staffData);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFoodButton = async () => {
        navigate("/staff/food");
    }

    const handleRoomButton = async () => {
        navigate("/staff/room");
    }

    useEffect(() => {
        const fetchDataFromLocalStorage = async () => {
            if (localStorage.getItem("staffDetails")) {
                const staffDetails = JSON.parse(localStorage.getItem("staffDetails"));
                const res = await dispatch(getStaffDetailsFromLocalStorageThunk(staffDetails));
            }
        }
        fetchDataFromLocalStorage();
    }, [])


    return(

        <div className="container p-2 m-2">
        <h1 > Welcome to Staff Portal {currentStaff.firstName}</h1>
            <Button variant="primary"
                    type="submit"
                    className="m-2 p-2 "
                    onClick={handleFoodButton}>
                Pending Food Orders

            </Button>

            <Button variant="primary"
                    type="submit"
                    className="m-2 p-2"
                    onClick={handleRoomButton}>
                Pending Room Assignments

            </Button>
            <Button className="justify-content-end m-2 p-2" variant="danger" onClick={() => {
                if (localStorage.getItem("customerDetails")) {
                    console.log("Logging out")
                    localStorage.removeItem("customerDetails");
                    navigate("/")
                } else {
                    console.log("Logging out")
                    localStorage.removeItem("staffDetails");
                    navigate("/")
                }
            }}>Logout</Button>
            <ActiveReservations/>
            <br></br>
            { console.log("home" ,currentStaff)}
            <div className="container">

            </div>

        </div>
    )
}

export default StaffHome;