import { useState } from 'react';
import UserData from "../../assets/JsonFiles/Names.json"

const NameInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [matchingData, setMatchingData] = useState([]);
    const [NameShowSuggestions, setNameShowSuggestions] = useState(false);
  
    const NameHandleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
  
      // Perform matching logic here to filter the data based on the input value
      const matchedData = UserData.users.filter(user => user.name.toLowerCase().includes(value.toLowerCase()));
      setMatchingData(matchedData);
      setNameShowSuggestions(true);
    };
  
    const handleNameClicked = (name) => {
      setInputValue(name);
      setNameShowSuggestions(false);
    };
  
    const NameHandleInputBlur = () => {
      setNameShowSuggestions(false);
  
    };

  return (
    <>
         <small>User Name</small>
            <input
              name="name"
              className='placeholder:opacity-50 border-2 rounded border-green-500 bg-transparent p-1 focus:outline-green-600 placeholder:text-xs'
              type="text"
              value={inputValue}
              onChange={NameHandleInputChange}
              onBlur={NameHandleInputBlur}
              placeholder="Enter Your Name"
            />
             <ul className={`absolute w-48 top-16 py-3 rounded-lg shadow-2xl bg-white flex flex-col z-50 `}>
              {NameShowSuggestions&& matchingData.map((item, index) => (
                <li
                  key={index}
                  onClick={()=>handleNameClicked(item.name)}
                  className="cursor-pointer hover:bg-gray-200 px-2 rounded"
                >
                  {item.name}
                </li>
              ))}
            </ul>
    </>
  )
}

export default NameInput;