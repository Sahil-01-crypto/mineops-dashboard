import React from "react";
import KPICard from "../components/dashboard/KPICard";
import ProductionChart from "../components/dashboard/productionChart.jsx";
import OperationsSummary from "../components/dashboard/OperationsSummary.jsx";

import { useMineData } from "../context/MineDataContext.jsx";
import ExcelUploader from "../components/data/ExcelUploader.jsx";

import PDFReportGenerator from "../components/reports/PDFReportGenerator.jsx";

const Dashboard = () => {
  const { mineData, setMineData } = useMineData();

  const latestData = mineData?.[mineData.length - 1];

  const kpiData = latestData
  ? [
      {
        title: "Fine Ore Production",
        value: latestData.fineOreProduction.toLocaleString(),
        unit: "MT",
      },
      {
        title: "Lump Ore Production",
        value: latestData.lumpOreProduction.toLocaleString(),
        unit: "MT",
      },
      {
        title: "Overall Production",
        value: latestData.overallProduction.toLocaleString(),
        unit: "MT",
      },
      {
        title: "Overall Stock",
        value: latestData.overallStock.toLocaleString(),
        unit: "MT",
      },
    ]
  : [
      {
        title: "Fine Ore Production",
        value: "No Data Uploaded",
        unit: "",
      },
      {
        title: "Lump Ore Production",
        value: "No Data Uploaded",
        unit: "",
      },
      {
        title: "Overall Production",
        value: "No Data Uploaded",
        unit: "",
      },
      {
        title: "Overall Stock",
        value: "No Data Uploaded",
        unit: "",
      },
    ];

  return (
    <div className=" m-1 p-8">
      {/* HERO SECTION */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">Welcome to MineOps</h1>

        <p className="text-slate-400 mt-2 text-lg">
          Turn mining data into operational intelligence.
        </p>
      </div>

      {/* EXCEL UPLOAD */}

      <div className="mb-10">
        <ExcelUploader
          onDataLoaded={(data) => {
            console.log("MineOps global data:", data);
            setMineData(data);
          }}
        />

        <div className=" mt-2 mb-10 flex justify-end">
          <PDFReportGenerator />
        </div>
      </div>

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpiData.map((curr) => (
          <KPICard
            key={curr.title}
            title={curr.title}
            value={curr.value}
            unit={curr.unit}
          />
        ))}
      </div>

      {/* CHART + OPERATIONS SUMMARY */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        {/* Production Chart */}

        <div className="xl:col-span-2">
          <ProductionChart />
        </div>

        {/* Operations Summary */}

        <div>
          <OperationsSummary />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
