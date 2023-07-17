import { Link } from "react-router-dom";
import Cat from "../../assets/Photo/blond-cat-pot.jpg"

function NotFound() {
    return (
        <div className="bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url('${Cat}')` }}>
            <div className='w-full h-screen flex justify-center items-center bg-black bg-opacity-70 font-Bitter' >

                <div className='flex flex-col justify-center items-center'>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='text-2xl uppercase text-white font-Lato'>Page Not Found</h2>
                    </div>
                    <p className='w-2/3 mt-3 text-center text-sm text-gray-100 font-lora'>The page are you looking for might have been doesnt exist or had its name changed or temporarily unavailable.</p>
                    <Link to="/meal-counter" className="mt-6 font-Roboto text-green-500 cursor-pointer rounded-full border border-green-500 p-4 uppercase transition duration-500 hover:bg-green-500 hover:text-black hover:border-green-500" >Go to home Page
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound;
