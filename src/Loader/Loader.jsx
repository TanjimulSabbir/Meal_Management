import React from 'react'

function Loader() {
  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
        <span className="absolute loading loading-ring loading-lg text-green-500 bg-green-500">Loading..</span>
    </div>
  )
}

export default Loader