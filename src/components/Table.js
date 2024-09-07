import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Popup from "./Popup";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import AddColumnPopup from "./AddColumnPopup";
import ColumnFilter from "./ColumnFilter"; 


function Table() {
  const [rows, setRows] = useState(
    Array(6).fill().map(() => ({ product_link: "", name: "", ingredients: [], price: "" }))
  );
  
      
  const [columns, setColumns] = useState([
    "product_link",
    "name",
    "ingredients",
    "price",
  ]);

  const [currentCell, setCurrentCell] = useState({ rowIndex: null, columnKey: "" });
  const [inputValue, setInputValue] = useState("");
  const [currentValues, setCurrentValues] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isAddColumnPopupOpen, setIsAddColumnPopupOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [filters, setFilters] = useState({});

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6); 

  const filterRows = (columnKey, contains, doesNotContain) => {
    const filteredRows = rows.filter((row) => {
      const cellValue = row[columnKey]?.toString().toLowerCase();
   
      const containsArray = Array.isArray(contains) ? contains : [contains];
      const doesNotContainArray = Array.isArray(doesNotContain) ? doesNotContain : [doesNotContain];
      
      const containsMatch = containsArray.length === 0 || containsArray.some(c => cellValue.includes(c.toLowerCase()));
      const doesNotContainMatch = doesNotContainArray.length === 0 || !doesNotContainArray.some(d => cellValue.includes(d.toLowerCase()));
      
      return containsMatch && doesNotContainMatch;
    });
  
    setRows(filteredRows);
    setFilters({ ...filters, [columnKey]: { contains, doesNotContain } });
  };
  
  const openPopup = (rowIndex, columnKey) => {
    const globalRowIndex = currentPage * rowsPerPage + rowIndex;
    setCurrentCell({ rowIndex: globalRowIndex, columnKey });
    setCurrentValues(rows[globalRowIndex][columnKey] || []);
    setIsPopupOpen(true);
    setInputValue("");
  };
  

  const saveValues = () => {
    const updatedRows = rows.map((row, i) =>
      i === currentCell.rowIndex ? { ...row, [currentCell.columnKey]: currentValues } : row
    );
    setRows(updatedRows);
    setIsPopupOpen(false);
  };
  
  const resetColumnFilters = (columnKey) => {
    const newFilters = { ...filters };
    if (newFilters[columnKey]) {
      delete newFilters[columnKey];
      setFilters(newFilters);
      filterRows(columnKey, [], []);
    }
  };
  
  const confirmDeleteRow = (localIndex) => {
    const globalIndex = currentPage * rowsPerPage + localIndex;
    setRowToDelete(globalIndex);
    setIsDeletePopupOpen(true);
  };
  

  const deleteRow = () => {
    const updatedRows = rows.filter((_, i) => i !== rowToDelete);
  
  
    const newPageCount = Math.ceil(updatedRows.length / rowsPerPage);
    if (currentPage >= newPageCount && newPageCount > 0) {
      setCurrentPage(newPageCount - 1); 
    }
  
    setRows(updatedRows);
    setIsDeletePopupOpen(false);
    setRowToDelete(null);
  };
  

  const addRow = () => {
    const newRow = columns.reduce((acc, col) => ({ ...acc, [col]: "" }), {});
    setRows([...rows, newRow]);
  };

  const addColumn = (fieldName, fieldType) => {
    setColumns([...columns, fieldName]);
    setRows(rows.map((row) => ({ ...row, [fieldName]: "" }))); 
  };
  

  // Pagination logic
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  
  const offset = currentPage * rowsPerPage;
  const currentRows = rows.slice(offset, offset + rowsPerPage);
  const pageCount = Math.ceil(rows.length / rowsPerPage);


  const changeRowsPerPage = (amount) => {
    if (rowsPerPage + amount > 0) {
      setRowsPerPage(rowsPerPage + amount);
    }
  };

  return (
    <div className="container mx-auto h-screen max-w-[1440px] px-6 bg-[#1C1D1F] text-white py-4">
      <div className="flex justify-between items-center mb-4 border-b-white/5 border border-x-0 border-t-0 pb-4">
        <h1 className="text-[14px] font-bold ">Skin Care Catalog</h1>
        <button
          className="bg-[#285EF4] px-6 py-1 text-[14px] text-white font-normal rounded-md"
          onClick={addRow}
        >
          + Add Row
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[75%] min-h-96 bg-[#27282D] text-white shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-xs text-center border-r ">#</th>
              {columns.map((col, idx) => (
                <th key={idx} className="relative px-4 py-2 text-xs text-left border-r-white border-r">
                  {col.toUpperCase()}
                  <ColumnFilter 
  columnKey={col} 
  filterRows={filterRows} 
  resetColumnFilters={resetColumnFilters} 
/>

                </th>
              ))}
              <th className="px-4 py-2 text-white/50 font-normal text-xs cursor-pointer text-center border-r border-r-white " onClick={() => setIsAddColumnPopupOpen(true)}>
                + ADD NEW COLUMN
              </th>
            </tr>
          </thead>

          <tbody>
  {currentRows.map((row, index) => (
    <tr key={index} className="bg-[#1C1D1F]">
   
      <td className="text-center px-4 py-2 border-r text-xs text-[#CCCCCC] border-r-white border-white/20 border-b">
        {index + 1} 
      </td>
      {columns.map((key) => (
        <td
          key={key}
          className="border border-white/20 border-t-0 border-r  border-r-white px-4 py-2 cursor-pointer text-left"
          onClick={() => openPopup(index, key)}
        >
          {Array.isArray(row[key]) ? row[key].join(", ") : row[key]}
        </td>
      ))}
      <td className="border border-white/25 border-t-0 border-r-white px-4  py-2 text-center">
        <button className="text-[12px]"  onClick={() => confirmDeleteRow(index)}>
          🗑️
        </button>
      </td>
    </tr>
  ))}

  <tr className="bg-[#1C1D1F]">
    <td className="text-center px-4 py-2 ">
      <button onClick={addRow} className="text-xl text-white">+</button>
    </td>
    {columns.map((_, idx) => (
      <td key={idx} className="px-4 py-2 "></td>
    ))}
  
    <td className="px-4 py-2 text-center "></td>
  </tr>
</tbody>

        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
       
        <div className="text-sm text-white flex items-center">
          <span>Entries per page:</span>
          <button
            className="bg-[#27282D] px-3 py-1 mx-2 rounded border border-gray-600 text-white"
            onClick={() => changeRowsPerPage(-1)}
          >
            -
          </button>
          <span>{rowsPerPage}</span>
          <button
            className="bg-[#27282D] px-3 py-1 mx-2 rounded border border-gray-600 text-white"
            onClick={() => changeRowsPerPage(1)}
          >
            +
          </button>
        </div>

     
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination flex justify-center space-x-2"}
          activeClassName={"active"}
          previousClassName={"prev-page text-white"}
          nextClassName={"next-page text-white"}
          disabledClassName={"disabled text-gray-600"}
          pageClassName={"page-item text-white"}
          pageLinkClassName={"page-link px-3 py-1 rounded bg-[#27282D] border border-gray-600"}
        />

       
        <div className="flex space-x-4">
          
          <button
            className={`${
              currentPage === 0 ? "text-gray-600" : "text-white"
            } bg-[#27282D] px-4 py-2 rounded-md text-[14px] `}
            onClick={() => handlePageClick({ selected: Math.max(currentPage - 1, 0) })}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            className={`${
              currentPage === pageCount - 1 ? "text-gray-600" : "text-white"
            } bg-[#27282D] px-4 py-2 rounded-md text-[14px] `}
            onClick={() =>
              handlePageClick({ selected: Math.min(currentPage + 1, pageCount - 1) })
            }
            disabled={currentPage === pageCount - 1}
          >
            Next
          </button>
        </div>
      </div>

      {/* Popup for editing cell values */}
      {isPopupOpen && (
        <Popup
          currentValues={currentValues}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setCurrentValues={setCurrentValues}
          setIsPopupOpen={setIsPopupOpen}
          saveValues={saveValues}
        />
      )}

      {/* Popup for confirming row deletion */}
      {isDeletePopupOpen && (
        <DeleteConfirmationPopup
          setIsDeletePopupOpen={setIsDeletePopupOpen}
          deleteRow={deleteRow}
        />
      )}

      {/* Popup for adding new column */}
      {isAddColumnPopupOpen && (
        <AddColumnPopup
          setIsAddColumnPopupOpen={setIsAddColumnPopupOpen}
          addColumn={addColumn}
        />
      )}
    </div>
  );
}

export default Table;
