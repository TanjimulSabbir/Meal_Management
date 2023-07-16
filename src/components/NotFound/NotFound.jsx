import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="bg-no-repeat bg-cover" style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/two-raw-striploin-steak-new-york-beef-board-top-view-black-stone-background_187166-54697.jpg?w=996')` }}>
            <div className='w-full h-screen flex justify-center items-center bg-black bg-opacity-70 font-Bitter' >

                <div className='flex flex-col justify-center items-center'>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='text-2xl uppercase text-white font-Lato'>Page Not Found</h2>
                    </div>
                    <p className='w-2/3 mt-3 text-center text-sm text-gray-100 font-lora'>The page are you looking for might have been doesnt exist or had its name changed or temporarily unavailable.</p>
                    <Link to="http://localhost:5173/meal-counter" className="mt-6 font-Roboto text-green-500 cursor-pointer rounded-full border border-green-500 p-4 uppercase transition duration-500 hover:bg-green-500 hover:text-black hover:border-green-500" >Go to home Page
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound;
