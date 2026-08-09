import React from "react";
import * as XLSX from "xlsx";

const ExcelUploader = ({ onDataLoaded }) => {
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

      console.log("Uploaded data:", jsonData);

      onDataLoaded(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

      <h2 className="text-xl font-semibold text-white mb-2">
        Upload Operational Data
      </h2>

      <p className="text-slate-400 text-sm mb-5">
        Upload an Excel or CSV file to update MineOps data.
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