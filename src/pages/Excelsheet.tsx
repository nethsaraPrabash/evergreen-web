import Spreadsheet from "react-spreadsheet";
import "../styles/Excelsheet.css";
import { useState } from "react";

export const ExcelSheet = () => {
  const columnLabels = [
    "ID",
    "Name",
    ...Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
    "Count",
    "%",
    "Total",
  ];

  const calculateDerivedColumns = (row: any[]) => {
    // Extract relevant columns
    const numericValues = row.slice(2, 33).map((cell) => Number(cell.value || 0));
    const sum = numericValues.reduce((acc, val) => acc + val, 0); // Sum of daily values
    const percent = Math.max(Math.round(sum * 0.04), 0); // Formula for %
    const total = sum - percent; // Formula for Total

    return [
      { value: sum }, // Count
      { value: percent }, // %
      { value: total }, // Total
    ];
  };

  const initialRow = () => {
    const baseRow = [
      { value: 1 },
      { value: "John Doe" },
      ...Array.from({ length: 31 }, () => ({ value: Math.floor(Math.random() * 100) })),
    ];
    return [...baseRow, ...calculateDerivedColumns(baseRow)];
  };

  const [data, setData] = useState([initialRow()]);


  const addEmptyRow = () => {
    const newRow = Array.from({ length: 33 }, () => ({ value: "" }));
    const updatedRow = [...newRow, ...calculateDerivedColumns(newRow)];
    setData((prevData) => [...prevData, updatedRow]);
  };

  const removeLastRow = () => {
    setData((prevData) => prevData.slice(0, -1));
  };

  const handleDataChange = (newData: any[]) => {
    const updatedData = newData.map((row, rowIndex) => {
      const updatedRow = [...row];
      const derivedValues = calculateDerivedColumns(row);
      updatedRow.splice(33, 3, ...derivedValues); // Update Count, %, and Total columns
      return updatedRow;
    });
    setData(updatedData);
  };



  return (
    <div className="spreadsheet-container">
      <div className="scroll-wrapper">

        <button className="add-row-button" onClick={addEmptyRow}>Add row</button><br />
        <button className="remove-row-button" onClick={removeLastRow}>Remove row</button>
        <Spreadsheet data={data} columnLabels={columnLabels} onChange={handleDataChange} />
      </div>
    </div>
  );
};
