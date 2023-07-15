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
    const handlePrint = () => {
        window.print(); // Trigger the browser's print functionality
    };
    const HeadStyle="border border-black text-black text-center font-bold"
    const CellStyle="border border-black text-black"
    return (
        <div >
            {/* You can open the modal using ID.showModal() method */}
            <button className="btn" ref={buttonRef} onClick={() => window.Bazar.showModal()}></button>
            <dialog id="Bazar" className="modal print">
                <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                <div className="overflow-x-visible w-screen h-full">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th className={HeadStyle}>Serial</th>
              <th className={HeadStyle}>Name</th>
              <th className={HeadStyle}>Bazar Date</th>
              <th className={HeadStyle}>Given Amount</th>
              <th className={HeadStyle}>Total Expenses</th>
              <th className={HeadStyle}></th>
              <th className={HeadStyle}></th>
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
                    <td className={CellStyle}>{index + 1}</td>
                    <td className={`${CellStyle}`}>{user.name}</td>
                    <td className={`${CellStyle}`}>{user.bazar}</td>
                    <td className={`${CellStyle} w-80`}></td>
                    <td className={`${CellStyle} `}></td>
                    <td className={`${CellStyle}`}></td>
                    <td className={`${CellStyle}`}></td>
                    <td className={`${CellStyle}`}></td>
                  </tr>
                </tbody>
              </>
            )
          })}
        </table>
      </div>
                    <div className="modal-action">
                        {/* if there is a button, it will close the modal */}
                        <button onClick={() => setBazarShow(false)} className="btn  print:hidden">Close</button>
                    </div>
                    <button className="btn print:hidden" onClick={handlePrint}>
                        Print
                    </button>
                </form>

            </dialog>
        </div>
    )
}
// className={BazarDay<CurrentDay?"bg-red-500":"bg-green-500"}
export default Bazar