import { useEffect, useState } from "react";
import Days from "../../assets/JsonFiles/Days.json";
import Names from "../../assets/JsonFiles/Names.json";
import axios from "axios";
import Swal from "sweetalert2";
import TdCellRender from "./TdRender";

const TableBody = () => {
  const [mealTypes, setMealTypes] = useState(["", "Full", "Dupur", "D/M", "N/M", 0, "Custom"]);
  const [customData, setCustomData] = useState({});
  const [isCustom, setIsCustom] = useState("");
  const [AllData, setAllData] = useState();

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
    const isAllowedTime = currentHour < 23 || (currentHour === 22 && currentMinutes <= 30);
    const TimeRemaining = (isAllowedTime && EstimateDay == CurrentDay)
    if (!TimeRemaining) {
      Swal.fire({
        text: `Oops! It seems you're trying to select meal outside the designated ordering hours. The meal selection service is available only from 12.00 AM to 10.30 PM. Please come back during the specified hours to make your selection or contact manager +8801780242695. Thank you!`,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      return;
    }

    const selectedValue = event.target.value;
    if (selectedValue === "Custom") {
      setIsCustom(`${name}-${day}`);
    } else {
      setIsCustom("");
      setCustomData((prevData) => ({ ...prevData, [`${name}-${day}`]: selectedValue }));
      return SendDataToDatabase({ name, day, cellData: selectedValue })
    }
  };
  const handleCustomSubmit = (event, name, day) => {
    event.preventDefault();
    const inputValue = event.target.customData.value;
    setCustomData((prevData) => ({ ...prevData, [`${name}-${day}`]: inputValue }));
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


  const SendDataToDatabase = async (data) => {
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
              <col key={day.day} style={{ minWidth: "100px" }} />
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
                <td className="border-b border-r z-50 bg-gray-600 text-white font-Bitter">{index + 1}</td>
                <td className={`border w-full z-50 bg-gray-600 text-white font-Bitter sticky left-0 ${name === "Tanjimul" && "bg-green-600"}`}>
                  {name}
                </td>
                {Days.days.map((day) => <TdCellRender key={name} {...{mealTypes,isCustom,customData, name, day: day.day, AllData, handleChange,handleCustomSubmit, handleEdit }}></TdCellRender>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableBody;
