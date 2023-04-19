import {useEffect, useState} from "react";
import {getActiveReservations} from "../../services/staff-service";
import Table from "react-bootstrap/Table";
import {ButtonToolbar} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {checkoutCustomer} from "../../services/customer-service";
import {useSelector} from "react-redux";

const ActiveReservations = () => {

    const [activeResList, setActiveRestList] = useState([]);
    const {currentCustomer, reservationDetails, orderList} = useSelector(state => state.customerData);

    const handleCheckout = async (customerId,roomNumber) => {
        console.log("cid" ,customerId);
        console.log("resNumber",roomNumber);
        const res = await checkoutCustomer(customerId, roomNumber);
        if (res) {
            alert("Checkout done");
            const newList = activeResList.filter(a => a.roomNumber !== roomNumber)
            setActiveRestList(newList)
        }
    }

    useEffect(() => {
        const fetchActiveRes = async () => {
            const data = await getActiveReservations();
            setActiveRestList(data);

        }
        fetchActiveRes();
    }, [])

    return (

        <div className="container p-2 m-2">
            <h2>Active Reservations</h2>
            <br/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Check-in Date</th>
                    <th>Check-out Date</th>
                    <th>Type Of Room</th>
                    <th>Room Number</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>


                {
                    activeResList?.map((res) => (
                        <>
                            <tr>
                                <td>{res.firstName}</td>
                                <td>{res.dateFrom}</td>
                                <td>{res.dateTo}</td>
                                <td>{res.typeOfRoom}</td>
                                <td>{res.roomNumber}</td>
                                <td>
                                    <Button
                                        onClick={() => handleCheckout(res.customerId, res.roomNumber)}
                                        variant="danger"
                                    >
                                        Check out
                                    </Button>
                                </td>
                            </tr>

                        </>
                    ))
                }
                </tbody>
            </Table>
        </div>
    )
}

export default ActiveReservations;