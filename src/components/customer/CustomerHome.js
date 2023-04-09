import {useSelector} from "react-redux";

const CustomerHome = () => {

    const {currentCustomer} = useSelector(state => state.customerData);

    return (
        <div>
            <h1> Customer Home {currentCustomer.firstName}</h1>
        </div>
    );
}

export default CustomerHome;