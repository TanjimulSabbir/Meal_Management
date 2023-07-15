import React, { useState } from 'react'
import Bazar from '../Bazar/Bazar';

const TopBanner = () => {
  const [ShowBazar, setBazarShow] = useState(false);
  const AutoLocalStorageDelete = () => {
    // Set the value in local storage
    localStorage.setItem('myData', 'myValue');

    // Define the duration after which you want to delete the data (e.g., 3 hours)
    const durationInHours = 10;
    const durationInMilliseconds = durationInHours;

    // Get the timestamp when the data was initially set
    const startTime = new Date().getTime();

    // Set an interval to periodically check the elapsed time and delete the data
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime >= durationInMilliseconds) {
        localStorage.removeItem('myData'); // Remove the specific item from local storage
        clearInterval(interval); // Stop the interval once the data is deleted
      }
    }, 600); // Check every minute (adjust the interval duration as needed)
  }
  AutoLocalStorageDelete();
  return (
    <div className='pt-10 font-Bitter bg-sky-100'>
      <div className='text-center'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl'>Rangon House</h1>
        <div className='flex gap-5 items-center justify-center mt-2'>  <p className=''>July, 2023</p>
          <p className="bg-transparent cursor-pointer text-green-600" onClick={() => setBazarShow(true)}>Show Details</p></div>
      </div>
      {/* Rules and Regulation */}
      <div className='md:w-1/2 mx-auto'>
        <div className="collapse">
          <input type="checkbox" className="peer" />
          <div className="collapse-title peer-checked:text-green-600 text-green-600 text-center">
            See Meal Selection Bylaws and Boundaries!
          </div>
          <div className="collapse-content rounded-2xl text-justify peer-checked:text-black">
            <p><strong>W</strong>elcome! You can now place your meal from here. Please make your selection from the available date and duration. Remember, the meal ordering service is available from <strong className='text-green-600'>12.00 AM to 10.30 PM</strong> every day. Enjoy your meal! <br />
            </p>
            <p>
              Kindly requested you to <strong className='text-green-600'>refrain from changing others meal</strong> without permission. Your meal selection is personal and should not be shared or modified by others. Appreciated your cooperation in adhering to these rules.
            </p>
            <p> If you wish to make a manual food selection or have any specific requests, please contact with manager at <strong className='text-green-600'>+8801780242695</strong>. Please note that, updated your meal <strong className='text-green-600'>daily between 12.00 AM to 10.30 PM</strong> to ensure accurate and variety. Thank you for choosing your meal needs!</p>
          </div>
        </div>
      </div>
      {
        ShowBazar ? <Bazar setBazarShow={setBazarShow}></Bazar> : ""
      }
    </div>
  )
}

export default TopBanner;