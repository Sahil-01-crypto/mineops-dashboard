import React from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { useMineData } from "../../context/MineDataContext.jsx";

const ProductionChart = () => {
  const { mineData } = useMineData();

  const chartData = mineData
    ? mineData.map((item) => ({
        date: item.date,
        fineOre: item.fineOreProduction,
        lumpOre: item.lumpOreProduction,
        overall: item.overallProduction,
      }))
    : [];

  return (
    <div className="bg-[#172236] border border-[#2A3B57] rounded-2xl p-6">

      <h2 className="text-xl font-semibold mb-6 text-white">
        Monthly Production Trend
      </h2>

      <div className="h-80 w-full">

        {chartData.length > 0 ? (

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={chartData}>

              <XAxis
                dataKey="date"
                axisLine={{ stroke: "#FFFFFF", strokeWidth: 1 }}
                tickLine={false}
                tick={{ fill: "#E2E8F0", fontSize: 12 }}
              />

              <YAxis
                axisLine={{ stroke: "#FFFFFF", strokeWidth: 1 }}
                tickLine={false}
                tick={{ fill: "#E2E8F0", fontSize: 14 }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#182235",
                  border: "1px solid #fff",
                  color: "#fff",
                }}
              />

              <Legend />

              {/* Fine Ore */}

              <Line
                type="monotone"
                dataKey="fineOre"
                name="Fine Ore"
                stroke="#60A5FA"
                strokeWidth={3}
                dot={false}
              />

              {/* Lump Ore */}

              <Line
                type="monotone"
                dataKey="lumpOre"
                name="Lump Ore"
                stroke="#A78BFA"
                strokeWidth={3}
                dot={false}
              />

              {/* Overall */}

              <Line
                type="monotone"
                dataKey="overall"
                name="Overall Production"
                stroke="#22C55E"
                strokeWidth={3}
                dot={false}
              />

            </LineChart>

          </ResponsiveContainer>

        ) : (

          <div className="h-full flex items-center justify-center text-slate-400">
            Upload operational data to view production trend.
          </div>

        )}

      </div>

    </div>
  );
};

export default ProductionChart;