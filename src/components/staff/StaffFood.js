import {useEffect, useState} from "react";
import {getPendingOrders, updateCompletedOrders} from "../../services/food-service";
import {useSelector} from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const StaffFood = () => {

    const [pendingOrders, setPendingOrders] = useState([]);
    const [ordersForRoom, setOrdersForRoom] = useState({});
    const {currentStaff} = useSelector(state => state.staffData);
    const[renderList, setRenderList] = useState([]);

    useEffect(() => {
        const res = async () => {
            const data = await getPendingOrders();
            setPendingOrders(data);
        }
        res();

    }, [])


    const RenderData = (room, data) => {
        let orderId = data[0].orderId
        return (<>
            <h3>Orders for Room {room}</h3>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
            {
                data.map((items) => (
                    <>
                        <tr>
                            <td>{items.orderId}</td>
                            <td>{items.foodItem}</td>
                            <td>{items.quantity}</td>
                        </tr>
                    </>

                ))
            }
                </tbody>
            </Table>
            <br/>
            <Button variant="success" onClick={() => handleStatusCompleted(orderId)}>
                Mark as completed
            </Button>
            <br/>

        </>)
    }

    const getRoomData = () => {
        let obj = {}
        let renderingData = []
        pendingOrders.forEach(order => {
            if (order.roomNumber in obj)
                obj[order.roomNumber].push(order)
            else
                obj[order.roomNumber] = [order]
        })


        Object.keys(obj).forEach(key => {
            renderingData.push(RenderData(key, obj[key]))
        })

        return renderingData

    }


    const handleStatusCompleted = async ( orderId) => {
        const staffId = currentStaff.staffId

        const updateRes = await updateCompletedOrders(staffId, orderId);
        const newList = pendingOrders.filter(a => a.orderId !== orderId)

        setPendingOrders(newList);


    }


    return (

        <div className="container m-2 p-2">
            <h1> Welcome {currentStaff.firstName} </h1>
            <h2> Pending Food Orders</h2>
            <br/>


            {getRoomData().length > 0 ? getRoomData().map(data => data)
                : <h5> No Pending Food Orders</h5>}


        </div>
    )

}

export default StaffFood;