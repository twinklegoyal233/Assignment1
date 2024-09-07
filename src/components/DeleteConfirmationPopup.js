import React from "react";

function DeleteConfirmationPopup({ setIsDeletePopupOpen, deleteRow }) {
  return (
    <div className="fixed inset-0 bg-[#27282D] bg-opacity-50  flex items-center justify-center">
      <div className="px-6 py-4 bg-[#27282D] rounded-md  max-w-lg mx-auto w-[500px]">
        <div className="flex justify-between items-center my-4 ">
          <h2 className="text-white text-base">Confirm Delete</h2>

          <div className="bg-[#1C1D1F] w-6 h-6 p-3 rounded-full flex items-center justify-center">

<button
 onClick={() => setIsDeletePopupOpen(false)}
  className="text-white/50  text-sm focus:outline-none"
>
  &#10005;
</button>

</div>
        </div>
        <div className="border-y  border-white/5 py-4">

        <p className="text-white mb-2">Are you sure you want to delete this row?</p>
        <p className="text-white/40 text-[13px]">This action cannot be undone.</p>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-[#313237] px-10 py-2 rounded-md text-base text-white "
            onClick={() => setIsDeletePopupOpen(false)}
          >
            No
          </button>
          <button className="bg-[#285EF4] px-4 py-2 text-base text-white  rounded-md" onClick={deleteRow}>
            Yes, Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationPopup;
