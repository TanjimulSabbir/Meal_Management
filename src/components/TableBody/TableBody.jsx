import { useEffect, useState } from "react";
import Days from "../../assets/JsonFiles/Days.json";
import Names from "../../assets/JsonFiles/Names.json";

const TableBody = () => {
  const [mealTypes, setMealTypes] = useState(["", "Full", "দুপুর", "D/M", "N/M", 0, "Custom",
  ]);
  const [isCustom, setIsCustom] = useState("");
  const [data,setData]=useState("")
  const handleChange = (event) => {
    setIsCustom(event.target.value)
  }
 console.log(isCustom)
  useEffect(() => {
    if (isCustom =="Custom") {
      const NewData = prompt("enter new data")
      setData(NewData)
    return setMealTypes([...mealTypes, NewData])
    }else{
      setData(isCustom)
    }
  }, [isCustom])
  console.log(mealTypes)
 const handleTdChange=(event,name,day)=>{
  const target=event.target;
  const targetData=(target.data-name)-(target.data-day);
  console.log(targetData)
 }

const getData=(name,day)=>{
console.log(name-day)
}

  return (
    <div>
      <div className="overflow-x-auto h-screen w-full">
        <table className="table table-zebra table-xs lg:table-md table-pin-rows table-pin-cols">
          <thead className="font-Roboto">
            <tr>
              <th className="border bg-gray-600 text-white font-Bitter">Serial</th>
              <th className="border bg-gray-600 text-white font-Bitter sticky left-0">Name</th>
              {Days.days.map((day) => (
                <th
                  key={day.day}
                  className="bg-green-600 cursor-pointer border text-center font-bold"
                >
                  {day.day}
                </th>
              ))}
              <td className="bg-green-600">Total Amount</td>
            </tr>
          </thead>
          <tbody>
            {/* Rows for each user */}
            {Names.users.map((name, index) => (
              <tr key={name}>
                <td className="border-b border-r bg-gray-600 text-white font-Bitter">
                  {index + 1}
                </td>
                <td className="border w-full bg-gray-600 text-white font-Bitter sticky left-0">
                  {name}
                </td>
                {/* Add the cells for each day */}
                {Days.days.map((day) => (
                  <td key={day.day} data-name={name} data-day={day} title="Select meal's type" className="bg-white border" onChange={(event)=>handleTdChange(event,name,day)}>
                    <select
                      className="appearance-none cursor-pointer focus:outline-none px-1 min-w-8 max-w-full py-0 rounded"
                      value={getData(name,day)}
                      onChange={handleChange}
                    >
                      {mealTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </td>
                ))}

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableBody;
