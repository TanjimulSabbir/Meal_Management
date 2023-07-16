import { useNavigate } from "react-router-dom";
import NameInput from "./NameInput";
import RoomInput from "./RoomInput"
import UserInfo from "../../assets/JsonFiles/Names.json"
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const room = event.target.room.value;

    if (!(name && room)) {
      return;
    }
    const LoginCheck = UserInfo.users.find(user => user.name == name && user.room == room);
    const admin = UserInfo.users.find(user => name == "Tanjim25" && user.room == room);
    //  if admin false, then check normal. otherwise admin true, then no name or time checked, directly go to data access.
    if (!admin) {
      if (!LoginCheck) {
        Swal.fire({ position: 'center', icon: 'info', text: 'Login failed!', showConfirmButton: false, timer: 1500 })
        return;
      }
    }
    localStorage.removeItem("UserLoginData");
    localStorage.setItem("UserLoginData", JSON.stringify({ name, room }));
    // for admin login
    if (admin) {
      Swal.fire({ position: 'center', icon: 'success', text: 'Admin Login successful!', showConfirmButton: false, timer: 1500 });
      return navigate('/meal-counter');
    }
    // normal login
    Swal.fire({ position: 'center', icon: 'success', text: 'Login successful!', showConfirmButton: false, timer: 1500 });
    return navigate('/meal-counter');
  }

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='font-Lato border p-10 bg-green-100 shadow-2xl rounded-2xl'>
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
