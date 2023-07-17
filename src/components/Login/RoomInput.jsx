import { useState } from 'react';
import UserData from "../../assets/JsonFiles/Names.json"


function RoomInput() {
    const [inputValue, setInputValue] = useState(null);
    const [matchingRoomData, setMatchingRoomData] = useState([]);
    const [roomShowSuggestions, setRoomShowSuggestions] = useState(false);

    const roomHandleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Perform matching logic here to filter the data based on the input value
        const matchedRoomData = UserData.users.filter(user => String(user.room).includes(value));
       if(!matchedRoomData.length){
        setMatchingRoomData(UserData.users.filter(user=>user));
       }else{
        setMatchingRoomData(matchedRoomData);
       }
      setRoomShowSuggestions(true)
    };

    const roomHandleInputBlur = () => {
        // setRoomShowSuggestions(false);
    };

    const handleRoomClicked = (room) => {
        setInputValue(room);
        setRoomShowSuggestions(false);
      };
    return (
        <>
            <small>Room Number</small>
            <input
                className={`placeholder:opacity-50 border-2 rounded border-green-500 bg-transparent p-1 focus:outline-green-600 placeholder:text-xs`}
                name='room'
                type="text"
                value={inputValue}
                onChange={roomHandleInputChange}
                onBlur={roomHandleInputBlur}
                placeholder="Enter Room Number"
            />
            {/* {roomShowSuggestions && <SuggestedData {...{ Data: matchingRoomData, CheckingName: "room",setInputValue }} />} */}
            <ul className={`absolute w-48 top-16 py-3 rounded-lg shadow-2xl bg-white flex flex-col z-50 ${(roomShowSuggestions&&matchingRoomData.length)?"block":"hidden"}`}>
              { matchingRoomData.map((item, index) => (
                <li
                  key={index}
                  onClick={()=>handleRoomClicked(item.room)}
                  className="cursor-pointer hover:bg-gray-200 px-2 rounded"
                >
                  {item.room}
                </li>
              ))}
            </ul>
        </>
    )
}

export default RoomInput;
