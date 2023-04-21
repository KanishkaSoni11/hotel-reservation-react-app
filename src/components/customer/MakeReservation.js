import {useDispatch, useSelector} from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {makeReservationThunk} from "../../services/customer-thunk";

const MakeReservation = ({isActive}) => {
    const {currentCustomer, currentReservation} = useSelector(state => state.customerData);

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [numRooms, setNumRooms] = useState(0);
    const [numGuests, setNumGuests] = useState(0);
    const [roomType, setRoomType] = useState("INIT");

    const [isReservationPlace, setIsReservationPlaced] = useState(true);

    console.log("Make reservation is " + isActive);
    const handleOnChange = (field, value) => {
        let date = new Date().toISOString().slice(0, 10);
        console.log(value);
        switch (field) {
            case 'fromDate':
                if (value <= date) {
                    alert("You cannot choose a check-in date that is older than today");
                } else {
                    setFromDate(value);
                }
                break;
            case 'toDate':
                if (value <= date) {
                    alert("You cannot choose a check-out date that is older than today");
                } else if ( value <= fromDate) {
                    alert("You cannot choose a check-out date that is older than check-in date");
                }else {
                    setToDate(value);
                }
                break;
            case 'numRooms':
                let finalVal = +value;
                if (finalVal <= 0) {
                    alert("Please enter a valid number of rooms");
                } else {
                    setNumRooms(+value);
                }
                break;
            case 'numGuests':
                let guestVal = +value;
                if (guestVal <= 0) {
                    alert("Please enter a valid number of guests");
                } else {
                    setNumGuests(+value);
                }
                break;
            case 'roomType':
                setRoomType(value);
                break;
            default:
                break;
        }
    }

    const dispatch = useDispatch();

    const handlePlaceReservation  = async () => {
        let date = new Date().toISOString().slice(0, 10);
        if (fromDate <= date) {
            alert("You cannot choose a check-in date that is older than today")
        } else if (toDate <= date) {
            alert("You cannot choose a check-out date that is older than today");
        } else if (toDate <= fromDate) {
            alert("You cannot choose a check-out date that is older than check-in date");
        } else if (roomType == "INIT" || roomType == "-1") {
            alert("Please choose a valid room type");
        } else {
            console.log("Checking if reservation is possible or not");
            const reservationDetails = {
                currentCustomer,
                fromDate,
                toDate,
                numRooms,
                numGuests,
                roomType
            };
            const reservation = await dispatch(makeReservationThunk(reservationDetails));
            console.log(reservation)
            if (reservation.payload.reservationNumber !== undefined) {
                alert("Congratulations! Your reservation has been placed!")
                setIsReservationPlaced(false);
            } else {
                alert("Reservation Not Possible");
            }
        }
    }

    return(
        <div className="container">
            <div>
                <div className="d-flex">
                    <div className="d-block mx-4">
                        <Form.Label className="m-2">Check-in Date</Form.Label>
                        <Form.Control className="m-2" type="date" placeholder="Check In Date" onChange={(event) => {
                            handleOnChange('fromDate', event.target.value);
                        }}/>
                    </div>
                    <div className="d-block mx-4">
                        <Form.Label className="m-2">Check-Out Date</Form.Label>
                        <Form.Control className="m-2" type="date" placeholder="Check Out Date" onChange={(event) => {
                            handleOnChange('toDate', event.target.value);
                        }}/>
                    </div>
                    <div className="d-block mx-4">
                        <Form.Label className="m-2">Number Of Rooms</Form.Label>
                        <Form.Control className="m-2" type="number" placeholder="Number of Rooms" onChange={(event) => {
                            handleOnChange('numRooms', event.target.value);
                        }}/>
                    </div>
                    <div className="d-block mx-4">
                        <Form.Label className="m-2">Number Of Guests</Form.Label>
                        <Form.Control className="m-2" type="number" placeholder="Number of Guests" onChange={(event) => {
                            handleOnChange('numGuests', event.target.value);
                        }}/>
                    </div>
                    <div className="d-block mx-4">
                        <Form.Label className="m-2">Room Type</Form.Label>
                        <Form.Select className="m-2" placeholder="Room Type" onChange={(event) => {
                            console.log("roomtype", event.target.value);
                            handleOnChange('roomType', event.target.value);
                        }}>
                            <option value="-1">Select a Room Type</option>
                            <option value="KING">KING</option>
                            <option value="SUITE">SUITE</option>
                        </Form.Select>
                    </div>
                    <div className="d-block mx-4">
                        <Form.Label className="m-2"></Form.Label>
                        {isActive ? <Button className="m-2" disabled variant="primary" onClick={handlePlaceReservation}>Search</Button> :
                         <Button className="m-2" variant="primary" onClick={handlePlaceReservation}>Search</Button> }
                    </div>
                </div>
            </div>
        </div>

    );
}

export default MakeReservation;