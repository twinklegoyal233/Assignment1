import React from "react";

function Popup({
  currentValues,
  inputValue,
  setInputValue,
  setCurrentValues,
  setIsPopupOpen,
  saveValues,
}) {

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue) {
      setCurrentValues([...currentValues, inputValue]);
      setInputValue("");
    }
  };


  const removeValue = (valueToRemove) => {
    setCurrentValues(currentValues.filter((value) => value !== valueToRemove));
  };

  return (
    <div className="fixed inset-0 bg-[#27282D] bg-opacity-50 flex items-center justify-center">
      <div className="p-6 bg-[#27282D] w-[350px] rounded-md border border-white/5 shadow-lg max-w-lg mx-auto">
        <input
          className="w-full py-3 px-6 mb-4 bg-[#2B2C31] text-white focus:outline-none rounded-md placeholder-white/25"
          value={inputValue}
          placeholder="Add values and press Enter to add"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress} 
        />

        <div>
            <div className="flex gap-2">
          <h3 className="mb-4 text-white/50">ADDED ENTRIES </h3>
        <div className="bg-white text-black rounded-lg w-4 h-6 flex items-center justify-center">
            {currentValues.length}
        </div>

            </div>
          <div className="flex flex-wrap gap-2">
            {currentValues.map((value, idx) => (
              <span
                key={idx}
                className="inline-flex items-center bg-[#515763] text-[12px] text-white px-2 py-1 rounded-md"
              >
                {value}
                <button className="ml-2 text-white " onClick={() => removeValue(value)}>
                  <p className="text-[8px]">  &#10005; </p>
              
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4 border-t pt-4 border-white/10 border-x-0 border-b-0 ">
          <button
            className="bg-[#313237] text-[14px] px-6 py-2 text-[#285EF4] border border-[#285EF4] rounded-md"
            onClick={() => setCurrentValues([])}
          >
            Reset All
          </button>
          <button
            className="bg-[#285EF4] px-10 py-2 text-[14px] text-white rounded-md"
            onClick={saveValues}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
