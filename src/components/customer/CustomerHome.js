import {useSelector} from "react-redux";
import MakeReservation from "./MakeReservation";
import PlaceFoodOrder from "./PlaceFoodOrder";
import {useEffect, useState} from "react";
import {getRoomsForReservation} from "../../services/food-service";
import Table from 'react-bootstrap/Table';

const CustomerHome = () => {

    const {currentCustomer, reservationDetails} = useSelector(state => state.customerData);
    const [room, setRoom] = useState([])
    console.log(currentCustomer);
    console.log(reservationDetails);


    useEffect(() => {
        const fetchRooms = async () => {
            const rooms = await getRoomsForReservation(reservationDetails.reservationNumber);
            const roomList = rooms.data.map(r => r.roomNumber)
            console.log(roomList)
            setRoom(roomList);
        }
        fetchRooms();
    }, [])

    return (
        <div>
            <h1> Customer Home {currentCustomer.firstName}</h1>
            <MakeReservation isActive={reservationDetails.reservationNumber}/>
            <br/>
            <h2>Pending Reservations</h2>
            {reservationDetails?.reservationNumber !== undefined && room?.length === 0 ?
             <div>
                 <Table striped bordered hover>
                     <thead>
                     <tr>
                         <th>Reservation Number</th>
                         <th>Date of Reservation</th>
                         <th>Check-in Date</th>
                         <th>Check-out Date</th>
                         <th>Number of Guests</th>
                         <th>Number of Rooms</th>
                         <th>Rooms</th>
                     </tr>
                     </thead>
                     <tbody>
                     <tr>
                         <td>{reservationDetails.reservationNumber}</td>
                         <td>{reservationDetails.dateOfReservation}</td>
                         <td>{reservationDetails.fromDate}</td>
                         <td>{reservationDetails.toDate}</td>
                         <td>{reservationDetails.numberOfGuests}</td>
                         <td>{reservationDetails.numberOfRooms}</td>
                     </tr>
                     </tbody>
                 </Table>
             </div>
                             : null}
            <br/>
            <h2>Active Reservations</h2>
            {reservationDetails?.reservationNumber !== undefined && room?.length > 0 ?
                <div>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Reservation Number</th>
                            <th>Date of Reservation</th>
                            <th>Check-in Date</th>
                            <th>Check-out Date</th>
                            <th>Number of Guests</th>
                            <th>Number of Rooms</th>
                            <th>Rooms</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{reservationDetails.reservationNumber}</td>
                            <td>{reservationDetails.dateOfReservation}</td>
                            <td>{reservationDetails.fromDate}</td>
                            <td>{reservationDetails.toDate}</td>
                            <td>{reservationDetails.numberOfGuests}</td>
                            <td>{reservationDetails.numberOfRooms}</td>
                            <td>{room.join(",")}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
                             : null}
            <br/>
            <PlaceFoodOrder />
        </div>
    );
}

export default CustomerHome;