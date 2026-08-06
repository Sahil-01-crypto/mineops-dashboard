import React from "react";
import KPICard from "../components/dashboard/KPICard";
import ProductionChart from "../components/dashboard/productionChart.jsx";
const kpiData = [
  {
    title: "Today's Production",
    value: "12,480",
    unit: "MT",
  },
  {
    title: "Today's Dispatch",
    value: "10,920",
    unit: "MT",
  },
  {
    title: "Available Stock",
    value: "48,650",
    unit: "MT",
  },
  {
    title: "Active Equipment",
    value: "34/41",
    unit: "",
  },
];
const Dashboard = () => {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {kpiData.map((curr) => (
        <KPICard
          key={curr.title}
          title={curr.title}
          value={curr.value}
          unit={curr.unit}
        />
      ))}

      <div className="col-span-4 mt-8">
        <ProductionChart />
      </div>
    </div>
  );
};

export default Dashboard;
