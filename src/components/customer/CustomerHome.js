import {useSelector} from "react-redux";
import MakeReservation from "./MakeReservation";
import PlaceFoodOrder from "./PlaceFoodOrder";
import Button from "react-bootstrap/Button";
import {checkoutCustomer} from "../../services/customer-service";
import {useNavigate} from "react-router-dom";

const CustomerHome = () => {

    const {currentCustomer, reservationDetails} = useSelector(state => state.customerData);
    console.log("id", currentCustomer.customerID);
    console.log("number", reservationDetails.reservationNumber);

    const handleCheckout = async () => {
        const customerId = currentCustomer.customerID;
        const resNumber = reservationDetails.reservationNumber;
        const res = await checkoutCustomer(customerId, resNumber);
        if(res){
            alert("Checkout done");
        }


    }
    return (
        <div>
            <h1> Customer Home {currentCustomer.firstName}</h1>
            <Button
                onClick={() => handleCheckout()}
                variant="primary">
                Checkout
            </Button>
            <MakeReservation/>
            <PlaceFoodOrder/>
        </div>
    );
}

export default CustomerHome;