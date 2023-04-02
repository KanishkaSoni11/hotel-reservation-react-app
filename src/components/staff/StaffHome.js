import StaffLogin from "./StaffLogin";
import {useSelector} from "react-redux";

const StaffHome = () =>{

    const staffData = useSelector(state => state.staffData);

    return(

        <>
        <h1> Staff Home {staffData.staffId.firstName}</h1>

            {console.log(staffData.staffId.firstName)}

        </>
    )
}

export default StaffHome;