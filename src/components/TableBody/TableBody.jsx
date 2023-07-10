import { useEffect, useState } from "react";
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

  const handleChange = (event, name, day) => {
    const selectedValue = event.target.value;
    if (selectedValue === "Custom") {
      setCustomData((prevData) => ({
        ...prevData,
        [`${name}-${day}`]: "",
      }));
    } else {
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
  };

  const handleEdit = (name, day) => {
    setCustomData((prevData) => ({
      ...prevData,
      [`${name}-${day}`]: "",
    }));
  };

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
                {Days.days.map((day) => {
                  const cellKey = `${name}-${day.day}`;
                  const hasCustomData = customData[cellKey];

                  return (
                    <td key={day.day} title="Select meal's type" className="bg-white border">
                      {hasCustomData !== undefined ? (
                        <form onSubmit={(event) => handleCustomSubmit(event, name, day.day)}>
                          {hasCustomData ? (
                            <>
                              <span>{hasCustomData}</span>
                              <button
                                className="bg-blue-600 text-white px-1 py-2 rounded ml-2"
                                onClick={() => handleEdit(name, day.day)}
                              >
                                Edit
                              </button>
                            </>
                          ) : (
                            <>
                              <input
                                type="text"
                                name="customData"
                                className="border rounded px-2 py-1"
                                placeholder="Enter custom data"
                                value={hasCustomData || ""}
                                onChange={(event) =>
                                  setCustomData((prevData) => ({
                                    ...prevData,
                                    [cellKey]: event.target.value,
                                  }))
                                }
                              />
                              <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded"
                              >
                                Submit
                              </button>
                            </>
                          )}
                        </form>
                      ) : (
                        <select
                          className="appearance-none cursor-pointer focus:outline-none px-1 min-w-8 max-w-full py-0 rounded"
                          value=""
                          onChange={(event) => handleChange(event, name, day.day)}
                        >
                          {mealTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableBody;
