import { useState } from "react";
import Days from "../../assets/JsonFiles/Days.json";
import Names from "../../assets/JsonFiles/Names.json"

const TableBody = () => {
	const MealTypes = ["", "Full", "দুপুর", "D/M", "N/M", 0, "Custom"];
	const [mealType, setMealType] = useState('');

	const handleSelectChange = (event) => {
		const selectedValue = event.target.value;
		if (selectedValue === 'Custom') {
			const userInput = prompt('Enter custom meal type:');
			if (userInput !== null) {
				setMealType(userInput);
			} else {
				setMealType('');
			}
		} else {
			setMealType(selectedValue);
		}
	};

	return (
		<div className="">
			<div className="overflow-x-auto h-screen w-full">
				<table className="table table-zebra table-xs lg:table-md table-pin-rows table-pin-cols">
					<thead className="font-Roboto">
						<tr className="">
							<th className="border  bg-gray-600 text-white font-Bitter">Serial</th>
							<th className="border  bg-gray-600 text-white font-Bitter sticky left-0">Name</th>
							{Days.days.map(day => {
								return (
									<th key={day.day} className="bg-green-600 cursor-pointer border text-center font-bold">
										{day.day}
									</th>
								);
							})}
							<td className="bg-green-600">Total Amount</td>
						</tr>
					</thead>
					<tbody className="">
						{/* Rows for each user */}
						{Names.users.map((name, index) => {
							return (
								<tr key={name}>
									<td className="border-b border-r  bg-gray-600 text-white font-Bitter">{index + 1}</td>
									<td className="border w-full bg-gray-600 text-white font-Bitter sticky left-0">{name}</td>
									{/* Add the cells for each day */}
									{Days.days.map(day => {

										return (
											<td key={day.day} title="select meal's type" className="bg-white border mx-auto w-full">
												<select
													className={`appearance-none w-32 h-8 cursor-pointer focus:outline-none px-2 py-0 rounded`}
													value={mealType}
													onChange={handleSelectChange}
												>
													{MealTypes.map((type) => (
														<option key={type} value={type}>
															{type}
														</option>
													))}
												</select>
											</td>
										);
									})}
									<td></td>
								</tr>
							);
						})}
					</tbody>
				</table>

			</div>
		</div>
	)
}

export default TableBody