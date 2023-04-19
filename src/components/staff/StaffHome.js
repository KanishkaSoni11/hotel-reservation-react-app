import StaffLogin from "./StaffLogin";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import ActiveReservations from "./ActiveReservations";

const StaffHome = () =>{

    const {currentStaff} = useSelector(state => state.staffData);
    const navigate = useNavigate();

    const handleFoodButton = async () => {
        navigate("/staff/food");
    }

    const handleRoomButton = async () => {
        navigate("/staff/room");
    }
    return(

        <div className="container p-2 m-2">
        <h1 > Welcome to Staff Portal {currentStaff.firstName}</h1>
            <Button variant="contained"
                    type="submit"
                    className="btn btn-dark m-2 p-2 "
                    onClick={handleFoodButton}>
                Pending Food Orders

            </Button>

            <Button variant="contained"
                    type="submit"
                    className="btn btn-dark m-2 p-2"
                    onClick={handleRoomButton}>
                Pending Room Assignments

            </Button>
            <ActiveReservations/>
            <br></br>
            { console.log("home" ,currentStaff)}
            <div className="container">

            </div>

        </div>
    )
}

export default StaffHome;