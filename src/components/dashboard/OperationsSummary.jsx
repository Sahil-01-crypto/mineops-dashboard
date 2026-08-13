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

  const fineOreProduction =
    Number(latestData.fineOreProduction) || 0;

  const lumpOreProduction =
    Number(latestData.lumpOreProduction) || 0;

  const overallProduction =
    Number(latestData.overallProduction) || 0;

  const dispatch =
    Number(latestData.dispatch) || 0;

  const target =
    Number(latestData.target) || 0;

  const productionPercentage =
    target > 0
      ? Math.round((overallProduction / target) * 100)
      : 0;

  const dispatchPercentage =
    target > 0
      ? Math.round((dispatch / target) * 100)
      : 0;

  return (
    <div>

      <h2 className="text-xl font-semibold text-white mb-6">
        Today's Operations
      </h2>

      {/* Fine Ore */}

      <div className="mb-5">

        <div className="flex justify-between mb-2">

          <span className="text-slate-400">
            Fine Ore Production
          </span>

          <span className="text-white font-semibold">
            {fineOreProduction.toLocaleString()} MT
          </span>

        </div>

        <div className="h-2 bg-[#24344D] rounded-full">

          <div
            className="h-2 bg-blue-400 rounded-full"
            style={{
              width: `${
                overallProduction > 0
                  ? Math.min(
                      (fineOreProduction / overallProduction) * 100,
                      100
                    )
                  : 0
              }%`,
            }}
          />

        </div>

        <p className="text-xs text-slate-500 mt-2">
          Contribution to overall production
        </p>

      </div>

      {/* Lump Ore */}

      <div className="mb-5">

        <div className="flex justify-between mb-2">

          <span className="text-slate-400">
            Lump Ore Production
          </span>

          <span className="text-white font-semibold">
            {lumpOreProduction.toLocaleString()} MT
          </span>

        </div>

        <div className="h-2 bg-[#24344D] rounded-full">

          <div
            className="h-2 bg-purple-400 rounded-full"
            style={{
              width: `${
                overallProduction > 0
                  ? Math.min(
                      (lumpOreProduction / overallProduction) * 100,
                      100
                    )
                  : 0
              }%`,
            }}
          />

        </div>

        <p className="text-xs text-slate-500 mt-2">
          Contribution to overall production
        </p>

      </div>

      {/* Overall Production */}

      <div className="mb-5">

        <div className="flex justify-between mb-2">

          <span className="text-slate-400">
            Overall Production
          </span>

          <span className="text-white font-semibold">
            {overallProduction.toLocaleString()} MT
          </span>

        </div>

        <div className="h-2 bg-[#24344D] rounded-full">

          <div
            className="h-2 bg-green-400 rounded-full"
            style={{
              width: `${Math.min(productionPercentage, 100)}%`,
            }}
          />

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
            className="h-2 bg-orange-400 rounded-full"
            style={{
              width: `${Math.min(dispatchPercentage, 100)}%`,
            }}
          />

        </div>

        <p className="text-xs text-slate-500 mt-2">
          {dispatchPercentage}% of daily target
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