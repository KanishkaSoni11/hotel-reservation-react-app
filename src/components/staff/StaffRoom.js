import {roomsUnassigned} from "../../services/staff-service";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {roomsUnassignedThunk} from "../../services/staff-thunk";
import {getAvailableRoomsThunk} from "../../services/room-thunk";
import {getAvailableRooms} from "../../services/room-service";
import {assignRoom} from "../../services/reservation-service";


const StaffRoom = () => {

    const dispatch = useDispatch();
    const {currentStaff} = useSelector(state => state.staffData);
    const {roomsUnassigned} = useSelector(state => state.staffData);
    const [availableRoomList, setAvailableRoomList] = useState([]);
    const [roomNumber, setSelectedRoom] = useState();

    useEffect(() => {
        dispatch(roomsUnassignedThunk());

    }, [])

    const handleRoomsAvailable = async (dateFrom, dateTo, roomType) => {
        const res = await getAvailableRooms(dateFrom, dateTo, roomType);
        // console.log("res", res)
        setAvailableRoomList(res);
    }

    const handleSelectedRoom = async (reservationNumber) => {
        console.log("here")
        const staffId = currentStaff.staffId
        console.log("id", staffId)
        console.log("room", roomNumber)
        const resStatus = "Check in"
        const res = {reservationNumber,staffId,roomNumber,resStatus};
        const post = await assignRoom(res);


        console.log(reservationNumber)
    }

    return (
        <>
            <h1> Staff Room</h1>
            {roomsUnassigned?.map((room) => (
                <>

                    <h2> Name : {room.firstName}</h2>
                    <h2> From : {room.date_from}</h2>
                    <h2> To :{room.dateTo} </h2>
                    <h2> Type : {room.typeOfRoom} </h2>
                    <h2> Room : </h2>
                    <button
                        onClick={() => handleRoomsAvailable(room.date_from, room.dateTo, room.typeOfRoom)}>
                        Fetch
                    </button>
                    <select name="av" onChange={(event) => setSelectedRoom(event.target.value)} >
                        <option> Please select the room</option>
                        {availableRoomList?.map((roomNo) => {
                            return <option
                                value={roomNo.roomNumber}> {roomNo.roomNumber}</option>

                        })}
                    </select>
                    {console.log("s", roomNumber)}
                    <button
                    onClick={() => handleSelectedRoom(room.reservationNumber)}
                    >
                        Assign
                    </button>
                </>

            ))}

        </>
    )
}

export default StaffRoom;