import React, { useState } from "react";

const AddColumnPopup = ({ setIsAddColumnPopupOpen, addColumn }) => {
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [isFieldTypeOpen, setIsFieldTypeOpen] = useState(false);


  const handleCreate = () => {
    if (fieldName && fieldType) {
      addColumn(fieldName, fieldType);
      setIsAddColumnPopupOpen(false);
    }
  };

  const handleFieldTypeSelect = (type) => {
    setFieldType(type);
    setIsFieldTypeOpen(false);
  };


  return (
    <div className="fixed inset-0 bg-[#27282D] bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative py-2 px-4 bg-[#27282D] rounded-md border border-white/5 shadow-lg max-w-lg w-[450px] mx-auto">
        <div className="flex justify-between items-center py-3 mb-4 border-b border-white/5">
          <h2 className="text-base text-white">CREATE FIELD</h2>
          <div className="bg-[#1C1D1F] w-6 h-6 p-3 rounded-full flex items-center justify-center">
            <button
              onClick={() => setIsAddColumnPopupOpen(false)}
              className="text-white/50 text-sm focus:outline-none"
            >
              &#10005;
            </button>
          </div>
        </div>


        <div className="mb-4">
          <h3 className="text-white text-[14px] mb-2">Field Name</h3>
          <p className="text-white/50 text-xs mb-2">Enter A Unique Name For Your New Field</p>
          <input
            className="w-full py-3 px-2 mb-2 bg-[#191A1C] placeholder-white/35 text-white focus:outline-none text-[14px] rounded-md"
            placeholder="Enter your Field name here"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
          />
        </div>

        {/* Field Type Dropdown */}
        <div className="mb-4 relative">
          <h3 className="text-white text-sm mb-2">Field Type</h3>
          <div className="relative">
            <button
              onClick={() => setIsFieldTypeOpen(!isFieldTypeOpen)}
              className={`w-full flex justify-between items-center px-2 py-3 rounded-[4px] text-[14px] bg-[#191A1C] focus:outline-none ${
                fieldType ? "text-white" : "text-white/25"
              }`}
            >
              <span className="text-left">
                {fieldType || "Select Field Type"}
              </span>
              <img src="/downarrow.svg" alt="Down Arrow" className="h-5 w-5" />
            </button>
            {isFieldTypeOpen && (
              <div className="absolute left-0 right-0 bg-[#191A1C] rounded-md shadow-md z-10">
                <button
                  className="w-full text-left px-2 py-2 text-[14px] text-white hover:bg-[#313237]"
                  onClick={() => handleFieldTypeSelect("text")}
                >
                  Text
                </button>
                <button
                  className="w-full text-left px-2 py-2 text-[14px] text-white hover:bg-[#313237]"
                  onClick={() => handleFieldTypeSelect("number")}
                >
                  Number
                </button>
              </div>
            )}
          </div>
        </div>


        <div className="flex justify-end gap-4 border-t border-white/5 pt-4">
          <button
            className="bg-[#313237] px-8 py-2 text-[14px] text-white rounded-md"
            onClick={() => setIsAddColumnPopupOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-[#193892] px-8 py-2 text-[14px] text-white rounded-md"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddColumnPopup;
