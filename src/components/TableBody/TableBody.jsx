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

  const LoginUserName = "Tanjimul";

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
  const CurrentDay = parseInt(now.split("/")[1]);

  const NextPreviousDay=(day) =>{
    console.log(day,CurrentDay)
    return `Oops! It seems you're trying to select meal outside the designated ordering hours/date.You can not select meal ${day > CurrentDay?"current previous-day":"current next-day"}. The meal selection service is available only current day from 12.00 AM to 10.30 PM. Please come back during the specified hours to make your selection or contact with manager +8801780242695. Thank you!`}
  const SpecificUser='You can only select your own meal. Please choose from your available options.'

  const handleChange = (event, name, day) => {
    const EstimateDay = parseInt(day.split(" ")[1]);
    const isAllowedTime = currentHour < 23 || (currentHour === 22 && currentMinutes <= 30);
    const TimeRemaining = (isAllowedTime && EstimateDay == CurrentDay)
    if (!(LoginUserName === name)) {
      Swal.fire({
        title: "Oopsie!",
        html: "<p style='color:green; text-align:center'>" + SpecificUser + "</p>",
        icon: 'warning',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      return ;
    }
    if (!TimeRemaining) {
      Swal.fire({
        title: "Oops!",
        html: "<small style='color:green; text-align:center'>" + NextPreviousDay(day) + "</small>",
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
              <th className="border bg-gray-600 text-white font-Bitter z-50">Serial</th>
              <th className="border bg-gray-600 text-white font-Bitter sticky left-0 z-50">Name</th>
              {Days.days.map((day) => 
              { const CellDay=  parseInt(day.day.split(" ")[1])
                return(
                <th
                  key={day.day}
                  className="bg-[#0bb00b] cursor-pointer border text-black text-center font-bold"
                >
                  {`${day.day} ${CurrentDay===CellDay?"(Current Day)":""}`}
                </th>
              )})}
              <td className="bg-green-600">Total Amount</td>
            </tr>
          </thead>
          <tbody>
            {Names.users.map((user, index) => (
              <tr key={user.name}>
                <td className={`border-b border-r z-30 text-white font-Bitter 
                ${LoginUserName===user.name?"bg-ActiveCell":"bg-gray-600"}`}>{index + 1}</td>
                <td className={`text-white font-Bitter sticky left-0 top-10 z-30
                ${LoginUserName===user.name?"bg-ActiveCell":"bg-gray-600 border"}`}>
                  {user.name}
                </td>
                {Days.days.map((day) => <TdCellRender key={day.day} {...{ mealTypes, isCustom, customData, name:user.name, day: day.day, AllData, handleChange, handleCustomSubmit, handleEdit,LoginUserName,CurrentDay  }}></TdCellRender>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableBody;
