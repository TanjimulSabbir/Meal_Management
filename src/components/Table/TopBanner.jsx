import React, { useState } from 'react'
import Bazar from '../Bazar/Bazar';

const TopBanner = () => {
  const [ShowBazar, setBazarShow] = useState(false);
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
            See Meal Selection Rules and Regulation!
          </div>
          <div className="collapse-content rounded-2xl text-justify peer-checked:text-black">
            <p><strong>W</strong>elcome! You can now place your meal from here. Please make your selection from the available date and duration. Remember, the meal ordering service is available from <strong className='text-green-600'>12.00 AM to 10.30 PM</strong> every day. Enjoy your meal! <br />
              If you wish to make a manual food selection or have any specific requests, please contact with manager at <strong className='text-green-600'>+8801780242695</strong>. Please note that, updated your meal <strong className='text-green-600'>daily between 12.00 AM to 10.30 PM</strong> to ensure accurate and variety. Thank you for choosing your meal!</p>
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