import {useSelector} from "react-redux";
import MakeReservation from "./MakeReservation";

const CustomerHome = () => {

    const {currentCustomer} = useSelector(state => state.customerData);

    return (
        <div>
            <h1> Customer Home {currentCustomer.firstName}</h1>
            <MakeReservation />
        </div>
    );
}

export default CustomerHome;