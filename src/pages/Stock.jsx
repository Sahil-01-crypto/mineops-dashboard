import React from "react";

const stockData = [
  {
    mine: "Mine A",
    stock: "18,450",
    capacity: "25,000",
    status: "Healthy",
  },
  {
    mine: "Mine B",
    stock: "12,800",
    capacity: "20,000",
    status: "Healthy",
  },
  {
    mine: "Mine C",
    stock: "9,600",
    capacity: "15,000",
    status: "Moderate",
  },
  {
    mine: "Mine D",
    stock: "7,800",
    capacity: "12,000",
    status: "Low",
  },
];

const Stock = () => {
  return (
    <div className="p-8 text-white">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Stock
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor available ore stock across mining sites.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">
          <p className="text-slate-400">
            Total Stock
          </p>

          <h2 className="text-3xl font-bold mt-3">
            48,650 MT
          </h2>
        </div>

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">
          <p className="text-slate-400">
            Storage Capacity
          </p>

          <h2 className="text-3xl font-bold mt-3">
            72,000 MT
          </h2>
        </div>

        <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">
          <p className="text-slate-400">
            Capacity Used
          </p>

          <h2 className="text-3xl font-bold mt-3">
            67.6%
          </h2>
        </div>

      </div>

      {/* Stock Table */}
      <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-[#2A3B57]">
          <h2 className="text-xl font-semibold">
            Stock by Mine
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#1B2A40]">
              <tr>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Mine
                </th>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Current Stock
                </th>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Capacity
                </th>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Utilization
                </th>

                <th className="text-left px-6 py-4 text-sm text-slate-400">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {stockData.map((item) => {

                const utilization =
                  (parseInt(item.stock.replace(",", "")) /
                    parseInt(item.capacity.replace(",", ""))) *
                  100;

                return (
                  <tr
                    key={item.mine}
                    className="border-t border-[#2A3B57] hover:bg-[#1B2A40]"
                  >

                    <td className="px-6 py-4 font-semibold">
                      {item.mine}
                    </td>

                    <td className="px-6 py-4">
                      {item.stock} MT
                    </td>

                    <td className="px-6 py-4 text-slate-400">
                      {item.capacity} MT
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-32 h-2 bg-[#24344D] rounded-full">

                          <div
                            className="h-2 bg-blue-400 rounded-full"
                            style={{ width: `${utilization}%` }}
                          ></div>

                        </div>

                        <span className="text-sm text-slate-400">
                          {utilization.toFixed(0)}%
                        </span>

                      </div>

                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`font-semibold ${
                          item.status === "Healthy"
                            ? "text-green-400"
                            : item.status === "Moderate"
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                      >
                        {item.status}
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