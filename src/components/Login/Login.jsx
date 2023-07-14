import { useState } from 'react';
import UserData from "../../assets/JsonFiles/Names.json"
import NameSuggestedData from './NameSuggestedData';

const Login = () => {
  const [inputValue, setInputValue] = useState('');
  const [matchingData, setMatchingData] = useState([]);
  const [NameShowSuggestions, setNameShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
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

  const handleInputBlur = () => {
    if (inputValue === "") {
      setNameShowSuggestions(false);
    }
  };


  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <form className=' font-Lato border p-10 bg-gray-100 shadow-2xl rounded-2xl'>
        <h1 className='text-center text-3xl text-black font-Lora'>Login</h1>
        <div className='flex flex-col gap-5 mt-7 mb-4'>
          <div className='relative flex flex-col space-y-[2px]'>
            <small>User Name</small>
            <input
              className='placeholder:opacity-50 border-2 rounded border-green-500 bg-transparent p-1 focus:outline-green-600 placeholder:text-xs'
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="Enter Your Name"
            />
             {NameShowSuggestions && <NameSuggestedData {...{matchingData,handleNameClicked}}></NameSuggestedData>}
          </div>
          <div className='flex flex-col space-y-[2px]'>
            <small>Room Number</small>
            <input
              className='placeholder:opacity-50 border-2 rounded border-green-500 bg-transparent p-1 focus:outline-green-600 placeholder:text-xs'
              type="text"
              value={inputValue}
              placeholder="Enter your Room No"
            />
          </div>
         
        </div>
        <button type='submit' className='btn bg-green-500 w-full border font-Bitter hover:border-green-500 rounded-xl lg:hover:bg-transparent hover:text-Primary transition duration-500'>Submit</button>
      </form>
    </div>
  )
}

export default Login;
