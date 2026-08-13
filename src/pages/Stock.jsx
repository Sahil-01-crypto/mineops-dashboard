import React from "react";
import { useMineData } from "../context/MineDataContext.jsx";

const Stock = () => {
  const { mineData } = useMineData();

  // No data uploaded
  if (!mineData || mineData.length === 0) {
    return (
      <div>
        {/* Header */}

        <div className="mb-8 p-8">
          <h1 className="text-3xl font-bold text-white">
            Stock
          </h1>

          <p className="text-slate-400 mt-2">
            Monitor fine ore, lump ore and overall stock levels.
          </p>
        </div>

        {/* Empty State */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-10 text-center mx-7">

          <h2 className="text-xl font-semibold text-white">
            No Stock Data
          </h2>

          <p className="text-slate-400 mt-2">
            Upload an Excel or CSV file from the Dashboard
            to view stock information.
          </p>

        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // LATEST DATA
  // --------------------------------------------------

  const latestData =
    mineData[mineData.length - 1];


  // --------------------------------------------------
  // CURRENT STOCK
  // --------------------------------------------------

  const currentFineOreStock =
    Number(latestData.fineOreStock) || 0;

  const currentLumpOreStock =
    Number(latestData.lumpOreStock) || 0;

  const currentOverallStock =
    currentFineOreStock +
    currentLumpOreStock;


  // --------------------------------------------------
  // STOCK ARRAYS
  // --------------------------------------------------

  const fineOreStockValues = mineData.map(
    (item) =>
      Number(item.fineOreStock) || 0
  );

  const lumpOreStockValues = mineData.map(
    (item) =>
      Number(item.lumpOreStock) || 0
  );

  const overallStockValues = mineData.map(
    (item) => {

      const fine =
        Number(item.fineOreStock) || 0;

      const lump =
        Number(item.lumpOreStock) || 0;

      return fine + lump;
    }
  );


  // --------------------------------------------------
  // AVERAGES
  // --------------------------------------------------

  const averageFineOreStock =
    fineOreStockValues.reduce(
      (sum, value) => sum + value,
      0
    ) / fineOreStockValues.length;

  const averageLumpOreStock =
    lumpOreStockValues.reduce(
      (sum, value) => sum + value,
      0
    ) / lumpOreStockValues.length;

  const averageOverallStock =
    overallStockValues.reduce(
      (sum, value) => sum + value,
      0
    ) / overallStockValues.length;


  // --------------------------------------------------
  // HIGHEST / LOWEST
  // --------------------------------------------------

  const highestOverallStock =
    Math.max(...overallStockValues);

  const lowestOverallStock =
    Math.min(...overallStockValues);


  // --------------------------------------------------
  // STOCK HISTORY
  // --------------------------------------------------

  const stockHistory = mineData.map(
    (item, index) => {

      const fineOre =
        Number(item.fineOreStock) || 0;

      const lumpOre =
        Number(item.lumpOreStock) || 0;

      const overall =
        fineOre + lumpOre;


      const previousOverall =
        index > 0
          ? overallStockValues[index - 1]
          : overall;


      const change =
        overall - previousOverall;


      let status = "Stable";
      let statusColor = "text-slate-400";

      if (change > 0) {
        status = "Increased";
        statusColor = "text-green-400";
      } else if (change < 0) {
        status = "Decreased";
        statusColor = "text-yellow-400";
      }


      return {
        date: item.date,
        fineOre,
        lumpOre,
        overall,
        change,
        status,
        statusColor,
      };
    }
  );


  return (
    <div className="mx-7">

      {/* --------------------------------------------- */}
      {/* HEADER */}
      {/* --------------------------------------------- */}

      <div className="p-8">

        <h1 className="text-3xl font-bold text-white">
          Stock
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor fine ore, lump ore and overall stock levels.
        </p>

      </div>


      {/* --------------------------------------------- */}
      {/* SUMMARY CARDS */}
      {/* --------------------------------------------- */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">


        {/* Fine Ore */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-slate-400">
            Fine Ore Stock
          </p>

          <h2 className="text-3xl font-bold mt-3 text-blue-400">
            {currentFineOreStock.toLocaleString()} MT
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            Current stock
          </p>

        </div>


        {/* Lump Ore */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-slate-400">
            Lump Ore Stock
          </p>

          <h2 className="text-3xl font-bold mt-3 text-purple-400">
            {currentLumpOreStock.toLocaleString()} MT
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            Current stock
          </p>

        </div>


        {/* Overall */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-slate-400">
            Overall Stock
          </p>

          <h2 className="text-3xl font-bold mt-3 text-white">
            {currentOverallStock.toLocaleString()} MT
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            Fine Ore + Lump Ore
          </p>

        </div>


        {/* Average */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-slate-400">
            Average Overall Stock
          </p>

          <h2 className="text-3xl font-bold mt-3 text-green-400">
            {Math.round(
              averageOverallStock
            ).toLocaleString()} MT
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            30-day average
          </p>

        </div>

      </div>


      {/* --------------------------------------------- */}
      {/* SECONDARY SUMMARY */}
      {/* --------------------------------------------- */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">


        {/* Average Fine */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-sm text-slate-400">
            Average Fine Ore Stock
          </p>

          <h2 className="text-2xl font-bold mt-3 text-blue-400">
            {Math.round(
              averageFineOreStock
            ).toLocaleString()} MT
          </h2>

        </div>


        {/* Average Lump */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-sm text-slate-400">
            Average Lump Ore Stock
          </p>

          <h2 className="text-2xl font-bold mt-3 text-purple-400">
            {Math.round(
              averageLumpOreStock
            ).toLocaleString()} MT
          </h2>

        </div>


        {/* Highest */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-sm text-slate-400">
            Highest Overall Stock
          </p>

          <h2 className="text-2xl font-bold mt-3 text-white">
            {highestOverallStock.toLocaleString()} MT
          </h2>

        </div>

      </div>


      {/* --------------------------------------------- */}
      {/* STOCK HISTORY */}
      {/* --------------------------------------------- */}

      <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-[#2A3B57]">

          <h2 className="text-xl font-semibold text-white">
            30-Day Stock Analysis
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Daily fine ore, lump ore and overall stock movement.
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#1B2A40]">

              <tr>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Date
                </th>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Fine Ore Stock
                </th>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Lump Ore Stock
                </th>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Overall Stock
                </th>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Change
                </th>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Status
                </th>

              </tr>

            </thead>


            <tbody>

              {stockHistory.map(
                (item, index) => (

                  <tr
                    key={`${item.date}-${index}`}
                    className="border-t border-[#2A3B57] hover:bg-[#1B2A40]"
                  >

                    {/* Date */}

                    <td className="px-6 py-4 text-white">
                      {item.date}
                    </td>


                    {/* Fine */}

                    <td className="px-6 py-4 font-semibold text-blue-400">
                      {item.fineOre.toLocaleString()} MT
                    </td>


                    {/* Lump */}

                    <td className="px-6 py-4 font-semibold text-purple-400">
                      {item.lumpOre.toLocaleString()} MT
                    </td>


                    {/* Overall */}

                    <td className="px-6 py-4 font-semibold text-white">
                      {item.overall.toLocaleString()} MT
                    </td>


                    {/* Change */}

                    <td
                      className={`px-6 py-4 font-semibold ${
                        item.change > 0
                          ? "text-green-400"
                          : item.change < 0
                          ? "text-yellow-400"
                          : "text-slate-400"
                      }`}
                    >

                      {index === 0
                        ? "—"
                        : `${
                            item.change > 0
                              ? "+"
                              : ""
                          }${item.change.toLocaleString()} MT`}

                    </td>


                    {/* Status */}

                    <td className="px-6 py-4">

                      <span
                        className={`font-semibold ${item.statusColor}`}
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* --------------------------------------------- */}
      {/* STOCK INSIGHTS */}
      {/* --------------------------------------------- */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">


        {/* Highest */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-green-400 font-semibold">
            ↑ Highest Stock
          </p>

          <p className="text-white text-lg font-semibold mt-2">
            {highestOverallStock.toLocaleString()} MT
          </p>

          <p className="text-slate-400 text-sm mt-1">
            Highest overall stock recorded during the 30-day period.
          </p>

        </div>


        {/* Lowest */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-yellow-400 font-semibold">
            ↓ Lowest Stock
          </p>

          <p className="text-white text-lg font-semibold mt-2">
            {lowestOverallStock.toLocaleString()} MT
          </p>

          <p className="text-slate-400 text-sm mt-1">
            Lowest overall stock recorded during the 30-day period.
          </p>

        </div>

      </div>

    </div>
  );
};

export default Stock;