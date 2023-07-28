import { useEffect, useRef } from 'react';
import UserInfo from "../../assets/JsonFiles/Names.json";
import DateNumber from "../../assets/JsonFiles/Numbers.json"

const Bazar = ({ setBazarShow }) => {
	const buttonRef = useRef(null);

	useEffect(() => {
		if (buttonRef.current) {
			buttonRef.current.click(); // Auto-click the button when the component renders
		}
	}, []);
	const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
	const currentHour = new Date(now).getHours();
	const currentMinute = new Date(now).getMinutes();
	const CurrentDate = new Date(now).getDate();
	const isNoon = currentHour >= 0 && currentHour < 12;
	// const isNoon=true;
	const BazDates = UserInfo.users.filter(user => Boolean(parseInt(user.bazar)));

	// const BazDates = UserInfo.users.filter(user => Boolean(parseInt(user.bazar)));

	const unmatchedElements = DateNumber.filter(item => {
		const DateSplit = parseInt(item.Date);
		return !BazDates.some(data => {
			const DateSplite = parseInt(data.bazar.split(',')[0]);
			return DateSplite === DateSplit;
		});
	});
	const HeadStyle = "border border-black text-black text-center font-bold bg-green-500"
	const CellStyle = "border border-black text-black"
	return (
		<div className='w-screen h-screen'>
			{/* You can open the modal using ID.showModal() method */}
			<button className="btn" ref={buttonRef} onClick={() => window.Bazar.showModal()}></button>
			<dialog id="Bazar" className="modal">
				<form method="dialog" className="modal-box w-11/12 max-w-5xl">
					<h1 className='text-xl lg:text-3xl font-bold font-Lora text-center pt-2 pb-3'>All Details (July, 2023)</h1>
					<div className="overflow-visible">
						<table className="table table-zebra table-xs lg:table-md">
							{/* head */}
							<thead>
								<tr>
									<th className={HeadStyle}>Serial</th>
									<th className={HeadStyle}>Name</th>
									<th className={HeadStyle}>Bazar Date </th>
									<th className={HeadStyle}>Bazar Cost </th>
									<th className={HeadStyle}>Given Amount</th>
									<th className={HeadStyle}>Total Expenses</th>
									<th className={HeadStyle}>You Pay</th>
									<th className={HeadStyle}>Manager Pay</th>
									<th className={HeadStyle}>Status</th>
								</tr>
							</thead>
							{UserInfo.users.map((user, index) => {
								const BazarDay = parseInt(user.bazar.split(",")[0]);
								const BazarStatus = <>{(BazarDay < CurrentDate) ? <span className='bg-green-500 font-bold'>Bazar Done</span> : CurrentDate===BazarDay&&!isNoon?<strong className='text-black font-bold'>Bazar Done</strong>:(CurrentDate===BazarDay&& isNoon)?"Vibrantly Ongoing":BazarDay}
								{}
								</>

								const TdDynamicStyle=`${((BazarDay < CurrentDate) || ((BazarDay === CurrentDate) && !isNoon)) ? "bg-green-500 font-bold" : "bg-white"}`
								return (
									<>
										<tbody>
											{/* row 1 */}
											<tr>
												<td className={`${CellStyle} ${TdDynamicStyle} rounded`}>{index + 1}</td>
												<td className={`${CellStyle} ${TdDynamicStyle} rounded`}>{user.name}</td>
												<td className={`${CellStyle} ${TdDynamicStyle}  rounded min-w-[120px]`}>{user.bazar}</td>
												<td className={`${CellStyle} text-center`}>{user.bazarCost?user.bazarCost:0} TK</td>
												<td className={`${CellStyle}`}></td>
												<td className={`${CellStyle}`}></td>
												<td className={`${CellStyle}`}></td>
												<td className={`${CellStyle}`}></td>
												<td className={`${CellStyle} ${TdDynamicStyle} rounded min-w-[100px]`}>
													{BazarStatus}
												</td>
											</tr>
										</tbody>
									</>
								)
							})}
						</table>
					</div>

					<div className="modal-action">
						{/* if there is a button, it will close the modal */}
						<button onClick={() => setBazarShow(false)} className="btn btn-info mb-3">Close Me</button>
					</div>
					<h1 className='bg-red-200 my-3 p-1 rounded inline-block'>These dates have not been picked up yet</h1>
					<div className='flex space-x-2'>
						{unmatchedElements.map((remaining, index) => {
							return (
								<p key={index} className=''>
									<span className='bg-green-400 rounded p-1'>{remaining.Date}, July 2023</span>
								</p>
							)
						})}
					</div>
				</form>
			</dialog>

		</div>
	)
}

export default Bazar;


// const handlePrint = () => {
    //     window.print(); // Trigger the browser's print functionality
    // };
/* <button className="btn print:hidden" onClick={handlePrint}>
									 Print
							 </button> */