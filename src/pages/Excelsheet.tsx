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
      const fetchedNames: any[] | ((prevState: never[]) => never[]) = [];
      const references: ((prevState: never[]) => never[]) | DocumentReference<DocumentData, DocumentData>[] = [];

      querySnapshot.forEach((doc) => {
        const userName = doc.data().userName;
        if (userName) {
          fetchedNames.push(userName);
          references.push(doc.ref);
        }
      });

      setNames(fetchedNames);
      setDocRefs(references);
    } catch (error) {
      console.error("Error fetching userName fields:", error);
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
