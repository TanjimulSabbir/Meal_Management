import { useEffect, useState } from "react";
import Days from "../../assets/JsonFiles/Days.json";
import Names from "../../assets/JsonFiles/Names.json";
import axios from "axios";
import Swal from "sweetalert2";

const TableBody = () => {
  const [mealTypes, setMealTypes] = useState(["", "Full", "Dupur", "D/M", "N/M", 0, "Custom"]);
  const [customData, setCustomData] = useState({});
  const [isCustom, setIsCustom] = useState("");
  const [AllData, setAllData] = useState();
  const [Over, setOver] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getData');
        if (response.statusText !== 'OK') {
          return;
        }
        const data = response.data;
        setAllData(data);
        console.log(data, 'AllData');
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [customData])

  const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
  const currentHour = new Date().getHours();
  const currentMinutes = new Date().getMinutes();
  const CurrentDay = parseInt(now.split("/")[1], 10);

  const handleChange = (event, name, day) => {
    const EstimateDay = parseInt(day.split(" ")[1]);
    const isAllowedTime = currentHour < 22 || (currentHour === 22 && currentMinutes <= 30);
    const TimeRemaining = (isAllowedTime && EstimateDay == CurrentDay)
    if (isAllowedTime && EstimateDay == CurrentDay) {
      Swal.fire({
        title: 'Welcome, you are eligible for set meal.',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
    } else {
      Swal.fire({
        title: `Time Over for Set Meal. Current Time ${currentHour}:${currentMinutes}`,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      return setOver(true);
    }
    const selectedValue = event.target.value;
    if (selectedValue === "Custom") {
      setIsCustom(`${name}-${day}`);
    } else {
      setIsCustom("");
      setCustomData((prevData) => ({ ...prevData, [`${name}-${day}`]: selectedValue }));
      SendDataToDatabase({ name, day, cellData: selectedValue })
    }
  };
  const handleCustomSubmit = (event, name, day) => {
    event.preventDefault();
    const inputValue = event.target.customData.value;
    setCustomData((prevData) => ({ ...prevData, [`${name}-${day}`]: inputValue, }));
    SendDataToDatabase({ name, day, cellData: inputValue })
    setIsCustom("");
  };

  const handleEdit = (name, day) => {
    setIsCustom(`${name}-${day}`);
    setCustomData((prevData) => ({
      ...prevData,
      [`${name}-${day}`]: "",
    }));
  };

  const renderCell = (name, day) => {
    const EstimateDay = parseInt(day.split(" ")[1]);
    const cellKey = `${name}-${day}`;
    const isCustomCell = isCustom === cellKey;
    const hasCustomData = customData[cellKey];
    const isAllowedTime = currentHour < 22 || (currentHour === 22 && currentMinutes <= 30);
    const TimeRemaining = (isAllowedTime && EstimateDay == CurrentDay)

    let matchedFilter = "";
    AllData?.forEach(item => {
      const FindName = item.name;
      const matched = item.info.find(data => data.day == day)
      if (matched) {
          const FinalMatched = matched.day === day && FindName === name;
          // setCustomData(matched.cellData)
          if(FinalMatched){
            matchedFilter=matched.cellData
          }
      }
    })
    console.log(matchedFilter, "MatchedDays")

    return (
      <td key={day} title={`${name}-${day}`} className="bg-white border">
        {isCustomCell ? (
          <form onSubmit={(event) => handleCustomSubmit(event, name, day)}>
            <input type="text" name="customData" className="border rounded px-2 py-1" placeholder="Enter custom data" defaultValue={hasCustomData || ""}
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mt-2">
              Submit
            </button>
          </form>
        ) : (
          <>
            {hasCustomData ? (
              <>
                <span>{hasCustomData}</span>
                <button
                  className={`bg-blue-600 text-xs text-white px-1 py-1 rounded mt-2 ml-2 `}
                  onClick={() => handleEdit( name, day)}
                >
                  Edit
                </button>
              </>
            ) : (
              <select
                className={`appearance-none cursor-pointer focus:outline-none px-1 w-full py-0 rounded`}
                value={matchedFilter?matchedFilter:""}
                onChange={(event) => handleChange(event, name, day)}
              >
                {mealTypes.map((type) => (
                  <option key={type}  value={type}>
                    {type}
                  </option>
                ))}
              </select>
            )}
          </>
        )}
      </td>
    );
  };

  const SendDataToDatabase = async (data) => {
    const EstimateDay = parseInt(data.day.split(" ")[1]);
    const isAllowedTime = currentHour < 15 || (currentHour === 22 && currentMinutes <= 30);

    axios.post('http://localhost:5000/addData', data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div>
      <div className="overflow-x-auto h-screen w-full">
        <table className="table table-zebra table-xs lg:table-md table-pin-rows table-pin-cols">
          <colgroup>
            <col style={{ width: "0px" }} />
            <col style={{ minWidth: "0px" }} />
            {Days.days.map((day) => (
              <col key={day.day} style={{ minWidth: "120px" }} />
            ))}
            <col style={{ width: "100px" }} />
          </colgroup>
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
            {Names.users.map((name, index) => (
              <tr key={name}>
                <td className="border-b border-r bg-gray-600 text-white font-Bitter">{index + 1}</td>
                <td className={`border w-full bg-gray-600 text-white font-Bitter sticky left-0 ${name === "Tanjimul" && "bg-green-600"}`}>
                  {name}
                </td>
                {Days.days.map((day) => renderCell(name, day.day))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableBody;
