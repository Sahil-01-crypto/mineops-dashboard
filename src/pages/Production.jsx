import React from "react";

import productionData from "../data/productionData";
const Production = () => {
  return (
    <div className="p-8 text-white">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Production
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor daily ore production and operational efficiency.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">
          <p className="text-sm text-slate-400">
            Weekly Production
          </p>

          <h2 className="text-3xl font-bold mt-3">
            88,050 MT
          </h2>
        </div>

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">
          <p className="text-sm text-slate-400">
            Average Daily Production
          </p>

          <h2 className="text-3xl font-bold mt-3">
            12,579 MT
          </h2>
        </div>

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">
          <p className="text-sm text-slate-400">
            Average Efficiency
          </p>

          <h2 className="text-3xl font-bold mt-3">
            100.4%
          </h2>
        </div>

      </div>

      {/* Production table */}
      <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-[#2A3B57]">
          <h2 className="text-xl font-semibold">
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

              {productionData.map((item) => (
                <tr
                  key={item.date}
                  className="border-t border-[#2A3B57] hover:bg-[#1B2A40]"
                >

                  <td className="px-6 py-4">
                    {item.date}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    {item.ore} MT
                  </td>

                  <td className="px-6 py-4 text-slate-400">
                    {item.target} MT
                  </td>

                  <td className="px-6 py-4 text-blue-400 font-semibold">
                    {item.efficiency}
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