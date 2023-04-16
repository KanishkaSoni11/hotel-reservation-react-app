import {useSelector} from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";

const MakeReservation = () => {
    const {currentCustomer} = useSelector(state => state.customerData);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [numRooms, setNumRooms] = useState(0);

    const [isReservationPossible, setIsReservationPossible] = useState(false);

    const handleOnChange = (field, value) => {
        switch (field) {
            case 'fromDate':
                setFromDate(value);
                break;
            case 'toDate':
                setToDate(value);
                break;
            case 'numRooms':
                setNumRooms(value);
                break;
            default:
                break;
        }
    }

    const handleIsReservationPossibleClick  = () => {
        console.log("Checking if reservation is possible or not");
        const reservationDetails = {fromDate, toDate, numRooms};
    }

    return(
        <div className="container d-block">
            <Form.Control type="date" placeholder="Check In Date" onChange={(event) => {
                handleOnChange('fromDate', event.target.value);
            }}/>
            <Form.Control type="date" placeholder="Check Out Date" onChange={(event) => {
                handleOnChange('toDate', event.target.value);
            }}/>
            <Form.Control type="number" placeholder="Number of Rooms" onChange={(event) => {
                handleOnChange('numRooms', event.target.value);
            }}/>
            <Button variant="primary" onClick={handleIsReservationPossibleClick}>Make Reservation</Button>
        </div>
    );
}

export default MakeReservation;