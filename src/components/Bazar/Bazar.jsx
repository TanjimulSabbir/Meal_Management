import { useEffect, useRef } from 'react';
import UserInfo from "../../assets/JsonFiles/Names.json"

const Bazar = ({ setBazarShow }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.click(); // Auto-click the button when the component renders
        }
    }, []);
    const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
    const CurrentDay = parseInt(now.split("/")[1]);

    const HeadStyle = "border border-black text-black text-center font-bold bg-green-500"
    const CellStyle = "border border-black text-black"
    return (
        <div className='w-screen h-screen'>
            {/* You can open the modal using ID.showModal() method */}
            <button className="btn" ref={buttonRef} onClick={() => window.Bazar.showModal()}></button>
            <dialog id="Bazar" className="modal">
                <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                <h1 className='text-xl lg:text-3xl font-bold font-Lora text-center fixed top-5 inset-0'>All Details (July, 2023)</h1>
                    <div className="overflow-visible mt-14">
                        <table className="table table-zebra table-xs lg:table-md">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className={HeadStyle}>Serial</th>
                                    <th className={HeadStyle}>Name</th>
                                    <th className={HeadStyle}> Bazar Date </th>
                                    <th className={HeadStyle}>Given Amount</th>
                                    <th className={HeadStyle}>Total Expenses</th>
                                    <th className={HeadStyle}>You Pay</th>
                                    <th className={HeadStyle}>Manager Pay</th>
                                    <th className={HeadStyle}>Status</th>
                                </tr>
                            </thead>
                            {UserInfo.users.map((user, index) => {
                                const BazarDay = parseInt(user.bazar.split(",")[0]);
                                return (
                                    <>
                                        <tbody>
                                            {/* row 1 */}
                                            <tr>
                                                <td className={`${CellStyle} ${BazarDay < CurrentDay ? "bg-green-500 font-bold" : "bg-white"} rounded`}>{index + 1}</td>
                                                <td className={`${CellStyle}  ${BazarDay < CurrentDay ? "bg-green-500 font-bold" : "bg-white"} rounded`}>{user.name}</td>
                                                <td className={`${CellStyle} ${BazarDay < CurrentDay ? "bg-green-500" : "bg-white"} rounded`}>{user.bazar}</td>
                                                <td className={`${CellStyle}`}></td>
                                                <td className={`${CellStyle}`}></td>
                                                <td className={`${CellStyle}`}></td>
                                                <td className={`${CellStyle}`}></td>
                                                <td className={`${CellStyle}`}>
                                                    {BazarDay < CurrentDay ? <span className='font-bold'>Bazar Done</span>:""}
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
                        <button onClick={() => setBazarShow(false)} className="btn btn-info">Close</button>
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