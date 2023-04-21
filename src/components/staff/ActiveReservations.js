import {useEffect, useState} from "react";
import {getActiveReservations} from "../../services/staff-service";
import Table from "react-bootstrap/Table";
import {ButtonToolbar, Modal, Toast} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {checkoutCustomer, getBillDetails, getTotalBill, updateBillPaid} from "../../services/customer-service";
import {useSelector} from "react-redux";
import FinalBillModal from "./FinalBillModal";

const ActiveReservations = () => {

    const [activeResList, setActiveRestList] = useState([]);
    const [checkoutIndex, setCheckoutIndex] = useState(null);
    // const {currentCustomer, reservationDetails, orderList} = useSelector(state => state.customerData);
    const [show, setShow] = useState(false);
    const [billList, setBillList] = useState([]);
    const [totalCost, setTotalCost] = useState();

    const handleClose = () => {
        setShow(false)
    };


    const handleCheckout = async (index) => {

        let {customerId, roomNumber} = activeResList[index]
        console.log("handleCheckout handle checkout ::customerID::", customerId);
        console.log("handleCheckout handle checkout ::roomNumber::", roomNumber);

        const res = await checkoutCustomer(customerId, roomNumber);
        const fetchBillDetails = async () => {
            const data = await getBillDetails(roomNumber);
            setBillList(data);
        }
        const fetchTotalCost = async () => {
            const data = await getTotalBill(roomNumber)
            setTotalCost(data)
        }

        if (res) {
            await fetchBillDetails();
            await fetchTotalCost();
            setShow(true);
            setCheckoutIndex(index)
        }

    }

    const handleBillPaid = async (customerId, roomNumber) => {

        console.log("handleBillPaid bill paid ::customerId::", customerId);
        console.log("handleBillPaid bill paid ::roomNumber::", roomNumber);
        const updateRes = await updateBillPaid(roomNumber, customerId);
        if (updateRes) {
            {
                setShow(false);
                alert("Bill Paid successfully !")
                const newList = activeResList.filter(a => a.roomNumber !== roomNumber)
                setActiveRestList(newList);
                setCheckoutIndex(null);
            }
        }

    }

    const RenderModal = () => {

        console.log("Render modal ", checkoutIndex)
        if (checkoutIndex || checkoutIndex === 0) {
            const res = activeResList[checkoutIndex]
            console.log("Res::", res)
            console.log("Index::", checkoutIndex)
            return (
                <Modal className=".modal-backdrop.show" show={show} onHide={() => handleClose}
                       animation={false} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-danger">Bill Details for
                            Room {res.roomNumber} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Bill Id</th>
                                <th>Bill Date</th>
                                <th>Bill Description</th>
                                <th>Cost</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                billList?.map((bill) => (

                                    <>
                                        <tr>
                                            <td>{bill.billID}</td>
                                            <td>{bill.billDate}</td>
                                            <td>{bill.billDescription}</td>
                                            <td>{bill.cost}</td>
                                        </tr>
                                    </>
                                ))
                            }
                            </tbody>
                        </Table>
                        <h3 className="text-primary"> Total : {totalCost}</h3>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success"
                                onClick={() => handleBillPaid(res.customerId, res.roomNumber)}>
                            Bill Paid
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>)
        }
    }

    const RoomCheckout = (res, index) => {

        return (<>
            <tr>
                <td>{res.firstName}</td>
                <td>{res.dateFrom}</td>
                <td>{res.dateTo}</td>
                <td>{res.typeOfRoom}</td>
                <td>{res.roomNumber}</td>
                <td>
                    <Button
                        onClick={() => handleCheckout(index)}
                        variant="danger">
                        Check out
                    </Button>
                    <RenderModal/>

                </td>
            </tr>

        </>)
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
                    activeResList?.map((res, i) => RoomCheckout(res, i))
                }
                </tbody>
            </Table>
        </div>
    )
}

export default ActiveReservations;