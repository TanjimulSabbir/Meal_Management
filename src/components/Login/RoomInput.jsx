import { useState } from 'react';
import UserData from "../../assets/JsonFiles/Names.json"


function RoomInput() {
    const [inputValue, setInputValue] = useState(101);
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
       if(inputValue){
        setRoomShowSuggestions(true);
       }
        console.log(matchedRoomData)
    };

    const roomHandleInputBlur = () => {
        setRoomShowSuggestions(false);
    };

    const handleRoomClicked = (room) => {
        console.log(room,"Li clicked")
        setInputValue(room);
        setRoomShowSuggestions(false);
      };
    console.log(inputValue)

    return (
        <>
            <small>Room Number</small>
            <input
                className={`placeholder:opacity-50 border-2 rounded border-green-500 bg-transparent p-1 focus:outline-green-600 placeholder:text-xs`}
                type="text"
                value={inputValue}
                onChange={roomHandleInputChange}
                onBlur={roomHandleInputBlur}
                placeholder="Enter Room Number"
            />
            {/* {roomShowSuggestions && <SuggestedData {...{ Data: matchingRoomData, CheckingName: "room",setInputValue }} />} */}
            <ul className={`absolute w-48 top-16 py-3 rounded-lg shadow-2xl bg-white flex flex-col z-50 `}>
              {roomShowSuggestions && matchingRoomData.map((item, index) => (
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
