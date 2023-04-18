import {useEffect, useState} from "react";
import {getPendingOrders, updateCompletedOrders} from "../../services/food-service";
import {useSelector} from "react-redux";

const StaffFood = () => {

    const [pendingOrders, setPendingOrders] = useState([]);
    const [ordersForRoom, setOrdersForRoom] = useState({});
    const {currentStaff} = useSelector(state => state.staffData);


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
            <h1> {room}</h1>
            {
                data.map((items) => (
                    <>
                        <div>{items.foodItem}</div>
                        <div>{items.quantity}</div>
                    </>

                ))
            }
            <button onClick={() => handleStatusCompleted(orderId)}>
                Mark as completed
            </button>
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

        <div className="container">
            <h1> Staff Food </h1>


            {getRoomData().map(data => data)}


        </div>
    )

}

export default StaffFood;