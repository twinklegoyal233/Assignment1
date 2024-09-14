import React, { useState, useEffect, useRef } from "react";

import Icon from '@mdi/react';
import { mdiFilterOutline } from '@mdi/js';

function ColumnFilter({
  columnKey,
  fieldType,
  filterRows,
  originalRows,
  setRows,
updatedRows
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [containsList, setContainsList] = useState([]);
  const [doesNotContainList, setDoesNotContainList] = useState([]);
  const [currentContainsInput, setCurrentContainsInput] = useState("");
  const [currentDoesNotContainInput, setCurrentDoesNotContainInput] = useState("");
  const [selectedOperation, setSelectedOperation] = useState("Select an Operatio");
  const [numberInput, setNumberInput] = useState("");

  const dropdownRef = useRef(null); 
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleContainsChange = (e) => {
    setCurrentContainsInput(e.target.value);
  };

  const handleDoesNotContainChange = (e) => {
    setCurrentDoesNotContainInput(e.target.value);
  };

  const handleContainsKeyPress = (e) => {
    if (e.key === "Enter" && currentContainsInput.trim()) {
      setContainsList([...containsList, currentContainsInput.trim()]);
      setCurrentContainsInput("");
    }
  };

  const handleDoesNotContainKeyPress = (e) => {
    if (e.key === "Enter" && currentDoesNotContainInput.trim()) {
      setDoesNotContainList([...doesNotContainList, currentDoesNotContainInput.trim()]);
      setCurrentDoesNotContainInput("");
    }
  };

  const removeContainsValue = (valueToRemove) => {
    setContainsList(containsList.filter((value) => value !== valueToRemove));
  };

  const removeDoesNotContainValue = (valueToRemove) => {
    setDoesNotContainList(doesNotContainList.filter((value) => value !== valueToRemove));
  };


  const handleNumberInputChange = (e) => {
    setNumberInput(e.target.value);
  };

  const handleOperationChange = (e) => {
    setSelectedOperation(e.target.value);
  };

  const applyFilters = () => {
    if (fieldType === "number") {
      const filteredRows = originalRows.filter((row) => {
        const value = parseFloat(row[columnKey]);
        const numberValue = parseFloat(numberInput);
  
       
        if (isNaN(numberValue)) return true;
  
        switch (selectedOperation) {
          case ">":
            return value > numberValue;
          case "<":
            return value < numberValue;
          case "=":
            return value === numberValue;
          case ">=":
            return value >= numberValue;
          case "<=":
            return value <= numberValue;
          default:
            return true;
        }
      });
      setRows(filteredRows);
    } else {
      filterRows(columnKey, containsList, doesNotContainList);
    }
    closeDropdown();
  };
  
  const resetFilters = () => {
    setContainsList([]);
    setDoesNotContainList([]);
    setNumberInput("");
    setSelectedOperation("");
    setRows(updatedRows);   
    closeDropdown();
  };
  



  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="inline-block ml-6" ref={dropdownRef}>

<div className="flex items-center space-x-3 relative top-[5px] ">

<Icon path={mdiFilterOutline} style={{height: "18px", width: "18px"}} onClick={toggleDropdown}  color="rgba(255, 255, 255, 0.5)" />
      <button  className="text-white focus:outline-none">
        &#8942;
      </button>
</div>

      {isDropdownOpen && (
        <div className="absolute bg-[#27282D] border border-white/5 text-white px-4 py-3 rounded shadow-md z-10 font-normal">
          {fieldType === "number" ? (
            <>
              <div className="flex justify-between items-center mb-4 w-[230px] max-w-lg">
                <h4 className="text-sm text-white/75">NUMBER FILTER</h4>
                <div className="bg-black w-5 h-5 p-3 rounded-full flex items-center justify-center">
                  <button onClick={closeDropdown} className="text-white/50 text-sm focus:outline-none">
                    &#10005;
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs text-left text-white/75 mb-[6px]">OPERATION</label>
                <select
                  className="w-full py-2 rounded-md px-2 bg-[#191A1C] text-white focus:outline-none"
                  value={selectedOperation}
                  onChange={handleOperationChange}
                >
                  
                  <option value="">Select an Operation</option>
                  <option value=">">Greater than</option>
                  <option value="<">Less than</option>
                  <option value="=">Equal to</option>
                  <option value=">=">Greater than or equal to</option>
                  <option value="<=">Less than or equal to</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-xs text-left text-white/75 mb-[6px]">NUMBER</label>
                <input
                  type="number"
                  className="w-full py-3 rounded-md px-2 bg-[#191A1C] text-white focus:outline-none"
                  placeholder="Enter a number"
                  value={numberInput}
                  onChange={handleNumberInputChange}
                />
              </div>

              <div className="flex gap-4 mt-2 justify-end border border-x-0 border-b-0 border-white/5 pt-4">
                <button
                  className="bg-[#313237] px-5 py-2 font-normal text-xs rounded-[4px]"
                  onClick={resetFilters}
                >
                  Reset All
                </button>
                <button
                  className="bg-[#285EF4] px-[30px] py-2 font-normal text-xs rounded-[4px]"
                  onClick={applyFilters}
                >
                  Apply
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4 w-[230px] max-w-lg">
                <h4 className="text-sm text-white/75">TEXT FILTER</h4>
                <div className="bg-black w-5 h-5 p-3 rounded-full flex items-center justify-center">
                  <button onClick={closeDropdown} className="text-white/50 text-sm focus:outline-none">
                    &#10005;
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs text-left text-white/75 mb-[6px]">CONTAINS LIST</label>
                <input
                  type="text"
                  className="w-full py-3 rounded-md px-2 bg-[#191A1C] text-white focus:outline-none"
                  placeholder="Add entries and press enter"
                  value={currentContainsInput}
                  onChange={handleContainsChange}
                  onKeyDown={handleContainsKeyPress}
                />
                <div className="mt-2">
                  {containsList.map((value, idx) => (
                    <span key={idx} className="inline-flex items-center bg-[#515763] text-[12px] text-white px-2 py-1 rounded-md mr-2 mb-2">
                      {value}
                      <button className="ml-2 text-white" onClick={() => removeContainsValue(value)}>
                        <p className="text-[8px]">&#10005;</p>
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-left text-xs mb-4 text-white/75">DOES NOT CONTAIN LIST</label>
                <input
                  type="text"
                  className="w-full py-3 rounded-md px-2 bg-[#191A1C] text-white focus:outline-none"
                  placeholder="Add entries and press enter"
                  value={currentDoesNotContainInput}
                  onChange={handleDoesNotContainChange}
                  onKeyDown={handleDoesNotContainKeyPress}
                />
                <div className="mt-2">
                  {doesNotContainList.map((value, idx) => (
                    <span key={idx} className="inline-flex items-center bg-[#515763] text-[12px] text-white px-2 py-1 rounded-md mr-2 mb-2">
                      {value}
                      <button className="ml-2 text-white" onClick={() => removeDoesNotContainValue(value)}>
                        <p className="text-[8px]">&#10005;</p>
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-2 justify-end border border-x-0 border-b-0 border-white/5 pt-4">
                <button
                  className="bg-[#313237] px-5 py-2 font-normal text-xs rounded-[4px]"
                  onClick={resetFilters}
                >
                  Reset All
                </button>
                <button
                  className="bg-[#285EF4] px-[30px] py-2 font-normal text-xs rounded-[4px]"
                  onClick={applyFilters}
                >
                  Apply
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ColumnFilter;
