import {useSelector} from "react-redux";
import MakeReservation from "./MakeReservation";
import PlaceFoodOrder from "./PlaceFoodOrder";

const CustomerHome = () => {

    const {currentCustomer, reservationDetails} = useSelector(state => state.customerData);
    console.log(currentCustomer);
    console.log(reservationDetails);
    return (
        <div>
            <h1> Customer Home {currentCustomer.firstName}</h1>
            <MakeReservation />
            <PlaceFoodOrder />
        </div>
    );
}

export default CustomerHome;