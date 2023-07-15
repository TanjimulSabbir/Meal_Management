import { useNavigate } from "react-router-dom";
import NameInput from "./NameInput";
import RoomInput from "./RoomInput"

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const room = event.target.room.value;
    if (!(name && room)) {
      return;
    }
    localStorage.removeItem("UserLoginData");
    const SetLocalData = localStorage.setItem("UserLoginData", JSON.stringify({ name, room }))
    if (!SetLocalData) {
      return navigate("/login");
    }
    navigate('/home');
  }

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='font-Lato border p-10 bg-gray-100 shadow-2xl rounded-2xl'>
        <h1 className='text-center text-3xl text-black font-Lora'>Login</h1>
        <div className='flex flex-col gap-5 mt-7 mb-4'>
          <div className='relative flex flex-col space-y-[2px]'>
            <NameInput />
          </div>
          <div className='relative flex flex-col space-y-[2px]'>
            <RoomInput />
          </div>
        </div>
        <button type='submit' className='btn bg-green-500 w-full border font-Bitter hover:border-green-500 rounded-xl lg:hover:bg-transparent hover:text-Primary transition duration-500'>Submit</button>
      </form>
    </div>
  )
}

export default Login;
