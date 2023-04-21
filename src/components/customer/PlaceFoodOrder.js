import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import {useState} from "react";
import {getAllFoodItems, getRoomsForReservation, placeFoodOrder} from "../../services/food-service";
import {useDispatch, useSelector} from "react-redux";
import Form from 'react-bootstrap/Form';
import {getOrderHistoryFromCustomerIdThunk} from "../../services/customer-thunk";

const PlaceFoodOrder = () => {

    const {currentCustomer, reservationDetails, orderHistory} = useSelector(state => state.customerData);
    const [orderList, setOrderList] = useState([{ itemId: ""}]);
    const [foodItems, setFoodItems] = useState([{itemId: -1, itemName: 'Select a Food Item', itemDescription: '', itemAvailable: 1, cost: 0}]);
    const [roomNums, setRoomNums] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(0);
    const [show, setShow] = useState(false);

    const handleFoodSelectionChange = (e, index) => {
        console.log("On dropdown change");
        const { value } = e.target;
        const list = [...orderList];
        list[index]["itemId"] = value;
        console.log(value)
        setOrderList(list);
        console.log(orderList);
    };

    const handleRoomNumSelect = (e) => {
        const {value} = e.target;
        setSelectedRoom(value);
    }

    const dispatch = useDispatch();

    const placeOrder = async () => {
        const finalOrder = {};
        var flag = false;
        console.log(orderList);
        orderList.forEach(item => {
            console.log(item.key + " --> " + item.itemId);
            if (item.itemId === undefined) {
                flag = true;
            }
            if (finalOrder[item.itemId] !== undefined) {
                finalOrder[item.itemId]++;
            } else {
                finalOrder[item.itemId] = 1;
            }
        })
        if (flag) {
            alert ("Please select an appropriate value for the food item");
        } else {
            console.log(finalOrder);
            const orderDetails = {
                "customer": currentCustomer,
                "reservation": reservationDetails,
                "orderDetailsMap": finalOrder,
                "roomNumber": selectedRoom
            };
            console.log(orderDetails);
            const orderPlaced = await placeFoodOrder(orderDetails);
            if (orderPlaced.orderId === undefined) {
                alert("Unable to place your order")
            } else {
                alert("Your Order has been placed with ID " + orderPlaced.orderId);
            }
            await dispatch(getOrderHistoryFromCustomerIdThunk(currentCustomer.customerID));
            handleClose();
        }
    }

    const handleFoodItemRemove = (index) => {
        const list = [...orderList];
        list.splice(index, 1);
        setOrderList(list);
    };

    const handleServiceAdd = () => {
        setOrderList([...orderList, { itemId: "-1"}]);
    };

    const handleClose = () => {
        setShow(false)
    };

    const handleShow = async () => {
        if (reservationDetails.reservationNumber === undefined) {
            alert("Please reserve a room and then you can place a food order");
        } else {
            console.log("Getting room details")
            const roomDetails = await getRoomsForReservation(reservationDetails.reservationNumber);
            console.log(roomDetails);
            if (roomDetails.data === undefined || roomDetails.data.length === 0) {
                alert("You have not been assigned rooms yet. Please wait till the rooms are assigned");
            } else {
                console.log(roomDetails);
                setRoomNums(roomDetails.data);
                console.log("Getting food items");
                const allData = await getAllFoodItems();
                setFoodItems(allData.data);
                console.log(foodItems);
                setShow(true)
            }
        }
    };

    return (
        <div className="d-block">
            <Button variant="warning" onClick={handleShow}>Place Food Order</Button>
            <Modal show={show} onHide={handleClose} animation={false} size={"lg"}>
                <Modal.Header closeButton>
                    <Modal.Title>Food Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-block">
                        <Form.Label className="m-2"><strong>Room Number</strong></Form.Label>
                        <Form.Select className="w-50 m-2" onChange={(e) => handleRoomNumSelect(e)}>
                            <option value="-1"> - Select your room number -</option>
                            {roomNums?.map((item) => {
                                return (
                                    <option value={item.roomNumber}> {item.roomNumber}</option>
                                )
                            })}
                        </Form.Select>
                    </div>
                    <br/>
                    <div className="d-block">
                        <Form.Label><strong>Food Items</strong></Form.Label>
                    {orderList?.map((singleOrder, index) => (
                        <div className="d-flex m-2">
                            <Form.Select className="mx-3" onChange={(e) => handleFoodSelectionChange(e, index)}>
                                <option value="-1"> - Select Food Item -</option>
                                {foodItems?.map((item) => {
                                    return (
                                            <option value={item.itemId}> {item.itemName} - {item.itemDescription}</option>
                                    )
                                })}
                            </Form.Select>
                            {orderList.length > 1 ? <Button variant="outline-danger" onClick={() => handleFoodItemRemove(index)}>Remove Item</Button> : null}
                        </div>
                    ))}
                    </div>
                    {orderList.length <= 10 ? <Button className="m-4" variant="outline-success" onClick={handleServiceAdd}>Add Item</Button> : null}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={placeOrder}>
                        Submit Order
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default PlaceFoodOrder;