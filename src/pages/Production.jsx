import React from "react";
import { useMineData } from "../context/MineDataContext.jsx";

const Production = () => {
  const { mineData } = useMineData();

  // If no Excel data has been uploaded
  if (!mineData || mineData.length === 0) {
    return (
      <div className="m-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Production
          </h1>

          <p className="text-slate-400 mt-2">
            Monitor daily ore production and operational efficiency.
          </p>
        </div>

        {/* Empty State */}
        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-10 text-center">
          <h2 className="text-xl font-semibold text-white">
            No Production Data
          </h2>

          <p className="text-slate-400 mt-2">
            Upload an Excel or CSV file from the Dashboard to view
            production data.
          </p>
        </div>
      </div>
    );
  }

  // Convert Excel values into numbers
  const productionValues = mineData.map(
    (item) => Number(item.Production) || 0
  );

  const targetValues = mineData.map(
    (item) => Number(item.Target) || 0
  );

  // Weekly production
  const weeklyProduction = productionValues.reduce(
    (sum, value) => sum + value,
    0
  );

  // Average daily production
  const averageProduction =
    weeklyProduction / mineData.length;

  // Calculate efficiency for every day
  const efficiencyValues = mineData.map((item) => {
    const production = Number(item.Production) || 0;
    const target = Number(item.Target) || 0;

    return target > 0
      ? (production / target) * 100
      : 0;
  });

  // Average efficiency
  const averageEfficiency =
    efficiencyValues.reduce(
      (sum, value) => sum + value,
      0
    ) / efficiencyValues.length;

  // Format table data
  const dailyProduction = mineData.map((item) => {
    const production = Number(item.Production) || 0;
    const target = Number(item.Target) || 0;

    const efficiency =
      target > 0
        ? Math.round((production / target) * 100)
        : 0;

    return {
      date: item.Date,
      production,
      target,
      efficiency,
    };
  });

  return (
    <div className=" m-1 p-8">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">
          Production
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor daily ore production and operational efficiency.
        </p>

      </div>


      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Weekly Production */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-sm text-slate-400">
            Weekly Production
          </p>

          <h2 className="text-3xl font-bold mt-3 text-white">
            {weeklyProduction.toLocaleString()} MT
          </h2>

        </div>


        {/* Average Daily Production */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-sm text-slate-400">
            Average Daily Production
          </p>

          <h2 className="text-3xl font-bold mt-3 text-white">
            {Math.round(
              averageProduction
            ).toLocaleString()} MT
          </h2>

        </div>


        {/* Average Efficiency */}

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

          <p className="text-sm text-slate-400">
            Average Efficiency
          </p>

          <h2 className="text-3xl font-bold mt-3 text-green-400">
            {averageEfficiency.toFixed(1)}%
          </h2>

        </div>

      </div>


      {/* Production Table */}

      <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-[#2A3B57]">

          <h2 className="text-xl font-semibold text-white">
            Daily Production
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
                  Production
                </th>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Target
                </th>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Efficiency
                </th>

              </tr>

            </thead>


            <tbody>

              {dailyProduction.map((item, index) => (

                <tr
                  key={`${item.date}-${index}`}
                  className="border-t border-[#2A3B57] hover:bg-[#1B2A40]"
                >

                  <td className="px-6 py-4 text-white">
                    {item.date}
                  </td>


                  <td className="px-6 py-4 font-semibold text-white">
                    {item.production.toLocaleString()} MT
                  </td>


                  <td className="px-6 py-4 text-slate-400">
                    {item.target.toLocaleString()} MT
                  </td>


                  <td className="px-6 py-4 text-blue-400 font-semibold">
                    {item.efficiency}%
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Production;