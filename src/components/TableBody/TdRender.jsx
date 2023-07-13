
const TdCellRender = ({ name, day,mealTypes,isCustom,customData, AllData, handleChange,handleCustomSubmit, handleEdit }) => {
    const cellKey = `${name}-${day}`;
    const isCustomCell = isCustom === cellKey;
    const hasCustomData = customData[cellKey];

    let matchedFilter = "";
    AllData?.forEach(item => {
      const FindName = item.name;
      const matched = item.info.find(data => data.day == day)
      if (matched) {
        const FinalMatched = matched.day === day && FindName === name;
        // setCustomData(matched.cellData)
        if (FinalMatched) {
          matchedFilter = matched.cellData
        }
      }
    })
    console.log(matchedFilter, hasCustomData, "MatchedDays")


    return (
      <>
        <td key={`${name}-${day}`}  className="bg-white border" >
          <div data-tip={`${name}-${day}`} className="h-full flex justify-center items-center tooltip tooltip-success">
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
                  <button className={`bg-blue-600 text-xs text-white p-1 rounded mt-2 ml-2 `} onClick={() => handleEdit(name, day)}> Edit
                  </button>
                </>
              ) : (
                <select
                  className={`appearance-none border bg-white cursor-pointer focus:outline-none overflow-x-visible min-w-full`}
                  value={matchedFilter || ""}
                  onChange={(event) => handleChange(event, name, day)}
                >
                  <option className="bg-green-700" value={matchedFilter || ""}>{matchedFilter}</option>
                  {mealTypes.map((type) => (<option key={type} value={type}>
                    {type}
                  </option>
                  ))}
                </select>
              )}
            </>
          )}
          </div>
        </td>
      </>
    );
  };


export default TdCellRender;