import {useDispatch, useSelector} from "react-redux";
import MakeReservation from "./MakeReservation";
import PlaceFoodOrder from "./PlaceFoodOrder";
import {useEffect, useState} from "react";
import {getRoomsForReservation} from "../../services/food-service";
import Table from 'react-bootstrap/Table';
import {
    getCustomerDetailsFromLocalStorageThunk,
    getOrderHistoryFromCustomerIdThunk,
    getReservationFromCustomerIdThunk, logoutResetStateThunk
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
            } else {
                return undefined;
            }

        }
        const fetchRooms = async (customer) => {
            console.log("Fetching other details")
            // console.log(customer);
            if (customer === undefined) {
                customer = currentCustomer
            }
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
        <div className="container p-2 m-2">
                <div className="row m-2 ms-0 pe-4">
                    <div className="col-11">
                        <h1 className="justify-content-start align-items-end"> Welcome {currentCustomer.firstName} !</h1>
                    </div>
                    <div className="col-1">
                        <Button className="justify-content-end " variant="danger" onClick={async () => {
                            if (localStorage.getItem("customerDetails")) {
                                console.log("Logging out")
                                localStorage.removeItem("customerDetails");
                                const out = await dispatch(logoutResetStateThunk())
                                navigate("/")
                            } else {
                                console.log("Logging out")
                                localStorage.removeItem("staffDetails");
                                const out = await dispatch(logoutResetStateThunk())
                                navigate("/")
                            }
                        }}>Logout</Button>
                    </div>
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
                            <th>Type of Room</th>
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
                            <td>{reservationDetails.typeOfRoom}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
                :
             <div>
                 <h5>You have no pending reservations</h5>
             </div>
            }
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
                            <th>Type of Room</th>
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
                            <td>{reservationDetails.typeOfRoom}</td>
                            <td>{room.join(",")}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
                :
             <div>
                 <h5>You have no active reservations</h5>
             </div>
            }
            <br/>
            <PlaceFoodOrder/>
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
                </div> :
                <div>
                    <h5>You have no food orders</h5>
                </div>
            }


        </div>
    );
}

export default CustomerHome;