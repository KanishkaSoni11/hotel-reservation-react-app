import {roomsUnassigned} from "../../services/staff-service";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {roomsUnassignedThunk} from "../../services/staff-thunk";
import {getAvailableRoomsThunk} from "../../services/room-thunk";
import {getAvailableRooms} from "../../services/room-service";
import {assignRoom} from "../../services/reservation-service";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


const StaffRoom = () => {

    const dispatch = useDispatch();
    const {currentStaff} = useSelector(state => state.staffData);
    const[roomList, setRoomList] = useState([]);
    const {roomsUnassigned} = useSelector(state => state.staffData);
    const [availableRoomList, setAvailableRoomList] = useState([]);
    const [roomNumber, setSelectedRoom] = useState();

    useEffect(() => {
        const fetchData  = async () => {
            const res = await dispatch(roomsUnassignedThunk());
            setRoomList(res.payload);
        }
        fetchData()
        console.log("roomList",roomList)

    }, [])

    const handleRoomsAvailable = async (dateFrom, dateTo, roomType) => {
        const res = await getAvailableRooms(dateFrom, dateTo, roomType);
        // console.log("res", res)
        setAvailableRoomList(res);
    }

    const handleSelectedRoom = async (reservationNumber, index) => {
        console.log("here")
        const staffId = currentStaff.staffId
        console.log("id", staffId)
        console.log("room", roomNumber)
        const resStatus = "Check in"
        const res = {reservationNumber,staffId,roomNumber,resStatus};
        const post = await assignRoom(res);
        console.log("Post", post);
        if (post.reservationNumber !== undefined) {
            alert("Room assigned", index);
            const newList = await dispatch(roomsUnassignedThunk());
            console.log("new" ,newList.payload);
            setRoomList(newList.payload);
            setAvailableRoomList([]);


        } else {
            alert("Error while assigning room");
        }
    }

    console.log(roomsUnassigned);

    return (
        <div className="container p-2 m-2">
            <h1> Welcome {currentStaff.firstName}</h1>

            <h2>Unassigned Reservations</h2>
            <br/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Check-in Date</th>
                    <th>Check-out Date</th>
                    <th>Type Of Room</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {roomList.length > 0 ? roomList?.map((room,index) => (
                    <>
                        <tr>
                            <td>{room.firstName}</td>
                            <td>{room.date_from}</td>
                            <td>{room.dateTo}</td>
                            <td>{room.typeOfRoom}</td>
                            <td>
                                <Button
                                    onClick={() => handleRoomsAvailable(room.date_from, room.dateTo, room.typeOfRoom)}>
                                    Fetch
                                </Button>
                            </td>
                            <td>
                                <Form.Select name="av" onChange={(event) => setSelectedRoom(event.target.value)} >
                                    <option> Please select the room</option>
                                    {availableRoomList.length > 0 && availableRoomList?.map((roomNo) => {
                                        return <option
                                            value={roomNo.roomNumber}> {roomNo.roomNumber}</option>

                                    })}
                                </Form.Select>
                            </td>
                            <td>
                                <Button variant="success" onClick={() => {

                                    handleSelectedRoom(room.reservationNumber, index)}}>
                                    Assign
                                </Button>
                            </td>
                        </tr>
                    </>
                )) : null}
                </tbody>
            </Table>

        </div>
    )
}

export default StaffRoom;