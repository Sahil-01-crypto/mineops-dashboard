import React from "react";
import { useMineData } from "../context/MineDataContext.jsx";

const Stock = () => {
  const { mineData } = useMineData();

  // No data uploaded
  if (!mineData || mineData.length === 0) {
    return (
      <div >
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Stock
          </h1>

          <p className="text-slate-400 mt-2">
            Monitor available ore stock from operational data.
          </p>
        </div>

        {/* Empty State */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-10 text-center">

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

  // Convert uploaded stock values to numbers
  const stockValues = mineData.map(
    (item) => Number(item.Stock) || 0
  );

  // Latest record
  const latestData = mineData[mineData.length - 1];

  const currentStock =
    Number(latestData.Stock) || 0;

  // Highest stock recorded
  const highestStock = Math.max(...stockValues);

  // Average stock
  const averageStock =
    stockValues.reduce(
      (sum, value) => sum + value,
      0
    ) / stockValues.length;

  return (
    <div className="mx-7">

      {/* Header */}

      <div  className=" p-8">

        <h1 className="text-3xl font-bold text-white">
          Stock
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor available ore stock from operational data.
        </p>

      </div>


      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Current Stock */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-slate-400">
            Current Stock
          </p>

          <h2 className="text-3xl font-bold mt-3 text-white">
            {currentStock.toLocaleString()} MT
          </h2>

        </div>


        {/* Highest Stock */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-slate-400">
            Highest Recorded Stock
          </p>

          <h2 className="text-3xl font-bold mt-3 text-white">
            {highestStock.toLocaleString()} MT
          </h2>

        </div>


        {/* Average Stock */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-slate-400">
            Average Stock
          </p>

          <h2 className="text-3xl font-bold mt-3 text-white">
            {Math.round(
              averageStock
            ).toLocaleString()} MT
          </h2>

        </div>

      </div>


      {/* Stock History */}

      <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-[#2A3B57]">

          <h2 className="text-xl font-semibold text-white">
            Stock History
          </h2>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#1B2A40]">

              <tr>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Day
                </th>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Available Stock
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

              {mineData.map((item, index) => {

                const stock =
                  Number(item.Stock) || 0;

                const previousStock =
                  index > 0
                    ? Number(mineData[index - 1].Stock) || 0
                    : stock;

                const change =
                  stock - previousStock;

                let status = "Stable";
                let statusColor = "text-slate-400";

                if (change > 0) {
                  status = "Increased";
                  statusColor = "text-green-400";
                } else if (change < 0) {
                  status = "Decreased";
                  statusColor = "text-yellow-400";
                }

                return (
                  <tr
                    key={`${item.Date}-${index}`}
                    className="border-t border-[#2A3B57] hover:bg-[#1B2A40]"
                  >

                    {/* Date */}

                    <td className="px-6 py-4 text-white">
                      {item.Date}
                    </td>


                    {/* Stock */}

                    <td className="px-6 py-4 font-semibold text-white">
                      {stock.toLocaleString()} MT
                    </td>


                    {/* Change */}

                    <td
                      className={`px-6 py-4 font-semibold ${
                        change > 0
                          ? "text-green-400"
                          : change < 0
                          ? "text-yellow-400"
                          : "text-slate-400"
                      }`}
                    >
                      {index === 0
                        ? "—"
                        : `${change > 0 ? "+" : ""}${change.toLocaleString()} MT`}
                    </td>


                    {/* Status */}

                    <td className="px-6 py-4">

                      <span
                        className={`font-semibold ${statusColor}`}
                      >
                        {status}
                      </span>

                    </td>

                  </tr>
                );

              })}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Stock;