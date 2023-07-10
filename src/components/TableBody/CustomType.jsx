import React from 'react'

const CustomType = ({handleMealSubmit}) => {
    return (
        <div>
            {/* Open the modal using ID.showModal() method */}
            <button className="btn" onClick={() => window.my_modal_1.showModal()}>open modal</button>
            <dialog id="my_modal_1" className="modal">
                <form onSubmit={handleMealSubmit} method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Custom Meal Type</h3>
                    <input type="text" name='customType' placeholder="Type here" className="input input-bordered w-full max-w-xs" />

                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </div>
                    <button type='submit'>Done</button>
                </form>
            </dialog>
        </div>
    )
}

export default CustomType;