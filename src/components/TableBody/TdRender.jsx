
const TdCellRender = ({ name, day, mealTypes, isCustom, customData, AllData, handleChange, handleCustomSubmit, handleEdit,LoginUserName,CurrentDay }) => {
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

    const TdCellDay = parseInt(day.split(" ")[1]);
    const activeDay=TdCellDay==CurrentDay
  const activeColor= ""
    return (
        <>
            <td key={`${name}-${day}`} className={`border font-Lora ${LoginUserName===name?"bg-ActiveCell":`${activeDay?"bg-[#405e86]":"bg-white"}`}` } >
                <div data-tip={`${name} (${day})`} className="h-full flex justify-center items-center tooltip tooltip-success">
                    {isCustomCell ? (
                        <form onSubmit={(event) => handleCustomSubmit(event, name, day)}>
                            <input type="text" name="customData" className="border rounded px-2 py-1" placeholder="Enter custom data" defaultValue={hasCustomData || matchedFilter}
                            />
                            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mt-2 ml-2">
                                Submit
                            </button>
                        </form>
                    ) : (
                        <>
                            {hasCustomData ? (
                                <p className="flex justify-center items-center gap-1">
                                    <span className={`min-w-full ${LoginUserName===name?"text-white":"text-black"}`}>{hasCustomData}</span>
                                    <button className={`bg-blue-600 text-xs text-white p-1 rounded`} onClick={() => handleEdit(name, day)}> Edit
                                    </button>
                                </p>
                            ) : (
                                <select
                                    className={`appearance-none cursor-pointer focus:outline-none overflow-visible min-w-full text-center ${LoginUserName===name?"bg-ActiveCell text-white":"bg-transparent"} ${activeDay?"bg-ActiveCell":""}`}
                                    value={matchedFilter || ""}
                                    onChange={(event) => handleChange(event, name, day)}
                                >
                                    <option className="bg-black" value={matchedFilter || ""}>{matchedFilter}</option>
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