import React, { useState } from 'react';
import UserData from "../../assets/JsonFiles/Names.json";

const NameInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [matchingData, setMatchingData] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [trigger, setTrriger]=useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Perform matching logic here to filter the data based on the input value
    const matchedData = UserData.users.filter(user =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setMatchingData(matchedData);
    setShowSuggestions(true);
  };

  const handleNameClicked = (name) => {
    setInputValue(name);
    setShowSuggestions(false);
  };

  const handleInputBlur = (event) => {
    // setInputValue(event.target.value)
    // setShowSuggestions(false);
  };

  return (
    <>
      <small>User Name</small>
      <input
        name="name"
        className="placeholder:opacity-50 border-2 rounded border-green-500 bg-transparent p-1 focus:outline-green-600 placeholder:text-xs"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        placeholder="Enter Your Name"
      />
      { (
        <ul className={`absolute w-48 top-16 py-3 rounded-lg shadow-2xl bg-white flex flex-col z-50 ${(showSuggestions&&matchingData.length)?"block":"hidden"}`}>
          {matchingData.map((item, index) => (
            <li
              key={index}
              onChange={(event)=>setTrriger(event.target.value)}
              onClick={() => handleNameClicked(item.name)}
              className="cursor-pointer hover:bg-gray-200 px-2 rounded"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NameInput;
