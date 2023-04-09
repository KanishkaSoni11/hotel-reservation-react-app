import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const CustomerHome = () => {

    const {currentCustomer} = useSelector(state => state.customerData);
    const navigate = useNavigate();
    return (
        <div>
            <h1> Customer Home {currentCustomer.firstName}</h1>
        </div>
    );
}

export default CustomerHome;