
const SuggestedData = ({Data,Clicked,CheckingName,setTrigger}) => {
console.log(Clicked,CheckingName)
  return (
    <div>
        <ul className="absolute w-48 top-16 py-3 rounded-lg shadow-2xl bg-white flex flex-col z-50">
              {Data.map((item, index) => (
                <li
                  key={index}
                  onClick={()=>setTrigger(item[CheckingName])}
                  className="cursor-pointer hover:bg-gray-200 px-2 rounded"
                >
                  {item[CheckingName]}
                </li>
              ))}
            </ul>
    </div>
  )
}

export default SuggestedData;