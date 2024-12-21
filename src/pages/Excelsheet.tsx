import Spreadsheet from "react-spreadsheet";
import "../styles/Excelsheet.css";
import { useState,useEffect } from "react";
import { collection, DocumentData, DocumentReference, getDocs,updateDoc } from "firebase/firestore";
import { db } from "../firebase";

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
    const numericValues = row.slice(2, 33).map((cell) => Number(cell.value || 0));
    const sum = numericValues.reduce((acc, val) => acc + val, 0);
    const percent = Math.max(Math.round(sum * 0.04), 0);
    const total = sum - percent;

    return [
      { value: sum },
      { value: percent },
      { value: total },
    ];
  };

  const [data, setData] = useState<{ value: number | string }[][]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [docRefs, setDocRefs] = useState<DocumentReference<DocumentData>[]>([]);

  const fetchNamesFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Auth"));
      const fetchedData: { value: number | string }[][] = [];
      const references: DocumentReference<DocumentData>[] = [];
  
      querySnapshot.forEach((doc) => {
        const userName = doc.data().userName;
        const cellValues = doc.data().values || Array(31).fill(0); // Ensure we have 31 values, default to 0
        const count = doc.data().count || 0;
        const percent = doc.data().percent || 0;
        const total = doc.data().total || 0;
  
        if (userName) {
          references.push(doc.ref);
  
          // Construct row with fetched data
          const row = [
            { value: fetchedData.length + 1 }, // ID
            { value: userName },              // Name
            ...cellValues.map((val: number) => ({ value: val })), // 31 cells
            { value: count },
            { value: percent },
            { value: total },
          ];
          fetchedData.push(row);
        }
      });
  
      setData(fetchedData);
      setDocRefs(references);
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
  };

  useEffect(() => {
    fetchNamesFromFirestore();
  }, []);

  useEffect(() => {
    if (names.length > 0) {
      const initialData = names.map((name, index) => {
        const baseRow = [
          { value: index + 1 }, // ID
          { value: name }, // Name (userName from Firestore)
          ...Array.from({ length: 31 }, () => ({ value: "" })),
        ];
        return [...baseRow, ...calculateDerivedColumns(baseRow)];
      });
      setData(initialData);
    }
  }, [names]);

  const updateFirestore = async (rowIndex: number, updatedRow: any[]) => {
    if (!docRefs[rowIndex]) return;

    const numericValues = updatedRow.slice(2, 33).map((cell) => Number(cell.value || 0));
    const count = updatedRow[33].value;
    const percent = updatedRow[34].value;
    const total = updatedRow[35].value;

    try {
      await updateDoc(docRefs[rowIndex], {
        values: numericValues,
        count,
        percent,
        total,
      });
    } catch (error) {
      console.error("Error updating Firestore document:", error);
    }
  };

  const handleDataChange = (newData: any[]) => {
    const updatedData = newData.map((row, rowIndex) => {
      const updatedRow = [...row];
      const derivedValues = calculateDerivedColumns(row);
      updatedRow.splice(33, 3, ...derivedValues);

      // Update Firestore for the corresponding row
      updateFirestore(rowIndex, updatedRow);

      return updatedRow;
    });
    setData(updatedData);
  };

  const addEmptyRow = () => {
    const newRow = [
      { value: data.length + 1 },
      { value: "" },
      ...Array.from({ length: 31 }, () => ({ value: "" })),
    ];
    const updatedRow = [...newRow, ...calculateDerivedColumns(newRow)];
    setData((prevData) => [...prevData, updatedRow]);
  };

  const removeLastRow = () => {
    setData((prevData) => prevData.slice(0, -1));
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
