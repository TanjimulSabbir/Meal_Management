import { useState } from 'react';
import UserData from "../../assets/JsonFiles/Names.json"
import SuggestedData from './SuggestedData';
import RoomInput from "./RoomInput"

const Login = () => {
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
    <div className='h-screen w-full flex justify-center items-center'>
      <form className=' font-Lato border p-10 bg-gray-100 shadow-2xl rounded-2xl'>
        <h1 className='text-center text-3xl text-black font-Lora'>Login</h1>
        <div className='flex flex-col gap-5 mt-7 mb-4'>
          <div className='relative flex flex-col space-y-[2px]'>
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
            {NameShowSuggestions && <SuggestedData {...{ Data: matchingData, Clicked: handleNameClicked, CheckingName: "name" }}></SuggestedData>}
          </div>
          <div className='relative flex flex-col space-y-[2px]'>
            <RoomInput></RoomInput>
          </div>
        </div>
        <button type='submit' className='btn bg-green-500 w-full border font-Bitter hover:border-green-500 rounded-xl lg:hover:bg-transparent hover:text-Primary transition duration-500'>Submit</button>
      </form>
    </div>
  )
}

export default Login;
