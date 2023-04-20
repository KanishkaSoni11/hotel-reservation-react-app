import {useDispatch, useSelector} from "react-redux";
import MakeReservation from "./MakeReservation";
import PlaceFoodOrder from "./PlaceFoodOrder";
import {useEffect, useState} from "react";
import {getRoomsForReservation} from "../../services/food-service";
import Table from 'react-bootstrap/Table';
import {
    getCustomerDetailsFromLocalStorageThunk,
    getOrderHistoryFromCustomerIdThunk,
    getReservationFromCustomerIdThunk
} from "../../services/customer-thunk";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

const CustomerHome = () => {

    const {currentCustomer, reservationDetails, orderList} = useSelector(state => state.customerData);
    console.log("id", currentCustomer.customerID);
    console.log("number", reservationDetails.reservationNumber);

    const [room, setRoom] = useState([])
    console.log(currentCustomer);
    console.log(reservationDetails);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFromLocalStorage = async () => {
            if (currentCustomer.customerID === undefined && localStorage.getItem("customerDetails")) {
                console.log("Checking localstrorage first")
                console.log(JSON.parse(localStorage.getItem("customerDetails")));
                const res = await dispatch(getCustomerDetailsFromLocalStorageThunk(
                    JSON.parse(localStorage.getItem("customerDetails"))));
                return res.payload;
            }
        }
        const fetchRooms = async (customer) => {
            console.log("Fetching other details")
            console.log(customer);
            const customerReservations = await dispatch(getReservationFromCustomerIdThunk(customer.customerID));
            const customerOrders = await dispatch(getOrderHistoryFromCustomerIdThunk(customer.customerID));
            console.log(customerReservations);
            const rooms = await getRoomsForReservation(customerReservations.payload.reservationNumber);
            const roomList = rooms.data.map(r => r.roomNumber)
            console.log(roomList)
            setRoom(roomList);
            console.log(currentCustomer);
            console.log(reservationDetails);
        }
        fetchFromLocalStorage().then(r => fetchRooms(r));
    }, [])

    console.log(currentCustomer);
    console.log(reservationDetails);

    return (
        <div>
            <div>
                <h1 className="justify-content-start"> Welcome {currentCustomer.firstName} !</h1>
                <Button className="justify-content-end" variant="danger" onClick={() => {
                    if (localStorage.getItem("customerDetails")) {
                        console.log("Logging out")
                        localStorage.removeItem("customerDetails");
                        navigate("/")
                    } else {
                        console.log("Logging out")
                        localStorage.removeItem("staffDetails");
                        navigate("/")
                    }
                }}>Logout</Button>
            </div>
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
                            <th>Rooms Assigned</th>
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
            <br/>
            <h2>Orders</h2>
            <br/>
            {orderList?.length > 0 ?
             <div>
                 <Table striped bordered hover>
                     <thead>
                     <tr>
                         <th>Order ID</th>
                         <th>Room Number</th>
                         <th>Food Item Name</th>
                         <th>Quantity</th>
                         <th>Status</th>
                     </tr>
                     </thead>
                     <tbody>
                     {orderList.map((order) => {
                         return (
                             <>
                                 <tr>
                                     <td>{order.orderId}</td>
                                     <td>{order.roomNumber}</td>
                                     <td>{order.itemName}</td>
                                     <td>{order.quantity}</td>
                                     <td>{order.status}</td>
                                 </tr>
                             </>
                         );
                     })}
                     </tbody>
                 </Table>
             </div> : null}


        </div>
    );
}

export default CustomerHome;