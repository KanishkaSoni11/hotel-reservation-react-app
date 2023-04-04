import StaffLogin from "./StaffLogin";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

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

        <>
        <h1> Staff Home {currentStaff.firstName}</h1>

            { console.log("home" ,currentStaff)}
            <div className="container">
                <Button variant="contained"
                        type="submit"
                        className="btn btn-dark"
                        onClick={handleFoodButton}>
                    Food

                </Button>

                <Button variant="contained"
                        type="submit"
                        className="btn btn-dark"
                        onClick={handleRoomButton}>
                    Room

                </Button>
            </div>

        </>
    )
}

export default StaffHome;