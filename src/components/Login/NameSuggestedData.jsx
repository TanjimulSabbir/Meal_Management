import React from 'react'

const SuggestedData = ({matchingData,handleNameClicked}) => {
  return (
    <div>
        <ul className="absolute w-48 top-16 py-3 rounded-lg shadow-2xl bg-white flex flex-col z-50">
              {matchingData.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleNameClicked(item.name)}
                  className="cursor-pointer hover:bg-gray-200 px-2 rounded"
                >
                  {item.name}
                </li>
              ))}
            </ul>
    </div>
  )
}

export default SuggestedData