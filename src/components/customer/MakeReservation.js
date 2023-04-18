import {useDispatch, useSelector} from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {makeReservationThunk} from "../../services/customer-thunk";

const MakeReservation = () => {
    const {currentCustomer, currentReservation} = useSelector(state => state.customerData);

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [numRooms, setNumRooms] = useState(0);
    const [numGuests, setNumGuests] = useState(0);
    const [roomType, setRoomType] = useState("KING");

    const [isReservationPlace, setIsReservationPlaced] = useState(true);


    const handleOnChange = (field, value) => {
        switch (field) {
            case 'fromDate':
                setFromDate(value);
                break;
            case 'toDate':
                setToDate(value);
                break;
            case 'numRooms':
                setNumRooms(+value);
                break;
            case 'numGuests':
                setNumGuests(+value);
                break;
            default:
                break;
        }
    }

    const dispatch = useDispatch();

    const handlePlaceReservation  = async () => {
        console.log("Checking if reservation is possible or not");
        const reservationDetails = {currentCustomer, fromDate, toDate, numRooms, numGuests, roomType};
        const reservation = await dispatch(makeReservationThunk(reservationDetails));
        console.log(reservation)
        if (reservation.payload.reservation_number !== undefined) {
           alert("Congratulations! Your reservation has been placed!")
            setIsReservationPlaced(false);
        } else {
            alert("Reservation Not Possible");
        }
    }

    return(
        <div className="container">
            <div className="d-block">
                <Form.Control type="date" placeholder="Check In Date" onChange={(event) => {
                    handleOnChange('fromDate', event.target.value);
                }}/>
                <Form.Control type="date" placeholder="Check Out Date" onChange={(event) => {
                    handleOnChange('toDate', event.target.value);
                }}/>
                <Form.Control type="number" placeholder="Number of Rooms" onChange={(event) => {
                    handleOnChange('numRooms', event.target.value);
                }}/>
                <Form.Control type="number" placeholder="Number of Guests" onChange={(event) => {
                    handleOnChange('numGuests', event.target.value);
                }}/>
                <Button variant="primary" active={isReservationPlace} onClick={handlePlaceReservation}>Make Reservation</Button>
            </div>
        </div>

    );
}

export default MakeReservation;