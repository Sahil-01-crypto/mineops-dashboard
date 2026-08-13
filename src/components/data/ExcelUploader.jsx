import React from "react";
import * as XLSX from "xlsx";

const ExcelUploader = ({ onDataLoaded }) => {
  const formatDate = (value) => {
  if (!value) return "";

  // Excel serial date
  if (typeof value === "number") {
    const excelDate = XLSX.SSF.parse_date_code(value);

    if (!excelDate) return "";

    const day = String(excelDate.d).padStart(2, "0");
    const month = String(excelDate.m).padStart(2, "0");
    const year = excelDate.y;

    return `${day}-${month}-${year}`;
  }

  // JavaScript Date / string date
  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;

      const workbook = XLSX.read(data, {
        type: "array",
      });

      const sheetName = workbook.SheetNames[0];

      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log("Uploaded raw data:", jsonData);

      // Convert Excel data into MineOps format
      const processedData = jsonData.map((item) => {
        const fineOreProduction = Number(item.FineOreProduction) || 0;
        const lumpOreProduction = Number(item.LumpOreProduction) || 0;

        const fineOreStock = Number(item.FineOreStock) || 0;
        const lumpOreStock = Number(item.LumpOreStock) || 0;

        const overallProduction =
          fineOreProduction + lumpOreProduction;

        const overallStock =
          fineOreStock + lumpOreStock;

        return {
          date: formatDate(item.Date),

          fineOreProduction,
          lumpOreProduction,
          overallProduction,

          target: Number(item.Target) || 0,
          dispatch: Number(item.Dispatch) || 0,

          fineOreStock,
          lumpOreStock,
          overallStock,
        };
      });

      console.log("Processed MineOps data:", processedData);

      onDataLoaded(processedData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

      <h2 className="text-xl font-semibold text-white mb-2">
        Upload Operational Data
      </h2>

      <p className="text-slate-400 text-sm mb-5">
        Upload a 30-day Excel or CSV operational dataset.
      </p>

      <label className="inline-block cursor-pointer">

        <span className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl font-medium transition">
          Choose Excel / CSV
        </span>

        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileUpload}
          className="hidden"
        />

      </label>

    </div>
  );
};

export default ExcelUploader;