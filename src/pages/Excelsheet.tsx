import Spreadsheet from "react-spreadsheet";
import "../styles/Excelsheet.css";

export const ExcelSheet = () => {
  const columnLabels = [
    "ID",
    "Name",
    ...Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
    "Count",
    "%",
    "Total",
  ];

  const data = [
    [
      { value: 1 },
      { value: "John Doe" },
      ...Array.from({ length: 31 }, () => ({ value: Math.floor(Math.random() * 100) })),
      { value: 0 },
      { value: 0 },
      { value: 0 },
    ],
  ];

  return (
    <div className="spreadsheet-container">
      <div className="scroll-wrapper">
        <Spreadsheet data={data} columnLabels={columnLabels} />
      </div>
    </div>
  );
};
