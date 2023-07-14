import React, { useState } from 'react';
import UserData from "../../assets/JsonFiles/Names.json"

const Login = () => {
  const [inputValue, setInputValue] = useState('');
  const [matchingData, setMatchingData] = useState([]);
  const [selectionOff, setSelectionOff] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSelectionOff(false);
    setInputValue(value);

    // Perform matching logic here to filter the data based on the input value
    const matchedData = UserData.users.filter(user => user.name.toLowerCase().includes(value.toLowerCase()));
    setMatchingData(matchedData);
  };

  const handleNameClicked = (NameData) => {
    setInputValue(NameData);
    setSelectionOff(true);
  };

  const handleInputBlur = () => {
    setSelectionOff(true);
  };

  return (
    <div className='relative w-full flex justify-center items-center border-b-2 border-black my-30'>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        placeholder="Enter data"
      />
      <ul className={`absolute w-48 top-8 rounded-lg shadow-2xl bg-white flex flex-col z-50 ${selectionOff ? "hidden" : "block"}`}>
        {matchingData.map((item, index) => (
          <li key={index} onClick={() => handleNameClicked(item.name)} className={`cursor-pointer hover:bg-gray-200 px-2 rounded`}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Login;
