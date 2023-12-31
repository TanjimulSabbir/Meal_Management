import { useEffect, useState } from "react";
import Days from "../../assets/JsonFiles/Days.json";
import Names from "../../assets/JsonFiles/Names.json";
import axios from "axios";
import Swal from "sweetalert2";
import TdCellRender from "./TdRender";
import Loader from "../../Loader/Loader";

const TableBody = () => {
  const [mealTypes, setMealTypes] = useState(["Full", "Dupur", "D/M", "N/M", 0, "Custom"]);
  const [customData, setCustomData] = useState({});
  const [isCustom, setIsCustom] = useState("");
  const [AllData, setAllData] = useState();
  const [Loading, setLoader] = useState(false)

  const LocalData = JSON.parse(localStorage.getItem("UserLoginData"))
  const LoginUserName = LocalData.name;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://meal-counter-server-side.vercel.app/getData');
        setLoader(true)
        if (response.status !== 200) {
          return Swal.fire({ position: 'center', icon: 'info', text: 'network error! try again', showConfirmButton: false, timer: 1500 });
        }
        const data = response.data;
        setAllData(data);
      } catch (error) {
        Swal.fire({ position: 'center', icon: 'info', text: 'network error! try again', showConfirmButton: false, timer: 1500 });
      }
    }
    fetchData()
  }, [customData])
  console.log(AllData)
  const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
  const currentHour = new Date(now).getHours();
  const currentMinutes = new Date(now).getMinutes();
  const CurrentDate = new Date(now).getDate();

  const NextPreviousDay = (day) => {
    const SpliteDay = parseInt(day.split(",")[1])
    return `Oops! It seems you're trying to select meal outside the designated ordering hours/date. You can not select meal ${SpliteDay < CurrentDate + 1 ? "<strong>next-bazar's previous-day</strong>" :
      `${SpliteDay === CurrentDate + 1 ? "<strong>as you may be outside the time range of 12:00 PM to 11:00 PM</strong>" : "<strong>next-bazar following-day</strong>"}`}. The meal selection service is available only from <strong>12.00 PM to 11.00 PM.</strong> Please come back during the specified hours to make your selection or contact with manager +8801780242695. 
    Thank you!`
  }
  const SpecificUser = 'You can only select your own meal. Please choose from your available options.'

  const handleChange = (event, name, day) => {
    const EstimateDate = parseInt(day.split(",")[1]);
    const isAllowedTime= currentHour >= 12 && currentHour < 23;
    console.log(isAllowedTime, "isAllowedTIME")

    const TimeRemaining = (isAllowedTime && (EstimateDate - CurrentDate) == 1);

    // console.log(((EstimateDate - CurrentDate) === 1), "EstimateDate, CurrentDate")

    if (!(LoginUserName === "Tanjim25")) {
      if (!(LoginUserName === name)) {
        Swal.fire({
          title: "Oopsie!",
          html: "<p style='color:green; text-align:center; font-family: Lora;'>" + SpecificUser + "</p>",
          icon: 'warning',
          showClass: { popup: 'animate__animated animate__fadeInDown' },
          hideClass: { popup: 'animate__animated animate__fadeOutUp' }
        });
        return;
      }
      if (!TimeRemaining) {
        Swal.fire({
          title: "Oops!",
          text: "",
          html: "<small style='color:green; text-align:center; font-family: Bitter;'>" + NextPreviousDay(day) + "</small>",
          showClass: { popup: 'animate__animated animate__fadeInDown' },
          hideClass: { popup: 'animate__animated animate__fadeOutUp' }
        });
        return;
      }
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
    setLoader(true)
    try {
      const response = await axios.post('https://meal-counter-server-side.vercel.app/addData', data);
      if (response.status === 200) {
        setLoader(false)
        return Swal.fire({ position: 'center', icon: 'success', text: 'Meal successfully added!', showConfirmButton: false, timer: 1500 });
      } else {
        setLoader(false)
        Swal.fire({ position: 'center', icon: 'info', text: 'network error! try again', showConfirmButton: false, timer: 1500 });
      }
    } catch (error) {
      setLoader(false)
      Swal.fire({ position: 'center', icon: 'info', text: `${error.message}! Try again.`, showConfirmButton: false, timer: 1500 });
    }
  };

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
              {Days.days.map((day) => {
                const CellDay = parseInt(day.day.split(",")[1])
                return (
                  <th
                    key={day.day}
                    className="bg-[green] cursor-pointer border text-black text-center font-bold"
                  >
                    {`${day.day} ${((CellDay - CurrentDate) == 1) ?
                      "(Next day)" : (CellDay === CurrentDate) ? "(Today)" : ""}`}
                  </th>
                )
              })}
              <td className="bg-green-600">Total Amount</td>
            </tr>
          </thead>
          <tbody>
            {Names.users.map((user, index) => (
              <tr key={user.name}>
                <td className={`border-b border-r z-30 text-white font-Bitter 
                ${LoginUserName === user.name ? "bg-Primary" : "bg-gray-600"}`}>{index + 1}</td>
                <td className={`text-white font-Bitter sticky left-0 z-30
                ${LoginUserName === user.name ? "bg-Primary" : "bg-gray-600 border"}`}>
                  {user.name}
                </td>
                {Days.days.map((day) => <TdCellRender key={day.day} {...{ mealTypes, isCustom, customData, name: user.name, day: day.day, AllData, handleChange, handleCustomSubmit, handleEdit, LoginUserName, CurrentDate, Loading }}></TdCellRender>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableBody;
