import { useState } from "react";
import Days from "../../assets/JsonFiles/Days.json";
import Names from "../../assets/JsonFiles/Names.json";

const TableBody = () => {
  const [mealTypes, setMealTypes] = useState([
    "",
    "Full",
    "দুপুর",
    "D/M",
    "N/M",
    0,
    "Custom",
  ]);
  const [customData, setCustomData] = useState({});
  const [isCustom, setIsCustom] = useState("");

  const handleChange = (event, name, day) => {
    const selectedValue = event.target.value;
    if (selectedValue === "Custom") {
      setIsCustom(`${name}-${day}`);
    } else {
      setIsCustom("");
      setCustomData((prevData) => ({
        ...prevData,
        [`${name}-${day}`]: selectedValue,
      }));
    }
  };

  const handleCustomSubmit = (event, name, day) => {
    event.preventDefault();
    const inputValue = event.target.customData.value;
    setCustomData((prevData) => ({
      ...prevData,
      [`${name}-${day}`]: inputValue,
    }));
    setIsCustom("");
  };

  const handleEdit = (name, day) => {
    setIsCustom(`${name}-${day}`);
  };

  const renderCell = (name, day) => {
    const cellKey = `${name}-${day}`;
    const isCustomCell = isCustom === cellKey;
    const hasCustomData = customData[cellKey];

    return (
      <td key={day} title="Select meal's type" className="bg-white border">
        {isCustomCell ? (
          <form onSubmit={(event) => handleCustomSubmit(event, name, day)}>
            <input
              type="text"
              name="customData"
              className="border rounded px-2 py-1"
              placeholder="Enter custom data"
              defaultValue={hasCustomData || ""}
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
                  className="bg-blue-600 text-xs text-white px-1 py-1 rounded mt-2 ml-2"
                  onClick={() => handleEdit(name, day)}
                >
                  Edit
                </button>
              </>
            ) : (
              <select
                className="appearance-none cursor-pointer focus:outline-none px-1 w-full py-0 rounded"
                value=""
                onChange={(event) => handleChange(event, name, day)}
              >
                {mealTypes.map((type) => (
                  <option key={type} value={type}>
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
                <td className="border w-full bg-gray-600 text-white font-Bitter sticky left-0">
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
