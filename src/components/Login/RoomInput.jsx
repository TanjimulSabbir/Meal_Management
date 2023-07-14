import { useState } from 'react';
import UserData from "../../assets/JsonFiles/Names.json"
import SuggestedData from './SuggestedData';

function RoomInput() {
    const [inputValue, setInputValue] = useState('');
    const [matchingRoomData, setMatchingRoomData] = useState([]);
    const [RoomShowSuggestions, setRoomShowSuggestions] = useState(false);
  
    const RoomHandleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
  
      // Perform matching logic here to filter the data based on the input value
      const matchedRoomData = UserData.users.filter(user => user.room.toLowerCase().includes(value.toLowerCase()));
      setMatchingRoomData(matchedRoomData);
      setRoomShowSuggestions(true);
    };
  
    const handleRoomClicked = (room) => {
      setInputValue(room);
      setRoomShowSuggestions(false);
    };
  
    const RoomHandleInputBlur = () => {
        setRoomShowSuggestions(false);
    };
  
    return (
        <>
            <small>Room Number</small>
            <input
                className='placeholder:opacity-50 border-2 rounded border-green-500 bg-transparent p-1 focus:outline-green-600 placeholder:text-xs'
                type="text"
                value={inputValue}
                onChange={RoomHandleInputChange}
                onBlur={RoomHandleInputBlur}
                placeholder="Enter Room Number"
            />
            {RoomShowSuggestions && <SuggestedData {...{ Data:matchingRoomData, Clicked:handleRoomClicked,CheckingName:"room" }}></SuggestedData>}
        </>
    )
}

export default RoomInput