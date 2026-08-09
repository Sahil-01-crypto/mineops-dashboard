import React from "react";
import { useMineData } from "../../context/MineDataContext.jsx";

const OperationsSummary = () => {
  const { mineData } = useMineData();

  const latestData = mineData?.[mineData.length - 1];

  if (!latestData) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">
          Today's Operations
        </h2>

        <div className="text-slate-400 text-sm">
          Upload operational data to view today's operations.
        </div>
      </div>
    );
  }

  const production = Number(latestData.Production) || 0;
  const dispatch = Number(latestData.Dispatch) || 0;
  const target = Number(latestData.Target) || 0;

  const productionPercentage =
    target > 0 ? Math.round((production / target) * 100) : 0;

  const dispatchPercentage =
    target > 0 ? Math.round((dispatch / target) * 100) : 0;

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">
        Today's Operations
      </h2>

      {/* Production */}

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-slate-400">
            Production
          </span>

          <span className="text-white font-semibold">
            {production.toLocaleString()} MT
          </span>
        </div>

        <div className="h-2 bg-[#24344D] rounded-full">
          <div
            className="h-2 bg-blue-400 rounded-full"
            style={{
              width: `${Math.min(productionPercentage, 100)}%`,
            }}
          ></div>
        </div>

        <p className="text-xs text-slate-500 mt-2">
          {productionPercentage}% of daily target
        </p>
      </div>

      {/* Dispatch */}

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-slate-400">
            Dispatch
          </span>

          <span className="text-white font-semibold">
            {dispatch.toLocaleString()} MT
          </span>
        </div>

        <div className="h-2 bg-[#24344D] rounded-full">
          <div
            className="h-2 bg-blue-400 rounded-full"
            style={{
              width: `${Math.min(dispatchPercentage, 100)}%`,
            }}
          ></div>
        </div>

        <p className="text-xs text-slate-500 mt-2">
          {dispatchPercentage}% of daily target
        </p>
      </div>

      {/* Equipment */}

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-slate-400">
            Equipment
          </span>

          <span className="text-white font-semibold">
            {latestData.ActiveEquipment || "No Data"}
          </span>
        </div>

        <div className="h-2 bg-[#24344D] rounded-full">
          <div
            className="h-2 bg-blue-400 rounded-full"
            style={{
              width: latestData.ActiveEquipment ? "83%" : "0%",
            }}
          ></div>
        </div>

        <p className="text-xs text-slate-500 mt-2">
          {latestData.ActiveEquipment
            ? "Currently active"
            : "Equipment data unavailable"}
        </p>
      </div>

      {/* Target */}

      <div className="border-t border-[#2A3B57] pt-5">
        <p className="text-sm text-slate-400">
          Daily Production Target
        </p>

        <p className="text-2xl font-bold text-white mt-1">
          {target.toLocaleString()} MT
        </p>
      </div>
    </div>
  );
};

export default OperationsSummary;